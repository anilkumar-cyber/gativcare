import "server-only";
import nodemailer from "nodemailer";

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASSWORD env vars must be set");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
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
  const from = process.env.SMTP_USER || to;

  await getTransport().sendMail({
    from: `GativCare Leads <${from}>`,
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
