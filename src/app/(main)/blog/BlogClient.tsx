"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowRight, Calendar, User } from "lucide-react";
import type { BlogPost } from "@prisma/client";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");
  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      <section className="relative py-20 overflow-hidden hero-gradient">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Insights on Medical Tourism
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
              Treatment guides, hospital comparisons, cost breakdowns and patient stories from India
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white dark:bg-slate-900 rounded-2xl pl-12 pr-4 py-4 text-base outline-none focus:ring-2 focus:ring-primary/30 shadow-lg border border-border"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
            {filtered.map((post) => (
              <StaggerItem key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <motion.article
                    className="group glass-card rounded-2xl overflow-hidden card-hover h-full flex flex-col"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="h-44 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                      {post.coverImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">📝</div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-border">
                        <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} /> {(post.publishedAt ?? post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && posts.length > 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted">No articles found matching &ldquo;{search}&rdquo;</p>
              <button onClick={() => setSearch("")} className="mt-4 btn-primary">Clear Search</button>
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted">No articles published yet — check back soon.</p>
              <Link href="/contact" className="mt-4 btn-primary inline-flex items-center gap-2">
                Talk to Us <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
