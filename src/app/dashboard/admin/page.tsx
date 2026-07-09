import {
  Users, Calendar, Building2, Activity, FileText, Stethoscope, Globe, CalendarCheck, Download,
} from "lucide-react";
import { ComingSoon } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { LeadStatusSelect } from "@/components/dashboard/LeadStatusSelect";
import { AppointmentStatusSelect } from "@/components/dashboard/AppointmentStatusSelect";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { HospitalsPanel } from "@/components/dashboard/admin/HospitalsPanel";
import { DoctorsPanel } from "@/components/dashboard/admin/DoctorsPanel";
import { CoordinatorsPanel } from "@/components/dashboard/admin/CoordinatorsPanel";
import { FaqPanel } from "@/components/dashboard/admin/FaqPanel";
import { TestimonialsPanel } from "@/components/dashboard/admin/TestimonialsPanel";
import { RolePermissionsPanel } from "@/components/dashboard/admin/RolePermissionsPanel";
import { requireAnyRole } from "@/lib/auth";
import { Role } from "@prisma/client";
import {
  getAdminOverviewStats, getRecentLeads, getLeadStatusBreakdown,
  getAllHospitals, getAllDoctors, getAllPatients, getAllCoordinators, getAllAppointmentsAdmin,
  getAdminAnalytics, getCountryBreakdown, getAllFaqs, getAllTestimonials,
} from "@/lib/queries/admin";
import { getEffectiveTabs, getAllRolePermissions } from "@/lib/queries/permissions";

const KNOWN_TABS = [
  "overview", "leads", "analytics", "reports", "hospitals", "doctors", "patients",
  "coordinators", "appointments", "faq", "testimonials", "countries", "settings", "roles",
];

