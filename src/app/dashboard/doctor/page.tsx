import { Calendar, Users, Star, TrendingUp } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ComingSoon } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { getDoctorOverview, getDoctorPatients } from "@/lib/queries/doctor";
import { Role } from "@prisma/client";

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

  if (activeTab === "patients") {
    const patients = await getDoctorPatients(user.doctor.id);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">My Patients</h3>
        <div className="space-y-3">
          {patients.map(({ patient, lastAppointment }) => (
            <div key={patient.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
              <div>
                <p className="text-sm font-semibold">{patient.user.name}</p>
                <p className="text-xs text-muted">{patient.country ?? "—"} • Patient ID: {patient.gcNumber}</p>
              </div>
              <span className="text-xs text-muted">Last visit: {lastAppointment.scheduledAt.toLocaleDateString()}</span>
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
              <span className="text-sm font-medium">{apt.scheduledAt.toLocaleString()}</span>
            </div>
          ))}
          {recentAppointments.length === 0 && <p className="text-sm text-muted text-center py-6">No appointments yet.</p>}
        </div>
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
