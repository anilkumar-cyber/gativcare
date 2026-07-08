import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { saveUpload, UploadValidationError } from "@/lib/uploads";
import { sendLeadNotification } from "@/lib/email";
import { LeadSource } from "@prisma/client";

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  country: z.string().optional(),
  treatment: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  const formData = await req.formData();

  const parsed = leadSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country") || undefined,
    treatment: formData.get("treatment") || undefined,
    message: formData.get("message") || undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  const files = formData.getAll("reports").filter((f): f is File => f instanceof File && f.size > 0);

  let savedFiles;
  try {
    savedFiles = await Promise.all(files.map(saveUpload));
  } catch (err) {
    if (err instanceof UploadValidationError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    throw err;
  }

  const lead = await prisma.lead.create({
    data: {
      ...parsed.data,
      source: LeadSource.CONTACT_FORM,
      reports: { create: savedFiles },
    },
  });

  try {
    await sendLeadNotification(parsed.data);
  } catch (err) {
    console.error("Failed to send lead notification email:", err);
  }

  return NextResponse.json({ id: lead.id }, { status: 201 });
}
