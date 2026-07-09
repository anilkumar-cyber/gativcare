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

export async function getDoctorReports(doctorId: string) {
  const patientIds = await prisma.appointment
    .findMany({ where: { doctorId }, select: { patientId: true }, distinct: ["patientId"] })
    .then((rows) => rows.map((r) => r.patientId));

  return prisma.medicalReport.findMany({
    where: { patientId: { in: patientIds } },
    include: { patient: { include: { user: true } } },
    orderBy: { uploadedAt: "desc" },
  });
}

export async function getDoctorAnalytics(doctorId: string) {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [appointmentsSinceStart, statusBreakdown, doctor] = await Promise.all([
    prisma.appointment.findMany({ where: { doctorId, scheduledAt: { gte: sixMonthsAgo } }, select: { scheduledAt: true } }),
    prisma.appointment.groupBy({ by: ["status"], where: { doctorId }, _count: { status: true } }),
    prisma.doctor.findUnique({ where: { id: doctorId } }),
  ]);

  const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const monthLabels: string[] = [];
  const cursor = new Date(sixMonthsAgo);
  for (let i = 0; i < 6; i++) {
    monthLabels.push(monthKey(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  const appointmentsByMonth = monthLabels.map((key) => ({
    month: key,
    count: appointmentsSinceStart.filter((a) => monthKey(a.scheduledAt) === key).length,
  }));

  return {
    appointmentsByMonth,
    statusBreakdown: statusBreakdown.map((s) => ({ status: s.status, count: s._count.status })),
    doctor,
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
