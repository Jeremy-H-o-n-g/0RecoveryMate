/** Timer states (deterministic state machine). */
export type TimerPhase = "idle" | "running" | "paused" | "complete";

/** Clamp a ratio to [0, 1]. */
export function clampRatio(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Fraction of time elapsed, clamped to [0, 1]. */
export function elapsedRatio(elapsedMs: number, durationMs: number): number {
  if (durationMs <= 0) return 0;
  return clampRatio(elapsedMs / durationMs);
}

/** Fraction of time remaining, in [0, 1]. */
export function remainingRatio(elapsedMs: number, durationMs: number): number {
  return 1 - elapsedRatio(elapsedMs, durationMs);
}

/** Remaining milliseconds, never negative. */
export function remainingMs(elapsedMs: number, durationMs: number): number {
  return Math.max(0, durationMs - elapsedMs);
}

/** Adjustable-timer policy (2026-09-01 backlog): the user may re-time the step
 * countdown within sane bounds. Presets include the 15 s between-set rest the
 * student manual specifies for 膝盖/手臂 entries (S20 recorded it as a tip;
 * timer-preset support landed here). Bounds keep the ring math meaningful
 * (duration > 0) and the follow-along tool honest (no marathon presets). */
export const TIMER_MIN_SECONDS = 5;
export const TIMER_MAX_SECONDS = 120;
export const TIMER_STEP_SECONDS = 5;
export const TIMER_PRESET_SECONDS = [15, 30, 45, 60] as const;
/** The between-set rest preset (user request). */
export const REST_PRESET_SECONDS = 15;

/** Clamp a user-chosen duration into [TIMER_MIN_SECONDS, TIMER_MAX_SECONDS]. */
export function clampDurationSeconds(value: number): number {
  return Math.min(
    TIMER_MAX_SECONDS,
    Math.max(TIMER_MIN_SECONDS, Math.round(value))
  );
}

/**
 * SVG stroke-dash geometry for a circular ring of the given radius. `dashoffset`
 * goes from 0 (ring full, at start) to `circumference` (ring empty, at end) as
 * time elapses, so the visible ring matches the remaining time.
 */
export function ringGeometry(
  elapsedMs: number,
  durationMs: number,
  radius: number
): { circumference: number; dashoffset: number } {
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * elapsedRatio(elapsedMs, durationMs);
  return { circumference, dashoffset };
}
