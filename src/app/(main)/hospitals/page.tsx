import type { Metadata } from "next";
import HospitalsClient from "./HospitalsClient";

export const metadata: Metadata = {
  title: "Partner Hospitals | GativCare",
  description: "Explore JCI and NABH accredited hospitals across India partnered with GativCare for world-class, affordable medical treatment.",
};

export default function HospitalsPage() {
  return <HospitalsClient />;
}
