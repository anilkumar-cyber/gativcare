"use server";

import { revalidatePath } from "next/cache";
import { requireRole, requireAnyRole, requireSession, hashPassword, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role, AppointmentStatus } from "@prisma/client";
import { z } from "zod";

const ADMIN_PATH = "/dashboard/admin";

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function listStr(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

// ---------- Hospitals ----------

const hospitalSchema = z.object({
  name: z.string().min(2),
  city: z.string().min(2),
  beds: z.coerce.number().int().nonnegative().optional(),
  establishedYear: z.coerce.number().int().optional(),
});

export async function saveHospitalAction(_prevState: { error?: string } | undefined, formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  const parsed = hospitalSchema.safeParse({
    name: str(formData, "name"),
    city: str(formData, "city"),
    beds: str(formData, "beds") || undefined,
    establishedYear: str(formData, "establishedYear") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const data = {
    name: parsed.data.name,
    city: parsed.data.city,
    beds: parsed.data.beds ?? null,
    establishedYear: parsed.data.establishedYear ?? null,
    accreditations: listStr(formData, "accreditations"),
    specialties: listStr(formData, "specialties"),
  };

  if (id) {
    await prisma.hospital.update({ where: { id }, data });
  } else {
    await prisma.hospital.create({ data });
  }
  revalidatePath(ADMIN_PATH);
  return { error: undefined };
}

export async function deleteHospitalAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  if (!id) return;
  await prisma.hospital.delete({ where: { id } }).catch(() => null);
  revalidatePath(ADMIN_PATH);
}

// ---------- Doctors ----------

const doctorSchema = z.object({
  name: z.string().min(2),
  hospitalId: z.string().min(1),
  specialization: z.string().min(2),
  experience: z.coerce.number().int().nonnegative(),
  fee: z.string().min(1),
});

export async function saveDoctorAction(_prevState: { error?: string } | undefined, formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  const parsed = doctorSchema.safeParse({
    name: str(formData, "name"),
    hospitalId: str(formData, "hospitalId"),
    specialization: str(formData, "specialization"),
    experience: str(formData, "experience"),
    fee: str(formData, "fee"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const data = {
    name: parsed.data.name,
    hospitalId: parsed.data.hospitalId,
    specialization: parsed.data.specialization,
    experience: parsed.data.experience,
    fee: parsed.data.fee,
    languages: listStr(formData, "languages"),
  };

  if (id) {
    await prisma.doctor.update({ where: { id }, data });
  } else {
    await prisma.doctor.create({ data });
  }
  revalidatePath(ADMIN_PATH);
  return { error: undefined };
}

export async function deleteDoctorAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  if (!id) return;
  await prisma.doctor.delete({ where: { id } }).catch(() => null);
  revalidatePath(ADMIN_PATH);
}

// ---------- Coordinators ----------

const coordinatorSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  phone: z.string().optional(),
});

export async function createCoordinatorAction(_prevState: { error?: string } | undefined, formData: FormData) {
  await requireRole(Role.ADMIN);
  const parsed = coordinatorSchema.safeParse({
    name: str(formData, "name"),
    email: str(formData, "email"),
    password: str(formData, "password"),
    phone: str(formData, "phone") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { error: "An account with this email already exists." };

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.user.create({
    data: { name: parsed.data.name, email: parsed.data.email, passwordHash, role: Role.COORDINATOR, phone: parsed.data.phone },
  });
  revalidatePath(ADMIN_PATH);
  return { error: undefined };
}

export async function deleteCoordinatorAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  if (!id) return;
  await prisma.user.delete({ where: { id, role: Role.COORDINATOR } }).catch(() => null);
  revalidatePath(ADMIN_PATH);
}

// ---------- Appointments ----------

export async function updateAppointmentStatusAction(formData: FormData) {
  await requireAnyRole([Role.ADMIN, Role.COORDINATOR]);
  const id = str(formData, "id");
  const status = str(formData, "status");
  if (!id || !Object.values(AppointmentStatus).includes(status as AppointmentStatus)) return;
  await prisma.appointment.update({ where: { id }, data: { status: status as AppointmentStatus } });
  revalidatePath(ADMIN_PATH);
}

// ---------- FAQ ----------

const faqSchema = z.object({ question: z.string().min(5), answer: z.string().min(5) });

export async function saveFaqAction(_prevState: { error?: string } | undefined, formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  const parsed = faqSchema.safeParse({ question: str(formData, "question"), answer: str(formData, "answer") });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  if (id) {
    await prisma.fAQ.update({ where: { id }, data: parsed.data });
  } else {
    const count = await prisma.fAQ.count();
    await prisma.fAQ.create({ data: { ...parsed.data, order: count } });
  }
  revalidatePath(ADMIN_PATH);
  revalidatePath("/faq");
  return { error: undefined };
}

export async function deleteFaqAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  if (!id) return;
  await prisma.fAQ.delete({ where: { id } }).catch(() => null);
  revalidatePath(ADMIN_PATH);
  revalidatePath("/faq");
}

// ---------- Testimonials ----------

const testimonialSchema = z.object({
  name: z.string().min(2),
  country: z.string().min(2),
  treatment: z.string().min(2),
  hospital: z.string().min(2),
  doctorName: z.string().optional(),
  rating: z.coerce.number().int().min(1).max(5),
  text: z.string().min(10),
  savings: z.string().optional(),
});

export async function saveTestimonialAction(_prevState: { error?: string } | undefined, formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  const parsed = testimonialSchema.safeParse({
    name: str(formData, "name"),
    country: str(formData, "country"),
    treatment: str(formData, "treatment"),
    hospital: str(formData, "hospital"),
    doctorName: str(formData, "doctorName") || undefined,
    rating: str(formData, "rating") || "5",
    text: str(formData, "text"),
    savings: str(formData, "savings") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data: parsed.data });
  } else {
    await prisma.testimonial.create({ data: parsed.data });
  }
  revalidatePath(ADMIN_PATH);
  revalidatePath("/");
  return { error: undefined };
}

export async function deleteTestimonialAction(formData: FormData) {
  await requireRole(Role.ADMIN);
  const id = str(formData, "id");
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } }).catch(() => null);
  revalidatePath(ADMIN_PATH);
  revalidatePath("/");
}

// ---------- Profile settings (shared across roles) ----------

const profileSchema = z.object({ name: z.string().min(2), phone: z.string().optional() });

export async function updateProfileAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const user = await requireSession();
  const parsed = profileSchema.safeParse({ name: str(formData, "name"), phone: str(formData, "phone") || undefined });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  await prisma.user.update({ where: { id: user.id }, data: parsed.data });
  revalidatePath("/dashboard");
  return { success: true };
}

const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "New password must be at least 8 characters."),
});

export async function changePasswordAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const user = await requireSession();
  const parsed = passwordSchema.safeParse({
    currentPassword: str(formData, "currentPassword"),
    newPassword: str(formData, "newPassword"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid input." };

  const fullUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!fullUser || !(await verifyPassword(parsed.data.currentPassword, fullUser.passwordHash))) {
    return { error: "Current password is incorrect." };
  }

  const passwordHash = await hashPassword(parsed.data.newPassword);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
  return { success: true };
}
