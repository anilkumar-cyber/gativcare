"use client";

import { useActionState } from "react";
import { updateProfileAction, changePasswordAction } from "@/lib/actions/admin";

export function SettingsForm({ name, phone, email }: { name: string; phone?: string | null; email: string }) {
  const [profileState, profileAction, profilePending] = useActionState(updateProfileAction, undefined);
  const [passwordState, passwordAction, passwordPending] = useActionState(changePasswordAction, undefined);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Profile</h3>
        <form action={profileAction} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" value={email} disabled className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border opacity-60" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Name</label>
            <input name="name" defaultValue={name} required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone</label>
            <input name="phone" defaultValue={phone ?? ""} className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          {profileState?.error && <p className="text-sm text-red-500">{profileState.error}</p>}
          {profileState?.success && <p className="text-sm text-green-600">Profile updated.</p>}
          <button type="submit" disabled={profilePending} className="btn-primary text-sm px-4 py-2 disabled:opacity-60">
            {profilePending ? "Saving..." : "Save profile"}
          </button>
        </form>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-border p-6">
        <h3 className="font-semibold mb-5">Change password</h3>
        <form action={passwordAction} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Current password</label>
            <input type="password" name="currentPassword" required className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">New password</label>
            <input type="password" name="newPassword" required minLength={8} className="w-full bg-surface rounded-xl px-4 py-2.5 text-sm border border-border outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          {passwordState?.error && <p className="text-sm text-red-500">{passwordState.error}</p>}
          {passwordState?.success && <p className="text-sm text-green-600">Password changed.</p>}
          <button type="submit" disabled={passwordPending} className="btn-primary text-sm px-4 py-2 disabled:opacity-60">
            {passwordPending ? "Saving..." : "Change password"}
          </button>
        </form>
      </div>
    </div>
  );
}
