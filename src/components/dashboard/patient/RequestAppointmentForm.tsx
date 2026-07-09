"use client";

import { useActionState } from "react";
import { requestAppointmentAction } from "@/lib/actions/appointments";

type Doctor = { id: string; name: string; specialization: string; hospital: { name: string } };

export function RequestAppointmentForm({ doctors }: { doctors: Doctor[] }) {
  const [state, formAction, pending] = useActionState(requestAppointmentAction, undefined);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6 mb-6">
      <h3 className="font-semibold mb-4">Request an Appointment</h3>
      <form action={formAction} className="grid sm:grid-cols-2 gap-3">
        <select name="doctorId" required defaultValue="" className="bg-surface rounded-lg px-3 py-2.5 text-sm border border-border sm:col-span-2">
          <option value="" disabled>Choose a doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>{d.name} — {d.specialization} ({d.hospital.name})</option>
          ))}
        </select>
        <input name="scheduledAt" type="datetime-local" required className="bg-surface rounded-lg px-3 py-2.5 text-sm border border-border" />
        <select name="type" defaultValue="IN_PERSON" className="bg-surface rounded-lg px-3 py-2.5 text-sm border border-border">
          <option value="IN_PERSON">In-person</option>
          <option value="VIDEO">Video consult</option>
        </select>
        <textarea name="notes" placeholder="Anything your doctor should know beforehand (optional)" rows={2} className="bg-surface rounded-lg px-3 py-2.5 text-sm border border-border sm:col-span-2" />
        {state?.error && <p className="text-sm text-red-500 sm:col-span-2">{state.error}</p>}
        {state?.success && <p className="text-sm text-green-600 sm:col-span-2">Request sent — you&apos;ll see it as &quot;Pending&quot; until confirmed.</p>}
        <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2.5 sm:col-span-2 disabled:opacity-60">
          {pending ? "Sending..." : "Request Appointment"}
        </button>
      </form>
    </div>
  );
}
