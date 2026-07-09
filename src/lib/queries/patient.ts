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

export async function getPatientTreatmentContext(patientId: string) {
  const [patient, appointments] = await Promise.all([
    prisma.patient.findUnique({ where: { id: patientId } }),
    prisma.appointment.findMany({
      where: { patientId },
      include: { doctor: true, hospital: true },
      orderBy: { scheduledAt: "desc" },
    }),
  ]);

  const seenDoctors = new Set<string>();
  const doctors = appointments.filter((a) => (seenDoctors.has(a.doctorId) ? false : (seenDoctors.add(a.doctorId), true))).map((a) => a.doctor);
  const seenHospitals = new Set<string>();
  const hospitals = appointments.filter((a) => (seenHospitals.has(a.hospitalId) ? false : (seenHospitals.add(a.hospitalId), true))).map((a) => a.hospital);

  return { treatmentPlan: patient?.treatmentPlan ?? null, doctors, hospitals };
}

export async function getPatientNotifications(patientId: string) {
  const now = new Date();
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const [upcomingAppointments, recentReports] = await Promise.all([
    prisma.appointment.findMany({
      where: { patientId, scheduledAt: { gte: now, lte: in7Days } },
      include: { doctor: true },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.medicalReport.findMany({
      where: { patientId },
      orderBy: { uploadedAt: "desc" },
      take: 5,
    }),
  ]);

  const notifications = [
    ...upcomingAppointments.map((a) => ({
      id: `apt-${a.id}`,
      title: `Upcoming appointment with ${a.doctor.name}`,
      detail: a.scheduledAt.toLocaleString(),
      at: a.scheduledAt,
    })),
    ...recentReports
      .filter((r) => r.status === "REVIEWED")
      .map((r) => ({
        id: `report-${r.id}`,
        title: `Report reviewed: ${r.fileName}`,
        detail: "Your doctor has reviewed this report.",
        at: r.uploadedAt,
      })),
  ].sort((a, b) => b.at.getTime() - a.at.getTime());

  return notifications;
}
