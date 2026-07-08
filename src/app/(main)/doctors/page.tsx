import type { Metadata } from "next";
import DoctorsClient from "./DoctorsClient";

export const metadata: Metadata = {
  title: "Our Doctors | GativCare",
  description: "Meet GativCare's network of top-rated specialist doctors across India's leading hospitals, with decades of experience and international training.",
};

export default function DoctorsPage() {
  return <DoctorsClient />;
}
