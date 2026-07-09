import { Stethoscope, Users, TrendingUp, Star, Bed } from "lucide-react";
import { requireRole } from "@/lib/auth";
import { ComingSoon } from "@/components/dashboard/DashboardShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { HospitalDetailsForm, HospitalSpecialtiesForm, HospitalBedsForm } from "@/components/dashboard/hospital/HospitalForms";
import { getHospitalOverview, getHospitalAppointments, getHospitalPatients, getAllPackages, getHospitalTodayApptCount } from "@/lib/queries/hospital";
import { confirmAppointmentAction } from "@/lib/actions/appointments";
import { getEffectiveTabs } from "@/lib/queries/permissions";
import { Role, AppointmentStatus } from "@prisma/client";

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

  const enabledTabs = await getEffectiveTabs("HOSPITAL");
  if (!enabledTabs.includes(activeTab)) {
    return <ComingSoon label="This tab isn't enabled for your role — ask an admin" backHref="/dashboard/hospital?tab=overview" />;
  }

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
          {appointments.length === 0 && <p className="text-sm text-muted text-center py-6">No appointments yet.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "patients") {
    const patients = await getHospitalPatients(hospitalId);
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Patients</h3>
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

  if (activeTab === "departments") {
    const { doctors } = await getHospitalOverview(hospitalId);
    const bySpecialty = new Map<string, number>();
    for (const d of doctors) bySpecialty.set(d.specialization, (bySpecialty.get(d.specialization) ?? 0) + 1);
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Doctor Count by Department</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...bySpecialty.entries()].map(([spec, count]) => (
              <div key={spec} className="p-3 rounded-xl bg-surface border border-border flex justify-between items-center">
                <span className="text-sm font-medium">{spec}</span>
                <span className="text-sm font-bold text-primary">{count}</span>
              </div>
            ))}
            {bySpecialty.size === 0 && <p className="text-sm text-muted">No doctors on record yet.</p>}
          </div>
        </div>
        <HospitalSpecialtiesForm specialties={user.hospitalOwned.specialties} />
      </div>
    );
  }

  if (activeTab === "beds") {
    const todayAppts = await getHospitalTodayApptCount(hospitalId);
    return (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <StatCard icon={<Bed size={20} />} label="Total Registered Beds" value={String(user.hospitalOwned.beds ?? "—")} color="text-primary bg-primary/10" />
          <StatCard icon={<Users size={20} />} label="Appointments Today" value={String(todayAppts)} sub="Rough activity proxy, not live occupancy" color="text-blue-600 bg-blue-100 dark:bg-blue-900/30" />
        </div>
        <HospitalBedsForm beds={user.hospitalOwned.beds} />
      </div>
    );
  }

  if (activeTab === "packages") {
    const packages = await getAllPackages();
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-2">Package Catalog</h3>
        <p className="text-sm text-muted mb-5">Shared GativCare packages available to your patients (managed by GativCare admin).</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {packages.map((p) => (
            <div key={p.id} className="p-3 rounded-xl bg-surface border border-border">
              <p className="text-sm font-semibold">{p.name}</p>
              <p className="text-xs text-muted mt-0.5">{p.duration} • ₹{p.priceINR.toLocaleString("en-IN")}</p>
            </div>
          ))}
          {packages.length === 0 && <p className="text-sm text-muted">No packages yet.</p>}
        </div>
      </div>
    );
  }

  if (activeTab === "reviews") {
    const { doctors } = await getHospitalOverview(hospitalId);
    const avgRating = doctors.length ? (doctors.reduce((s, d) => s + d.rating, 0) / doctors.length).toFixed(1) : "—";
    const totalReviews = doctors.reduce((s, d) => s + d.reviews, 0);
    return (
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <StatCard icon={<Star size={20} />} label="Average Doctor Rating" value={avgRating} color="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
          <StatCard icon={<Users size={20} />} label="Total Reviews" value={String(totalReviews)} color="text-primary bg-primary/10" />
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Ratings by Doctor</h3>
          <div className="space-y-3">
            {doctors.map((d) => (
              <div key={d.id} className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
                <div>
                  <p className="text-sm font-semibold">{d.name}</p>
                  <p className="text-xs text-muted">{d.specialization}</p>
                </div>
                <span className="text-sm font-medium flex items-center gap-1"><Star size={14} className="text-amber-500" /> {d.rating} ({d.reviews})</span>
              </div>
            ))}
            {doctors.length === 0 && <p className="text-sm text-muted text-center py-6">No doctors on record.</p>}
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "settings") {
    return (
      <div className="space-y-6">
        <SettingsForm name={user.name} phone={user.phone} email={user.email} />
        <HospitalDetailsForm name={user.hospitalOwned.name} city={user.hospitalOwned.city} establishedYear={user.hospitalOwned.establishedYear} />
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
