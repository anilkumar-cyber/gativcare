import { Calendar, FileText, Download, Bell, ClipboardList, Stethoscope, Building2 } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ComingSoon } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { PatientCountryForm } from "@/components/dashboard/PatientCountryForm";
import { getPatientOverview, getPatientTreatmentContext, getPatientNotifications } from "@/lib/queries/patient";
import { ReportUploadForm } from "@/components/dashboard/ReportUploadForm";
import { getEffectiveTabs } from "@/lib/queries/permissions";
import { Role } from "@prisma/client";

export default async function PatientDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "overview";
  const user = await requireRole(Role.PATIENT);

  if (!user.patient) {
    return <ComingSoon label="No patient profile linked to this account" backHref="/dashboard/patient?tab=overview" />;
  }

  const enabledTabs = await getEffectiveTabs("PATIENT");
  if (!enabledTabs.includes(activeTab)) {
    return <ComingSoon label="This tab isn't enabled for your role — ask an admin" backHref="/dashboard/patient?tab=overview" />;
  }

  const { upcoming, past, reports } = await getPatientOverview(user.patient.id);

  if (activeTab === "appointments") {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Appointments</h3>
        <div className="space-y-3">
          {[...upcoming, ...past].map((apt) => (
            <div key={apt.id} className="p-3 rounded-xl bg-surface border border-border">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold">{apt.doctor.name}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">{apt.status}</span>
              </div>
              <p className="text-xs text-muted">{apt.doctor.specialization} • {apt.hospital.name}</p>
              <p className="text-xs text-primary font-medium mt-1.5">{apt.scheduledAt.toLocaleString()}</p>
            </div>
          ))}
          {upcoming.length === 0 && past.length === 0 && <p className="text-sm text-muted text-center py-6">No appointments yet.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "reports") {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Medical Reports</h3>
        <ReportUploadForm />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-muted font-medium">Report</th>
                <th className="text-left py-3 text-muted font-medium">Date</th>
                <th className="text-left py-3 text-muted font-medium">Status</th>
                <th className="text-right py-3 text-muted font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{report.fileName}</td>
                  <td className="py-3 text-muted">{report.uploadedAt.toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${report.status === "REVIEWED" ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30"}`}>
                      {report.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <a href={`/api/uploads/${report.id}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark inline-block"><Download size={16} /></a>
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr><td colSpan={4} className="py-6 text-center text-muted">No reports uploaded yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === "treatment") {
    const { treatmentPlan, doctors, hospitals } = await getPatientTreatmentContext(user.patient.id);
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2"><ClipboardList size={18} className="text-primary" /> Treatment Plan</h3>
          <p className="text-sm text-muted">{treatmentPlan ?? "Your doctor hasn't added a treatment plan yet."}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Stethoscope size={16} className="text-primary" /> Care Team</h3>
            <div className="space-y-2">
              {doctors.map((d) => (
                <div key={d.id} className="p-3 rounded-xl bg-surface border border-border">
                  <p className="text-sm font-semibold">{d.name}</p>
                  <p className="text-xs text-muted">{d.specialization}</p>
                </div>
              ))}
              {doctors.length === 0 && <p className="text-sm text-muted">No doctors assigned yet.</p>}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Building2 size={16} className="text-primary" /> Hospitals</h3>
            <div className="space-y-2">
              {hospitals.map((h) => (
                <div key={h.id} className="p-3 rounded-xl bg-surface border border-border">
                  <p className="text-sm font-semibold">{h.name}</p>
                  <p className="text-xs text-muted">{h.city}</p>
                </div>
              ))}
              {hospitals.length === 0 && <p className="text-sm text-muted">No hospitals assigned yet.</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "notifications") {
    const notifications = await getPatientNotifications(user.patient.id);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Notifications</h3>
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
              <Bell size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="text-xs text-muted">{n.detail}</p>
              </div>
            </div>
          ))}
          {notifications.length === 0 && <p className="text-sm text-muted text-center py-6">No notifications right now.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "settings") {
    return (
      <div className="space-y-6">
        <SettingsForm name={user.name} phone={user.phone} email={user.email} />
        <PatientCountryForm country={user.patient.country} />
      </div>
    );
  }

  if (activeTab !== "overview") {
    return <ComingSoon label={activeTab} backHref="/dashboard/patient?tab=overview" />;
  }

  const nextAppointment = upcoming[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar size={20} />}
          label="Next Appointment"
          value={nextAppointment ? nextAppointment.scheduledAt.toLocaleDateString() : "None scheduled"}
          sub={nextAppointment?.doctor.name}
          color="text-primary bg-primary/10"
        />
        <StatCard icon={<FileText size={20} />} label="Reports" value={String(reports.length)} sub={`${reports.filter((r) => r.status === "PENDING_REVIEW").length} pending review`} color="text-purple-600 bg-purple-100 dark:bg-purple-900/30" />
        <StatCard icon={<Calendar size={20} />} label="Upcoming Appointments" value={String(upcoming.length)} color="text-green-600 bg-green-100 dark:bg-green-900/30" />
        <StatCard icon={<Calendar size={20} />} label="Past Appointments" value={String(past.length)} color="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Upcoming Appointments</h3>
          <div className="space-y-4">
            {upcoming.map((apt) => (
              <div key={apt.id} className="p-3 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{apt.doctor.name}</p>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-600 dark:bg-green-900/30">{apt.type.replace("_", " ")}</span>
                </div>
                <p className="text-xs text-muted">{apt.doctor.specialization} • {apt.hospital.name}</p>
                <p className="text-xs text-primary font-medium mt-1.5">{apt.scheduledAt.toLocaleString()}</p>
              </div>
            ))}
            {upcoming.length === 0 && <p className="text-sm text-muted text-center py-6">No upcoming appointments.</p>}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Recent Medical Reports</h3>
          <div className="space-y-3">
            {reports.slice(0, 5).map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
                <div>
                  <p className="text-sm font-medium">{report.fileName}</p>
                  <p className="text-xs text-muted">{report.uploadedAt.toLocaleDateString()}</p>
                </div>
                <a href={`/api/uploads/${report.id}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark"><Download size={16} /></a>
              </div>
            ))}
            {reports.length === 0 && <p className="text-sm text-muted text-center py-6">No reports uploaded yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
