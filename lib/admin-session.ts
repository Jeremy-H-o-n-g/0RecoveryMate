import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Shared-secret admin session — SERVER ONLY.
 *
 * There are no accounts in this product (TASKS.md baseline). The admin media
 * surface is gated by a single secret (UPLOAD_ADMIN_TOKEN env var):
 * - Login verifies the secret with a timing-safe compare and sets an httpOnly,
 *   SameSite=strict cookie holding ONLY sha256hex(token) — the raw secret
 *   never circulates in headers, cookies, or logs.
 * - Every admin route handler calls verifyAdminRequest() itself (Next 16
 *   security model: auth inside the handler, never in middleware/proxy).
 *   Page-level cookie checks are UX only — the handler check is the boundary.
 * - FAIL CLOSED: when UPLOAD_ADMIN_TOKEN is unset, verification always fails
 *   and handlers answer 503 (feature disabled), so a misconfigured deploy can
 *   never expose an open upload endpoint.
 */

export const ADMIN_COOKIE = "rm_admin";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60; // 8 h

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function isTokenConfigured(): boolean {
  const token = process.env.UPLOAD_ADMIN_TOKEN;
  return typeof token === "string" && token.trim() !== "";
}

/** Timing-safe secret check. Returns false (never throws) when unconfigured. */
export function tokenMatches(provided: string): boolean {
  if (!isTokenConfigured()) return false;
  // Hash both sides first so lengths are always equal (timingSafeEqual throws
  // on length mismatch) and the raw secret is never the compared material.
  const a = Buffer.from(hashToken(provided));
  const b = Buffer.from(hashToken(process.env.UPLOAD_ADMIN_TOKEN as string));
  return timingSafeEqual(a, b);
}

export function expectedCookieValue(): string {
  return hashToken(process.env.UPLOAD_ADMIN_TOKEN as string);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

/** Minimal cookie-header parser (keeps this module testable without next/headers). */
function readCookie(req: Request, name: string): string | null {
  const header = req.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return part.slice(idx + 1).trim();
  }
  return null;
}

/**
 * Authorization boundary for every admin handler: accepts the session cookie
 * (browser) OR `Authorization: Bearer <token>` (curl/scripts/e2e). Fail closed.
 */
export function verifyAdminRequest(req: Request): boolean {
  if (!isTokenConfigured()) return false;
  const cookie = readCookie(req, ADMIN_COOKIE);
  if (cookie && cookie === expectedCookieValue()) return true;
  const auth = req.headers.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return tokenMatches(auth.slice("Bearer ".length).trim());
  }
  return false;
}
