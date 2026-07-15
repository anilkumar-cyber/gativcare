import { NextResponse } from "next/server";
import { z } from "zod";
import { sendPartnerInquiry } from "@/lib/email";

const partnerSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = partnerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
  }

  try {
    await sendPartnerInquiry(parsed.data);
  } catch (err) {
    console.error("Failed to send partner inquiry email:", err);
    return NextResponse.json({ error: "Could not send your inquiry right now. Please email us directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
