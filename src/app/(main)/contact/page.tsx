import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | GativCare",
  description: "Get in touch with GativCare's medical coordinators for a free consultation. Available 24/7 by phone, email, or WhatsApp.",
};

export default function ContactPage() {
  return <ContactClient />;
}
