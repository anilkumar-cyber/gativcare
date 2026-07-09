"use client";

import { useActionState } from "react";
import { updateHospitalDetailsAction, updateHospitalSpecialtiesAction, updateHospitalBedsAction } from "@/lib/actions/hospital";

export function HospitalDetailsForm({ name, city, establishedYear }: { name: string; city: string; establishedYear: number | null }) {
  const [state, formAction, pending] = useActionState(updateHospitalDetailsAction, undefined);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <h3 className="font-semibold mb-5">Hospital Details</h3>
      <form action={formAction} className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Name</label>
          <input name="name" defaultValue={name} required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">City</label>
          <input name="city" defaultValue={city} required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Established year</label>
          <input name="establishedYear" type="number" defaultValue={establishedYear ?? ""} className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        {state?.success && <p className="text-sm text-green-600">Details updated.</p>}
        <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 disabled:opacity-60">{pending ? "Saving..." : "Save details"}</button>
      </form>
    </div>
  );
}

export function HospitalSpecialtiesForm({ specialties }: { specialties: string[] }) {
  const [state, formAction, pending] = useActionState(updateHospitalSpecialtiesAction, undefined);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <h3 className="font-semibold mb-2">Departments / Specialties</h3>
      <p className="text-sm text-muted mb-4">Comma-separated list shown on your public hospital profile.</p>
      <form action={formAction} className="space-y-4">
        <textarea name="specialties" rows={3} defaultValue={specialties.join(", ")} className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
        {state?.success && <p className="text-sm text-green-600">Specialties updated.</p>}
        <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 disabled:opacity-60">{pending ? "Saving..." : "Save specialties"}</button>
      </form>
    </div>
  );
}

export function HospitalBedsForm({ beds }: { beds: number | null }) {
  const [state, formAction, pending] = useActionState(updateHospitalBedsAction, undefined);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <h3 className="font-semibold mb-2">Bed Capacity</h3>
      <p className="text-sm text-muted mb-4">Total registered beds. Live occupancy/ward tracking isn&apos;t built yet — this is a capacity figure only.</p>
      <form action={formAction} className="flex items-end gap-3">
        <div className="flex-1">
          <label className="text-sm font-medium mb-1.5 block">Total beds</label>
          <input name="beds" type="number" min={0} defaultValue={beds ?? ""} required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2.5 disabled:opacity-60">{pending ? "Saving..." : "Save"}</button>
      </form>
      {state?.error && <p className="text-sm text-red-500 mt-2">{state.error}</p>}
      {state?.success && <p className="text-sm text-green-600 mt-2">Bed count updated.</p>}
    </div>
  );
}
