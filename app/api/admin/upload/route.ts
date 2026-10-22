import { generateClientTokenFromReadWriteToken } from "@vercel/blob/client";
import { guardAdmin, jsonError, readJsonBody } from "../../../../lib/admin-api";
import { validateUploadIntent } from "../../../../lib/upload-rules";

/**
 * Phase 1 of the client-direct upload: issue a short-lived Blob client token
 * scoped to ONE exact pathname, with the kind's size cap + MIME allowlist
 * encoded storage-side. Video bytes never traverse the Vercel Function
 * (~4.5 MB body cap) — the browser uploads straight to Blob with this token.
 *
 * POST {exerciseId, kind} → {clientToken, pathname, fileName, maxBytes, mimeTypes}
 *
 * The pathname is SERVER-computed from the media convention
 * (docs/VideoPostProductionProtocol.md §7); client filenames are never used.
 * allowOverwrite: true makes re-upload = replace at the same stable URL.
 */

const CLIENT_TOKEN_TTL_MS = 30 * 60 * 1000; // covers 200 MB on a slow uplink

export async function POST(req: Request): Promise<Response> {
  const guard = guardAdmin(req);
  if (!guard.ok) return guard.response;

  const parsed = await readJsonBody(req);
  if (!parsed.ok) return parsed.response;

  const intent = validateUploadIntent(parsed.body);
  if (!intent.ok) return jsonError(intent.status, intent.error);

  let clientToken: string;
  try {
    clientToken = await generateClientTokenFromReadWriteToken({
      token: process.env.BLOB_READ_WRITE_TOKEN as string,
      pathname: intent.pathname,
      maximumSizeInBytes: intent.rule.maxBytes,
      allowedContentTypes: intent.rule.mimeTypes,
      validUntil: Date.now() + CLIENT_TOKEN_TTL_MS,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (err) {
    console.error("[admin/upload] client token generation failed:", err);
    return jsonError(502, "could not authorize an upload with the blob store");
  }

  return Response.json({
    clientToken,
    pathname: intent.pathname,
    fileName: intent.pathname.split("/").pop() ?? intent.pathname,
    maxBytes: intent.rule.maxBytes,
    mimeTypes: intent.rule.mimeTypes,
  });
}
