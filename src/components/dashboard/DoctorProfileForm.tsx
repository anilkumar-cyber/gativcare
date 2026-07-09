"use client";

import { useActionState } from "react";
import { updateDoctorProfileAction } from "@/lib/actions/doctor";

export function DoctorProfileForm({ fee, experience, languages }: { fee: string; experience: number; languages: string[] }) {
  const [state, formAction, pending] = useActionState(updateDoctorProfileAction, undefined);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <h3 className="font-semibold mb-5">Practice Details</h3>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Consultation fee</label>
          <input name="fee" defaultValue={fee} required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Years of experience</label>
          <input name="experience" type="number" defaultValue={experience} required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Languages (comma separated)</label>
          <input name="languages" defaultValue={languages.join(", ")} className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        {state?.success && <p className="text-sm text-green-600">Practice details updated.</p>}
        <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 disabled:opacity-60">
          {pending ? "Saving..." : "Save details"}
        </button>
      </form>
    </div>
  );
}
