"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { saveUpload, UploadValidationError } from "@/lib/uploads";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

export async function uploadReportAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const user = await requireRole(Role.PATIENT);
  if (!user.patient) return { error: "No patient profile found for this account." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "Choose a file to upload." };

  try {
    const saved = await saveUpload(file);
    await prisma.medicalReport.create({
      data: { ...saved, patientId: user.patient.id },
    });
  } catch (err) {
    if (err instanceof UploadValidationError) return { error: err.message };
    throw err;
  }

  revalidatePath("/dashboard/patient");
  return { error: undefined };
}
