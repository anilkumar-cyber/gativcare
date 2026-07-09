import "server-only";
import { prisma } from "@/lib/db";

export async function getPatientJourney(patientId: string) {
  const [patient, milestones] = await Promise.all([
    prisma.patient.findUnique({ where: { id: patientId } }),
    prisma.journeyMilestone.findMany({
      where: { patientId },
      include: { createdBy: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);
  return { journeyStage: patient?.journeyStage, visaStatus: patient?.visaStatus, visaNotes: patient?.visaNotes, milestones };
}

export async function getPatientMessages(patientId: string) {
  return prisma.patientMessage.findMany({
    where: { patientId },
    include: { author: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getRecoveryTasks(patientId: string) {
  return prisma.recoveryMilestone.findMany({
    where: { patientId },
    orderBy: [{ completedAt: "asc" }, { dueDate: "asc" }],
  });
}

export async function getPatientFollowUps(patientId: string) {
  return prisma.followUp.findMany({ where: { patientId }, orderBy: { scheduledFor: "asc" } });
}

export async function getDueFollowUps() {
  return prisma.followUp.findMany({
    where: { status: "PENDING", scheduledFor: { lte: new Date() } },
    include: { patient: { include: { user: true } } },
    orderBy: { scheduledFor: "asc" },
  });
}
