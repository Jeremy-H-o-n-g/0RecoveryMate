import { readdirSync, readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Repeatable JS-chunk size report (docs/PerformanceBudget.md §6).
 * Lists every client chunk with raw + gzip bytes and flags any chunk that
 * still embeds Zod (the E1 regression guard: home must stay zod-free).
 * Run after `npm run build`.
 */
const root = fileURLToPath(new URL("..", import.meta.url));
const dir = join(root, ".next", "static", "chunks");

const rows = [];
let totalRaw = 0;
let totalGzip = 0;
for (const name of readdirSync(dir)) {
  if (!name.endsWith(".js")) continue;
  const buf = readFileSync(join(dir, name));
  const gz = gzipSync(buf).length;
  totalRaw += buf.length;
  totalGzip += gz;
  rows.push({ name, raw: buf.length, gzip: gz, zod: buf.includes("ZodError") });
}
rows.sort((a, b) => b.gzip - a.gzip);

console.log("chunk (gzip)        raw        zod?  file");
for (const r of rows) {
  console.log(
    `${String((r.gzip / 1024).toFixed(1)).padStart(7)} KB  ${String(
      (r.raw / 1024).toFixed(1)
    ).padStart(8)} KB  ${r.zod ? "YES " : "no  "}  ${r.name}`
  );
}
console.log(
  `\ntotal: ${(totalRaw / 1024).toFixed(1)} KB raw / ${(totalGzip / 1024).toFixed(1)} KB gzip`
);
const zodChunks = rows.filter((r) => r.zod);
if (zodChunks.length > 0) {
  console.error(`E1 REGRESSION: zod present in: ${zodChunks.map((r) => r.name).join(", ")}`);
  process.exit(1);
}
console.log("E1 guard: no client chunk embeds Zod.");
