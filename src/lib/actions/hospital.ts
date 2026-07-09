"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";
import { z } from "zod";

async function requireOwnedHospitalId(): Promise<string> {
  const user = await requireRole(Role.HOSPITAL);
  if (!user.hospitalOwned) throw new Error("No hospital linked to this account.");
  return user.hospitalOwned.id;
}

const specialtiesSchema = z.object({ specialties: z.string() });

export async function updateHospitalSpecialtiesAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const hospitalId = await requireOwnedHospitalId();
  const parsed = specialtiesSchema.safeParse({ specialties: formData.get("specialties") });
  if (!parsed.success) return { error: "Invalid input." };

  const specialties = parsed.data.specialties.split(",").map((s) => s.trim()).filter(Boolean);
  await prisma.hospital.update({ where: { id: hospitalId }, data: { specialties } });
  revalidatePath("/dashboard/hospital");
  return { success: true };
}

const bedsSchema = z.object({ beds: z.coerce.number().int().nonnegative() });

export async function updateHospitalBedsAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const hospitalId = await requireOwnedHospitalId();
  const parsed = bedsSchema.safeParse({ beds: formData.get("beds") });
  if (!parsed.success) return { error: "Enter a valid number of beds." };

  await prisma.hospital.update({ where: { id: hospitalId }, data: { beds: parsed.data.beds } });
  revalidatePath("/dashboard/hospital");
  return { success: true };
}

const detailsSchema = z.object({
  name: z.string().min(2),
  city: z.string().min(2),
  establishedYear: z.coerce.number().int().optional(),
});

export async function updateHospitalDetailsAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const hospitalId = await requireOwnedHospitalId();
  const parsed = detailsSchema.safeParse({
    name: formData.get("name"),
    city: formData.get("city"),
    establishedYear: formData.get("establishedYear") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  await prisma.hospital.update({
    where: { id: hospitalId },
    data: { name: parsed.data.name, city: parsed.data.city, establishedYear: parsed.data.establishedYear ?? null },
  });
  revalidatePath("/dashboard/hospital");
  return { success: true };
}
