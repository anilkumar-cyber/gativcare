import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogPostForm } from "@/components/dashboard/BlogPostForm";
import { updateBlogPostAction } from "@/lib/actions/blog";
import { getBlogPostById } from "@/lib/queries/blog";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) notFound();

  return (
    <div className="space-y-5">
      <Link href="/dashboard/admin?tab=cms" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors">
        <ArrowLeft size={14} /> Back to Blog / CMS
      </Link>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h2 className="text-lg font-bold mb-6">Edit Blog Post</h2>
        <BlogPostForm action={updateBlogPostAction} post={post} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
