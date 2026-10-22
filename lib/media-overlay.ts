import { z } from "zod";
import type { Exercise } from "../schemas/exercise";
import { KIND_RULES, URL_FIELDS, type UploadKind } from "./upload-rules";

/**
 * Blob-backed media overlay — SERVER ONLY. Do not import from client
 * components (it reads BLOB_READ_WRITE_TOKEN and talks to Vercel Blob).
 *
 * data/exercises.json is immutable at runtime (Vercel's filesystem is
 * ephemeral), so admin-uploaded media URLs live in a small JSON manifest in
 * the Blob store (media-manifest.json) and are merged into exercise records at
 * render time. The overlay carries MEDIA URLS ONLY: reviewStatus, provenance,
 * and all content approval remain Git/JSON changes (content-policy v1.1).
 *
 * Degradation contract (never-throw reads): with no token, no manifest, a
 * corrupt manifest, or any network error, getMediaManifest() resolves to
 * EMPTY_MANIFEST and public pages render base data. This keeps unit tests,
 * tokenless e2e/a11y builds, and the offline demo working.
 */

export const MANIFEST_PATHNAME = "media-manifest.json";

const httpUrl = z
  .string()
  .refine((v) => /^https?:\/\/\S+$/i.test(v), "must be an http(s) URL");

export const MediaEntrySchema = z.object({
  url: httpUrl,
  uploadedAt: z.string(),
  contentType: z.string().optional(),
  sizeBytes: z.number().int().nonnegative().optional(),
});
export type MediaEntry = z.infer<typeof MediaEntrySchema>;

export const ExerciseMediaSchema = z.object({
  videoUrl: MediaEntrySchema.optional(),
  previewUrl: MediaEntrySchema.optional(),
  posterUrl: MediaEntrySchema.optional(),
  captionUrl: MediaEntrySchema.optional(),
  transcriptUrl: MediaEntrySchema.optional(),
});
export type ExerciseMedia = z.infer<typeof ExerciseMediaSchema>;

export const MediaManifestSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string(),
  exercises: z.record(z.string(), ExerciseMediaSchema),
});
export type MediaManifest = z.infer<typeof MediaManifestSchema>;

export const EMPTY_MANIFEST: MediaManifest = {
  version: 1,
  updatedAt: "",
  exercises: {},
};

/** Blob pathname for an exercise kind (mirrors the local media convention). */
export function blobPathnameFor(exerciseId: string, kind: UploadKind): string {
  return KIND_RULES[kind].pathname(exerciseId);
}

/**
 * PURE merge: overlay URLs win per field; everything else (including
 * reviewStatus and provenance) is untouched. Returns a new object; the
 * input record from lib/content is never mutated.
 */
export function applyMediaOverlay(
  exercise: Exercise,
  manifest: MediaManifest
): Exercise {
  const overlay = manifest.exercises[exercise.id];
  if (!overlay) return exercise;
  const merged: Exercise = { ...exercise };
  for (const field of URL_FIELDS) {
    const entry = overlay[field];
    if (entry && entry.url) merged[field] = entry.url;
  }
  return merged;
}

function readToken(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  return token && token.trim() !== "" ? token : null;
}

function requireToken(): string {
  const token = readToken();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured");
  }
  return token;
}

async function parseManifestText(text: string): Promise<MediaManifest | null> {
  const parsed = MediaManifestSchema.safeParse(JSON.parse(text));
  return parsed.success ? parsed.data : null;
}

/**
 * Read the manifest through the Blob SDK API (token-authenticated, NOT the
 * public CDN URL — no edge-cache staleness window). NEVER throws: any failure
 * degrades to EMPTY_MANIFEST so public pages always render.
 */
export async function getMediaManifest(): Promise<MediaManifest> {
  const token = readToken();
  if (!token) return EMPTY_MANIFEST;
  try {
    const { get } = await import("@vercel/blob");
    const result = await get(MANIFEST_PATHNAME, { token, access: "public" });
    if (!result || result.statusCode !== 200) return EMPTY_MANIFEST; // not created yet
    const text = await new Response(result.stream).text();
    const manifest = await parseManifestText(text);
    if (!manifest) {
      console.warn("[media-overlay] manifest failed schema validation; using base content");
      return EMPTY_MANIFEST;
    }
    return manifest;
  } catch (err) {
    console.warn("[media-overlay] manifest unavailable; using base content:", err);
    return EMPTY_MANIFEST;
  }
}

/**
 * Strict read for ADMIN handlers: throws on corrupt manifest or missing token
 * (admins must see failures), but a not-yet-created manifest is fine (first
 * write creates it).
 */
async function readManifestStrict(token: string): Promise<MediaManifest> {
  const { get } = await import("@vercel/blob");
  const result = await get(MANIFEST_PATHNAME, { token, access: "public" });
  if (!result || result.statusCode !== 200) return EMPTY_MANIFEST;
  const text = await new Response(result.stream).text();
  const manifest = await parseManifestText(text);
  if (!manifest) {
    throw new Error(`${MANIFEST_PATHNAME} is corrupt (schema validation failed)`);
  }
  return manifest;
}

async function writeManifest(token: string, manifest: MediaManifest): Promise<void> {
  const { put } = await import("@vercel/blob");
  await put(MANIFEST_PATHNAME, JSON.stringify(manifest, null, 2), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    // Floor is 60s; only affects direct public-URL readers (the app reads via
    // the SDK API, which is always fresh).
    cacheControlMaxAge: 60,
    token,
  });
}

/**
 * Record one uploaded media URL. Read-modify-write happens immediately before
 * put(); the admin UI is single-flight, so the residual lost-update window is
 * milliseconds (accepted for a single-admin tool — a re-upload is idempotent).
 */
export async function setManifestEntry(
  exerciseId: string,
  kind: UploadKind,
  entry: MediaEntry
): Promise<void> {
  const token = requireToken();
  const field = KIND_RULES[kind].urlField;
  const manifest = await readManifestStrict(token);
  const exercises: MediaManifest["exercises"] = { ...manifest.exercises };
  exercises[exerciseId] = { ...(exercises[exerciseId] ?? {}), [field]: entry };
  await writeManifest(token, {
    version: 1,
    updatedAt: new Date().toISOString(),
    exercises,
  });
}

/** Remove one kind's overlay entry; returns its URL for best-effort blob deletion. */
export async function clearManifestEntry(
  exerciseId: string,
  kind: UploadKind
): Promise<{ removedUrl?: string }> {
  const token = requireToken();
  const field = KIND_RULES[kind].urlField;
  const manifest = await readManifestStrict(token);
  const current = manifest.exercises[exerciseId];
  const removedUrl = current?.[field]?.url;
  if (current && field in current) {
    const nextEntry: ExerciseMedia = { ...current };
    delete nextEntry[field];
    const exercises = { ...manifest.exercises };
    if (Object.keys(nextEntry).length === 0) delete exercises[exerciseId];
    else exercises[exerciseId] = nextEntry;
    await writeManifest(token, {
      version: 1,
      updatedAt: new Date().toISOString(),
      exercises,
    });
  }
  return { removedUrl };
}
