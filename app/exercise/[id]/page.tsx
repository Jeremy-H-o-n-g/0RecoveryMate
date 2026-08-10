import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <p className="text-sm text-muted">
        <Link href="/body/ankle" className="underline hover:text-accent">
          Back
        </Link>
      </p>

      {/* Safety boundary shown BEFORE the action (S09). */}
      <p
        role="alert"
        className="mt-4 rounded-md border border-focus/60 bg-focus/10 p-3 text-sm text-foreground"
      >
        [Demo placeholder — not reviewed; general warm-up concept only; NOT
        medical guidance.]
      </p>

      <h1 className="mt-4 text-3xl font-semibold text-accent">
        {exercise.nameZh}
      </h1>
      <p className="mt-1 text-muted">
        {exercise.durationSeconds}s · {exercise.difficulty}
      </p>

      <section aria-label="Stop signals" className="mt-6">
        <h2 className="text-xl font-semibold text-foreground">Stop signals</h2>
        <p className="mt-1 text-muted">
          Stop and seek qualified assessment for severe pain, swelling, inability
          to move or bear weight, numbness, or symptoms that persist or affect
          performance.
        </p>
        <p className="mt-1 text-muted">{exercise.stopSignals.join("; ")}</p>
      </section>

      <section aria-label="Steps" className="mt-6">
        <h2 className="text-xl font-semibold text-foreground">Steps</h2>
        <ol className="mt-1 list-decimal pl-6 text-foreground">
          {exercise.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Placeholder timer/completion: URL-driven (?done=1), refreshable, deep-linkable. */}
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
