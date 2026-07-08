"use client";

import { useTransition } from "react";
import { updateLeadStatusAction } from "@/lib/actions/leads";
import { LeadStatus } from "@prisma/client";

const statusColors: Record<LeadStatus, string> = {
  NEW: "bg-blue-100 text-blue-600 dark:bg-blue-900/30",
  CONTACTED: "bg-amber-100 text-amber-600 dark:bg-amber-900/30",
  QUALIFIED: "bg-green-100 text-green-600 dark:bg-green-900/30",
  IN_PROGRESS: "bg-purple-100 text-purple-600 dark:bg-purple-900/30",
  CONVERTED: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30",
  CLOSED: "bg-gray-100 text-gray-600 dark:bg-gray-800",
};

export function LeadStatusSelect({ id, status }: { id: string; status: LeadStatus }) {
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
          updateLeadStatusAction(formData);
        });
      }}
      className={`text-xs px-2.5 py-1 rounded-full font-medium border-none outline-none cursor-pointer ${statusColors[status]}`}
    >
      {Object.values(LeadStatus).map((s) => (
        <option key={s} value={s}>{s.replace("_", " ")}</option>
      ))}
    </select>
  );
}
