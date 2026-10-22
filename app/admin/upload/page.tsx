import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import AdminLoginForm from "../../../components/admin/AdminLoginForm";
import AdminLogout from "../../../components/admin/AdminLogout";
import {
  ADMIN_COOKIE,
  expectedCookieValue,
  isTokenConfigured,
} from "../../../lib/admin-session";
import { getBodyParts, getPartExercises } from "../../../lib/content";

/**
 * Admin media upload entrance — UNLISTED (nothing on the public surface links
 * here) and excluded from indexing. The cookie check here is UX only; the
 * security boundary is verifyAdminRequest() inside every API handler.
 */
export const metadata: Metadata = {
  title: "Media admin — RecoverMate",
  robots: { index: false, follow: false },
};

export default async function AdminUploadPage() {
  const configured = isTokenConfigured();
  const store = await cookies();
  const authed =
    configured && store.get(ADMIN_COOKIE)?.value === expectedCookieValue();

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-4 py-8 sm:px-6 sm:py-12 md:max-w-3xl lg:max-w-5xl">
      <p className="plate-caption">Admin · unlisted · not indexed</p>
      <h1 className="font-display mt-1 text-3xl font-semibold text-foreground sm:text-4xl">
        Media uploads
      </h1>
      <p className="mt-1 text-sm text-muted">
        Upload exercise media to the Vercel Blob store. Uploads go live on the
        exercise page without a redeploy. Review status and provenance stay
        Git-only (content-policy v1.1).
      </p>

      {!configured ? (
        <p
          role="alert"
          className="mt-6 rounded-md border border-focus/60 bg-focus/10 p-3 text-sm text-foreground"
        >
          Admin uploads are not configured on this deployment: the{" "}
          <code>UPLOAD_ADMIN_TOKEN</code> environment variable is missing.
        </p>
      ) : !authed ? (
        <AdminLoginForm />
      ) : (
        <>
          <div className="mt-6 flex items-center justify-between gap-4">
            <h2 className="plate-caption">Choose a body part</h2>
            <AdminLogout />
          </div>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {getBodyParts().map((part) => (
              <li key={part.id}>
                <Link
                  href={`/admin/upload/${part.id}`}
                  className="plate-frame block rounded-lg p-4 hover:bg-accent-soft/40"
                >
                  <span className="font-display block text-lg text-foreground">
                    {part.nameZh}
                  </span>
                  <span className="text-sm text-muted">{part.nameEn}</span>
                  <span className="plate-caption mt-2 block">
                    {getPartExercises(part.id).length} exercises
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