const ADMIN_ONLY_TABS = ["hospitals", "doctors", "coordinators", "faq", "testimonials", "reports", "roles"];

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "overview";
  const user = await requireAnyRole([Role.ADMIN, Role.COORDINATOR]);

  if (!KNOWN_TABS.includes(activeTab)) {
    return <ComingSoon label={activeTab} backHref="/dashboard/admin?tab=overview" />;
  }

  if (user.role === Role.COORDINATOR) {
    if (ADMIN_ONLY_TABS.includes(activeTab)) {
      return <ComingSoon label="Admins only — ask an admin for access" backHref="/dashboard/admin?tab=overview" />;
    }
    const enabledTabs = await getEffectiveTabs("COORDINATOR");
    if (!enabledTabs.includes(activeTab)) {
      return <ComingSoon label="This tab isn't enabled for your role — ask an admin" backHref="/dashboard/admin?tab=overview" />;
    }
  }

  if (activeTab === "roles") {
    const permissions = await getAllRolePermissions();
    return <RolePermissionsPanel permissions={permissions} />;
  }

  if (activeTab === "leads") {
    const leads = await getRecentLeads(50);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">All Leads</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 text-muted font-medium">Patient</th>
                <th className="text-left py-2.5 text-muted font-medium">Country</th>
                <th className="text-left py-2.5 text-muted font-medium">Treatment</th>
                <th className="text-left py-2.5 text-muted font-medium">Status</th>
                <th className="text-left py-2.5 text-muted font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                  <td className="py-3 font-medium">{lead.name}</td>
                  <td className="py-3 text-muted">{lead.country ?? "—"}</td>
                  <td className="py-3 text-muted">{lead.treatment ?? "—"}</td>
                  <td className="py-3"><LeadStatusSelect id={lead.id} status={lead.status} /></td>
                  <td className="py-3 text-muted text-xs">{lead.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-muted">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === "hospitals") {
    const hospitals = await getAllHospitals();
    return <HospitalsPanel hospitals={hospitals} />;
  }

  if (activeTab === "doctors") {
    const [doctors, hospitals] = await Promise.all([getAllDoctors(), getAllHospitals()]);
    return <DoctorsPanel doctors={doctors} hospitals={hospitals} />;
  }

  if (activeTab === "patients") {
    const patients = await getAllPatients();
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Patients ({patients.length})</h3>
        <div className="space-y-3">
          {patients.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
              <div>
                <p className="text-sm font-semibold">{p.user.name}</p>
                <p className="text-xs text-muted">{p.user.email} • {p.country ?? "—"} • ID: {p.gcNumber}</p>
              </div>
              <span className="text-xs text-muted">{p._count.appointments} appointments</span>
            </div>
          ))}
          {patients.length === 0 && <p className="text-sm text-muted text-center py-6">No patients yet.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "coordinators") {
    const coordinators = await getAllCoordinators();
    return <CoordinatorsPanel coordinators={coordinators} />;
  }

  if (activeTab === "appointments") {
    const appointments = await getAllAppointmentsAdmin();
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">All Appointments ({appointments.length})</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 text-muted font-medium">Patient</th>
                <th className="text-left py-2.5 text-muted font-medium">Doctor</th>
                <th className="text-left py-2.5 text-muted font-medium">Hospital</th>
                <th className="text-left py-2.5 text-muted font-medium">Date</th>
                <th className="text-left py-2.5 text-muted font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-surface transition-colors">
                  <td className="py-3 font-medium">{apt.patient.user.name}</td>
                  <td className="py-3 text-muted">{apt.doctor.name}</td>
                  <td className="py-3 text-muted">{apt.hospital.name}</td>
                  <td className="py-3 text-muted text-xs">{apt.scheduledAt.toLocaleString()}</td>
                  <td className="py-3"><AppointmentStatusSelect id={apt.id} status={apt.status} /></td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-muted">No appointments yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === "faq") {
    const faqs = await getAllFaqs();
    return <FaqPanel faqs={faqs} />;
  }

  if (activeTab === "testimonials") {
    const testimonials = await getAllTestimonials();
    return <TestimonialsPanel testimonials={testimonials} />;
  }

  if (activeTab === "countries") {
    const { leadsByCountry, patientsByCountry } = await getCountryBreakdown();
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Leads by Country</h3>
          <div className="space-y-2">
            {leadsByCountry.map((c) => (
              <div key={c.country} className="flex justify-between items-center py-1.5 text-sm">
                <span className="text-muted">{c.country}</span>
                <span className="font-semibold">{c.count}</span>
              </div>
            ))}
            {leadsByCountry.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Patients by Country</h3>
          <div className="space-y-2">
            {patientsByCountry.map((c) => (
              <div key={c.country} className="flex justify-between items-center py-1.5 text-sm">
                <span className="text-muted">{c.country}</span>
                <span className="font-semibold">{c.count}</span>
              </div>
            ))}
            {patientsByCountry.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "analytics") {
    const { leadsByMonth, leadsBySource, appointmentsByStatus, topTreatments } = await getAdminAnalytics();
    const maxMonth = Math.max(1, ...leadsByMonth.map((m) => m.count));
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6 lg:col-span-2">
          <h3 className="font-semibold mb-5">Leads — Last 6 Months</h3>
          <div className="flex items-end gap-3 h-40">
            {leadsByMonth.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center justify-end gap-2">
                <span className="text-xs font-semibold">{m.count}</span>
                <div className="w-full bg-primary/80 rounded-t-md" style={{ height: `${(m.count / maxMonth) * 100}%`, minHeight: 4 }} />
                <span className="text-[10px] text-muted">{m.month.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-4">Leads by Source</h3>
          <div className="space-y-3">
            {leadsBySource.map((s) => (
              <div key={s.source} className="flex justify-between items-center text-sm">
                <span className="text-muted">{s.source.replace("_", " ")}</span>
                <span className="font-semibold">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-4">Appointments by Status</h3>
          <div className="space-y-3">
            {appointmentsByStatus.map((s) => (
              <div key={s.status} className="flex justify-between items-center text-sm">
                <span className="text-muted">{s.status}</span>
                <span className="font-semibold">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Top Requested Treatments</h3>
          <div className="space-y-3">
            {topTreatments.map((t) => (
              <div key={t.treatment} className="flex justify-between items-center text-sm">
                <span className="text-muted">{t.treatment}</span>
                <span className="font-semibold">{t.count}</span>
              </div>
            ))}
            {topTreatments.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "reports") {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-2">Export Data</h3>
        <p className="text-sm text-muted mb-5">Download raw records as CSV for offline reporting.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/api/admin/export/leads" className="btn-primary text-sm px-4 py-2 flex items-center gap-2"><Download size={14} /> Leads CSV</a>
          <a href="/api/admin/export/appointments" className="btn-primary text-sm px-4 py-2 flex items-center gap-2"><Download size={14} /> Appointments CSV</a>
        </div>
      </div>
    );
  }

  if (activeTab === "settings") {
    return <SettingsForm name={user.name} phone={user.phone} email={user.email} />;
  }

  const stats = await getAdminOverviewStats();
  const [recentLeads, statusBreakdown] = await Promise.all([getRecentLeads(5), getLeadStatusBreakdown()]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Building2 size={20} />} label="Hospitals" value={String(stats.hospitals)} color="text-primary bg-primary/10" />
        <StatCard icon={<Stethoscope size={20} />} label="Doctors" value={String(stats.doctors)} color="text-blue-600 bg-blue-100 dark:bg-blue-900/30" />
        <StatCard icon={<Users size={20} />} label="Patients" value={String(stats.patients)} color="text-green-600 bg-green-100 dark:bg-green-900/30" />
        <StatCard icon={<CalendarCheck size={20} />} label="Total Appointments" value={String(stats.appointments)} color="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Leads", value: String(stats.activeLeads), icon: Activity },
          { label: "Appointments Today", value: String(stats.appointmentsToday), icon: Calendar },
          { label: "Pending Reports", value: String(stats.pendingReports), icon: FileText },
          { label: "Countries Active", value: String(stats.countriesActive), icon: Globe },
        ].map((card) => (
          <div key={card.label} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">{card.label}</p>
                <p className="text-xl font-bold mt-1">{card.value}</p>
              </div>
              <card.icon size={20} className="text-muted" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recent Leads</h3>
            <a href="/dashboard/admin?tab=leads" className="text-sm text-primary font-medium">View All</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 text-muted font-medium">Patient</th>
                  <th className="text-left py-2.5 text-muted font-medium">Country</th>
                  <th className="text-left py-2.5 text-muted font-medium">Treatment</th>
                  <th className="text-left py-2.5 text-muted font-medium">Status</th>
                  <th className="text-left py-2.5 text-muted font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-surface transition-colors cursor-pointer">
                    <td className="py-3 font-medium">{lead.name}</td>
                    <td className="py-3 text-muted">{lead.country ?? "—"}</td>
                    <td className="py-3 text-muted">{lead.treatment ?? "—"}</td>
                    <td className="py-3"><LeadStatusSelect id={lead.id} status={lead.status} /></td>
                    <td className="py-3 text-muted text-xs">{lead.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
                {recentLeads.length === 0 && (
                  <tr><td colSpan={5} className="py-6 text-center text-muted">No leads yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4">Lead Status Breakdown</h3>
            <div className="space-y-3">
              {statusBreakdown.map((s) => (
                <div key={s.status} className="flex justify-between items-center py-1.5">
                  <span className="text-sm text-muted">{s.status.replace("_", " ")}</span>
                  <span className="text-sm font-semibold">{s.count}</span>
                </div>
              ))}
              {statusBreakdown.length === 0 && <p className="text-sm text-muted">No leads yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
