// Derivative-art tool for the muscle chart (see docs/SourceLedger.md §4a):
// removes the source artwork's annotation text, pointer lines and horizontal
// guide lines (per-row background model + hysteresis ink detection outside
// the figure extent, then repaints with the row background), writing
// public/anatomy/muscle-chart-v2.webp from the archived original at
// scripts/art-source/muscle-chart-original.webp.
//
// Run:  node scripts/clean-muscle-chart.mjs clean
// Without the argument it only prints the ASCII color-class maps used for
// hotspot placement (virtual 320x890 per half; col*3.2 = virtual x).
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

mkdirSync("test-results", { recursive: true });
writeFileSync("test-results/clean-host.html", "<html><body></body></html>");

const SRC = "file:///C:/0RecoveryMate/scripts/art-source/muscle-chart-original.webp";

const browser = await chromium.launch({
  args: ["--allow-file-access-from-files"],
});
const page = await browser.newPage();
await page.goto("file:///C:/0RecoveryMate/test-results/clean-host.html");
await page.evaluate((src) => {
  document.body.innerHTML =
    `<img id="i" src="${src}" /><canvas id="c" width="482" height="669"></canvas>`;
}, SRC);
await page.waitForFunction(() => {
  const img = document.getElementById("i");
  return img && img.complete && img.naturalWidth > 0;
});

