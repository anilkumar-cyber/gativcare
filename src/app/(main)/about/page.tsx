import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | GativCare",
  description: "Learn about GativCare's mission to make world-class Indian healthcare accessible to international patients — our story, values, and milestones.",
};

export default function AboutPage() {
  return <AboutClient />;
}
