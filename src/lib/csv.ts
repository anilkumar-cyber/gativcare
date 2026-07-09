import "server-only";

function escapeCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv<T extends Record<string, unknown>>(rows: T[], columns: (keyof T)[]): string {
  const header = columns.join(",");
  const body = rows.map((row) => columns.map((col) => escapeCell(row[col])).join(","));
  return [header, ...body].join("\n");
}
