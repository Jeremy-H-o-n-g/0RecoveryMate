import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  ADMIN_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  expectedCookieValue,
  hashToken,
  isTokenConfigured,
  sessionCookieOptions,
  tokenMatches,
  verifyAdminRequest,
} from "../lib/admin-session";

const SECRET = "test-admin-secret-token";

function req(init?: { cookie?: string; authorization?: string }): Request {
  const headers = new Headers();
  if (init?.cookie) headers.set("cookie", init.cookie);
  if (init?.authorization) headers.set("authorization", init.authorization);
  return new Request("http://localhost/api/admin/upload", { method: "POST", headers });
}

beforeEach(() => {
  vi.stubEnv("UPLOAD_ADMIN_TOKEN", SECRET);
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("hashToken", () => {
  it("is deterministic sha256 hex and differs per input", () => {
    expect(hashToken(SECRET)).toBe(hashToken(SECRET));
    expect(hashToken(SECRET)).toMatch(/^[0-9a-f]{64}$/);
    expect(hashToken(SECRET)).not.toBe(hashToken("other"));
  });
});

describe("isTokenConfigured / tokenMatches", () => {
  it("detects configuration state", () => {
    expect(isTokenConfigured()).toBe(true);
    vi.stubEnv("UPLOAD_ADMIN_TOKEN", "");
    expect(isTokenConfigured()).toBe(false);
  });

  it("matches the correct secret and rejects wrong ones", () => {
    expect(tokenMatches(SECRET)).toBe(true);
    expect(tokenMatches("wrong")).toBe(false);
    expect(tokenMatches("")).toBe(false);
  });

  it("fails closed when UPLOAD_ADMIN_TOKEN is unset", () => {
    vi.stubEnv("UPLOAD_ADMIN_TOKEN", "");
    expect(tokenMatches(SECRET)).toBe(false);
  });
});

describe("sessionCookieOptions", () => {
  it("is httpOnly + SameSite=strict with an 8h max age", () => {
    const opts = sessionCookieOptions();
    expect(opts).toMatchObject({
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
  });
});

describe("verifyAdminRequest (the handler-level boundary)", () => {
  it("fails closed when the env token is unset", () => {
    vi.stubEnv("UPLOAD_ADMIN_TOKEN", "");
    expect(verifyAdminRequest(req({ authorization: `Bearer ${SECRET}` }))).toBe(false);
    expect(verifyAdminRequest(req({ cookie: `${ADMIN_COOKIE}=${hashToken(SECRET)}` }))).toBe(false);
  });

  it("accepts the hashed session cookie", () => {
    expect(verifyAdminRequest(req({ cookie: `${ADMIN_COOKIE}=${expectedCookieValue()}` }))).toBe(true);
    // embedded among other cookies
    expect(
      verifyAdminRequest(req({ cookie: `a=1; ${ADMIN_COOKIE}=${expectedCookieValue()}; b=2` }))
    ).toBe(true);
  });

  it("rejects a wrong or raw-token cookie", () => {
    expect(verifyAdminRequest(req({ cookie: `${ADMIN_COOKIE}=${hashToken("wrong")}` }))).toBe(false);
    // the raw secret must NOT work as the cookie value (only its hash does)
    expect(verifyAdminRequest(req({ cookie: `${ADMIN_COOKIE}=${SECRET}` }))).toBe(false);
  });

  it("accepts Authorization: Bearer <secret> (curl/e2e)", () => {
    expect(verifyAdminRequest(req({ authorization: `Bearer ${SECRET}` }))).toBe(true);
  });

  it("rejects missing/invalid credentials", () => {
    expect(verifyAdminRequest(req())).toBe(false);
    expect(verifyAdminRequest(req({ authorization: "Bearer wrong" }))).toBe(false);
    expect(verifyAdminRequest(req({ authorization: SECRET }))).toBe(false);
    expect(verifyAdminRequest(req({ authorization: `Bearer ${hashToken(SECRET)}` }))).toBe(false);
  });
});
