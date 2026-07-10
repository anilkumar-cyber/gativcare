import Link from "next/link";
import { Calendar, Users, Star, TrendingUp, Download, ArrowRight } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ComingSoon } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { DoctorProfileForm } from "@/components/dashboard/DoctorProfileForm";
import { getDoctorOverview, getDoctorPatients, getDoctorReports, getDoctorAnalytics } from "@/lib/queries/doctor";
import { getDoctorPrescriptions } from "@/lib/queries/prescriptions";
import { PrescriptionList } from "@/components/dashboard/PrescriptionList";
import { markReportReviewedAction } from "@/lib/actions/reports";
import { confirmAppointmentAction } from "@/lib/actions/appointments";
import { getEffectiveTabs } from "@/lib/queries/permissions";
import { Role, AppointmentStatus } from "@prisma/client";

export default async function DoctorDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "overview";
  const user = await requireRole(Role.DOCTOR);

  if (!user.doctor) {
    return <ComingSoon label="No doctor profile linked to this account" backHref="/dashboard/doctor?tab=overview" />;
  }

  const enabledTabs = await getEffectiveTabs("DOCTOR");
  if (!enabledTabs.includes(activeTab)) {
    return <ComingSoon label="This tab isn't enabled for your role — ask an admin" backHref="/dashboard/doctor?tab=overview" />;
  }

  if (activeTab === "patients") {
    const patients = await getDoctorPatients(user.doctor.id);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">My Patients</h3>
        <div className="space-y-3">
          {patients.map(({ patient, lastAppointment }) => (
            <div key={patient.id} className="p-3 rounded-xl bg-surface border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{patient.user.name}</p>
                  <p className="text-xs text-muted">{patient.country ?? "—"} • Patient ID: {patient.gcNumber}</p>
                </div>
                <span className="text-xs text-muted">Last visit: {lastAppointment.scheduledAt.toLocaleDateString()}</span>
              </div>
              {patient.treatmentPlan && <p className="text-xs text-muted mt-2 italic">Plan: {patient.treatmentPlan}</p>}
              <Link href={`/dashboard/doctor/patients/${patient.id}`} className="text-xs text-primary font-medium flex items-center gap-1 mt-2">
                View care record <ArrowRight size={12} />
              </Link>
            </div>
          ))}
          {patients.length === 0 && <p className="text-sm text-muted text-center py-6">No patients yet.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "appointments") {
    const { recentAppointments } = await getDoctorOverview(user.doctor.id);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Appointments</h3>
        <div className="space-y-3">
          {recentAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
              <div>
                <p className="text-sm font-semibold">{apt.patient.user.name}</p>
                <p className="text-xs text-muted">{apt.type.replace("_", " ")} • {apt.status}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{apt.scheduledAt.toLocaleString()}</span>
                {apt.status === "PENDING" && (
                  <div className="flex items-center gap-1.5">
                    <form action={confirmAppointmentAction}>
                      <input type="hidden" name="id" value={apt.id} />
                      <input type="hidden" name="status" value={AppointmentStatus.CONFIRMED} />
                      <button type="submit" className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 font-medium">Confirm</button>
                    </form>
                    <form action={confirmAppointmentAction}>
                      <input type="hidden" name="id" value={apt.id} />
                      <input type="hidden" name="status" value={AppointmentStatus.CANCELLED} />
                      <button type="submit" className="text-xs px-2.5 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 font-medium">Decline</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ))}
          {recentAppointments.length === 0 && <p className="text-sm text-muted text-center py-6">No appointments yet.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "reports") {
    const reports = await getDoctorReports(user.doctor.id);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Patient Medical Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2.5 text-muted font-medium">Patient</th>
                <th className="text-left py-2.5 text-muted font-medium">Report</th>
                <th className="text-left py-2.5 text-muted font-medium">Date</th>
                <th className="text-left py-2.5 text-muted font-medium">Status</th>
                <th className="text-right py-2.5 text-muted font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="py-3 font-medium">{r.patient?.user.name ?? "—"}</td>
                  <td className="py-3 text-muted">{r.fileName}</td>
                  <td className="py-3 text-muted text-xs">{r.uploadedAt.toLocaleDateString()}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${r.status === "REVIEWED" ? "bg-green-100 text-green-600 dark:bg-green-900/30" : "bg-amber-100 text-amber-600 dark:bg-amber-900/30"}`}>
                      {r.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-3 text-right flex items-center justify-end gap-3">
                    <a href={`/api/uploads/${r.id}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-dark inline-block"><Download size={16} /></a>
                    {r.status !== "REVIEWED" && (
                      <form action={markReportReviewedAction}>
                        <input type="hidden" name="id" value={r.id} />
                        <button type="submit" className="text-xs text-primary font-medium hover:underline">Mark reviewed</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-muted">No reports from your patients yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === "prescriptions") {
    const [prescriptions, patients] = await Promise.all([
      getDoctorPrescriptions(user.doctor.id),
      getDoctorPatients(user.doctor.id),
    ]);
    return (
      <PrescriptionList
        prescriptions={prescriptions}
        patients={patients.map(({ patient }) => ({ id: patient.id, name: patient.user.name }))}
        canAdd
        canManage
        showPatientName
      />
    );
  }

  if (activeTab === "analytics") {
    const { appointmentsByMonth, statusBreakdown, doctor } = await getDoctorAnalytics(user.doctor.id);
    const maxMonth = Math.max(1, ...appointmentsByMonth.map((m) => m.count));
    return (
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6 lg:col-span-2">
          <h3 className="font-semibold mb-5">Appointments — Last 6 Months</h3>
          <div className="flex items-end gap-3 h-40">
            {appointmentsByMonth.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center justify-end gap-2">
                <span className="text-xs font-semibold">{m.count}</span>
                <div className="w-full bg-primary/80 rounded-t-md" style={{ height: `${(m.count / maxMonth) * 100}%`, minHeight: 4 }} />
                <span className="text-[10px] text-muted">{m.month.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-4">Appointments by Status</h3>
          <div className="space-y-3">
            {statusBreakdown.map((s) => (
              <div key={s.status} className="flex justify-between items-center text-sm">
                <span className="text-muted">{s.status}</span>
                <span className="font-semibold">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-4">Reputation</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Rating</span><span className="font-semibold">{doctor?.rating ?? "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted">Reviews</span><span className="font-semibold">{doctor?.reviews ?? 0}</span></div>
            <div className="flex justify-between"><span className="text-muted">Success rate</span><span className="font-semibold">{doctor?.successRate ?? "—"}</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "settings") {
    return (
      <div className="space-y-6">
        <SettingsForm name={user.name} phone={user.phone} email={user.email} />
        <DoctorProfileForm fee={user.doctor.fee} experience={user.doctor.experience} languages={user.doctor.languages} />
      </div>
    );
  }

  if (activeTab !== "overview") {
    return <ComingSoon label={activeTab} backHref="/dashboard/doctor?tab=overview" />;
  }

  const { doctor, todayAppointments, activePatientCount } = await getDoctorOverview(user.doctor.id);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Calendar size={20} />} label="Today's Appointments" value={String(todayAppointments.length)} color="text-primary bg-primary/10" />
        <StatCard icon={<Users size={20} />} label="Active Patients" value={String(activePatientCount)} color="text-blue-600 bg-blue-100 dark:bg-blue-900/30" />
        <StatCard icon={<Star size={20} />} label="Rating" value={String(doctor?.rating ?? "—")} sub={`${doctor?.reviews ?? 0} reviews`} color="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
        <StatCard icon={<TrendingUp size={20} />} label="Success Rate" value={doctor?.successRate ?? "—"} color="text-green-600 bg-green-100 dark:bg-green-900/30" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Today&apos;s Schedule</h3>
        <div className="space-y-3">
          {todayAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border hover:bg-surface-hover transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold text-primary">
                  {apt.patient.user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{apt.patient.user.name}</p>
                  <p className="text-xs text-muted">{apt.notes ?? apt.type.replace("_", " ")}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{apt.scheduledAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${apt.type === "VIDEO" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30" : "bg-green-100 text-green-600 dark:bg-green-900/30"}`}>
                  {apt.type.replace("_", " ")}
                </span>
              </div>
            </div>
          ))}
          {todayAppointments.length === 0 && <p className="text-sm text-muted text-center py-6">No appointments scheduled for today.</p>}
        </div>
      </div>
    </div>
  );
}
