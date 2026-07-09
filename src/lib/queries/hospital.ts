import "server-only";
import { prisma } from "@/lib/db";

export async function getHospitalOverview(hospitalId: string) {
  const [doctorCount, appointmentCount, patientCount, doctors] = await Promise.all([
    prisma.doctor.count({ where: { hospitalId } }),
    prisma.appointment.count({ where: { hospitalId } }),
    prisma.appointment.findMany({ where: { hospitalId }, select: { patientId: true }, distinct: ["patientId"] }),
    prisma.doctor.findMany({ where: { hospitalId }, orderBy: { rating: "desc" } }),
  ]);

  return {
    doctorCount,
    appointmentCount,
    patientCount: patientCount.length,
    doctors,
  };
}

export async function getHospitalAppointments(hospitalId: string) {
  return prisma.appointment.findMany({
    where: { hospitalId },
    include: { patient: { include: { user: true } }, doctor: true },
    orderBy: { scheduledAt: "desc" },
    take: 20,
  });
}

export async function getHospitalPatients(hospitalId: string) {
  const appointments = await prisma.appointment.findMany({
    where: { hospitalId },
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

export async function getHospitalTodayApptCount(hospitalId: string) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  return prisma.appointment.count({ where: { hospitalId, scheduledAt: { gte: startOfToday, lte: endOfToday } } });
}

export async function getAllPackages() {
  return prisma.package.findMany({ orderBy: { name: "asc" } });
}
