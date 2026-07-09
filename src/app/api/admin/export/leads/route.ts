import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { toCsv } from "@/lib/csv";
import { Role } from "@prisma/client";

export async function GET() {
  await requireRole(Role.ADMIN);

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const csv = toCsv(
    leads.map((l) => ({ ...l, createdAt: l.createdAt.toISOString() })),
    ["id", "name", "email", "phone", "country", "treatment", "status", "source", "createdAt"],
  );

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
