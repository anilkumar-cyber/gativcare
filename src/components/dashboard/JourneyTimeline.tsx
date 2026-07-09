"use client";

import { useState, useTransition } from "react";
import { MapPin, Plane, FileCheck, ClipboardList, Stethoscope, HeartPulse, CalendarCheck, CheckCircle2 } from "lucide-react";
import { addJourneyMilestoneAction, updateVisaStatusAction } from "@/lib/actions/journey";
import { JourneyStage, VisaStatus } from "@prisma/client";

const STAGE_META: Record<JourneyStage, { label: string; icon: typeof MapPin }> = {
  INQUIRY: { label: "Inquiry", icon: MapPin },
  DOCUMENTATION: { label: "Documentation", icon: FileCheck },
  VISA: { label: "Visa", icon: ClipboardList },
  TRAVEL: { label: "Travel", icon: Plane },
  TREATMENT: { label: "Treatment", icon: Stethoscope },
  RECOVERY: { label: "Recovery", icon: HeartPulse },
  FOLLOW_UP: { label: "Follow-up", icon: CalendarCheck },
  COMPLETED: { label: "Completed", icon: CheckCircle2 },
};

const VISA_LABELS: Record<VisaStatus, string> = {
  NOT_STARTED: "Not started",
  DOCUMENTS_REQUESTED: "Documents requested",
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

type Milestone = { id: string; stage: JourneyStage; note: string | null; createdAt: Date; createdBy: { name: string } };

export function JourneyTimeline({
  patientId,
  journeyStage,
  visaStatus,
  visaNotes,
  milestones,
  editable = false,
}: {
  patientId: string;
  journeyStage?: JourneyStage;
  visaStatus?: VisaStatus;
  visaNotes?: string | null;
  milestones: Milestone[];
  editable?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Treatment Journey</h3>
        {editable && (
          <button onClick={() => setOpen(!open)} className="text-sm text-primary font-medium">
            {open ? "Cancel" : "Update"}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {Object.entries(STAGE_META).map(([stage, meta]) => {
          const isActive = journeyStage === stage;
          const Icon = meta.icon;
          return (
            <span
              key={stage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                isActive ? "bg-primary text-white" : "bg-surface text-muted"
              }`}
            >
              <Icon size={12} /> {meta.label}
            </span>
          );
        })}
      </div>

      {visaStatus && (
        <div className="mb-5 p-3 rounded-xl bg-surface border border-border">
          <p className="text-xs text-muted mb-1">Visa Status</p>
          <p className="text-sm font-semibold">{VISA_LABELS[visaStatus]}</p>
          {visaNotes && <p className="text-xs text-muted mt-1">{visaNotes}</p>}
        </div>
      )}

      {editable && open && (
        <div className="grid sm:grid-cols-2 gap-4 mb-5 p-4 rounded-xl bg-surface border border-border">
          <form
            action={(formData) => startTransition(() => addJourneyMilestoneAction(formData))}
            className="space-y-2"
          >
            <input type="hidden" name="patientId" value={patientId} />
            <p className="text-xs font-semibold text-muted uppercase">Add Milestone</p>
            <select name="stage" required className="w-full bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border">
              {Object.entries(STAGE_META).map(([stage, meta]) => (
                <option key={stage} value={stage}>{meta.label}</option>
              ))}
            </select>
            <input name="note" placeholder="Note (optional)" className="w-full bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
            <button type="submit" disabled={pending} className="btn-primary text-xs px-3 py-2 disabled:opacity-60">Add</button>
          </form>

          <form
            action={(formData) => startTransition(() => updateVisaStatusAction(formData))}
            className="space-y-2"
          >
            <input type="hidden" name="patientId" value={patientId} />
            <p className="text-xs font-semibold text-muted uppercase">Update Visa Status</p>
            <select name="visaStatus" defaultValue={visaStatus} required className="w-full bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border">
              {Object.entries(VISA_LABELS).map(([status, label]) => (
                <option key={status} value={status}>{label}</option>
              ))}
            </select>
            <input name="visaNotes" placeholder="Note (optional)" defaultValue={visaNotes ?? ""} className="w-full bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
            <button type="submit" disabled={pending} className="btn-primary text-xs px-3 py-2 disabled:opacity-60">Save</button>
          </form>
        </div>
      )}

      <div className="space-y-3">
        {milestones.map((m) => {
          const meta = STAGE_META[m.stage];
          const Icon = meta.icon;
          return (
            <div key={m.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
              <Icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold">{meta.label}</p>
                {m.note && <p className="text-xs text-muted">{m.note}</p>}
                <p className="text-[11px] text-muted mt-1" suppressHydrationWarning>{m.createdAt.toLocaleString()} • {m.createdBy.name}</p>
              </div>
            </div>
          );
        })}
        {milestones.length === 0 && <p className="text-sm text-muted text-center py-6">No journey updates yet.</p>}
      </div>
    </div>
  );
}
