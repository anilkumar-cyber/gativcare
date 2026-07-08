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
