import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminLogout from "../../../../components/admin/AdminLogout";
import ExerciseMediaAdmin, {
  type AdminKindInfo,
  type OverlayEntryLite,
} from "../../../../components/admin/ExerciseMediaAdmin";
import {
  ADMIN_COOKIE,
  expectedCookieValue,
  isTokenConfigured,
} from "../../../../lib/admin-session";
import { getBodyPart, getPartExercises } from "../../../../lib/content";
import { getMediaManifest } from "../../../../lib/media-overlay";
import { KIND_RULES, UPLOAD_KINDS, type UrlField } from "../../../../lib/upload-rules";

export const metadata: Metadata = {
  title: "Media admin — RecoverMate",
  robots: { index: false, follow: false },
};

/** Kind rules serialized as plain props (no zod/content JSON in the client chunk — E1). */
const KIND_INFOS: AdminKindInfo[] = UPLOAD_KINDS.map((kind) => ({
  kind,
  labelEn: KIND_RULES[kind].labelEn,
  accept: KIND_RULES[kind].accept,
  extension: KIND_RULES[kind].extension,
  maxBytes: KIND_RULES[kind].maxBytes,
  urlField: KIND_RULES[kind].urlField,
}));

export default async function AdminPartPage({
  params,
}: {
  params: Promise<{ part: string }>;
}) {
  const { part } = await params;

  // Gate: unauthenticated visitors go back to the login screen. (UX only —
  // every API handler re-verifies; uploads are impossible without the cookie.)
  const store = await cookies();
  if (
    !isTokenConfigured() ||
    store.get(ADMIN_COOKIE)?.value !== expectedCookieValue()
  ) {
    redirect("/admin/upload");
  }

  const bodyPart = getBodyPart(part);
  if (!bodyPart) notFound();

  // Drafts INCLUDED: media is uploaded BEFORE review (the review-preview
  // workflow); the overlay can never flip reviewStatus.
  const exercises = getPartExercises(part);
  const manifest = await getMediaManifest();

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-4 py-8 sm:px-6 sm:py-12 md:max-w-3xl lg:max-w-5xl">
      <p className="plate-caption">
        <Link
          href="/admin/upload"
          className="underline decoration-border underline-offset-4 hover:text-accent"
        >
          Media admin
        </Link>{" "}
        / {bodyPart.nameEn}
      </p>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display break-words text-3xl font-semibold text-foreground sm:text-4xl">
          {bodyPart.nameZh}
          <span className="ml-3 align-middle text-lg font-normal text-muted">
            {bodyPart.nameEn}
          </span>
        </h1>
        <AdminLogout />
      </div>
      <p className="mt-1 text-sm text-muted">
        {exercises.length} exercises · picking a file starts the upload ·
        uploads replace existing media at the same path
      </p>

      <div className="mt-6 space-y-4">
        {exercises.map((exercise) => {
          const entries = manifest.exercises[exercise.id];
          const overlay: Partial<Record<UrlField, OverlayEntryLite>> = {};
          for (const info of KIND_INFOS) {
            const entry = entries?.[info.urlField];
            if (entry) overlay[info.urlField] = { url: entry.url, uploadedAt: entry.uploadedAt };
          }
          return (
            <ExerciseMediaAdmin
              key={exercise.id}
              exerciseId={exercise.id}
              nameZh={exercise.nameZh}
              nameEn={exercise.nameEn}
              reviewStatus={exercise.reviewStatus}
              kinds={KIND_INFOS}
              overlay={overlay}
            />
          );
        })}
        {exercises.length === 0 ? (
          <p className="text-sm text-muted">No exercises are mapped to this body part yet.</p>
        ) : null}
      </div>
    </main>
  );
}
