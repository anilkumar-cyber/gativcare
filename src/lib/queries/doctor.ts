import "server-only";
import { prisma } from "@/lib/db";

export async function getDoctorOverview(doctorId: string) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [todayAppointments, allAppointments, doctor] = await Promise.all([
    prisma.appointment.findMany({
      where: { doctorId, scheduledAt: { gte: startOfToday, lte: endOfToday } },
      include: { patient: { include: { user: true } } },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.appointment.findMany({
      where: { doctorId },
      include: { patient: { include: { user: true } } },
      orderBy: { scheduledAt: "desc" },
      take: 10,
    }),
    prisma.doctor.findUnique({ where: { id: doctorId } }),
  ]);

  const patientIds = new Set(allAppointments.map((a) => a.patientId));

  return {
    doctor,
    todayAppointments,
    activePatientCount: patientIds.size,
    recentAppointments: allAppointments,
  };
}

export async function getDoctorPatients(doctorId: string) {
  const appointments = await prisma.appointment.findMany({
    where: { doctorId },
    include: { patient: { include: { user: true } } },
    orderBy: { scheduledAt: "desc" },
  });

  const seen = new Set<string>();
  const patients = [];
  for (const apt of appointments) {
    if (seen.has(apt.patientId)) continue;
    seen.add(apt.patientId);
    patients.push({ patient: apt.patient, lastAppointment: apt });
  }
  return patients;
}
