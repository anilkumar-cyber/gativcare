"use server";

import { revalidatePath } from "next/cache";
import { requireRole, requireAnyRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role, AppointmentStatus, AppointmentType } from "@prisma/client";
import { z } from "zod";

const requestSchema = z.object({
  doctorId: z.string().min(1),
  scheduledAt: z.string().min(1),
  type: z.enum(["IN_PERSON", "VIDEO"]),
  notes: z.string().optional(),
});

export async function requestAppointmentAction(_prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
  const user = await requireRole(Role.PATIENT);
  if (!user.patient) return { error: "No patient profile linked to this account." };

  const parsed = requestSchema.safeParse({
    doctorId: formData.get("doctorId"),
    scheduledAt: formData.get("scheduledAt"),
    type: formData.get("type"),
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) return { error: "Choose a doctor and a valid date/time." };

  const doctor = await prisma.doctor.findUnique({ where: { id: parsed.data.doctorId } });
  if (!doctor) return { error: "Selected doctor not found." };

  const scheduledAt = new Date(parsed.data.scheduledAt);
  if (Number.isNaN(scheduledAt.getTime()) || scheduledAt < new Date()) {
    return { error: "Choose a future date and time." };
  }

  await prisma.appointment.create({
    data: {
      patientId: user.patient.id,
      doctorId: doctor.id,
      hospitalId: doctor.hospitalId,
      scheduledAt,
      type: parsed.data.type as AppointmentType,
      status: AppointmentStatus.PENDING,
      notes: parsed.data.notes,
    },
  });

  revalidatePath("/dashboard/patient");
  return { success: true };
}

async function canManageAppointment(userId: string, role: Role, appointmentId: string): Promise<boolean> {
  if (role === Role.ADMIN || role === Role.COORDINATOR) return true;

  const appointment = await prisma.appointment.findUnique({ where: { id: appointmentId } });
  if (!appointment) return false;

  if (role === Role.DOCTOR) {
    const doctor = await prisma.doctor.findUnique({ where: { userId } });
    return doctor?.id === appointment.doctorId;
  }
  if (role === Role.HOSPITAL) {
    const hospital = await prisma.hospital.findUnique({ where: { ownerUserId: userId } });
    return hospital?.id === appointment.hospitalId;
  }
  return false;
}

export async function confirmAppointmentAction(formData: FormData) {
  const user = await requireAnyRole([Role.ADMIN, Role.COORDINATOR, Role.DOCTOR, Role.HOSPITAL]);

  const id = formData.get("id");
  const status = formData.get("status");
  if (typeof id !== "string" || typeof status !== "string") return;
  if (!Object.values(AppointmentStatus).includes(status as AppointmentStatus)) return;

  if (!(await canManageAppointment(user.id, user.role, id))) return;

  await prisma.appointment.update({ where: { id }, data: { status: status as AppointmentStatus } });
  revalidatePath("/dashboard/doctor");
  revalidatePath("/dashboard/hospital");
  revalidatePath("/dashboard/admin");
}
