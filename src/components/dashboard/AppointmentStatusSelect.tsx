"use client";

import { useTransition } from "react";
import { updateAppointmentStatusAction } from "@/lib/actions/admin";
import { AppointmentStatus } from "@prisma/client";

const statusColors: Record<AppointmentStatus, string> = {
  PENDING: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
  CONFIRMED: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
  COMPLETED: "bg-green-100 text-green-600 dark:bg-green-900/30",
  CANCELLED: "bg-gray-100 text-gray-600 dark:bg-gray-800",
};

export function AppointmentStatusSelect({ id, status }: { id: string; status: AppointmentStatus }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => {
        const formData = new FormData();
        formData.set("id", id);
        formData.set("status", e.target.value);
        startTransition(() => {
          updateAppointmentStatusAction(formData);
        });
      }}
      className={`text-xs px-2.5 py-1 rounded-full font-medium border-none outline-none cursor-pointer ${statusColors[status]}`}
    >
      {Object.values(AppointmentStatus).map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
