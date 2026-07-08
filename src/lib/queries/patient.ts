import "server-only";
import { prisma } from "@/lib/db";

export async function getPatientOverview(patientId: string) {
  const [appointments, reports] = await Promise.all([
    prisma.appointment.findMany({
      where: { patientId },
      include: { doctor: true, hospital: true },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.medicalReport.findMany({
      where: { patientId },
      orderBy: { uploadedAt: "desc" },
    }),
  ]);

  const now = new Date();
  const upcoming = appointments.filter((a) => a.scheduledAt >= now);
  const past = appointments.filter((a) => a.scheduledAt < now);

  return { upcoming, past, reports };
}
