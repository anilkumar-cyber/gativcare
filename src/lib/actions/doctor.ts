"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { z } from "zod";

const doctorProfileSchema = z.object({
  fee: z.string().min(1),
  experience: z.coerce.number().int().nonnegative(),
  languages: z.string().optional(),
});

export async function updateDoctorProfileAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const user = await requireRole(Role.DOCTOR);
  if (!user.doctor) return { error: "No doctor profile linked to this account." };

  const parsed = doctorProfileSchema.safeParse({
    fee: formData.get("fee"),
    experience: formData.get("experience"),
    languages: formData.get("languages") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  await prisma.doctor.update({
    where: { id: user.doctor.id },
    data: {
      fee: parsed.data.fee,
      experience: parsed.data.experience,
      languages: parsed.data.languages ? parsed.data.languages.split(",").map((s) => s.trim()).filter(Boolean) : [],
    },
  });
  revalidatePath("/dashboard/doctor");
  return { success: true };
}

export async function updateTreatmentPlanAction(formData: FormData) {
  const user = await requireRole(Role.DOCTOR);
  if (!user.doctor) return;

  const patientId = formData.get("patientId");
  const treatmentPlan = formData.get("treatmentPlan");
  if (typeof patientId !== "string" || typeof treatmentPlan !== "string") return;

  const treatsPatient = await prisma.appointment.findFirst({ where: { doctorId: user.doctor.id, patientId } });
  if (!treatsPatient) return;

  await prisma.patient.update({ where: { id: patientId }, data: { treatmentPlan } });
  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/patient");
}
