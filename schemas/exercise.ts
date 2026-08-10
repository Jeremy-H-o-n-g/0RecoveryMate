import { z } from "zod";

/**
 * Difficulty conveys MOVEMENT COMPLEXITY, not injury severity (S10 safety rule).
 * "not-set" is permitted for unreviewed placeholders.
 */
export const DifficultySchema = z.enum([
  "not-set",
  "beginner",
  "intermediate",
  "advanced",
]);

export const ReviewStatusSchema = z.enum([
  "draft",
  "in-review",
  "approved",
  "rejected",
  "blocked",
]);

/** Accepts "", an http(s) URL, or a local "/path". */
const urlOrEmpty = z
  .string()
  .refine(
    (v) => v === "" || /^https?:\/\/\S+$/i.test(v) || v.startsWith("/"),
    "must be an http(s) URL, a /path, or empty"
  );

export const ExerciseSchema = z
  .object({
    id: z.string().min(1),
    nameZh: z.string().min(1),
    nameEn: z.string().min(1),
    durationSeconds: z.number().int().positive(),
    difficulty: DifficultySchema,
    muscles: z.array(z.string()),
    videoUrl: urlOrEmpty,
    previewUrl: urlOrEmpty,
    posterUrl: urlOrEmpty,
    captionUrl: urlOrEmpty,
    transcriptUrl: urlOrEmpty,
    steps: z.array(z.string()),
    tips: z.array(z.string()),
    stopSignals: z.array(z.string()),
    sourceTitle: z.string(),
    sourceUrl: urlOrEmpty,
    licenseId: z.string(),
    reviewedBy: z.string(),
    reviewedAt: z.string(),
    reviewStatus: ReviewStatusSchema,
  })
  .refine(
    (ex) => {
      // Only approved content may publish, and it MUST carry full provenance +
      // accessibility. reviewStatus is never defaulted to approved.
      if (ex.reviewStatus !== "approved") return true;
      const required = [
        ex.sourceTitle,
        ex.sourceUrl,
        ex.licenseId,
        ex.reviewedBy,
        ex.reviewedAt,
        ex.captionUrl,
        ex.transcriptUrl,
      ];
      return (
        required.every((s) => s.trim() !== "") &&
        ex.stopSignals.length > 0 &&
        ex.steps.length > 0
      );
    },
    {
      message:
        "approved exercises require non-empty source, license, review, captions, transcript, stop signals, and steps",
    }
  );

export type Exercise = z.infer<typeof ExerciseSchema>;
