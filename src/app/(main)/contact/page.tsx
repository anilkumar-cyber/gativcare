import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | GativCare",
  description: "Get in touch with GativCare's medical coordinators for a free consultation. Available 24/7 by phone, email, or WhatsApp.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ doctor?: string; type?: string }>;
}) {
  const { doctor, type } = await searchParams;
  return <ContactClient prefillDoctor={doctor} prefillType={type} />;
}
