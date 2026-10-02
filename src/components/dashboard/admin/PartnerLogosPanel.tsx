"use client";

import { useRef, useState, useTransition } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown, X } from "lucide-react";
import { addPartnerLogoAction, deletePartnerLogoAction, movePartnerLogoAction } from "@/lib/actions/admin";

type PartnerLogo = { id: string; name: string; logoUrl: string };

export function PartnerLogosPanel({ logos }: { logos: PartnerLogo[] }) {
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      const result = await addPartnerLogoAction(undefined, formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setError(undefined);
        setAdding(false);
        formRef.current?.reset();
      }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold">Partner Logos ({logos.length})</h3>
        <button onClick={() => setAdding(!adding)} className="btn-primary text-sm px-3 py-1.5 flex items-center gap-1.5">
          {adding ? <X size={14} /> : <Plus size={14} />} {adding ? "Cancel" : "Add Logo"}
        </button>
      </div>

      <p className="text-xs text-muted mb-5">
        These logos appear in the &quot;Official Partner Hospital Networks&quot; slider on the homepage and the Hospitals page.
      </p>

      {adding && (
        <form ref={formRef} action={formAction} className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-surface border border-border">
          <input name="name" placeholder="Partner name (e.g. Apollo Hospitals)" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2" />
          <input name="file" type="file" accept="image/png,image/jpeg,image/webp" required className="bg-white dark:bg-slate-900 rounded-lg px-3 py-2 text-sm border border-border sm:col-span-2 file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:bg-primary/10 file:text-primary" />
          <p className="text-xs text-muted sm:col-span-2">JPG, PNG, or WEBP — up to 4MB.</p>
          {error && <p className="text-sm text-red-500 sm:col-span-2">{error}</p>}
          <button type="submit" disabled={pending} className="btn-primary text-sm px-4 py-2 sm:col-span-2 disabled:opacity-60">
            {pending ? "Uploading..." : "Add logo"}
          </button>
        </form>
      )}

      <div className="space-y-3">
        {logos.map((logo, i) => (
          <div key={logo.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-surface border border-border">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center justify-center h-14 w-24 shrink-0 rounded-lg bg-white dark:bg-slate-800 border border-border p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo.logoUrl} alt={`${logo.name} logo`} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="text-sm font-medium truncate">{logo.name}</p>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <form action={movePartnerLogoAction}>
                <input type="hidden" name="id" value={logo.id} />
                <input type="hidden" name="direction" value="up" />
                <button type="submit" disabled={i === 0} className="p-2 rounded-lg hover:bg-surface-hover text-muted disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Move up">
                  <ArrowUp size={14} />
                </button>
              </form>
              <form action={movePartnerLogoAction}>
                <input type="hidden" name="id" value={logo.id} />
                <input type="hidden" name="direction" value="down" />
                <button type="submit" disabled={i === logos.length - 1} className="p-2 rounded-lg hover:bg-surface-hover text-muted disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Move down">
                  <ArrowDown size={14} />
                </button>
              </form>
              <form action={deletePartnerLogoAction}>
                <input type="hidden" name="id" value={logo.id} />
                <button type="submit" className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </form>
            </div>
          </div>
        ))}
        {logos.length === 0 && <p className="text-sm text-muted text-center py-6">No partner logos yet. Add your first one.</p>}
      </div>
    </div>
  );
}
