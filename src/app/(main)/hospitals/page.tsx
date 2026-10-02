import type { Metadata } from "next";
import HospitalsClient from "./HospitalsClient";
import { getAllPartnerLogos } from "@/lib/queries/admin";

export const metadata: Metadata = {
  title: "Hospital Networks We Facilitate | GativCare",
  description: "GativCare is an independent medical travel facilitator. Explore JCI and NABH accredited hospital networks across India we help patients coordinate treatment with.",
};

export const dynamic = "force-dynamic";

export default async function HospitalsPage() {
  const partnerLogos = await getAllPartnerLogos();
  return <HospitalsClient partnerLogos={partnerLogos} />;
}
