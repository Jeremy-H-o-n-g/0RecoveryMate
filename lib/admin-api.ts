import { isTokenConfigured, verifyAdminRequest } from "./admin-session";

/**
 * Shared request guards for the admin media API routes — SERVER ONLY.
 *
 * Next 16 security model: authorization lives INSIDE each handler (never in
 * middleware/proxy), so every admin route starts with guardAdmin(req).
 * Fail-closed ordering:
 *   503 — feature not configured (missing UPLOAD_ADMIN_TOKEN or Blob token)
 *   401 — missing/invalid credentials
 *   415 — non-JSON content type (also blunts cross-site form CSRF)
 */

export type GuardOk = { ok: true };
export type GuardErr = { ok: false; response: Response };
export type GuardResult = GuardOk | GuardErr;

export function jsonError(status: number, error: string): Response {
  return Response.json({ error }, { status });
}

/**
 * Full guard for authenticated admin endpoints. Requires BOTH env tokens:
 * UPLOAD_ADMIN_TOKEN (auth) and BLOB_READ_WRITE_TOKEN (storage).
 */
export function guardAdmin(req: Request): GuardResult {
  if (!isTokenConfigured() || !process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      ok: false,
      response: jsonError(503, "admin uploads are not configured on this deployment"),
    };
  }
  if (!verifyAdminRequest(req)) {
    return { ok: false, response: jsonError(401, "admin credentials required") };
  }
  const type = req.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    return { ok: false, response: jsonError(415, "JSON body required") };
  }
  return { ok: true };
}

/** Parse a JSON body, mapping malformed input to a 400 response. */
export async function readJsonBody(
  req: Request
): Promise<{ ok: true; body: unknown } | { ok: false; response: Response }> {
  try {
    return { ok: true, body: await req.json() };
  } catch {
    return { ok: false, response: jsonError(400, "invalid JSON body") };
  }
}
