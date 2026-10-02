import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, Info, HelpCircle } from "lucide-react";
import { FadeIn } from "@/components/ui/motion";
import { ReadingProgressBar } from "@/components/ui/ReadingProgressBar";
import { BlogToc } from "@/components/blog/BlogToc";
import { getPublishedBlogPostBySlug } from "@/lib/queries/blog";

const BASE_URL = "https://gativcare.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) return {};

  const title = post.seoTitle || `${post.title} | GativCare Blog`;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `${BASE_URL}/blog/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      publishedTime: (post.publishedAt ?? post.createdAt).toISOString(),
    },
  };
}

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function slugifyHeading(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Renders "[label](url)" spans within a line as real links; everything else as plain text. */
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const [, label, href] = match;
    nodes.push(
      href.startsWith("/") ? (
        <Link key={`${keyPrefix}-${i}`} href={href} className="text-primary font-semibold underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors">{label}</Link>
      ) : (
        <a key={`${keyPrefix}-${i}`} href={href} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors">{label}</a>
      )
    );
    lastIndex = match.index + match[0].length;
    i += 1;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

type TocEntry = { id: string; text: string };

/** Parses the plain-text content format into styled blocks, pulling H2s into a table of contents and rendering a trailing "## Frequently Asked Questions" section as cards instead of plain headings. */
function parseContent(content: string): { blocks: React.ReactNode[]; toc: TocEntry[] } {
  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);
  const blocks: React.ReactNode[] = [];
  const toc: TocEntry[] = [];
  let listItems: string[] = [];
  let sawFirstBlock = false;
  let inFaq = false;
  let faqItems: { question: string; answer: string[] }[] = [];

  const flushList = (key: string) => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={key} className="space-y-2.5 mb-6">
        {listItems.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-foreground/90 leading-relaxed">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <span>{renderInline(item, `li-${key}-${i}`)}</span>
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  const flushFaq = (key: string) => {
    if (faqItems.length === 0) return;
    blocks.push(
      <div key={key} className="space-y-4 mb-6">
        {faqItems.map((f, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface/60 p-5">
            <p className="flex items-start gap-2.5 font-bold text-base mb-2">
              <HelpCircle size={18} className="text-primary shrink-0 mt-0.5" />
              {f.question}
            </p>
            <p className="text-foreground/80 leading-relaxed pl-[26px]">
              {renderInline(f.answer.join(" "), `faq-a-${key}-${i}`)}
            </p>
          </div>
        ))}
      </div>
    );
    faqItems = [];
  };

  lines.forEach((line, i) => {
    if (line.startsWith("## ")) {
      flushList(`ul-${i}`);
      flushFaq(`faq-${i}`);
      const text = line.slice(3);
      inFaq = /frequently asked questions/i.test(text);
      blocks.push(
        <h2 key={i} id={slugifyHeading(text)} className="scroll-mt-28 text-2xl sm:text-3xl font-bold mt-12 mb-5 pl-4 border-l-4 border-primary">
          {text}
        </h2>
      );
      toc.push({ id: slugifyHeading(text), text });
      sawFirstBlock = true;
    } else if (line.startsWith("### ")) {
      flushList(`ul-${i}`);
      const text = line.slice(4);
      if (inFaq) {
        faqItems.push({ question: text, answer: [] });
      } else {
        blocks.push(<h3 key={i} className="text-xl font-bold mt-8 mb-3 text-foreground">{text}</h3>);
      }
      sawFirstBlock = true;
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      sawFirstBlock = true;
    } else if (inFaq && faqItems.length > 0) {
      faqItems[faqItems.length - 1].answer.push(line);
    } else if (/^important:/i.test(line)) {
      flushList(`ul-${i}`);
      blocks.push(
        <div key={i} className="flex gap-3 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800/50 p-4 mb-6">
          <Info size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-sm leading-relaxed text-amber-900 dark:text-amber-200">{renderInline(line, `imp-${i}`)}</p>
        </div>
      );
    } else {
      flushList(`ul-${i}`);
      const isLead = !sawFirstBlock;
      blocks.push(
        <p
          key={i}
          className={
            isLead
              ? "text-lg sm:text-xl leading-relaxed mb-6 text-foreground font-medium"
              : "text-base leading-relaxed mb-5 text-foreground/90"
          }
        >
          {renderInline(line, `p-${i}`)}
        </p>
      );
      sawFirstBlock = true;
    }
  });
  flushList("ul-end");
  flushFaq("faq-end");

  return { blocks, toc };
}

/** Pulls Q&A pairs out of a "## Frequently Asked Questions" section (### question, followed by answer paragraphs) for FAQPage schema. */
function extractFaqs(content: string): { question: string; answer: string }[] {
  const lines = content.split("\n").map((l) => l.trim());
  const startIdx = lines.findIndex((l) => /^## .*frequently asked questions/i.test(l));
  if (startIdx === -1) return [];

  const faqs: { question: string; answer: string }[] = [];
  let current: { question: string; answer: string[] } | null = null;

  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("## ")) break;
    if (line.startsWith("### ")) {
      if (current) faqs.push({ question: current.question, answer: current.answer.join(" ") });
      current = { question: line.slice(4), answer: [] };
    } else if (line && current) {
      current.answer.push(line.replace(LINK_PATTERN, "$1"));
    }
  }
  if (current) faqs.push({ question: current.question, answer: current.answer.join(" ") });

  return faqs.filter((f) => f.question && f.answer);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  const publishedIso = (post.publishedAt ?? post.createdAt).toISOString();
  const wordCount = post.content.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage ? [post.coverImage] : undefined,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "GativCare" },
    datePublished: publishedIso,
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${post.slug}` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${BASE_URL}/blog/${post.slug}` },
    ],
  };

  const faqs = extractFaqs(post.content);
  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  const { blocks, toc } = parseContent(post.content);

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        // eslint-disable-next-line react/no-danger
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <section className="relative py-16 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors mb-6">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">{tag}</span>
                ))}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <span className="flex items-center gap-1.5"><User size={14} /> {post.author}</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> {(post.publishedAt ?? post.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> {readingMinutes} min read</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {post.coverImage && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="w-full h-auto max-h-[420px] object-cover rounded-2xl shadow-xl" />
        </div>
      )}

      <section className="section-padding pt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <FadeIn>{blocks}</FadeIn>

              <div className="mt-4 p-6 sm:p-8 glass-card rounded-2xl text-center bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-lg font-bold mb-2">Have questions about this treatment?</h3>
                <p className="text-sm text-muted mb-5">Get a free consultation with our medical coordinators</p>
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2">Get Free Consultation</Link>
              </div>
            </div>

            {toc.length > 2 && (
              <aside className="hidden lg:block lg:col-span-4">
                <BlogToc toc={toc} />
              </aside>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
