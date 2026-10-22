import { cookies } from "next/headers";
import {
  ADMIN_COOKIE,
  expectedCookieValue,
  isTokenConfigured,
  sessionCookieOptions,
  tokenMatches,
} from "../../../../lib/admin-session";
import { jsonError } from "../../../../lib/admin-api";

/**
 * Admin session login/logout (shared-secret, no accounts).
 *
 * POST {token}  → timing-safe verify vs UPLOAD_ADMIN_TOKEN → httpOnly cookie
 *                 holding ONLY sha256hex(token) (raw secret never circulates).
 * DELETE        → clears the cookie (logout).
 *
 * Fail closed: UPLOAD_ADMIN_TOKEN unset → 503 (login impossible).
 */

export async function POST(req: Request): Promise<Response> {
  if (!isTokenConfigured()) {
    return jsonError(503, "admin uploads are not configured on this deployment");
  }
  const type = req.headers.get("content-type") ?? "";
  if (!type.includes("application/json")) {
    return jsonError(415, "JSON body required");
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "invalid JSON body");
  }
  const token = (body as { token?: unknown } | null)?.token;
  if (typeof token !== "string" || !tokenMatches(token)) {
    return jsonError(401, "invalid admin token");
  }
  const store = await cookies();
  store.set(ADMIN_COOKIE, expectedCookieValue(), sessionCookieOptions());
  return Response.json({ ok: true });
}

export async function DELETE(): Promise<Response> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
