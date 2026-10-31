/**
 * Sequential admin video uploader (Bearer auth).
 *
 * Mirrors the in-app two-phase flow (client token → Blob put → complete)
 * so 60 MB files never hit a Vercel Function body. Runs ONE file at a time
 * to avoid media-manifest.json write races.
 *
 * Usage (PowerShell):
 *   $env:PRODUCTION_SMOKE_URL = "https://0-recovery-mate.vercel.app"
 *   $env:UPLOAD_ADMIN_TOKEN   = "<paste from password manager — never commit>"
 *   node scripts/admin-upload-batch.mjs
 *
 * Optional:
 *   $env:UPLOAD_VIDEOS_DIR = "C:\Users\...\Desktop\Recoverymate videos\0Finalized"
 *   $env:UPLOAD_DRY_RUN = "1"   # print plan only
 */

import { createReadStream, existsSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { put } from "@vercel/blob/client";

const BASE = (process.env.PRODUCTION_SMOKE_URL || "https://0-recovery-mate.vercel.app").replace(
  /\/$/,
  ""
);
const TOKEN = process.env.UPLOAD_ADMIN_TOKEN?.trim() ?? "";
const DIR =
  process.env.UPLOAD_VIDEOS_DIR?.trim() ||
  join(process.env.USERPROFILE || "", "Desktop", "Recoverymate videos", "0Finalized");
const DRY = process.env.UPLOAD_DRY_RUN === "1";

/** Local Chinese filename → exercise id (handover §6). */
const BATCH = [
  {
    file: "肩：过肩三头+肩后侧拉伸.mp4",
    exerciseId: "shoulder-overhead-triceps-rear-stretch",
    part: "shoulder",
  },
  {
    file: "肩：背后双手相扣开肩.mp4",
    exerciseId: "shoulder-clasped-hands-chest-opener",
    part: "shoulder",
  },
  {
    file: "肩：交叉抱肩拉伸.mp4",
    exerciseId: "shoulder-cross-body-stretch",
    part: "shoulder",
  },
  {
    file: "小臂：前臂伸肌拉伸.mp4",
    exerciseId: "arm-forearm-extensor-stretch",
    part: "arm",
  },
  {
    file: "小臂：前臂屈肌拉伸.mp4",
    exerciseId: "arm-forearm-flexor-stretch",
    part: "arm",
  },
  {
    file: "腰背--猫牛式 .mp4",
    exerciseId: "lower-back-cat-cow",
    part: "lower-back",
  },
  {
    file: "腰背：婴儿式.mp4",
    exerciseId: "lower-back-childs-pose",
    part: "lower-back",
  },
  {
    file: "膝盖：站立股四头肌拉伸.mp4",
    exerciseId: "knee-standing-quad-stretch",
    part: "knee",
  },
  {
    file: "膝盖：坐姿腘绳肌拉伸.mp4",
    exerciseId: "knee-seated-hamstring-stretch",
    part: "knee",
  },
  {
    file: "小腿：推墙腓肠肌拉伸.mp4",
    exerciseId: "calf-wall-gastrocnemius-stretch",
    part: "calf",
  },
  {
    file: "小腿：台阶腓肠肌拉伸.mp4",
    exerciseId: "calf-stair-depth-stretch",
    part: "calf",
  },
];

async function api(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${path} → ${res.status}: ${data.error ?? JSON.stringify(data)}`);
  }
  return data;
}

async function uploadOne({ file, exerciseId }) {
  const full = join(DIR, file);
  if (!existsSync(full)) throw new Error(`missing file: ${full}`);
  const size = statSync(full).size;
  const mb = (size / (1024 * 1024)).toFixed(1);

  console.log(`\n→ ${exerciseId}`);
  console.log(`  file: ${basename(full)} (${mb} MB)`);

  if (DRY) {
    console.log("  dry-run: skip");
    return;
  }

  const auth = await api("/api/admin/upload", { exerciseId, kind: "video" });
  console.log(`  authorized → ${auth.pathname}`);

  await put(auth.pathname, createReadStream(full), {
    access: "public",
    token: auth.clientToken,
    contentType: auth.mimeTypes?.[0] ?? "video/mp4",
    multipart: size > 4 * 1024 * 1024,
    onUploadProgress: (p) => {
      if (p.percentage === 100 || p.percentage % 10 < 1) {
        process.stdout.write(`\r  uploading… ${Math.round(p.percentage)}%   `);
      }
    },
  });
  process.stdout.write("\n");

  await api("/api/admin/upload/complete", { exerciseId, kind: "video" });
  console.log(`  ✓ live at ${BASE}/exercise/${exerciseId}`);
}

async function main() {
  console.log(`Base:  ${BASE}`);
  console.log(`Dir:   ${DIR}`);
  console.log(`Items: ${BATCH.length}`);
  if (!DRY && !TOKEN) {
    console.error("Set UPLOAD_ADMIN_TOKEN (from your password manager). Do not commit it.");
    process.exit(1);
  }

  let ok = 0;
  for (const item of BATCH) {
    try {
      await uploadOne(item);
      ok += 1;
    } catch (err) {
      console.error(`  ✗ ${err instanceof Error ? err.message : err}`);
      console.error("Stopping (sequential batch — fix then re-run; re-upload is safe).");
      process.exit(1);
    }
  }
  console.log(`\nDone: ${ok}/${BATCH.length} uploaded.`);
}

main();
