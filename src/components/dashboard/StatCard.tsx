"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <motion.div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-border card-hover" whileHover={{ scale: 1.02 }}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
        <span className="text-xs text-muted font-medium">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
      {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
    </motion.div>
  );
}

export function AnimatedBar({ pct, colorClass = "bg-primary" }: { pct: number; colorClass?: string }) {
  return (
    <div className="w-full h-2 rounded-full bg-border overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
