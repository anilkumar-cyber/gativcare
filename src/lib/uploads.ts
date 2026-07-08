import "server-only";
import { randomUUID } from "crypto";
import { mkdir, writeFile, readFile } from "fs/promises";
import path from "path";

const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export class UploadValidationError extends Error {}

function getUploadsDir(): string {
  return process.env.UPLOADS_DIR ?? path.join(/* turbopackIgnore: true */ process.cwd(), "uploads");
}

export async function saveUpload(file: File): Promise<{
  fileName: string;
  storedPath: string;
  mimeType: string;
  sizeBytes: number;
}> {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new UploadValidationError(`Unsupported file type: ${file.type || "unknown"}. Only PDF, JPG, and PNG are allowed.`);
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new UploadValidationError("File exceeds the 10MB size limit.");
  }

  const dir = getUploadsDir();
  await mkdir(dir, { recursive: true });

  const ext = path.extname(file.name) || (file.type === "application/pdf" ? ".pdf" : file.type === "image/png" ? ".png" : ".jpg");
  const storedName = `${randomUUID()}${ext}`;
  const storedPath = path.join(dir, storedName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(storedPath, buffer);

  return { fileName: file.name, storedPath: storedName, mimeType: file.type, sizeBytes: file.size };
}

export async function readUploadedFile(storedPath: string): Promise<Buffer> {
  const dir = getUploadsDir();
  return readFile(path.join(dir, storedPath));
}
