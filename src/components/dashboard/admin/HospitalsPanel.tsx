"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { saveHospitalAction, deleteHospitalAction } from "@/lib/actions/admin";

type Hospital = {
  id: string;
  name: string;
  city: string;
  beds: number | null;
  establishedYear: number | null;
  accreditations: string[];
  specialties: string[];
  _count: { doctors: number };
};

export function HospitalsPanel({ hospitals }: { hospitals: Hospital[] }) {
  const [editing, setEditing] = useState<Hospital | "new" | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveHospitalAction(undefined, formData);
      if (result?.error) setError(result.error);
      else { setError(undefined); setEditing(null); }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Hospitals ({hospitals.length})</h3>
        <button onClick={() => setEditing(editing === "new" ? null : "new")} className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5">
          {editing === "new" ? <X size={14} /> : <Plus size={14} />} {editing === "new" ? "Cancel" : "Add Hospital"}
        </button>
      </div>

      {editing && (
        <form action={formAction} className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface border border-border">
          {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
          <input name="name" placeholder="Hospital name" required defaultValue={editing !== "new" ? editing.name : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="city" placeholder="City" required defaultValue={editing !== "new" ? editing.city : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="beds" type="number" placeholder="Beds" defaultValue={editing !== "new" ? editing.beds ?? "" : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="establishedYear" type="number" placeholder="Established year" defaultValue={editing !== "new" ? editing.establishedYear ?? "" : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="accreditations" placeholder="Accreditations (comma separated)" defaultValue={editing !== "new" ? editing.accreditations.join(", ") : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2" />
          <input name="specialties" placeholder="Specialties (comma separated)" defaultValue={editing !== "new" ? editing.specialties.join(", ") : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2" />
          {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">
            {pending ? "Saving..." : editing === "new" ? "Create hospital" : "Save changes"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {hospitals.map((h) => (
          <div key={h.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
            <div>
              <p className="text-sm font-semibold">{h.name}</p>
              <p className="text-xs text-muted">{h.city} • {h._count.doctors} doctors • {h.beds ?? "—"} beds</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setEditing(h)} className="p-2 rounded-lg hover:bg-surface-hover text-muted"><Pencil size={14} /></button>
              <form action={deleteHospitalAction}>
                <input type="hidden" name="id" value={h.id} />
                <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
              </form>
            </div>
          </div>
        ))}
        {hospitals.length === 0 && <p className="text-sm text-muted text-center py-6">No hospitals yet.</p>}
      </div>
    </div>
  );
}
