import type { Metadata } from "next";
import HospitalsClient from "./HospitalsClient";

export const metadata: Metadata = {
  title: "Hospital Networks We Facilitate | GativCare",
  description: "GativCare is an independent medical travel facilitator. Explore JCI and NABH accredited hospital networks across India we help patients coordinate treatment with.",
};

export default function HospitalsPage() {
  return <HospitalsClient />;
}
