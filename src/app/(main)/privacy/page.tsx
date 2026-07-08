import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | GativCare",
  description: "How GativCare collects, uses, and protects your personal and medical information.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="July 8, 2026">
      <LegalSection title="1. Introduction">
        <p>
          GativCare (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates gativcare.com as a medical tourism
          facilitation platform connecting international patients with hospitals in India. This policy explains what
          information we collect when you use our site, contact form, AI chat assistant, or patient dashboard, and how
          we use and protect it.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>Depending on how you interact with us, we may collect:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Contact details you submit through our consultation form (name, email, phone, country, treatment interest, message).</li>
          <li>Medical reports and documents you choose to upload for review by our medical coordinators.</li>
          <li>Account information if you register a patient dashboard (name, email, hashed password — we never store your password in plain text).</li>
          <li>Appointment and treatment records created once you begin coordinating care through the platform.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>
          We use the information you provide to respond to your enquiry, match you with suitable hospitals and
          doctors, coordinate your medical visa and travel, and manage your ongoing care through your patient
          dashboard. We do not sell your personal or medical information to third parties.
        </p>
      </LegalSection>

      <LegalSection title="4. Medical Reports and Sensitive Data">
        <p>
          Medical reports you upload are stored securely and are only accessible to you and authorized GativCare
          administrators reviewing your case. Files are served through an authenticated endpoint, not a public link.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Sharing with Hospitals and Doctors">
        <p>
          Once you proceed with a specific hospital or doctor, relevant parts of your enquiry and medical reports are
          shared with that hospital&apos;s care team so they can prepare a treatment plan — this is essential to the
          service you&apos;ve requested. We do not share your data with unrelated third parties for marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies">
        <p>
          We use a minimal session cookie to keep you signed in to your patient/doctor/hospital/admin dashboard. We do
          not currently use third-party advertising or tracking cookies.
        </p>
      </LegalSection>

      <LegalSection title="7. Your Rights">
        <p>
          You can request a copy of the personal data we hold about you, ask us to correct inaccurate information, or
          request deletion of your account and associated records, by emailing us at the address below.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <p>
          For any privacy-related questions or requests, email <a href="mailto:care@gativcare.com" className="text-primary">care@gativcare.com</a> or
          call <a href="tel:+918886963612" className="text-primary">+91 88869 63612</a>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
