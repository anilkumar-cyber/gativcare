import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund Policy | GativCare",
  description: "How refunds and cancellations work for GativCare's coordination services and hospital treatment costs.",
};

export default function RefundPage() {
  return (
    <LegalPageLayout title="Refund Policy" updated="July 8, 2026">
      <LegalSection title="1. Consultations">
        <p>
          Initial video/phone consultations booked through GativCare are free of charge, so no refund is applicable.
        </p>
      </LegalSection>

      <LegalSection title="2. Coordination Services">
        <p>
          If you engage GativCare&apos;s coordination services (visa assistance, travel planning, hospital
          introductions) and cancel before any work has begun on your case, you are entitled to a full refund of any
          coordination fee paid to GativCare directly. Once visa processing or travel bookings have started on your
          behalf, fees already incurred with third parties (visa authorities, airlines, hotels) are non-refundable.
        </p>
      </LegalSection>

      <LegalSection title="3. Hospital Treatment Costs">
        <p>
          Treatment costs are billed and collected directly by the treating hospital, not by GativCare. Refunds for
          cancelled or postponed treatment are governed by that hospital&apos;s own refund policy, which will be shared
          with you as part of your treatment plan before you make any payment.
        </p>
      </LegalSection>

      <LegalSection title="4. How to Request a Refund">
        <p>
          Email <a href="mailto:care@gativcare.com" className="text-primary">care@gativcare.com</a> with your name and
          booking details. We aim to respond within 2 business days and, where a GativCare-collected fee is refundable
          under this policy, process it within 7–10 business days.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
