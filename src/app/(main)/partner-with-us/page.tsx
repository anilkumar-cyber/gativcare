import type { Metadata } from "next";
import PartnerWithUsClient from "./PartnerWithUsClient";

export const metadata: Metadata = {
  title: "Partner With Us | GativCare",
  description: "Hospitals and healthcare networks interested in working with GativCare's medical travel facilitation platform can get in touch here.",
};

export default function PartnerWithUsPage() {
  return <PartnerWithUsClient />;
}
