"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

export async function updatePatientCountryAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const user = await requireRole(Role.PATIENT);
  if (!user.patient) return { error: "No patient profile linked to this account." };

  const country = formData.get("country");
  if (typeof country !== "string" || country.trim().length < 2) return { error: "Enter a valid country." };

  await prisma.patient.update({ where: { id: user.patient.id }, data: { country: country.trim() } });
  revalidatePath("/dashboard/patient");
  return { success: true };
}
