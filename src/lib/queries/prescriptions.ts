import "server-only";
import { prisma } from "@/lib/db";

export async function getPatientPrescriptions(patientId: string) {
  return prisma.prescription.findMany({
    where: { patientId },
    include: { doctor: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getDoctorPrescriptions(doctorId: string) {
  return prisma.prescription.findMany({
    where: { doctorId },
    include: { patient: { include: { user: true } } },
    orderBy: { createdAt: "desc" },
  });
}
