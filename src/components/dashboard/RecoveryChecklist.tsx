"use client";

import { useState, useTransition } from "react";
import { CheckCircle2, Circle, Plus } from "lucide-react";
import { addRecoveryTaskAction, completeRecoveryTaskAction } from "@/lib/actions/journey";

type Task = { id: string; title: string; dueDate: Date | null; completedAt: Date | null; notes: string | null };

export function RecoveryChecklist({ patientId, tasks, canAdd = false }: { patientId: string; tasks: Task[]; canAdd?: boolean }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const pendingTasks = tasks.filter((t) => !t.completedAt);
  const doneTasks = tasks.filter((t) => t.completedAt);

  function complete(id: string) {
    const formData = new FormData();
    formData.set("id", id);
    startTransition(() => completeRecoveryTaskAction(formData));
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Recovery Checklist</h3>
        {canAdd && (
          <button onClick={() => setOpen(!open)} className="text-sm text-primary font-medium flex items-center gap-1">
            <Plus size={14} /> Add Task
          </button>
        )}
      </div>

      {canAdd && open && (
        <form
          action={(formData) => { startTransition(() => addRecoveryTaskAction(formData)); setOpen(false); }}
          className="grid sm:grid-cols-2 gap-3 mb-5 p-4 rounded-xl bg-surface border border-border"
        >
          <input type="hidden" name="patientId" value={patientId} />
          <input name="title" placeholder="Task (e.g. Take antibiotics)" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2" />
          <input name="dueDate" type="date" className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <input name="notes" placeholder="Notes (optional)" className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border" />
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">Add task</button>
        </form>
      )}

      <div className="space-y-2">
        {pendingTasks.map((t) => (
          <div key={t.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface border border-border">
            <button onClick={() => complete(t.id)} disabled={pending} className="mt-0.5 text-muted hover:text-primary flex-shrink-0">
              <Circle size={18} />
            </button>
            <div className="min-w-0">
              <p className="text-sm font-medium">{t.title}</p>
              {t.notes && <p className="text-xs text-muted">{t.notes}</p>}
              {t.dueDate && <p className="text-[11px] text-muted mt-0.5" suppressHydrationWarning>Due {t.dueDate.toLocaleDateString()}</p>}
            </div>
          </div>
        ))}
        {doneTasks.map((t) => (
          <div key={t.id} className="flex items-start gap-3 p-3 rounded-xl bg-surface/50 border border-border opacity-60">
            <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium line-through">{t.title}</p>
              <p className="text-[11px] text-muted mt-0.5" suppressHydrationWarning>Completed {t.completedAt?.toLocaleDateString()}</p>
            </div>
          </div>
        ))}
        {tasks.length === 0 && <p className="text-sm text-muted text-center py-6">No recovery tasks yet.</p>}
      </div>
    </div>
  );
}
