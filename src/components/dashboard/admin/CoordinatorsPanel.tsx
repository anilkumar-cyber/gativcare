"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { saveCoordinatorAction, deleteCoordinatorAction } from "@/lib/actions/admin";
import { PasswordInput } from "@/components/ui/PasswordInput";

type Coordinator = { id: string; name: string; email: string; phone: string | null; createdAt: Date };

export function CoordinatorsPanel({ coordinators }: { coordinators: Coordinator[] }) {
  const [editing, setEditing] = useState<Coordinator | "new" | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveCoordinatorAction(undefined, formData);
      if (result?.error) setError(result.error);
      else { setError(undefined); setEditing(null); }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Coordinators ({coordinators.length})</h3>
        <button onClick={() => setEditing(editing === "new" ? null : "new")} className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5">
          {editing === "new" ? <X size={14} /> : <Plus size={14} />} {editing === "new" ? "Cancel" : "Add Coordinator"}
        </button>
      </div>

      {editing && (
        <form action={formAction} className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface border border-border">
          {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
          <input name="name" placeholder="Full name" required defaultValue={editing !== "new" ? editing.name : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="email" type="email" placeholder="Email" required defaultValue={editing !== "new" ? editing.email : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="phone" placeholder="Phone" defaultValue={editing !== "new" ? editing.phone ?? "" : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <PasswordInput
            name="password"
            placeholder={editing !== "new" ? "New password (leave blank to keep)" : "Temporary password"}
            required={editing === "new"}
            minLength={8}
            className="w-full bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border"
          />
          {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">
            {pending ? "Saving..." : editing === "new" ? "Create coordinator account" : "Save changes"}
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
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(c)} className="p-2 rounded-lg hover:bg-surface-hover text-muted"><Pencil size={14} /></button>
              <form action={deleteCoordinatorAction}>
                <input type="hidden" name="id" value={c.id} />
                <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
              </form>
            </div>
          </div>
        ))}
        {coordinators.length === 0 && <p className="text-sm text-muted text-center py-6">No coordinators yet.</p>}
      </div>
    </div>
  );
}
