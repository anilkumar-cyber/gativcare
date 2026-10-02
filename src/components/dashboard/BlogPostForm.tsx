import type { BlogPost } from "@prisma/client";

export function BlogPostForm({
  action,
  post,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  post?: BlogPost;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5 max-w-3xl">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div>
        <label className="text-sm font-medium mb-1.5 block">Title *</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={post?.title}
          className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
          placeholder="10 Things to Know Before Heart Surgery in India"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">Excerpt *</label>
        <textarea
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
          placeholder="Short summary shown on the blog listing page (1-2 sentences)"
        />
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">
          Content *
          <span className="text-xs text-muted font-normal ml-2">
            Plain text. Use &quot;## Heading&quot;, &quot;### Subheading&quot;, &quot;- item&quot; for lists, and &quot;[link text](/url)&quot; for links.
            An &quot;## Frequently Asked Questions&quot; section with &quot;### Question&quot; entries gets FAQ schema automatically.
          </span>
        </label>
        <textarea
          name="content"
          required
          rows={16}
          defaultValue={post?.content}
          className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border font-mono"
          placeholder={"## Introduction\n\nWrite your article here...\n\n### Key Points\n\n- Point one\n- Point two"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Cover Image URL</label>
          <input
            type="url"
            name="coverImage"
            defaultValue={post?.coverImage ?? ""}
            className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
            placeholder="https://..."
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Author</label>
          <input
            type="text"
            name="author"
            defaultValue={post?.author ?? "GativCare Team"}
            className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-1.5 block">Tags <span className="text-xs text-muted font-normal">(comma separated)</span></label>
        <input
          type="text"
          name="tags"
          defaultValue={post?.tags.join(", ") ?? ""}
          className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
          placeholder="Cardiology, Cost Guide, Patient Stories"
        />
      </div>

      <div className="p-4 rounded-xl bg-surface border border-border space-y-4">
        <p className="text-sm font-semibold">SEO</p>
        <div>
          <label className="text-xs text-muted mb-1.5 block">SEO Title <span className="opacity-70">(defaults to post title)</span></label>
          <input
            type="text"
            name="seoTitle"
            defaultValue={post?.seoTitle ?? ""}
            className="w-full bg-white dark:bg-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
            maxLength={70}
          />
        </div>
        <div>
          <label className="text-xs text-muted mb-1.5 block">Meta Description <span className="opacity-70">(defaults to excerpt)</span></label>
          <textarea
            name="seoDescription"
            rows={2}
            defaultValue={post?.seoDescription ?? ""}
            maxLength={160}
            className="w-full bg-white dark:bg-slate-900 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border resize-none"
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium cursor-pointer">
        <input type="checkbox" name="published" defaultChecked={post?.published} className="w-4 h-4 rounded accent-primary" />
        Published — visible on the public blog
      </label>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary px-6 py-3 text-sm">{submitLabel}</button>
      </div>
    </form>
  );
}