const result = await page.evaluate(() => {
  const img = document.getElementById("i");
  const c = document.getElementById("c");
  const ctx = c.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, 482, 669);
  const W = 482, H = 669, HALF = 241;
  const data = ctx.getImageData(0, 0, W, H).data;
  const px = (x, y) => {
    const i = (y * W + x) * 4;
    return [data[i], data[i + 1], data[i + 2]];
  };

  // Per-row background = median of the clean center gap between the two
  // figures (x 228-258; whole-row medians get contaminated whenever the
  // bodies cover half the row and then clean margin pixels read as "dirty").
  const bg = [];
  for (let y = 0; y < H; y++) {
    const rs = [], gs = [], bs = [];
    for (let x = 228; x <= 258; x += 2) {
      const [r, g, b] = px(x, y);
      rs.push(r); gs.push(g); bs.push(b);
    }
    const med = (a) => a.sort((p, q) => p - q)[a.length >> 1];
    bg.push([med(rs), med(gs), med(bs)]);
  }
  // Horizontal guide lines cross the center strip and poison those rows'
  // medians; repair them by interpolating between nearest clean rows.
  {
    const dTo = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
    // Window +-16: wider than the ~19-row highlight band, or mid-band rows
    // compare against equally poisoned neighbors and read as "good".
    const good = bg.map((col, y) => {
      if (y < 16 || y >= H - 16) return true;
      const near = [(bg[y - 16][0] + bg[y + 16][0]) / 2, (bg[y - 16][1] + bg[y + 16][1]) / 2, (bg[y - 16][2] + bg[y + 16][2]) / 2];
      // Tight threshold: the gap is always figure-free, so any deviation is
      // an artifact; the cream highlight band only deviates ~17 (a looser
      // threshold let it poison bg[y] and hide from every later detector).
      return dTo(col, near) <= 12;
    });
    for (let y = 0; y < H; y++) {
      if (good[y]) continue;
      let ya = -1, yb = -1;
      for (let dy = 1; dy <= 30; dy++) if (y - dy >= 0 && good[y - dy]) { ya = y - dy; break; }
      for (let dy = 1; dy <= 30; dy++) if (y + dy < H && good[y + dy]) { yb = y + dy; break; }
      if (ya < 0 && yb < 0) continue;
      for (let ch = 0; ch < 3; ch++) {
        if (ya < 0) bg[y][ch] = bg[yb][ch];
        else if (yb < 0) bg[y][ch] = bg[ya][ch];
        else bg[y][ch] = Math.round(bg[ya][ch] + (bg[yb][ch] - bg[ya][ch]) * ((y - ya) / (yb - ya)));
      }
    }
  }
  const mask = new Uint8Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const [r, g, b] = px(x, y);
      mask[y * W + x] =
        Math.abs(r - bg[y][0]) + Math.abs(g - bg[y][1]) + Math.abs(b - bg[y][2]) > 60
          ? 1
          : 0;
    }
  const erode = (m) => {
    const o = new Uint8Array(W * H);
    for (let y = 1; y < H - 1; y++)
      for (let x = 1; x < W - 1; x++) {
        let v = 1;
        for (let dy = -1; dy <= 1 && v; dy++)
          for (let dx = -1; dx <= 1; dx++)
            if (!m[(y + dy) * W + x + dx]) { v = 0; break; }
        o[y * W + x] = v;
      }
    return o;
  };
  const dilate = (m) => {
    const o = new Uint8Array(W * H);
    for (let y = 1; y < H - 1; y++)
      for (let x = 1; x < W - 1; x++) {
        let v = 0;
        for (let dy = -1; dy <= 1 && !v; dy++)
          for (let dx = -1; dx <= 1; dx++)
            if (m[(y + dy) * W + x + dx]) { v = 1; break; }
        o[y * W + x] = v;
      }
    return o;
  };
  // Keep only the two figure-sized components; stray opening survivors
  // (label clusters, line joints) would otherwise stretch a row's extent
  // into the margins and shield annotation pixels via the skip zone.
  const opened = dilate(dilate(erode(erode(mask))));
  const body = new Uint8Array(W * H);
  const seen = new Uint8Array(W * H);
  for (let s = 0; s < W * H; s++) {
    if (!opened[s] || seen[s]) continue;
    const comp = [s];
    seen[s] = 1;
    for (let i = 0; i < comp.length; i++) {
      const p = comp[i], x = p % W, y = (p / W) | 0;
      const nb = [];
      if (x > 0) nb.push(p - 1);
      if (x < W - 1) nb.push(p + 1);
      if (y > 0) nb.push(p - W);
      if (y < H - 1) nb.push(p + W);
      for (const q of nb)
        if (opened[q] && !seen[q]) { seen[q] = 1; comp.push(q); }
    }
    if (comp.length >= 300) for (const p of comp) body[p] = 1;
  }
  // Pale body parts (face/hands/feet: cream-tan, r-b >= 12) sit below the
  // d>60 mask; extend each row's core extent outward through them so the
  // skip zone covers the whole figure (pink margin shadows have r-b < 12
  // and stop the walk).
  const paleRaw = new Uint8Array(W * H);
  for (let p = 0; p < W * H; p++) {
    const r = data[p * 4], g = data[p * 4 + 1], b = data[p * 4 + 2];
    const d = Math.abs(r - bg[(p / W) | 0][0]) + Math.abs(g - bg[(p / W) | 0][1]) + Math.abs(b - bg[(p / W) | 0][2]);
    paleRaw[p] = d > 25 && r - b >= 12 ? 1 : 0;
  }
  // Guide bars share the cream color of hands/feet and the bodies interrupt
  // them, so neither color nor horizontal run separates them; vertical
  // thickness does (bars ~11 rows, hands/feet/face 20-40). Keep pale pixels
  // in vertically thick blobs (>= 14), grafting thin edge columns of a thick
  // blob (>= 6 within 3 px horizontally) so figure edges stay in the skip
  // zone while the bars get cleaned.
  const vt = new Uint16Array(W * H);
  for (let x = 0; x < W; x++) {
    let y = 0;
    while (y < H) {
      if (!paleRaw[y * W + x]) { y++; continue; }
      let y2 = y;
      while (y2 + 1 < H && paleRaw[(y2 + 1) * W + x]) y2++;
      for (let yy = y; yy <= y2; yy++) vt[yy * W + x] = y2 - y + 1;
      y = y2 + 1;
    }
  }
  const pale = new Uint8Array(W * H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (!paleRaw[p]) continue;
      if (vt[p] >= 14) { pale[p] = 1; continue; }
      if (vt[p] >= 6)
        for (let dx = -3; dx <= 3; dx++) {
          const xx = x + dx;
          if (xx >= 0 && xx < W && vt[y * W + xx] >= 14) { pale[p] = 1; break; }
        }
    }
  const rowRange = (y, x0, x1) => {
    let lo = -1, hi = -1;
    for (let x = x0; x < x1; x++)
      if (body[y * W + x]) { if (lo < 0) lo = x; hi = x; }
    if (lo < 0) return [-1, -1];
    // Step through body/pale pixels; also step over a thin dark divider
    // (face panel lines) when figure pixels resume within 8 px beyond it.
    // Pointer lines never qualify: nothing figure-like lies beyond them.
    const fig = (x) => body[y * W + x] || pale[y * W + x];
    const ahead = (x, dir) => {
      for (let k = 1; k <= 8; k++) {
        const xx = x + dir * k;
        if (xx < x0 || xx >= x1) return false;
        if (fig(xx)) return true;
      }
      return false;
    };
    while (lo - 1 >= x0 && (fig(lo - 1) || ahead(lo - 1, -1))) lo--;
    while (hi + 1 < x1 && (fig(hi + 1) || ahead(hi + 1, 1))) hi++;
    return [lo, hi];
  };
  const dist = (x, y) => {
    const [r, g, b] = px(x, y);
    return Math.abs(r - bg[y][0]) + Math.abs(g - bg[y][1]) + Math.abs(b - bg[y][2]);
  };
  // Annotation = outside the body extent (+4 for outline/shadow), connected
  // to a STRONG ink pixel (d >= 60: text strokes/pointer lines/line shadows
  // measure 60-210), and itself above the weak threshold (d > 15) so
  // anti-aliased glyph and shadow edges come along.
  const skip = new Uint8Array(W * H);
  const weak = new Uint8Array(W * H);
  const ann = new Uint8Array(W * H);
  const seeds = [];
  for (let y = 0; y < H; y++) {
    const [fLo, fHi] = rowRange(y, 0, HALF);
    const [bLo, bHi] = rowRange(y, HALF, W);
    for (let x = 0; x < W; x++) {
      const [lo, hi] = x < HALF ? [fLo, fHi] : [bLo, bHi];
      if (lo < 0) continue;
      if (x >= lo - 4 && x <= hi + 4) skip[y * W + x] = 1; // body+outline+shadow kept
    }
  }
  // Guide-bar pixels: cream like hands/feet but too vertically thin to be
  // figure (vt < 14, not grafted) and outside the body skip zone => they are
  // the bars; mark them annotation directly (their d never reaches the
  // hysteresis seed threshold, so ink detection alone would leave them).
  for (let p = 0; p < W * H; p++)
    if (paleRaw[p] && !pale[p] && !skip[p]) ann[p] = 1;
  // The hand-height highlight band is even lower contrast (d <= ~25, below
  // every detector) but spans the margins/gap in one row band. Detect rows
  // with a bar-like cream run outside the skip zone, then repaint the band
  // (cream rows + their gray shadow rows) with the row background.
  // Bar-like = cream ink, or whiter than the local row background. Measured
  // only in the center gap (bg is the gap's own median, so the white bar is
  // measurable there while figure shadows never enter).
  const barLike = (x, y) => {
    const [r, g, b] = px(x, y);
    const [br, bgg, bb] = bg[y];
    const d = Math.abs(r - br) + Math.abs(g - bgg) + Math.abs(b - bb);
    return (d > 12 && r - b >= 10) || (d > 3 && r >= br - 1 && g >= bgg - 4 && b >= bb + 3);
  };
  const barRow = [];
  for (let y = 0; y < H; y++) {
    let n = 0;
    // x 240-256: between the two figures' hands (227-237 / 261-271), so only
    // the bar itself ever reads bar-like here.
    for (let x = 240; x <= 256; x++) if (barLike(x, y)) n++;
    barRow.push(n >= 12);
  }
  const inBand = new Uint8Array(H);
  for (let y = 0; y < H; y++)
    for (let dy = -3; dy <= 3; dy++) {
      const yy = y + dy;
      if (yy >= 0 && yy < H && barRow[yy]) { inBand[y] = 1; break; }
    }
  // Outside the bodies the band (cream rows + gray shadow rows) is plain
  // background once removed; over the bodies it is repainted vertically in
  // the fill stage (vert[]), so body colors crossed by the bar reconnect.
  for (let y = 0; y < H; y++) {
    if (!inBand[y]) continue;
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (skip[p] || ann[p]) continue;
      if (barLike(x, y)) ann[p] = 1;
    }
  }
  for (let p = 0; p < W * H; p++) {
    if (skip[p]) continue;
    const dv = dist(p % W, (p / W) | 0);
    if (dv > 15) weak[p] = 1;
    if (dv >= 60) seeds.push(p);
  }
  for (const s of seeds) {
    if (ann[s]) continue;
    const stack = [s];
    ann[s] = 1;
    while (stack.length) {
      const p = stack.pop();
      const x = p % W, y = (p / W) | 0;
      const nb = [];
      if (x > 0) nb.push(p - 1);
      if (x < W - 1) nb.push(p + 1);
      if (y > 0) nb.push(p - W);
      if (y < H - 1) nb.push(p + W);
      for (const q of nb)
        if (weak[q] && !ann[q]) { ann[q] = 1; stack.push(q); }
    }
  }
  // Cleanup pass: faint line/text remnants (d 5-15) that no seed reached are
  // still annotation if they sit within 8 px of removed ink (they are the
  // tails of the same lines). Webp noise elsewhere is left alone.
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (ann[p] || skip[p]) continue;
      if (dist(x, y) <= 5) continue;
      let near = false;
      for (let dy = -8; dy <= 8 && !near; dy++)
        for (let dx = -8; dx <= 8 && !near; dx++) {
          const xx = x + dx, yy = y + dy;
          if (xx >= 0 && yy >= 0 && xx < W && yy < H && ann[yy * W + xx]) near = true;
        }
      if (near) ann[p] = 1;
    }
  // Band pixels inside the body skip zone (the bar is drawn over the
  // figure): its white core / cream stubs are not figure-pale and not dark
  // outline. Marked after the cleanup pass so that one cannot spread into
  // the body slivers the bar crosses.
  const vert = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    if (!inBand[y]) continue;
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      if (ann[p] || pale[p] || !skip[p]) continue;
      if (barLike(x, y)) { ann[p] = 1; vert[p] = 1; }
    }
  }
  // Fill annotation pixels with the row background (the bg is horizontally
  // uniform and graded vertically, so bg[y] is the exact local color;
  // sampling "nearest non-ann" would drag body colors into shadow rings).
  // Band-over-body pixels instead copy the nearest row outside the band so
  // crossed body colors reconnect.
  for (let p = 0; p < W * H; p++) {
    if (!ann[p]) continue;
    const y = (p / W) | 0, i = p * 4;
    if (vert[p]) {
      const x = p % W;
      // Source rows must also not be bar-like, or the bar's own white halo
      // rows would be copied into the body.
      let up = -1, dn = -1;
      for (let dy = 1; dy <= 40 && (up < 0 || dn < 0); dy++) {
        if (up < 0 && y - dy >= 0 && !inBand[y - dy] && !barLike(x, y - dy)) up = y - dy;
        if (dn < 0 && y + dy < H && !inBand[y + dy] && !barLike(x, y + dy)) dn = y + dy;
      }
      const sy = up < 0 ? dn : dn < 0 ? up : y - up <= dn - y ? up : dn;
      if (sy >= 0) {
        const j = (sy * W + x) * 4;
        data[i] = data[j]; data[i + 1] = data[j + 1]; data[i + 2] = data[j + 2];
        continue;
      }
    }
    data[i] = bg[y][0]; data[i + 1] = bg[y][1]; data[i + 2] = bg[y][2];
  }
  ctx.putImageData(new ImageData(data, W, H), 0, 0);
  const cleanedUrl = c.toDataURL("image/webp", 0.95);

  // ---- ASCII color-class map (ground truth for hotspot placement) ----
  // 100 cols x 166 rows per half; each char = 3.2 x ~5.36 virtual units.
  const hueOf = (r, g, b) => {
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (mx === mn) return [-1, 0, mx];
    const d = mx - mn;
    let h;
    if (mx === r) h = ((g - b) / d + 6) % 6;
    else if (mx === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    return [h * 60, d, mx];
  };
  const cls = (x, y) => {
    const [r, g, b] = px(x, y);
    const [br, bgr, bb] = bg[y];
    if (Math.abs(r - br) + Math.abs(g - bgr) + Math.abs(b - bb) < 55) return ".";
    const [h, s, v] = hueOf(r, g, b);
    if (v < 100) return "#";
    if (s < 30) return v > 200 ? "C" : "o";
    if (h < 14 || h >= 345) return "R";
    if (h < 40) return "r";
    if (h < 70) return "C";
    if (h < 170) return "G";
    if (h < 200) return "T";
    if (h < 250) return "B";
    if (h < 320) return "L";
    return "P";
  };
  const mapHalf = (half) => {
    const lines = [];
    let ruler = "    x";
    for (let cx = 0; cx < 100; cx++)
      ruler += cx % 10 === 0 ? String(cx / 10) : (cx % 5 === 0 ? "+" : " ");
    lines.push(ruler + "   (col*3.2 = virtual x)");
    for (let ry = 0; ry < 166; ry++) {
      const y = Math.round(ry * (H / 166));
      let s = "";
      for (let cx = 0; cx < 100; cx++) {
        const x = Math.round((half ? HALF : 0) + cx * (HALF / 100));
        s += cls(x, y);
      }
      const vy = Math.round(ry * (890 / 166));
      lines.push(String(vy).padStart(4) + (ry % 10 === 0 ? "|" : " ") + s);
    }
    return lines.join("\n");
  };
  return { cleanedUrl, maps: [mapHalf(0), mapHalf(1)] };
});

console.log("=== FRONT (virtual coords; col n = x " + (320 / 100).toFixed(2) + "/col) ===");
console.log(result.maps[0]);
console.log("=== BACK ===");
console.log(result.maps[1]);
if (process.argv[2] === "clean") {
  writeFileSync(
    "public/anatomy/muscle-chart-v2.webp",
    Buffer.from(result.cleanedUrl.split(",")[1], "base64")
  );
  console.log("wrote public/anatomy/muscle-chart-v2.webp");
}
await browser.close();
