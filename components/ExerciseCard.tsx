import Link from "next/link";
import type { ExerciseRecord } from "../lib/content";

export type ExerciseCardProps = {
  exercise: ExerciseRecord;
};

/**
 * A clearly-marked placeholder action card. Links to the exercise detail route.
 * The banner makes it explicit that the content is not reviewed and is not
 * medical guidance (S09: placeholders must not be mistaken for medical content).
 */
export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  return (
    <Link
      href={`/exercise/${exercise.id}`}
      className="block rounded-lg border border-accent/40 p-4 hover:bg-accent/10"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-focus">
        [Demo placeholder — not reviewed]
      </p>
      <h2 className="mt-1 text-lg font-semibold text-foreground">
        {exercise.nameZh}
      </h2>
      <p className="text-sm text-muted">
        {exercise.durationSeconds}s · {exercise.difficulty}
      </p>
    </Link>
  );
}
