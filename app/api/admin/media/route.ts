import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { guardAdmin, jsonError, readJsonBody } from "../../../../lib/admin-api";
import { clearManifestEntry } from "../../../../lib/media-overlay";
import { validateUploadIntent } from "../../../../lib/upload-rules";

/**
 * Remove one media kind for an exercise: clears the overlay manifest entry
 * (the page falls back to base data, e.g. the "Video pending" state), then
 * best-effort deletes the blob itself. A failed blob delete is logged, not
 * surfaced — the manifest is the source of truth for what renders.
 *
 * DELETE {exerciseId, kind} → {ok: true}
 */

export async function DELETE(req: Request): Promise<Response> {
  const guard = guardAdmin(req);
  if (!guard.ok) return guard.response;

  const parsed = await readJsonBody(req);
  if (!parsed.ok) return parsed.response;

  const intent = validateUploadIntent(parsed.body);
  if (!intent.ok) return jsonError(intent.status, intent.error);

  let removedUrl: string | undefined;
  try {
    ({ removedUrl } = await clearManifestEntry(intent.exerciseId, intent.kind));
  } catch (err) {
    console.error("[admin/media] manifest update failed:", err);
    return jsonError(502, "could not update the media manifest");
  }

  if (removedUrl) {
    try {
      await del(removedUrl, { token: process.env.BLOB_READ_WRITE_TOKEN as string });
    } catch (err) {
      // Best effort: an orphan blob is invisible (not in the manifest) and
      // harmless; cleanup via the dashboard/list() if ever needed.
      console.warn("[admin/media] blob delete failed (entry already cleared):", err);
    }
  }

  revalidatePath(`/exercise/${intent.exerciseId}`);
  return Response.json({ ok: true });
}
