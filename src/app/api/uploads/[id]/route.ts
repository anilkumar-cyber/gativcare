import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { readUploadedFile } from "@/lib/uploads";
import { prisma } from "@/lib/db";
import { Role } from "@prisma/client";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getSession();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const report = await prisma.medicalReport.findUnique({ where: { id } });
  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const isOwner = user.role === Role.PATIENT && report.patientId === user.patient?.id;
  const isAdmin = user.role === Role.ADMIN;
  if (!isOwner && !isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const buffer = await readUploadedFile(report.storedPath);
  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": report.mimeType,
      "Content-Disposition": `inline; filename="${encodeURIComponent(report.fileName)}"`,
    },
  });
}
