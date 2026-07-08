import "server-only";
import { Resend } from "resend";

function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY env var is not set");
  return new Resend(apiKey);
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone: string;
  country?: string | null;
  treatment?: string | null;
  message?: string | null;
}) {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL || "care@gativcare.com";

  await getResend().emails.send({
    from: "GativCare Leads <leads@gativcare.com>",
    to,
    replyTo: lead.email,
    subject: `New enquiry: ${lead.name}${lead.treatment ? ` — ${lead.treatment}` : ""}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      lead.country ? `Country: ${lead.country}` : null,
      lead.treatment ? `Treatment: ${lead.treatment}` : null,
      lead.message ? `\nMessage:\n${lead.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}
