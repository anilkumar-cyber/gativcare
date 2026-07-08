import {
  Users, Calendar, Building2, Activity, FileText, Stethoscope, Globe, CalendarCheck,
} from "lucide-react";
import { ComingSoon } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { LeadStatusSelect } from "@/components/dashboard/LeadStatusSelect";
import { getAdminOverviewStats, getRecentLeads, getLeadStatusBreakdown } from "@/lib/queries/admin";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "overview";

  if (activeTab !== "overview" && activeTab !== "leads") {
    return <ComingSoon label={activeTab} backHref="/dashboard/admin?tab=overview" />;
  }

  const stats = await getAdminOverviewStats();

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
