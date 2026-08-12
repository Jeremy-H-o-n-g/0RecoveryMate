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
