import "server-only";
import nodemailer from "nodemailer";
import type { FollowUpType } from "@prisma/client";

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
    cc: "support@gativcare.com",
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

export async function sendPartnerInquiry(inquiry: {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string | null;
}) {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL || "care@gativcare.com";
  const from = process.env.SMTP_USER || to;

  await getTransport().sendMail({
    from: `GativCare Partnerships <${from}>`,
    to,
    cc: "support@gativcare.com",
    replyTo: inquiry.email,
    subject: `New partnership inquiry: ${inquiry.companyName}`,
    text: [
      `Company: ${inquiry.companyName}`,
      `Contact Name: ${inquiry.contactName}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      inquiry.message ? `\nMessage:\n${inquiry.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

const FOLLOW_UP_LABEL: Record<FollowUpType, string> = {
  DAY_30: "1 month",
  DAY_90: "3 months",
  DAY_180: "6 months",
  DAY_365: "1 year",
};

export async function sendFollowUpReminder(patient: { name: string; email: string; type: FollowUpType }) {
  const from = process.env.SMTP_USER || "care@gativcare.com";
  const milestone = FOLLOW_UP_LABEL[patient.type];

  await getTransport().sendMail({
    from: `GativCare Care Team <${from}>`,
    to: patient.email,
    subject: `Checking in — your ${milestone} recovery follow-up`,
    text: [
      `Hi ${patient.name},`,
      "",
      `It's been ${milestone} since your treatment with GativCare, and we'd love to hear how your recovery is going.`,
      "",
      "Reply to this email or log in to your patient dashboard to share an update with your care team.",
      "",
      "— The GativCare Care Team",
    ].join("\n"),
  });
}
