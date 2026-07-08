"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";
import { Role } from "@prisma/client";

const dashboardPathByRole: Record<Role, string> = {
  ADMIN: "/dashboard/admin",
  DOCTOR: "/dashboard/doctor",
  HOSPITAL: "/dashboard/hospital",
  PATIENT: "/dashboard/patient",
};

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) return { error: "Enter a valid email and password." };

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { error: "Incorrect email or password." };
  }

  await createSession(user.id);
  redirect(dashboardPathByRole[user.role]);
}

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  country: z.string().optional(),
});

export async function registerAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    country: formData.get("country") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: "An account with this email already exists." };

  const passwordHash = await hashPassword(parsed.data.password);
  const patientCount = await prisma.patient.count();
  const gcNumber = `GC-${new Date().getFullYear()}-${String(patientCount + 1).padStart(3, "0")}`;

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: Role.PATIENT,
      patient: { create: { gcNumber, country: parsed.data.country } },
    },
  });

  await createSession(user.id);
  redirect(dashboardPathByRole[Role.PATIENT]);
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
