import type { Metadata } from "next";
import { requireSession } from "@/lib/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireSession();
  return <>{children}</>;
}
