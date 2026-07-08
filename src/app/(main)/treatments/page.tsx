import type { Metadata } from "next";
import TreatmentsClient from "./TreatmentsClient";

export const metadata: Metadata = {
  title: "Treatments | GativCare",
  description: "Browse world-class medical treatments available in India through GativCare — cardiology, orthopedics, oncology, IVF, dental, and more, at a fraction of Western costs.",
};

export default function TreatmentsPage() {
  return <TreatmentsClient />;
}
