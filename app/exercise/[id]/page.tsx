import Link from "next/link";
import { notFound } from "next/navigation";
import CompletionFeedback from "../../../components/CompletionFeedback";
import ErrorState from "../../../components/ErrorState";
import ExerciseSession from "../../../components/ExerciseSession";
import SafetyNotice from "../../../components/SafetyNotice";
import { bodyParts, getExercise, getExerciseIds } from "../../../lib/content";

export function generateStaticParams() {
  return getExerciseIds().map((id) => ({ id }));
}

export default async function ExercisePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ done?: string }>;
}) {
  const { id } = await params;
  const { done } = await searchParams;
  const exercise = getExercise(id);
  if (!exercise) {
    // Invalid id -> safe error page (Next 404). No health/diagnostic content.
    notFound();
  }

  const isDone = done === "1";
  const isPlaceholder = exercise.reviewStatus !== "approved";

  // Owning body part for the back path (replaces the S09 hardcoded
  // /body/ankle; every state keeps an explicit return route - S19).
  const owningPart = bodyParts.find((p) => p.exerciseIds.includes(exercise.id));
  const partHref = owningPart ? `/body/${owningPart.id}` : "/";
  const partLabel = owningPart ? `Back to ${owningPart.nameEn}` : "Back to home";

  // Degenerate-content guard: `steps: []` is schema-valid for DRAFT records
  // (a real risk once S20 bulk-adds 17 entries) but would render an unusable
  // session. Recoverable ErrorState instead of a broken experience (S19).
  const contentIncomplete = exercise.steps.length === 0;

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm text-muted">
        <Link href={partHref} className="underline hover:text-accent">
          {partLabel}
        </Link>
      </p>

      {isPlaceholder && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-focus/60 bg-focus/10 p-3 text-sm text-foreground"
        >
          [Placeholder — not reviewed; general warm-up concept only; NOT medical
          guidance.]
        </p>
      )}

      <h1 className="mt-4 break-words text-2xl font-semibold text-accent sm:text-3xl">
        {exercise.nameZh}
      </h1>
      <p className="mt-1 text-muted">
        {exercise.durationSeconds}s · {exercise.difficulty} · Status:{" "}
        {exercise.reviewStatus}
      </p>

      {/* Safety BEFORE the action (S15). */}
      <div className="mt-6">
        <SafetyNotice stopSignals={exercise.stopSignals} />
      </div>

      {contentIncomplete ? (
        /* Recoverable failure: explicit next steps, no self-assessment
           language, safety copy above stays visible (S19). */
        <div className="mt-6">
          <ErrorState
            title="This exercise isn't ready to display"
            message="The steps for this exercise are incomplete, so the guided session can't start. This is a content issue on our side — it will be available after review."
          >
            <Link
              href={partHref}
              className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
            >
              {partLabel}
            </Link>
            <Link
              href="/"
              className="rounded-md border border-border px-4 py-2 hover:bg-accent/10"
            >
              Home
            </Link>
          </ErrorState>
        </div>
      ) : (
        <>
          {/* Guided session: video + steps + timer coordinated under user
              control (S17), wired into the flow here (S19). */}
          <ExerciseSession
            steps={exercise.steps}
            stepDurationSeconds={exercise.durationSeconds}
            videoUrl={exercise.videoUrl}
            posterUrl={exercise.posterUrl}
            captionUrl={exercise.captionUrl}
            transcriptUrl={exercise.transcriptUrl}
          />

          {/* Completion is USER-CONFIRMED (tap the link); ?done=1 keeps the
              state in the URL (refreshable/deep-linkable). Feedback + optional
              confetti arrive from S18; the next step is a user choice. */}
          <section aria-label="Finish exercise" className="mt-8">
            {isDone ? (
              <CompletionFeedback
                triggerKey={exercise.id}
                nextHref={partHref}
                nextLabel={partLabel}
                backHref="/"
                backLabel="Home"
              />
            ) : (
              <Link
                href="?done=1"
                className="inline-block rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
              >
                Mark exercise complete
              </Link>
            )}
          </section>
        </>
      )}

      {/* Source / review / license — never hidden (S15 do-not-do). */}
      <section aria-label="Source and review" className="mt-6">
        <h2 className="text-xl font-semibold text-foreground">Source &amp; review</h2>
        <p className="mt-1 text-muted">
          Review status: {exercise.reviewStatus}
          {exercise.reviewedBy ? ` · ${exercise.reviewedBy}` : ""}
          {exercise.reviewedAt ? ` · ${exercise.reviewedAt}` : ""}
        </p>
        {exercise.sourceTitle ? (
          <p className="text-muted">Source: {exercise.sourceTitle}</p>
        ) : null}
        {exercise.sourceUrl ? (
          <p>
            <a
              className="underline hover:text-accent"
              href={exercise.sourceUrl}
              rel="noopener noreferrer"
            >
              Source link
            </a>
          </p>
        ) : null}
        <p className="text-muted">License: {exercise.licenseId || "[pending]"}</p>
      </section>
    </main>
  );
}
