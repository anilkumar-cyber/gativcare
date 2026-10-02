import { NextResponse } from "next/server";
import { readUploadedFile } from "@/lib/uploads";

const CONTENT_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

export async function GET(_req: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  if (!/^[a-zA-Z0-9-]+\.(png|jpe?g|webp)$/.test(filename)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const ext = filename.slice(filename.lastIndexOf("."));
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    const buffer = await readUploadedFile(`partners/${filename}`);
    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
