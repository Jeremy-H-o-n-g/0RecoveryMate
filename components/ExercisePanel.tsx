import type { ReactNode } from "react";
import Link from "next/link";
import ExerciseCard from "./ExerciseCard";
import { getPartExercises, type ExerciseRecord } from "../lib/content";

export type ExercisePanelProps = {
  partId: string;
  /**
   * "approved" (default, production-safe: unreviewed content is hidden) or
   * "all" (demo: surfaces clearly-marked draft placeholders, e.g. the ankle slice).
   */
  statusFilter?: "approved" | "all";
  loading?: boolean;
};

/**
 * ExercisePanel connects the part query to the card grid and renders the
 * loading / empty / error states. Layout is a responsive grid with no horizontal
 * overflow (min-w-0 items, overflow-hidden cards).
 */
export default function ExercisePanel({
  partId,
  statusFilter = "approved",
  loading = false,
}: ExercisePanelProps) {
  if (loading) {
    return (
      <ul
        role="list"
        aria-busy="true"
        aria-label="Loading exercises"
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
      >
        {Array.from({ length: 2 }).map((_, i) => (
          <li
            key={i}
            className="h-40 animate-pulse rounded-xl border border-accent/20 bg-surface/40 motion-reduce:animate-none"
          />
        ))}
      </ul>
    );
  }

  let exercises: ExerciseRecord[];
  try {
    exercises = getPartExercises(partId);
  } catch {
    return (
      <PanelState
        title="Something went wrong"
        body="Exercises could not be loaded."
      />
    );
  }

  const visible = exercises.filter((e) =>
    statusFilter === "approved" ? e.reviewStatus === "approved" : true
  );

  if (visible.length === 0) {
    return (
      <PanelState
        title="No reviewed guidance yet"
        body="Content for this region is awaiting professional review."
        action={
          <Link href="/" className="underline hover:text-accent">
            Choose another region
          </Link>
        }
      />
    );
  }

  return (
    <ul role="list" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {visible.map((ex) => (
        <li key={ex.id} className="min-w-0">
          <ExerciseCard exercise={ex} />
        </li>
      ))}
    </ul>
  );
}

function PanelState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div role="status" className="rounded-lg border border-accent/30 bg-surface/40 p-4">
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
