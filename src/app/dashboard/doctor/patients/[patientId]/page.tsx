import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import { getDoctorPatientIfOwned } from "@/lib/queries/doctor";
import { getPatientJourney, getPatientMessages, getRecoveryTasks } from "@/lib/queries/journey";
import { JourneyTimeline } from "@/components/dashboard/JourneyTimeline";
import { MessageThread } from "@/components/dashboard/MessageThread";
import { RecoveryChecklist } from "@/components/dashboard/RecoveryChecklist";
import { TreatmentPlanForm } from "@/components/dashboard/TreatmentPlanForm";
import { notFound } from "next/navigation";

export default async function DoctorPatientDetail({ params }: { params: Promise<{ patientId: string }> }) {
  const { patientId } = await params;
  const user = await requireRole(Role.DOCTOR);
  if (!user.doctor) notFound();

  const patient = await getDoctorPatientIfOwned(user.doctor.id, patientId);
  if (!patient) notFound();

  const [journey, messages, tasks] = await Promise.all([
    getPatientJourney(patientId),
    getPatientMessages(patientId),
    getRecoveryTasks(patientId),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/doctor?tab=patients" className="text-sm text-primary font-medium flex items-center gap-1.5 mb-3">
          <ArrowLeft size={14} /> Back to patients
        </Link>
        <h2 className="text-xl font-bold">{patient.user.name}</h2>
        <p className="text-sm text-muted">{patient.country ?? "—"} • Patient ID: {patient.gcNumber}</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-3">Treatment Plan</h3>
        {patient.treatmentPlan && <p className="text-sm text-muted mb-2 italic">{patient.treatmentPlan}</p>}
        <TreatmentPlanForm patientId={patient.id} initialPlan={patient.treatmentPlan} />
      </div>

      <JourneyTimeline
        patientId={patientId}
        journeyStage={journey.journeyStage}
        visaStatus={journey.visaStatus}
        visaNotes={journey.visaNotes}
        milestones={journey.milestones}
        editable
      />

      <RecoveryChecklist patientId={patientId} tasks={tasks} canAdd />

      <MessageThread patientId={patientId} currentUserId={user.id} messages={messages} />
    </div>
  );
}
