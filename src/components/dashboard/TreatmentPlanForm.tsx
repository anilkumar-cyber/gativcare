"use client";

import { useState, useTransition } from "react";
import { updateTreatmentPlanAction } from "@/lib/actions/doctor";

export function TreatmentPlanForm({ patientId, initialPlan }: { patientId: string; initialPlan: string | null }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialPlan ?? "");
  const [isPending, startTransition] = useTransition();

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="text-xs text-primary font-medium hover:underline">
        {initialPlan ? "Edit treatment plan" : "Add treatment plan"}
      </button>
    );
  }

  return (
    <form
      action={(formData) => startTransition(() => { updateTreatmentPlanAction(formData); setOpen(false); })}
      className="flex items-start gap-2 mt-2"
    >
      <input type="hidden" name="patientId" value={patientId} />
      <textarea
        name="treatmentPlan"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        className="flex-1 bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-xs border border-border"
      />
      <button type="submit" disabled={isPending} className="btn-primary text-xs px-3 py-2 disabled:opacity-60">{isPending ? "Saving..." : "Save"}</button>
    </form>
  );
}
