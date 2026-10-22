import { head } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { guardAdmin, jsonError, readJsonBody } from "../../../../../lib/admin-api";
import { setManifestEntry } from "../../../../../lib/media-overlay";
import { validateUploadIntent } from "../../../../../lib/upload-rules";

/**
 * Phase 2 of the client-direct upload: commit the landed blob to the overlay
 * manifest so the public exercise page serves it (no Git commit, no redeploy).
 *
 * POST {exerciseId, kind} → head() confirms the blob exists at the
 * server-computed pathname, re-checks MIME + size (defense in depth — the
 * client token already encoded both), writes the manifest entry, and
 * revalidates /exercise/<id>.
 *
 * 409 = blob never landed (upload crashed / wrong pathname): the client can
 * simply retry; nothing is written.
 */

export async function POST(req: Request): Promise<Response> {
  const guard = guardAdmin(req);
  if (!guard.ok) return guard.response;

  const parsed = await readJsonBody(req);
  if (!parsed.ok) return parsed.response;

  const intent = validateUploadIntent(parsed.body);
  if (!intent.ok) return jsonError(intent.status, intent.error);

  let meta;
  try {
    meta = await head(intent.pathname, {
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
    });
  } catch {
    return jsonError(409, "uploaded blob not found at the expected path — retry the upload");
  }

  if (!intent.rule.mimeTypes.includes(meta.contentType)) {
    return jsonError(409, `blob content type ${meta.contentType} is not allowed for "${intent.kind}"`);
  }
  if (meta.size > intent.rule.maxBytes) {
    return jsonError(409, `blob exceeds the ${intent.kind} size cap`);
  }

  try {
    await setManifestEntry(intent.exerciseId, intent.kind, {
      url: meta.url,
      uploadedAt: meta.uploadedAt.toISOString(),
      contentType: meta.contentType,
      sizeBytes: meta.size,
    });
  } catch (err) {
    console.error("[admin/upload/complete] manifest write failed:", err);
    return jsonError(502, "could not record the upload in the media manifest");
  }

  // Literal path → purge CDN/route-cache copies on next visit (the page is
  // already request-rendered, so this is belt-and-braces).
  revalidatePath(`/exercise/${intent.exerciseId}`);

  return Response.json({ ok: true, url: meta.url });
}
