import "server-only";
import { prisma } from "@/lib/db";
import { LeadStatus } from "@prisma/client";

export async function getAdminOverviewStats() {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const [hospitals, doctors, patients, appointments, activeLeads, appointmentsToday, pendingReports, leadCountries] =
    await Promise.all([
      prisma.hospital.count(),
      prisma.doctor.count(),
      prisma.patient.count(),
      prisma.appointment.count(),
      prisma.lead.count({ where: { status: { notIn: [LeadStatus.CONVERTED, LeadStatus.CLOSED] } } }),
      prisma.appointment.count({ where: { scheduledAt: { gte: startOfToday, lte: endOfToday } } }),
      prisma.medicalReport.count({ where: { status: "PENDING_REVIEW" } }),
      prisma.lead.findMany({ where: { country: { not: null } }, select: { country: true }, distinct: ["country"] }),
    ]);

  return {
    hospitals,
    doctors,
    patients,
    appointments,
    activeLeads,
    appointmentsToday,
    pendingReports,
    countriesActive: leadCountries.length,
  };
}

export async function getRecentLeads(limit = 5) {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: limit });
}

export async function getLeadStatusBreakdown() {
  const grouped = await prisma.lead.groupBy({ by: ["status"], _count: { status: true } });
  return grouped.map((g) => ({ status: g.status, count: g._count.status }));
}

export async function getAllLeads(limit = 50) {
  return prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: limit });
}
