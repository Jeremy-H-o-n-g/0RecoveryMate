import sportsData from "../data/sports.json";
import { SportSchema, type Sport } from "../schemas/sport";
import type { BodyPart } from "../schemas/body-part";
import type { Exercise as ExerciseRecord } from "../schemas/exercise";

/**
 * Exercise-queue builder for the recovery flow (S22). PURE module: no React,
 * no clock, no persistence — fully unit-testable determinism.
 *
 * Safety contract:
 * - Default mode is "approved": the queue ONLY contains professionally
 *   reviewed exercises (S22 acceptance). The demo "all" mode exists solely so
 *   the flow is walkable with clearly-marked DRAFT placeholder content while
 *   S11 review is pending (same pattern as ExercisePanel / /body/[part]).
 * - The queue is a suggestion of ORDER, never a treatment plan; the user
 *   controls every advance (FlowController taps only — no timers).
 * - Degenerate records (steps: []) are excluded, not crashed on.
 * - Nothing about the user is inferred or stored.
 */

export type QueueItem = {
  exerciseId: string;
  regionId: string;
  nameZh: string;
  nameEn: string;
  durationSeconds: number;
};

export type QueueMode = "approved" | "all";

export type QueueResult = {
  /** Ordered queue items (region order follows the sport's mapping). */
  items: QueueItem[];
  /** Sum of item durations (seconds) — always <= MAX_SECONDS. */
  totalSeconds: number;
  /** Regions whose exercises were all unusable (empty/draft-only/degenerate). */
  skippedRegionIds: string[];
  /** True when the 8-minute ceiling trimmed otherwise-included exercises. */
  limited: boolean;
};

/** Flow budget (S22 objective: a 5–8 minute flow). */
export const MIN_TARGET_SECONDS = 300;
export const MAX_SECONDS = 480;

/** Validated sport registry (module-load gate, mirrors lib/content). */
const sports = SportSchema.array().parse(sportsData);

export function getQueueSport(sportId: string): Sport | null {
  return sports.find((s) => s.id === sportId) ?? null;
}

export function getQueueSportIds(): string[] {
  return sports.map((s) => s.id);
}

function usable(ex: ExerciseRecord, mode: QueueMode): boolean {
  if (ex.steps.length === 0) return false; // degenerate draft guard
  if (mode === "approved") return ex.reviewStatus === "approved";
  return true;
}

/**
 * Build the queue: for each region (in the sport's mapping order) take its
 * usable exercises in data order; if the running total is still under the
 * 5-minute target, continue with each region's SECOND exercise, and so on
 * (deterministic round-robin) — then hard-trim at 8 minutes.
 */
export function buildExerciseQueue(args: {
  sport: Pick<Sport, "regionIds">;
  parts: BodyPart[];
  exercises: ExerciseRecord[];
  mode?: QueueMode;
}): QueueResult {
  const { sport, parts, exercises, mode = "approved" } = args;

  const byRegion = new Map<string, ExerciseRecord[]>();
  for (const part of parts) {
    byRegion.set(
      part.id,
      part.exerciseIds
        .map((id) => exercises.find((e) => e.id === id))
        .filter((e): e is ExerciseRecord => e != null && usable(e, mode))
    );
  }

  const items: QueueItem[] = [];
  const skippedRegionIds: string[] = [];
  for (const regionId of sport.regionIds) {
    const list = byRegion.get(regionId) ?? [];
    if (list.length === 0) {
      skippedRegionIds.push(regionId);
      continue;
    }
    const ex = list[0];
    items.push({
      exerciseId: ex.id,
      regionId,
      nameZh: ex.nameZh,
      nameEn: ex.nameEn,
      durationSeconds: ex.durationSeconds,
    });
  }

  // Top up toward the 5-minute target with round 2+ (second exercise per
  // region, then third, ...) in the same region order.
  const total = () => items.reduce((sum, i) => sum + i.durationSeconds, 0);
  for (let round = 1; total() < MIN_TARGET_SECONDS; round++) {
    let added = false;
    for (const regionId of sport.regionIds) {
      if (total() >= MIN_TARGET_SECONDS) break;
      const list = byRegion.get(regionId) ?? [];
      const ex = list[round];
      if (!ex) continue;
      // Skip duplicates (a region may legitimately repeat an exercise id only
      // if listed twice, which the data model does not do).
      if (items.some((i) => i.exerciseId === ex.id)) continue;
      items.push({
        exerciseId: ex.id,
        regionId,
        nameZh: ex.nameZh,
        nameEn: ex.nameEn,
        durationSeconds: ex.durationSeconds,
      });
      added = true;
    }
    if (!added) break; // no region has more usable exercises
  }

  // Hard ceiling: trim to 8 minutes (never mid-exercise beyond the limit).
  let limited = false;
  while (items.length > 0 && total() > MAX_SECONDS) {
    items.pop();
    limited = true;
  }

  return {
    items,
    totalSeconds: total(),
    skippedRegionIds,
    limited,
  };
}
