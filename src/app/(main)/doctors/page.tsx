import type { Metadata } from "next";
import DoctorsClient from "./DoctorsClient";
import { getPublicDoctors } from "@/lib/queries/admin";

export const metadata: Metadata = {
  title: "Our Doctors | GativCare",
  description: "Meet GativCare's network of top-rated specialist doctors across India's leading hospitals, with decades of experience and international training.",
};

export const dynamic = "force-dynamic";

export default async function DoctorsPage() {
  const doctors = await getPublicDoctors();
  return <DoctorsClient doctors={doctors} />;
}
