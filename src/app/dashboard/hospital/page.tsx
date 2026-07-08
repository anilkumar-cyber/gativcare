import { Stethoscope, Users, TrendingUp, Star } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ComingSoon } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { getHospitalOverview, getHospitalAppointments } from "@/lib/queries/hospital";
import { Role } from "@prisma/client";

export default async function HospitalDashboard({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab ?? "overview";
  const user = await requireRole(Role.HOSPITAL);

  if (!user.hospitalOwned) {
    return <ComingSoon label="No hospital linked to this account" backHref="/dashboard/hospital?tab=overview" />;
  }
  const hospitalId = user.hospitalOwned.id;

  if (activeTab === "doctors") {
    const { doctors } = await getHospitalOverview(hospitalId);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Doctors</h3>
        <div className="space-y-3">
          {doctors.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
              <div>
                <p className="text-sm font-semibold">{doc.name}</p>
                <p className="text-xs text-muted">{doc.specialization} • {doc.experience} yrs experience</p>
              </div>
              <span className="text-sm font-medium flex items-center gap-1"><Star size={14} className="text-amber-500" /> {doc.rating}</span>
            </div>
          ))}
          {doctors.length === 0 && <p className="text-sm text-muted text-center py-6">No doctors on record.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "appointments") {
    const appointments = await getHospitalAppointments(hospitalId);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Appointments</h3>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
              <div>
                <p className="text-sm font-semibold">{apt.patient.user.name}</p>
                <p className="text-xs text-muted">with {apt.doctor.name} • {apt.status}</p>
              </div>
              <span className="text-sm font-medium">{apt.scheduledAt.toLocaleString()}</span>
            </div>
          ))}
          {appointments.length === 0 && <p className="text-sm text-muted text-center py-6">No appointments yet.</p>}
        </div>
      </div>
    );
  }

  if (activeTab !== "overview") {
    return <ComingSoon label={activeTab} backHref="/dashboard/hospital?tab=overview" />;
  }

  const { doctorCount, appointmentCount, patientCount, doctors } = await getHospitalOverview(hospitalId);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Stethoscope size={20} />} label="Active Doctors" value={String(doctorCount)} color="text-blue-600 bg-blue-100 dark:bg-blue-900/30" />
        <StatCard icon={<Users size={20} />} label="Patients Treated" value={String(patientCount)} color="text-green-600 bg-green-100 dark:bg-green-900/30" />
        <StatCard icon={<TrendingUp size={20} />} label="Total Appointments" value={String(appointmentCount)} color="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
        <StatCard icon={<Star size={20} />} label="Avg Doctor Rating" value={doctors.length ? (doctors.reduce((s, d) => s + d.rating, 0) / doctors.length).toFixed(1) : "—"} color="text-primary bg-primary/10" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Doctors</h3>
        <div className="space-y-3">
          {doctors.slice(0, 6).map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
              <div>
                <p className="text-sm font-semibold">{doc.name}</p>
                <p className="text-xs text-muted">{doc.specialization}</p>
              </div>
              <span className="text-sm font-medium flex items-center gap-1"><Star size={14} className="text-amber-500" /> {doc.rating}</span>
            </div>
          ))}
          {doctors.length === 0 && <p className="text-sm text-muted text-center py-6">No doctors on record.</p>}
        </div>
      </div>
    </div>
  );
}
