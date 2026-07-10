"use client";

import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { registerAction } from "@/lib/actions/auth";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-border p-8 shadow-lg">
        <Link href="/" className="flex items-center gap-2 justify-center mb-6">
          <Image src="/images/logo-icon.png" alt="GativCare" width={36} height={36} className="w-9 h-9" />
          <span className="font-bold text-gradient text-lg">GativCare</span>
        </Link>

        <h1 className="text-xl font-bold text-center mb-1">Create your patient account</h1>
        <p className="text-sm text-muted text-center mb-6">Track appointments, reports, and your treatment plan</p>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Country</label>
            <input
              type="text"
              name="country"
              className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
              placeholder="United States"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <PasswordInput
              name="password"
              required
              minLength={8}
              className="w-full bg-surface rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 border border-border"
              placeholder="At least 8 characters"
            />
          </div>

          {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

          <button type="submit" disabled={pending} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
            <UserPlus size={16} /> {pending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-muted text-center mt-6">
          Already have an account? <Link href="/login" className="text-primary font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
