"use client";

import { useState, useTransition } from "react";
import { CalendarClock } from "lucide-react";
import { sendDueFollowUpsAction } from "@/lib/actions/journey";

export function SendFollowUpsButton({ dueCount }: { dueCount: number }) {
  const [result, setResult] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => startTransition(async () => setResult((await sendDueFollowUpsAction()).sent))}
        disabled={pending || dueCount === 0}
        className="btn-primary text-sm px-4 py-2 flex items-center gap-2 disabled:opacity-60"
      >
        <CalendarClock size={14} /> {pending ? "Sending..." : `Send Due Follow-ups (${dueCount})`}
      </button>
      {result !== null && <span className="text-sm text-green-600">Sent {result} reminder{result === 1 ? "" : "s"}.</span>}
    </div>
  );
}
