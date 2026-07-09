"use server";

import { revalidatePath } from "next/cache";
import { requireAnyRole, requireSession } from "@/lib/auth";
import { sendFollowUpReminder } from "@/lib/email";
import { prisma } from "@/lib/db";
import { Role, JourneyStage, VisaStatus, FollowUpType } from "@prisma/client";
import { z } from "zod";

const STAFF_ROLES: Role[] = [Role.ADMIN, Role.COORDINATOR, Role.DOCTOR, Role.HOSPITAL];

async function doctorTreatsPatient(userId: string, patientId: string): Promise<boolean> {
  const doctor = await prisma.doctor.findUnique({ where: { userId } });
  if (!doctor) return false;
  const appt = await prisma.appointment.findFirst({ where: { doctorId: doctor.id, patientId } });
  return !!appt;
}

// ---------- Visa status ----------

const visaSchema = z.object({
  patientId: z.string().min(1),
  visaStatus: z.nativeEnum(VisaStatus),
  visaNotes: z.string().optional(),
});

export async function updateVisaStatusAction(formData: FormData) {
  const user = await requireAnyRole(STAFF_ROLES);
  const parsed = visaSchema.safeParse({
    patientId: formData.get("patientId"),
    visaStatus: formData.get("visaStatus"),
    visaNotes: formData.get("visaNotes") || undefined,
  });
  if (!parsed.success) return;

  if (user.role === Role.DOCTOR && !(await doctorTreatsPatient(user.id, parsed.data.patientId))) return;

  await prisma.patient.update({
    where: { id: parsed.data.patientId },
    data: { visaStatus: parsed.data.visaStatus, visaNotes: parsed.data.visaNotes },
  });
  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/patient");
}

// ---------- Journey timeline ----------

const milestoneSchema = z.object({
  patientId: z.string().min(1),
  stage: z.nativeEnum(JourneyStage),
  note: z.string().optional(),
});

export async function addJourneyMilestoneAction(formData: FormData) {
  const user = await requireAnyRole(STAFF_ROLES);
  const parsed = milestoneSchema.safeParse({
    patientId: formData.get("patientId"),
    stage: formData.get("stage"),
    note: formData.get("note") || undefined,
  });
  if (!parsed.success) return;

  if (user.role === Role.DOCTOR && !(await doctorTreatsPatient(user.id, parsed.data.patientId))) return;

  await prisma.$transaction([
    prisma.journeyMilestone.create({
      data: { patientId: parsed.data.patientId, stage: parsed.data.stage, note: parsed.data.note, createdById: user.id },
    }),
    prisma.patient.update({ where: { id: parsed.data.patientId }, data: { journeyStage: parsed.data.stage } }),
  ]);

  if (parsed.data.stage === JourneyStage.RECOVERY) {
    await createFollowUpsIfMissing(parsed.data.patientId);
  }

  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/patient");
}

async function createFollowUpsIfMissing(patientId: string) {
  const existing = await prisma.followUp.count({ where: { patientId } });
  if (existing > 0) return;

  const day = 24 * 60 * 60 * 1000;
  const schedule: { type: FollowUpType; days: number }[] = [
    { type: FollowUpType.DAY_30, days: 30 },
    { type: FollowUpType.DAY_90, days: 90 },
    { type: FollowUpType.DAY_180, days: 180 },
    { type: FollowUpType.DAY_365, days: 365 },
  ];
  await prisma.followUp.createMany({
    data: schedule.map((s) => ({ patientId, type: s.type, scheduledFor: new Date(Date.now() + s.days * day) })),
  });
}

// ---------- Messaging ----------

const messageSchema = z.object({ patientId: z.string().min(1), body: z.string().min(1).max(4000) });

export async function sendPatientMessageAction(formData: FormData) {
  const user = await requireSession();
  const parsed = messageSchema.safeParse({ patientId: formData.get("patientId"), body: formData.get("body") });
  if (!parsed.success) return;

  const isPatientSender = user.role === Role.PATIENT && user.patient?.id === parsed.data.patientId;
  const isStaffSender = STAFF_ROLES.includes(user.role) && (user.role !== Role.DOCTOR || (await doctorTreatsPatient(user.id, parsed.data.patientId)));
  if (!isPatientSender && !isStaffSender) return;

  await prisma.patientMessage.create({
    data: {
      patientId: parsed.data.patientId,
      authorId: user.id,
      body: parsed.data.body,
      readByPatient: isPatientSender,
      readByStaff: isStaffSender,
    },
  });

  revalidatePath("/dashboard/patient");
  revalidatePath("/dashboard/doctor");
}

// ---------- Recovery milestones ----------

const recoveryTaskSchema = z.object({
  patientId: z.string().min(1),
  title: z.string().min(2),
  dueDate: z.string().optional(),
  notes: z.string().optional(),
});

export async function addRecoveryTaskAction(formData: FormData) {
  const user = await requireAnyRole(STAFF_ROLES);
  const parsed = recoveryTaskSchema.safeParse({
    patientId: formData.get("patientId"),
    title: formData.get("title"),
    dueDate: formData.get("dueDate") || undefined,
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) return;

  if (user.role === Role.DOCTOR && !(await doctorTreatsPatient(user.id, parsed.data.patientId))) return;

  await prisma.recoveryMilestone.create({
    data: {
      patientId: parsed.data.patientId,
      title: parsed.data.title,
      dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : undefined,
      notes: parsed.data.notes,
      createdById: user.id,
    },
  });
  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/patient");
}

export async function completeRecoveryTaskAction(formData: FormData) {
  const user = await requireSession();
  const id = formData.get("id");
  if (typeof id !== "string") return;

  const task = await prisma.recoveryMilestone.findUnique({ where: { id } });
  if (!task) return;

  const isOwner = user.role === Role.PATIENT && user.patient?.id === task.patientId;
  const isStaff = STAFF_ROLES.includes(user.role);
  if (!isOwner && !isStaff) return;

  await prisma.recoveryMilestone.update({ where: { id }, data: { completedAt: new Date() } });
  revalidatePath("/dashboard/patient");
  revalidatePath("/dashboard/doctor");
}

// ---------- Follow-ups ----------

export async function sendDueFollowUpsAction() {
  await requireAnyRole([Role.ADMIN, Role.COORDINATOR]);

  const due = await prisma.followUp.findMany({
    where: { status: "PENDING", scheduledFor: { lte: new Date() } },
    include: { patient: { include: { user: true } } },
  });

  for (const followUp of due) {
    await sendFollowUpReminder({ name: followUp.patient.user.name, email: followUp.patient.user.email, type: followUp.type });
    await prisma.followUp.update({ where: { id: followUp.id }, data: { status: "SENT", sentAt: new Date() } });
  }

  revalidatePath("/dashboard/admin");
  return { sent: due.length };
}
