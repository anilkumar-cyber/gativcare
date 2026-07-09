"use client";

import { useState, useTransition } from "react";
import { Lock } from "lucide-react";
import { setRolePermissionsAction } from "@/lib/actions/permissions";
import { CONFIGURABLE_ROLE_TABS, type ConfigurableRole } from "@/lib/dashboardTabs";

type PermissionRow = { role: ConfigurableRole; allTabs: string[]; enabledTabs: string[]; isConfigured: boolean };

const ROLE_LABELS: Record<ConfigurableRole, string> = {
  DOCTOR: "Doctor",
  HOSPITAL: "Hospital",
  PATIENT: "Patient",
  COORDINATOR: "Coordinator",
};

function RoleCard({ row }: { row: PermissionRow }) {
  const [selected, setSelected] = useState(new Set(row.enabledTabs));
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const items = CONFIGURABLE_ROLE_TABS[row.role];

  function toggle(id: string) {
    if (id === "overview") return;
    setSaved(false);
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function save() {
    const formData = new FormData();
    formData.set("role", row.role);
    selected.forEach((id) => formData.append("tabs", id));
    startTransition(async () => {
      await setRolePermissionsAction(formData);
      setSaved(true);
    });
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{ROLE_LABELS[row.role]}</h3>
        {!row.isConfigured && <span className="text-xs text-muted">Default (all tabs) — not yet customized</span>}
      </div>
      <div className="grid sm:grid-cols-2 gap-2 mb-4">
        {items.map((item) => {
          const locked = item.id === "overview";
          const checked = selected.has(item.id);
          return (
            <label
              key={item.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm ${
                checked ? "border-primary/40 bg-primary/5" : "border-border"
              } ${locked ? "opacity-60" : "cursor-pointer hover:bg-surface"}`}
            >
              <input type="checkbox" checked={checked} disabled={locked} onChange={() => toggle(item.id)} className="accent-primary" />
              <item.icon size={14} />
              {item.label}
              {locked && <Lock size={11} className="text-muted ml-auto" />}
            </label>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <button onClick={save} disabled={pending} className="btn-primary text-sm px-4 py-2 disabled:opacity-60">
          {pending ? "Saving..." : "Save permissions"}
        </button>
        {saved && !pending && <span className="text-sm text-green-600">Saved.</span>}
      </div>
    </div>
  );
}

export function RolePermissionsPanel({ permissions }: { permissions: PermissionRow[] }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted">
        Pick which dashboard tabs each role can access. &quot;Dashboard&quot; overview stays on for everyone. Changes apply immediately.
      </p>
      {permissions.map((row) => (
        <RoleCard key={row.role} row={row} />
      ))}
    </div>
  );
}
