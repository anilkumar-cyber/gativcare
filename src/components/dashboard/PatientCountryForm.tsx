"use client";

import { useActionState } from "react";
import { updatePatientCountryAction } from "@/lib/actions/patient";

export function PatientCountryForm({ country }: { country: string | null }) {
  const [state, formAction, pending] = useActionState(updatePatientCountryAction, undefined);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <h3 className="font-semibold mb-5">Location</h3>
      <form action={formAction} className="flex items-end gap-3">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1.5 block">Country</label>
          <input name="country" defaultValue={country ?? ""} required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2.5 disabled:opacity-60">{pending ? "Saving..." : "Save"}</button>
      </form>
      {state?.error && <p className="text-sm text-red-500 mt-2">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600 mt-2">Country updated.</p>}
    </div>
  );
}
