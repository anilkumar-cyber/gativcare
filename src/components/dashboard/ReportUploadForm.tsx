"use client";

import { useActionState } from "react";
import { Upload } from "lucide-react";
import { uploadReportAction } from "@/lib/actions/reports";

export function ReportUploadForm() {
  const [state, formAction, pending] = useActionState(uploadReportAction, undefined);

  return (
    <form action={formAction} className="flex items-center gap-3 mb-5">
      <input
        type="file"
        name="file"
        required
        accept="application/pdf,image/jpeg,image/png"
        className="flex-1 text-sm file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:text-sm file:font-medium"
      />
      <button type="submit" disabled={pending} className="btn-primary flex items-center gap-2 px-4 py-2 text-sm disabled:opacity-60">
        <Upload size={14} /> {pending ? "Uploading..." : "Upload"}
      </button>
      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
    </form>
  );
}
