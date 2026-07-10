"use client";

import { useState, useTransition } from "react";
import { Pill, Plus, Check, Ban } from "lucide-react";
import { addPrescriptionAction, updatePrescriptionStatusAction } from "@/lib/actions/prescriptions";
import { PrescriptionStatus } from "@prisma/client";

type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string | null;
  instructions: string | null;
  status: PrescriptionStatus;
  createdAt: Date;
  doctor?: { name: string };
  patient?: { user: { name: string } };
};

const STATUS_STYLE: Record<PrescriptionStatus, string> = {
  ACTIVE: "bg-green-100 text-green-600 dark:bg-green-900/30",
  COMPLETED: "bg-slate-100 text-slate-600 dark:bg-slate-800",
  DISCONTINUED: "bg-red-100 text-red-600 dark:bg-red-900/30",
};

export function PrescriptionList({
  prescriptions,
  patientId,
  patients,
  canAdd = false,
  canManage = false,
  showPatientName = false,
}: {
  prescriptions: Prescription[];
  patientId?: string;
  patients?: { id: string; name: string }[];
  canAdd?: boolean;
  canManage?: boolean;
  showPatientName?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function setStatus(id: string, status: PrescriptionStatus) {
    const formData = new FormData();
    formData.set("id", id);
    formData.set("status", status);
    startTransition(() => updatePrescriptionStatusAction(formData));
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Prescriptions</h3>
        {canAdd && (
          <button onClick={() => setOpen(!open)} className="text-sm text-primary font-medium flex items-center gap-1">
            <Plus size={14} /> Add Prescription
          </button>
        )}
      </div>

      {canAdd && open && (
        <form
          action={(formData) => { startTransition(() => addPrescriptionAction(formData)); setOpen(false); }}
          className="grid sm:grid-cols-2 gap-3 mb-5 p-4 rounded-xl bg-surface border border-border"
        >
          {patientId ? (
            <input type="hidden" name="patientId" value={patientId} />
          ) : (
            <select name="patientId" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2">
              <option value="">Select patient</option>
              {patients?.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
          <input name="medication" placeholder="Medication (e.g. Amoxicillin)" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="dosage" placeholder="Dosage (e.g. 500mg)" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="frequency" placeholder="Frequency (e.g. Twice daily)" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="duration" placeholder="Duration (e.g. 7 days)" className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="instructions" placeholder="Instructions (optional)" className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2" />
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">Add prescription</button>
        </form>
      )}

      <div className="space-y-3">
        {prescriptions.map((p) => (
          <div key={p.id} className="p-3 rounded-xl bg-surface border border-border">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <Pill size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{p.medication} • {p.dosage}</p>
                  <p className="text-xs text-muted">{p.frequency}{p.duration ? ` • ${p.duration}` : ""}</p>
                  {p.instructions && <p className="text-xs text-muted mt-1">{p.instructions}</p>}
                  <p className="text-[11px] text-muted mt-1.5" suppressHydrationWarning>
                    {p.createdAt.toLocaleDateString()}
                    {showPatientName && p.patient ? ` • ${p.patient.user.name}` : ""}
                    {!showPatientName && p.doctor ? ` • Dr. ${p.doctor.name}` : ""}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[p.status]}`}>{p.status}</span>
                {canManage && p.status === "ACTIVE" && (
                  <div className="flex items-center gap-1">
                    <button onClick={() => setStatus(p.id, PrescriptionStatus.COMPLETED)} disabled={pending} title="Mark completed" className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600">
                      <Check size={14} />
                    </button>
                    <button onClick={() => setStatus(p.id, PrescriptionStatus.DISCONTINUED)} disabled={pending} title="Discontinue" className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600">
                      <Ban size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {prescriptions.length === 0 && <p className="text-sm text-muted text-center py-6">No prescriptions yet.</p>}
      </div>
    </div>
  );
}
