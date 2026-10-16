/**
 * Deterministic body-map encoder (2026-09-05, v5).
 *
 * Re-encodes the owner-supplied AI artwork (`scripts/art-source/
 * muscle-chart-v3-source.png`, 人体图3.png) into the two shipped body-map
 * crops. Replaces the earlier throwaway v3/v4 pipeline after the owner
 * reported "dirt" on the light-yellow fills: v3/v4 were LOSSY webp
 * generations (v4 re-encoded v3), and the double compression left chroma
 * ringing along every muscle boundary — green/dark specks bleeding into the
 * clean pale fills. v5 encodes LOSSLESS PNG straight from the source, so
 * figure pixels are byte-exact.
 *
 * Pipeline (per view):
 *  1. Crop 460x1310 at the PINNED v3/v4 window (see ORIGINS below) — front =
 *     left figure, back = right figure. Recomputing the window from a bbox
 *     center is forbidden here: it shifts the art under the 21 hotspots.
 *  2. Knock the flat studio background out to transparent: BFS over the
 *     near-background mask (per-channel <=32 of the corner color) seeded at
 *     the crop borders, so enclosed interior pockets keep their artwork
 *     color; a 3px alpha ramp on the region frontier preserves the
 *     anti-aliased silhouette instead of a hard cut.
 *  3. Emit `public/anatomy/muscle-chart-v5-{front,back}.webp` encoded at
 *     webp quality 1.0 — which Chromium encodes LOSSLESSLY (verified: 0
 *     drifted pixels vs the source crop; q<=0.97 re-introduces boundary
 *     ringing). New filenames per the cache-immutable contract.
 *  4. Self-check on the FINAL bytes: re-decode the emitted webp and assert
 *     every opaque pixel is byte-identical to the source crop.
 *
 * Run: node scripts/encode-muscle-chart.mjs   (needs the repo's playwright).
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

const SOURCE = "scripts/art-source/muscle-chart-v3-source.png";
const CROP = { w: 460, h: 1310 };
// Crop windows PINNED to the shipped v3/v4 geometry, recovered by offset
// search against the v4 webp bytes (score 1.000 at exactly these origins).
// The 21 hotspot rects in BodyMapFront/BodyMapBack are %-positioned against
// THIS window, so v5 must not recompute it: a fresh bbox center lands 1px off
// horizontally and 1px (front) / 5px (back) off vertically, which would shift
// the artwork under the hotspots. v5 is therefore a pure re-encode.
const ORIGINS = {
  front: { ox: 68, oy: 20 },
  back: { ox: 546, oy: 20 },
};

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();
await page.goto("about:blank");

const srcB64 = readFileSync(SOURCE).toString("base64");
const result = await page.evaluate(async ({ srcB64, CROP, ORIGINS }) => {
  const img = new Image();
  img.src = "data:image/png;base64," + srcB64;
  await img.decode();
  const sc = document.createElement("canvas");
  sc.width = img.naturalWidth;
  sc.height = img.naturalHeight;
  const sg = sc.getContext("2d", { willReadFrequently: true });
  sg.drawImage(img, 0, 0);
  const S = sg.getImageData(0, 0, sc.width, sc.height);

  const bg = [S.data[8], S.data[9], S.data[10]]; // corner (2,2)
  const at = (x, y) => (y * sc.width + x) * 4;
  const nearBg = (i) =>
    Math.abs(S.data[i] - bg[0]) <= 32 &&
    Math.abs(S.data[i + 1] - bg[1]) <= 32 &&
    Math.abs(S.data[i + 2] - bg[2]) <= 32;

  async function encode({ ox, oy }) {
    if (ox < 0 || oy < 0 || ox + CROP.w > sc.width || oy + CROP.h > sc.height)
      throw new Error(`crop window (${ox},${oy})+${CROP.w}x${CROP.h} falls outside the source`);
    const c = document.createElement("canvas");
    c.width = CROP.w;
    c.height = CROP.h;
    const g = c.getContext("2d", { willReadFrequently: true });
    const out = g.createImageData(CROP.w, CROP.h);

    // Copy crop verbatim, opaque.
    for (let y = 0; y < CROP.h; y++)
      for (let x = 0; x < CROP.w; x++) {
        const si = at(ox + x, oy + y);
        const di = (y * CROP.w + x) * 4;
        out.data[di] = S.data[si];
        out.data[di + 1] = S.data[si + 1];
        out.data[di + 2] = S.data[si + 2];
        out.data[di + 3] = 255;
      }

    // Border-seeded BFS over the near-bg mask -> background region.
    const region = new Int32Array(CROP.w * CROP.h).fill(-1); // -1 unvisited
    const isBgMask = (x, y) => nearBg(at(ox + x, oy + y));
    const queue = [];
    const seed = (x, y) => {
      if (x < 0 || y < 0 || x >= CROP.w || y >= CROP.h) return;
      const i = y * CROP.w + x;
      if (region[i] !== -1 || !isBgMask(x, y)) return;
      region[i] = 0;
      queue.push(i);
    };
    for (let x = 0; x < CROP.w; x++) {
      seed(x, 0);
      seed(x, CROP.h - 1);
    }
    for (let y = 0; y < CROP.h; y++) {
      seed(0, y);
      seed(CROP.w - 1, y);
    }
    for (let head = 0; head < queue.length; head++) {
      const i = queue[head];
      const x = i % CROP.w;
      const y = (i - x) / CROP.w;
      const nb = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
      for (const [nx, ny] of nb) {
        if (nx < 0 || ny < 0 || nx >= CROP.w || ny >= CROP.h) continue;
        const ni = ny * CROP.w + nx;
        if (region[ni] === -1 && isBgMask(nx, ny)) {
          region[ni] = region[i] + 1;
          queue.push(ni);
        }
      }
    }

    // Distance-to-figure inside the region, then alpha: deep bg -> 0,
    // 3px frontier ramp preserves the anti-aliased silhouette.
    const dfig = new Int32Array(CROP.w * CROP.h).fill(-1);
    const q2 = [];
    for (let y = 0; y < CROP.h; y++)
      for (let x = 0; x < CROP.w; x++) {
        const i = y * CROP.w + x;
        if (region[i] === -1) continue;
        const nb = [
          [x + 1, y],
          [x - 1, y],
          [x, y + 1],
          [x, y - 1],
        ];
        for (const [nx, ny] of nb) {
          if (nx < 0 || ny < 0 || nx >= CROP.w || ny >= CROP.h) continue;
          if (region[ny * CROP.w + nx] === -1) {
            dfig[i] = 1;
            q2.push(i);
            break;
          }
        }
      }
    for (let head = 0; head < q2.length; head++) {
      const i = q2[head];
      const x = i % CROP.w;
      const y = (i - x) / CROP.w;
      const nb = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
      for (const [nx, ny] of nb) {
        if (nx < 0 || ny < 0 || nx >= CROP.w || ny >= CROP.h) continue;
        const ni = ny * CROP.w + nx;
        if (region[ni] !== -1 && dfig[ni] === -1) {
          dfig[ni] = dfig[i] + 1;
          q2.push(ni);
        }
      }
    }
    let transparent = 0;
    const ramp = [0, 90, 40, 12]; // dfig 1..3 partial, >3 fully transparent
    for (let i = 0; i < CROP.w * CROP.h; i++) {
      if (region[i] === -1) continue;
      const a = dfig[i] <= 3 ? ramp[dfig[i]] : 0;
      out.data[i * 4 + 3] = a;
      if (a === 0) transparent++;
    }
    g.putImageData(out, 0, 0);

    // Final-byte self-check: re-decode the LOSSLESS webp (q=1.0) and assert
    // every opaque pixel is byte-identical to the source crop.
    const blob = await new Promise((r) => c.toBlob(r, "image/webp", 1.0));
    const enc = new Image();
    enc.src = URL.createObjectURL(blob);
    await enc.decode();
    const ec = document.createElement("canvas");
    ec.width = CROP.w;
    ec.height = CROP.h;
    const eg = ec.getContext("2d", { willReadFrequently: true });
    eg.drawImage(enc, 0, 0);
    const back = eg.getImageData(0, 0, CROP.w, CROP.h);
    let mismatch = 0;
    let alphaMismatch = 0;
    for (let i = 0; i < CROP.w * CROP.h; i++) {
      if (back.data[i * 4 + 3] !== out.data[i * 4 + 3]) alphaMismatch++;
      if (back.data[i * 4 + 3] !== 255) continue;
      const si = at(ox + (i % CROP.w), oy + Math.floor(i / CROP.w));
      if (
        back.data[i * 4] !== S.data[si] ||
        back.data[i * 4 + 1] !== S.data[si + 1] ||
        back.data[i * 4 + 2] !== S.data[si + 2]
      )
        mismatch++;
    }
    const webp = await new Promise((r) => {
      const fr = new FileReader();
      fr.onload = () => r(fr.result);
      fr.readAsDataURL(blob);
    });
    return { ox, oy, transparent, mismatch, alphaMismatch, webp };
  }

  const front = await encode(ORIGINS.front);
  const back = await encode(ORIGINS.back);
  return { front, back };
}, { srcB64, CROP, ORIGINS });

for (const [name, r] of [["front", result.front], ["back", result.back]]) {
  const buf = Buffer.from(r.webp.split(",")[1], "base64");
  writeFileSync(`public/anatomy/muscle-chart-v5-${name}.webp`, buf);
  console.log(
    `${name}: origin=(${r.ox},${r.oy}) transparent=${r.transparent} ` +
      `opaqueMismatch=${r.mismatch} alphaMismatch=${r.alphaMismatch} bytes=${buf.length}`
  );
  if (r.mismatch !== 0 || r.alphaMismatch !== 0) {
    console.error(`${name}: LOSSLESS SELF-CHECK FAILED`);
    process.exitCode = 1;
  }
}
await browser.close();
