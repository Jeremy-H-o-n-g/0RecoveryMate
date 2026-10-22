import { z } from "zod";
import { getExercise } from "./content";

/**
 * Upload policy for admin media uploads (Vercel Blob overlay). PURE module:
 * no I/O beyond the build-time content lookup, fully unit-testable.
 *
 * Safety contract:
 * - The SERVER computes every Blob pathname from this table — client filenames
 *   are never trusted and never reach the store.
 * - Pathnames mirror the local media convention exactly
 *   (docs/VideoPostProductionProtocol.md §7): videos/<id>.mp4,
 *   videos/<id>-preview.mp4, videos/<id>-poster.jpg, captions/<id>.vtt,
 *   transcripts/<id>.md.
 * - Size/MIME caps are enforced twice: encoded into the short-lived client
 *   token (storage-side) and re-checked at the commit step (defense in depth).
 */

export const UPLOAD_KINDS = [
  "video",
  "preview",
  "poster",
  "captions",
  "transcript",
] as const;
export type UploadKind = (typeof UPLOAD_KINDS)[number];

/** The Exercise media URL fields an upload kind can populate. */
export const URL_FIELDS = [
  "videoUrl",
  "previewUrl",
  "posterUrl",
  "captionUrl",
  "transcriptUrl",
] as const;
export type UrlField = (typeof URL_FIELDS)[number];

export type KindRule = {
  /** Blob pathname for an exercise id (convention-enforced, server-side). */
  pathname(exerciseId: string): string;
  extension: string;
  /** Accepted MIME types (the FIRST entry is what we record on commit). */
  mimeTypes: string[];
  maxBytes: number;
  /** Value for the admin form's <input type="file" accept=...>. */
  accept: string;
  /** Exercise field this kind overlays. */
  urlField: UrlField;
  labelEn: string;
};

const MB = 1024 * 1024;

export const KIND_RULES: Record<UploadKind, KindRule> = {
  video: {
    pathname: (id) => `videos/${id}.mp4`,
    extension: ".mp4",
    mimeTypes: ["video/mp4"],
    maxBytes: 200 * MB,
    accept: "video/mp4",
    urlField: "videoUrl",
    labelEn: "Video",
  },
  preview: {
    pathname: (id) => `videos/${id}-preview.mp4`,
    extension: ".mp4",
    mimeTypes: ["video/mp4"],
    maxBytes: 50 * MB,
    accept: "video/mp4",
    urlField: "previewUrl",
    labelEn: "Preview clip",
  },
  poster: {
    pathname: (id) => `videos/${id}-poster.jpg`,
    extension: ".jpg",
    mimeTypes: ["image/jpeg"],
    maxBytes: 4 * MB,
    accept: "image/jpeg",
    urlField: "posterUrl",
    labelEn: "Poster image",
  },
  captions: {
    pathname: (id) => `captions/${id}.vtt`,
    extension: ".vtt",
    mimeTypes: ["text/vtt"],
    maxBytes: 1 * MB,
    accept: "text/vtt,.vtt",
    urlField: "captionUrl",
    labelEn: "Captions (WebVTT)",
  },
  transcript: {
    pathname: (id) => `transcripts/${id}.md`,
    extension: ".md",
    mimeTypes: ["text/markdown", "text/plain"],
    maxBytes: 1 * MB,
    accept: "text/markdown,text/plain,.md",
    urlField: "transcriptUrl",
    labelEn: "Transcript (Markdown)",
  },
};

export const UploadIntentSchema = z.object({
  exerciseId: z.string().min(1).max(120),
  kind: z.enum(UPLOAD_KINDS),
});

export type UploadIntentOk = {
  ok: true;
  exerciseId: string;
  kind: UploadKind;
  rule: KindRule;
  /** Server-computed Blob pathname — the ONLY pathname any handler uses. */
  pathname: string;
};
export type UploadIntentErr = { ok: false; status: 400; error: string };
export type UploadIntentResult = UploadIntentOk | UploadIntentErr;

/**
 * Validate an upload intent: shape (zod), then existence against the build-time
 * content registry. Returns the enforced rule + pathname on success.
 */
export function validateUploadIntent(input: unknown): UploadIntentResult {
  const parsed = UploadIntentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, status: 400, error: "invalid request body" };
  }
  const { exerciseId, kind } = parsed.data;
  if (!getExercise(exerciseId)) {
    return { ok: false, status: 400, error: `unknown exercise "${exerciseId}"` };
  }
  const rule = KIND_RULES[kind];
  return { ok: true, exerciseId, kind, rule, pathname: rule.pathname(exerciseId) };
}
