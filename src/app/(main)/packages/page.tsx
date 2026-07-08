import type { Metadata } from "next";
import PackagesClient from "./PackagesClient";

export const metadata: Metadata = {
  title: "Treatment Packages | GativCare",
  description: "All-inclusive medical tourism packages covering surgery, hospital stay, accommodation, transfers, and coordination — starting from affordable, transparent pricing.",
};

export default function PackagesPage() {
  return <PackagesClient />;
}
