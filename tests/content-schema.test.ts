import { describe, expect, it } from "vitest";
import { ExerciseSchema } from "../schemas/exercise";
import { validateContent } from "../scripts/validate-content";
import bodyPartsData from "../data/body-parts.json";
import exercisesData from "../data/exercises.json";

const validDraft = {
  id: "x",
  nameZh: "x",
  nameEn: "x",
  durationSeconds: 30,
  difficulty: "beginner",
  muscles: [],
  videoUrl: "",
  previewUrl: "",
  posterUrl: "",
  captionUrl: "",
  transcriptUrl: "",
  steps: ["a"],
  tips: [],
  stopSignals: ["stop"],
  sourceTitle: "",
  sourceUrl: "",
  licenseId: "",
  reviewedBy: "",
  reviewedAt: "",
  reviewStatus: "draft",
} as const;

describe("exercise schema", () => {
  it("accepts a valid draft exercise", () => {
    expect(ExerciseSchema.parse(validDraft).id).toBe("x");
  });

  it("rejects a missing required field", () => {
    const noId: Record<string, unknown> = { ...validDraft };
    delete noId.id;
    expect(() => ExerciseSchema.parse(noId)).toThrow();
  });

  it("rejects a bad URL", () => {
    expect(() =>
      ExerciseSchema.parse({ ...validDraft, sourceUrl: "not-a-url" })
    ).toThrow();
  });

  it("rejects an approved exercise missing source/license/captions", () => {
    expect(() =>
      ExerciseSchema.parse({ ...validDraft, reviewStatus: "approved" })
    ).toThrow();
  });

  it("accepts an approved exercise with full provenance + accessibility", () => {
    const approved = {
      ...validDraft,
      reviewStatus: "approved",
      sourceTitle: "S",
      sourceUrl: "https://example.com/s",
      licenseId: "self-authored",
      reviewedBy: "Reviewer",
      reviewedAt: "2026-01-01",
      captionUrl: "https://example.com/c.vtt",
      transcriptUrl: "https://example.com/t.txt",
      stopSignals: ["stop"],
      steps: ["a"],
    };
    expect(ExerciseSchema.parse(approved).reviewStatus).toBe("approved");
  });
});

describe("validateContent (referential integrity + media)", () => {
  it("passes on the current data", () => {
    const r = validateContent({
      bodyParts: bodyPartsData,
      exercises: exercisesData,
      mediaRoot: "public",
    });
    expect(r.errors).toEqual([]);
  });

  it("flags a body-part that references an unknown exercise", () => {
    const badParts = [
      { ...(bodyPartsData as Array<{ id: string }>)[0], exerciseIds: ["does-not-exist"] },
    ];
    const r = validateContent({
      bodyParts: badParts,
      exercises: exercisesData,
      mediaRoot: "public",
    });
    expect(r.errors.some((e) => e.includes("unknown exercise"))).toBe(true);
  });

  it("flags duplicate exercise ids", () => {
    const dup = [...(exercisesData as unknown[]), ...(exercisesData as unknown[])];
    const r = validateContent({
      bodyParts: bodyPartsData,
      exercises: dup,
      mediaRoot: "public",
    });
    expect(r.errors.some((e) => e.includes("duplicate exercise ids"))).toBe(true);
  });

  it("flags an approved exercise with a missing local media file", () => {
    const approvedMissing = [
      {
        ...validDraft,
        id: "ap",
        reviewStatus: "approved",
        sourceTitle: "S",
        sourceUrl: "https://e.com/s",
        licenseId: "self-authored",
        reviewedBy: "R",
        reviewedAt: "2026-01-01",
        captionUrl: "/media/missing.vtt",
        transcriptUrl: "/media/missing.txt",
      },
    ];
    const parts = [
      {
        id: "p",
        nameZh: "p",
        nameEn: "p",
        view: "both",
        svgIds: ["ankle-left"],
        exerciseIds: ["ap"],
        commonSports: [],
      },
    ];
    const r = validateContent({
      bodyParts: parts,
      exercises: approvedMissing,
      mediaRoot: "public",
    });
    expect(r.errors.some((e) => e.includes("missing media"))).toBe(true);
  });
});
