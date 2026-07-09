"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, X, Star } from "lucide-react";
import { saveDoctorAction, deleteDoctorAction } from "@/lib/actions/admin";

type Doctor = {
  id: string;
  name: string;
  hospitalId: string;
  specialization: string;
  experience: number;
  fee: string;
  rating: number;
  languages: string[];
  hospital: { name: string };
};

export function DoctorsPanel({ doctors, hospitals }: { doctors: Doctor[]; hospitals: { id: string; name: string }[] }) {
  const [editing, setEditing] = useState<Doctor | "new" | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await saveDoctorAction(undefined, formData);
      if (result?.error) setError(result.error);
      else { setError(undefined); setEditing(null); }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Doctors ({doctors.length})</h3>
        <button onClick={() => setEditing(editing === "new" ? null : "new")} className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5">
          {editing === "new" ? <X size={14} /> : <Plus size={14} />} {editing === "new" ? "Cancel" : "Add Doctor"}
        </button>
      </div>

      {editing && (
        <form action={formAction} className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface border border-border">
          {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
          <input name="name" placeholder="Doctor name" required defaultValue={editing !== "new" ? editing.name : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <select name="hospitalId" required defaultValue={editing !== "new" ? editing.hospitalId : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border">
            <option value="" disabled>Select hospital</option>
            {hospitals.map((h) => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
          <input name="specialization" placeholder="Specialization" required defaultValue={editing !== "new" ? editing.specialization : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="experience" type="number" placeholder="Years experience" required defaultValue={editing !== "new" ? editing.experience : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="fee" placeholder="Consultation fee (e.g. $120)" required defaultValue={editing !== "new" ? editing.fee : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="languages" placeholder="Languages (comma separated)" defaultValue={editing !== "new" ? editing.languages.join(", ") : ""} className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">
            {pending ? "Saving..." : editing === "new" ? "Create doctor" : "Save changes"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {doctors.map((d) => (
          <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
            <div>
              <p className="text-sm font-semibold">{d.name}</p>
              <p className="text-xs text-muted">{d.specialization} • {d.hospital.name} • {d.experience} yrs</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium flex items-center gap-1 text-muted"><Star size={12} className="text-amber-500" /> {d.rating}</span>
              <button onClick={() => setEditing(d)} className="p-2 rounded-lg hover:bg-surface-hover text-muted"><Pencil size={14} /></button>
              <form action={deleteDoctorAction}>
                <input type="hidden" name="id" value={d.id} />
                <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"><Trash2 size={14} /></button>
              </form>
            </div>
          </div>
        ))}
        {doctors.length === 0 && <p className="text-sm text-muted text-center py-6">No doctors yet.</p>}
      </div>
    </div>
  );
}
