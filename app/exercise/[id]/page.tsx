import Link from "next/link";
import { notFound } from "next/navigation";
import SafetyNotice from "../../../components/SafetyNotice";
import VideoPlayer from "../../../components/VideoPlayer";
import { getExercise, getExerciseIds } from "../../../lib/content";

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

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm text-muted">
        <Link href="/body/ankle" className="underline hover:text-accent">
          Back
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

      <h1 className="mt-4 text-3xl font-semibold text-accent">
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

      {/* Accessible video player (the action). Native controls, no autoplay. */}
      <div className="mt-6">
        <VideoPlayer
          videoUrl={exercise.videoUrl}
          posterUrl={exercise.posterUrl}
          captionUrl={exercise.captionUrl}
          transcriptUrl={exercise.transcriptUrl}
          exerciseId={exercise.id}
        />
      </div>

      {/* Steps are readable without playing the video. */}
      <section aria-label="Steps" className="mt-6">
        <h2 className="text-xl font-semibold text-foreground">Steps</h2>
        <ol className="mt-1 list-decimal pl-6 text-foreground">
          {exercise.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

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

      {/* Completion placeholder; the real timer arrives in S16. */}
      <section aria-label="Timer (placeholder)" className="mt-8">
        {isDone ? (
          <p className="rounded-md border border-accent/50 p-3 text-foreground">
            Complete ✓ (placeholder)
          </p>
        ) : (
          <Link
            href="?done=1"
            className="inline-block rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
          >
            Start / Mark complete (placeholder)
          </Link>
        )}
      </section>
    </main>
  );
}
