"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { saveTestimonialAction, deleteTestimonialAction } from "@/lib/actions/admin";

type Testimonial = {
  id: string;
  name: string;
  country: string;
  treatment: string;
  hospital: string;
  doctorName: string | null;
  rating: number;
  text: string;
  savings: string | null;
};

export function TestimonialsPanel({ testimonials }: { testimonials: Testimonial[] }) {
  const [editing, setEditing] = useState<Testimonial | "new" | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveTestimonialAction(undefined, formData);
      if (result?.error) setError(result.error);
      else { setError(undefined); setEditing(null); }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Testimonials ({testimonials.length})</h3>
        <button onClick={() => setEditing(editing === "new" ? null : "new")} className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5">
          {editing === "new" ? <X size={14} /> : <Plus size={14} />} {editing === "new" ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      {editing && (
        <form action={formAction} className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface border border-border">
          {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
          <input name="name" placeholder="Patient name" required defaultValue={editing !== "new" ? editing.name : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="country" placeholder="Country" required defaultValue={editing !== "new" ? editing.country : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="treatment" placeholder="Treatment" required defaultValue={editing !== "new" ? editing.treatment : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="hospital" placeholder="Hospital" required defaultValue={editing !== "new" ? editing.hospital : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="doctorName" placeholder="Doctor name" defaultValue={editing !== "new" ? editing.doctorName ?? "" : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="rating" type="number" min={1} max={5} placeholder="Rating (1-5)" defaultValue={editing !== "new" ? editing.rating : 5} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="savings" placeholder="Savings (e.g. 80%)" defaultValue={editing !== "new" ? editing.savings ?? "" : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2" />
          <textarea name="text" placeholder="Testimonial text" required rows={3} defaultValue={editing !== "new" ? editing.text : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2" />
          {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">
            {pending ? "Saving..." : editing === "new" ? "Create testimonial" : "Save changes"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {testimonials.map((t) => (
          <div key={t.id} className="p-3 rounded-xl bg-surface border border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold flex items-center gap-1.5">{t.name} <span className="text-xs text-muted font-normal">• {t.country} • {t.treatment}</span></p>
                <p className="text-xs text-muted mt-1 line-clamp-2">{t.text}</p>
                <span className="text-xs font-medium flex items-center gap-1 text-amber-600 mt-1"><Star size={11} className="fill-amber-500 text-amber-500" /> {t.rating}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => setEditing(t)} className="p-2 rounded-lg hover:bg-surface-hover text-muted"><Pencil size={14} /></button>
                <form action={deleteTestimonialAction}>
                  <input type="hidden" name="id" value={t.id} />
                  <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <p className="text-sm text-muted text-center py-6">No testimonials yet.</p>}
      </div>
    </div>
  );
}
