"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { saveFaqAction, deleteFaqAction } from "@/lib/actions/admin";

type Faq = { id: string; question: string; answer: string };

export function FaqPanel({ faqs }: { faqs: Faq[] }) {
  const [editing, setEditing] = useState<Faq | "new" | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveFaqAction(undefined, formData);
      if (result?.error) setError(result.error);
      else { setError(undefined); setEditing(null); }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">FAQ ({faqs.length})</h3>
        <button onClick={() => setEditing(editing === "new" ? null : "new")} className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5">
          {editing === "new" ? <X size={14} /> : <Plus size={14} />} {editing === "new" ? "Cancel" : "Add FAQ"}
        </button>
      </div>

      {editing && (
        <form action={formAction} className="space-y-3 mb-6 p-4 rounded-xl bg-surface border border-border">
          {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
          <input name="question" placeholder="Question" required defaultValue={editing !== "new" ? editing.question : ""} className="w-full bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <textarea name="answer" placeholder="Answer" required rows={3} defaultValue={editing !== "new" ? editing.answer : ""} className="w-full bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 disabled:opacity-60">
            {pending ? "Saving..." : editing === "new" ? "Create FAQ" : "Save changes"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="p-3 rounded-xl bg-surface border border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold">{f.question}</p>
                <p className="text-xs text-muted mt-1 line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setEditing(f)} className="p-2 rounded-lg hover:bg-surface-hover text-muted"><Pencil size={14} /></button>
                <form action={deleteFaqAction}>
                  <input type="hidden" name="id" value={f.id} />
                  <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <p className="text-sm text-muted text-center py-6">No FAQs yet.</p>}
      </div>
    </div>
  );
}
