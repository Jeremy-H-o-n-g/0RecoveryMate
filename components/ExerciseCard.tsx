import Link from "next/link";
import type { ExerciseRecord } from "../lib/content";

export type ExerciseCardProps = {
  exercise: ExerciseRecord;
};

const STATUS_LABEL: Record<ExerciseRecord["reviewStatus"], string> = {
  draft: "Draft — not reviewed",
  "in-review": "In review",
  approved: "Reviewed",
  rejected: "Rejected",
  blocked: "Blocked",
};

/**
 * A composable, glass action card. Shows name, duration, difficulty, muscles,
 * and a preview slot; links to the exercise detail route. Review status is
 * always visible (never hidden); non-approved cards carry a placeholder banner
 * so they cannot be mistaken for reviewed/medical content. Hover transitions are
 * disabled under prefers-reduced-motion (motion-reduce + globals.css).
 */
export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const isPlaceholder = exercise.reviewStatus !== "approved";
  return (
    <Link
      href={`/exercise/${exercise.id}`}
      aria-label={`${exercise.nameZh}${isPlaceholder ? " (placeholder, not reviewed)" : ""}`}
      className="group block overflow-hidden rounded-xl border border-accent/30 bg-surface/60 backdrop-blur transition-colors hover:bg-accent/10 motion-reduce:transition-none"
    >
      {/* Preview slot. The real (muted) preview video arrives in S15. */}
      <div
        className="aspect-video w-full bg-background/60 ring-1 ring-inset ring-accent/20"
        aria-hidden="true"
      />
      <div className="p-4">
        {isPlaceholder && (
          <p className="text-xs font-semibold uppercase tracking-wide text-focus">
            [Placeholder — not reviewed]
          </p>
        )}
        <h2 className="mt-1 text-lg font-semibold text-foreground">
          {exercise.nameZh}
        </h2>
        <p className="text-sm text-muted">
          {exercise.durationSeconds}s · {exercise.difficulty}
        </p>
        {exercise.muscles.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1" aria-label="Muscles">
            {exercise.muscles.map((m) => (
              <li
                key={m}
                className="rounded bg-accent/15 px-1.5 py-0.5 text-xs text-foreground"
              >
                {m}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-2 text-xs text-muted">
          Status: {STATUS_LABEL[exercise.reviewStatus]}
        </p>
      </div>
    </Link>
  );
}
