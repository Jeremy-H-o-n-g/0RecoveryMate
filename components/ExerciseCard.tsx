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
 * An index-card style exercise entry ("plate entry"): hairline frame on paper,
 * numbered feel via the caption row, muscle names as small-caps index terms.
 * Review status is always visible; non-approved cards carry a placeholder
 * banner so they cannot be mistaken for reviewed/medical content.
 */
export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const isPlaceholder = exercise.reviewStatus !== "approved";
  return (
    <Link
      href={`/exercise/${exercise.id}`}
      aria-label={`${exercise.nameZh}${isPlaceholder ? " (placeholder, not reviewed)" : ""}`}
      className="plate-frame group block rounded-lg p-4 transition-colors hover:bg-accent-soft/25 motion-reduce:transition-none"
    >
      {isPlaceholder && (
        <p className="text-xs font-semibold uppercase tracking-wide text-focus">
          [Placeholder — not reviewed]
        </p>
      )}
      <h2 className="font-display mt-1 text-lg font-semibold text-foreground">
        {exercise.nameZh}
      </h2>
      <p className="plate-caption mt-0.5">
        {exercise.durationSeconds}s · {exercise.difficulty}
      </p>
      {exercise.muscles.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1" aria-label="Muscles">
          {exercise.muscles.map((m) => (
            <li
              key={m}
              className="rounded-sm border border-border bg-surface-2/60 px-1.5 py-0.5 text-xs text-muted"
            >
              {m}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-xs text-muted">
        Status: {STATUS_LABEL[exercise.reviewStatus]}
      </p>
    </Link>
  );
}
