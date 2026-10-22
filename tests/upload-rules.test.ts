import { describe, expect, it } from "vitest";
import {
  KIND_RULES,
  UPLOAD_KINDS,
  URL_FIELDS,
  validateUploadIntent,
} from "../lib/upload-rules";

const MB = 1024 * 1024;

describe("KIND_RULES", () => {
  it("covers every upload kind and maps to a distinct exercise URL field", () => {
    const fields = UPLOAD_KINDS.map((k) => KIND_RULES[k].urlField);
    expect(new Set(fields).size).toBe(UPLOAD_KINDS.length);
    for (const f of fields) expect(URL_FIELDS).toContain(f);
  });

  it("mirrors the local media naming convention", () => {
    expect(KIND_RULES.video.pathname("ankle-circles")).toBe("videos/ankle-circles.mp4");
    expect(KIND_RULES.preview.pathname("ankle-circles")).toBe("videos/ankle-circles-preview.mp4");
    expect(KIND_RULES.poster.pathname("ankle-circles")).toBe("videos/ankle-circles-poster.jpg");
    expect(KIND_RULES.captions.pathname("ankle-circles")).toBe("captions/ankle-circles.vtt");
    expect(KIND_RULES.transcript.pathname("ankle-circles")).toBe("transcripts/ankle-circles.md");
  });

  it("sets sane per-kind size caps and MIME allowlists", () => {
    expect(KIND_RULES.video.maxBytes).toBe(200 * MB);
    expect(KIND_RULES.preview.maxBytes).toBe(50 * MB);
    expect(KIND_RULES.poster.maxBytes).toBe(4 * MB);
    expect(KIND_RULES.captions.maxBytes).toBe(1 * MB);
    expect(KIND_RULES.transcript.maxBytes).toBe(1 * MB);
    for (const kind of UPLOAD_KINDS) {
      const rule = KIND_RULES[kind];
      expect(rule.maxBytes).toBeGreaterThan(0);
      expect(rule.mimeTypes.length).toBeGreaterThan(0);
      expect(rule.pathname("x").endsWith(rule.extension)).toBe(true);
    }
  });
});

describe("validateUploadIntent", () => {
  it("accepts a known exercise + valid kind and returns the enforced pathname", () => {
    const r = validateUploadIntent({ exerciseId: "ankle-circles", kind: "video" });
    expect(r).toEqual(
      expect.objectContaining({
        ok: true,
        exerciseId: "ankle-circles",
        kind: "video",
        pathname: "videos/ankle-circles.mp4",
      })
    );
  });

  it("rejects an unknown exercise id", () => {
    const r = validateUploadIntent({ exerciseId: "does-not-exist", kind: "video" });
    expect(r).toEqual({ ok: false, status: 400, error: 'unknown exercise "does-not-exist"' });
  });

  it("rejects an unknown kind", () => {
    const r = validateUploadIntent({ exerciseId: "ankle-circles", kind: "audio" });
    expect(r.ok).toBe(false);
  });

  it("rejects malformed bodies", () => {
    expect(validateUploadIntent(null).ok).toBe(false);
    expect(validateUploadIntent({}).ok).toBe(false);
    expect(validateUploadIntent({ exerciseId: "", kind: "video" }).ok).toBe(false);
    expect(validateUploadIntent({ exerciseId: "x".repeat(121), kind: "video" }).ok).toBe(false);
  });
});
