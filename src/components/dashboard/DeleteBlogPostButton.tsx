"use client";

import { Trash2 } from "lucide-react";
import { deleteBlogPostAction } from "@/lib/actions/blog";

export function DeleteBlogPostButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteBlogPostAction}
      onSubmit={(e) => {
        if (!confirm(`Delete "${title}"? This can't be undone.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors" aria-label="Delete post">
        <Trash2 size={15} />
      </button>
    </form>
  );
}
