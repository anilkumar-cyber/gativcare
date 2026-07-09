"use client";

import { useState, useTransition } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { createCoordinatorAction, deleteCoordinatorAction } from "@/lib/actions/admin";

type Coordinator = { id: string; name: string; email: string; phone: string | null; createdAt: Date };

export function CoordinatorsPanel({ coordinators }: { coordinators: Coordinator[] }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await createCoordinatorAction(undefined, formData);
      if (result?.error) setError(result.error);
      else { setError(undefined); setOpen(false); }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Coordinators ({coordinators.length})</h3>
        <button onClick={() => setOpen(!open)} className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5">
          {open ? <X size={14} /> : <Plus size={14} />} {open ? "Cancel" : "Add Coordinator"}
        </button>
      </div>

      {open && (
        <form action={formAction} className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface border border-border">
          <input name="name" placeholder="Full name" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="email" type="email" placeholder="Email" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="phone" placeholder="Phone" className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="password" type="password" placeholder="Temporary password" required minLength={8} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">
            {pending ? "Creating..." : "Create coordinator account"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {coordinators.map((c) => (
          <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
            <div>
              <p className="text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-muted">{c.email} {c.phone ? `• ${c.phone}` : ""}</p>
            </div>
            <form action={deleteCoordinatorAction}>
              <input type="hidden" name="id" value={c.id} />
              <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
            </form>
          </div>
        ))}
        {coordinators.length === 0 && <p className="text-sm text-muted text-center py-6">No coordinators yet.</p>}
      </div>
    </div>
  );
}
