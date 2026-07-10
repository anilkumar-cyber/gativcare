"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role, PrescriptionStatus } from "@prisma/client";
import { z } from "zod";

const prescriptionSchema = z.object({
  patientId: z.string().min(1),
  medication: z.string().min(1),
  dosage: z.string().min(1),
  frequency: z.string().min(1),
  duration: z.string().optional(),
  instructions: z.string().optional(),
});

export async function addPrescriptionAction(formData: FormData) {
  const user = await requireRole(Role.DOCTOR);
  if (!user.doctor) return;

  const parsed = prescriptionSchema.safeParse({
    patientId: formData.get("patientId"),
    medication: formData.get("medication"),
    dosage: formData.get("dosage"),
    frequency: formData.get("frequency"),
    duration: formData.get("duration") || undefined,
    instructions: formData.get("instructions") || undefined,
  });
  if (!parsed.success) return;

  const treats = await prisma.appointment.findFirst({
    where: { doctorId: user.doctor.id, patientId: parsed.data.patientId },
  });
  if (!treats) return;

  await prisma.prescription.create({
    data: { ...parsed.data, doctorId: user.doctor.id },
  });

  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/patient");
}

export async function updatePrescriptionStatusAction(formData: FormData) {
  const user = await requireRole(Role.DOCTOR);
  if (!user.doctor) return;

  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") return;
  if (!Object.values(PrescriptionStatus).includes(status as PrescriptionStatus)) return;

  const prescription = await prisma.prescription.findUnique({ where: { id } });
  if (!prescription || prescription.doctorId !== user.doctor.id) return;

  await prisma.prescription.update({ where: { id }, data: { status: status as PrescriptionStatus } });

  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/patient");
}
