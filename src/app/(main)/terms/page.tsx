import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | GativCare",
  description: "The terms governing your use of the GativCare medical tourism facilitation platform.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" updated="July 8, 2026">
      <LegalSection title="1. Who We Are">
        <p>
          GativCare is a medical tourism facilitation platform. We connect international patients with independent,
          accredited hospitals and doctors in India, and coordinate logistics such as medical visas, travel, and
          accommodation. We are not a hospital, and we do not employ the doctors who treat you.
        </p>
      </LegalSection>

      <LegalSection title="2. Medical Disclaimer">
        <p>
          All diagnoses, treatment plans, and medical advice are provided solely by the licensed hospitals and doctors
          you are matched with — not by GativCare. Our AI chat assistant provides general information only and is not
          a substitute for professional medical advice. Always consult a qualified doctor before making treatment
          decisions.
        </p>
      </LegalSection>

      <LegalSection title="3. Your Responsibilities">
        <p>
          You agree to provide accurate information about your medical history and travel details, and to review any
          treatment plan and cost estimate directly with the treating hospital before travelling.
        </p>
      </LegalSection>

      <LegalSection title="4. Payments">
        <p>
          GativCare does not currently process treatment payments on this platform. Costs shown on the site are
          estimates; the treating hospital will provide a final quote and collect payment directly from you, typically
          by bank transfer or card, following its own billing process.
        </p>
      </LegalSection>

      <LegalSection title="5. Limitation of Liability">
        <p>
          GativCare facilitates introductions and logistics but is not liable for the medical outcomes of treatment
          provided by independent hospitals and doctors. Our liability for any issue arising from use of this platform
          is limited to the extent permitted by applicable law.
        </p>
      </LegalSection>

      <LegalSection title="6. Account Use">
        <p>
          If you register a patient account, you are responsible for keeping your login credentials confidential and
          for all activity under your account.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes to These Terms">
        <p>We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the revised terms.</p>
      </LegalSection>

      <LegalSection title="8. Governing Law">
        <p>These terms are governed by the laws of India, with courts in New Delhi having exclusive jurisdiction.</p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          Questions about these terms can be sent to <a href="mailto:care@gativcare.com" className="text-primary">care@gativcare.com</a>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
