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

export async function getAllHospitals() {
  return prisma.hospital.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { doctors: true } } } });
}

export async function getAllDoctors() {
  return prisma.doctor.findMany({ orderBy: { name: "asc" }, include: { hospital: true } });
}

export async function getAllPatients() {
  return prisma.patient.findMany({
    orderBy: { user: { createdAt: "desc" } },
    include: { user: true, _count: { select: { appointments: true } } },
  });
}

export async function getAllCoordinators() {
  return prisma.user.findMany({ where: { role: "COORDINATOR" }, orderBy: { createdAt: "desc" } });
}

export async function getAllAppointmentsAdmin(limit = 100) {
  return prisma.appointment.findMany({
    orderBy: { scheduledAt: "desc" },
    take: limit,
    include: { patient: { include: { user: true } }, doctor: true, hospital: true },
  });
}

export async function getAdminAnalytics() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const [leadsSinceStart, leadsBySource, appointmentsByStatus, treatmentCounts] = await Promise.all([
    prisma.lead.findMany({ where: { createdAt: { gte: sixMonthsAgo } }, select: { createdAt: true } }),
    prisma.lead.groupBy({ by: ["source"], _count: { source: true } }),
    prisma.appointment.groupBy({ by: ["status"], _count: { status: true } }),
    prisma.lead.groupBy({ by: ["treatment"], _count: { treatment: true }, where: { treatment: { not: null } } }),
  ]);

  const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const monthLabels: string[] = [];
  const cursor = new Date(sixMonthsAgo);
  for (let i = 0; i < 6; i++) {
    monthLabels.push(monthKey(cursor));
    cursor.setMonth(cursor.getMonth() + 1);
  }
  const leadsByMonth = monthLabels.map((key) => ({
    month: key,
    count: leadsSinceStart.filter((l) => monthKey(l.createdAt) === key).length,
  }));

  return {
    leadsByMonth,
    leadsBySource: leadsBySource.map((s) => ({ source: s.source, count: s._count.source })),
    appointmentsByStatus: appointmentsByStatus.map((s) => ({ status: s.status, count: s._count.status })),
    topTreatments: treatmentCounts
      .map((t) => ({ treatment: t.treatment as string, count: t._count.treatment }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8),
  };
}

export async function getCountryBreakdown() {
  const [leads, patients] = await Promise.all([
    prisma.lead.groupBy({ by: ["country"], _count: { country: true }, where: { country: { not: null } } }),
    prisma.patient.groupBy({ by: ["country"], _count: { country: true }, where: { country: { not: null } } }),
  ]);
  const leadsByCountry = leads.map((l) => ({ country: l.country as string, count: l._count.country })).sort((a, b) => b.count - a.count);
  const patientsByCountry = patients.map((p) => ({ country: p.country as string, count: p._count.country })).sort((a, b) => b.count - a.count);
  return { leadsByCountry, patientsByCountry };
}

export async function getAllFaqs() {
  return prisma.fAQ.findMany({ orderBy: { order: "asc" } });
}

export async function getAllTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPublishedFaqs() {
  return prisma.fAQ.findMany({ orderBy: { order: "asc" } });
}

export async function getPublishedTestimonials() {
  return prisma.testimonial.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } });
}
