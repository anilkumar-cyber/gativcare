import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { toCsv } from "@/lib/csv";
import { Role } from "@prisma/client";

export async function GET() {
  await requireRole(Role.ADMIN);

  const appointments = await prisma.appointment.findMany({
    orderBy: { scheduledAt: "desc" },
    include: { patient: { include: { user: true } }, doctor: true, hospital: true },
  });

  const csv = toCsv(
    appointments.map((a) => ({
      id: a.id,
      patient: a.patient.user.name,
      doctor: a.doctor.name,
      hospital: a.hospital.name,
      scheduledAt: a.scheduledAt.toISOString(),
      type: a.type,
      status: a.status,
    })),
    ["id", "patient", "doctor", "hospital", "scheduledAt", "type", "status"],
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="appointments-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
