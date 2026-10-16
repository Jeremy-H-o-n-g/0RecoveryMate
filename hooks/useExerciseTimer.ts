"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { clampRatio, type TimerPhase } from "../lib/timer-math";

export type UseExerciseTimerOptions = {
  durationMs: number;
  onComplete?: () => void;
};

/**
 * Deterministic exercise timer state machine: idle -> running -> (paused) ->
 * complete, with reset.
 *
 * Drift-free: elapsed time is computed from `Date.now()` timestamps, NOT from a
 * setInterval tick count (S16 do-not-do). The interval only triggers re-renders
 * for display. Because timing is timestamp-based, background-tab throttling does
 * not cause drift — when the tab resumes, remaining time is recomputed from real
 * elapsed time. The completion side-effect fires exactly once, in an effect (not
 * during render). Refs are only read/written inside effects and event handlers.
 */
export function useExerciseTimer({ durationMs, onComplete }: UseExerciseTimerOptions) {
  const [phase, setPhase] = useState<TimerPhase>("idle");
  const [remainingMs, setRemainingMs] = useState(durationMs);

  const baseElapsedRef = useRef(0);
  const segmentStartRef = useRef<number | null>(null);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  // Keep the latest onComplete without re-running the timer effect.
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Adjustable timer (2026-09-01): while idle, the remaining time is DERIVED
  // from the current duration (no effect needed) so a re-timed countdown reads
  // correctly before start. Running/paused/complete keep the stored value — a
  // live countdown is never silently re-timed (the UI disables adjustment
  // outside idle).
  const effectiveRemainingMs = phase === "idle" ? durationMs : remainingMs;

  // Tick while running. Refs are read here (in an effect), not during render.
  useEffect(() => {
    if (phase !== "running") return;
    const tick = () => {
      const segmentMs =
        segmentStartRef.current != null
          ? Date.now() - segmentStartRef.current
          : 0;
      setRemainingMs(Math.max(0, durationMs - (baseElapsedRef.current + segmentMs)));
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [phase, durationMs]);

  // Fire completion exactly once (in an effect; not during render).
  useEffect(() => {
    if (phase === "running" && remainingMs <= 0 && !completedRef.current) {
      completedRef.current = true;
      segmentStartRef.current = null;
      setPhase("complete");
      onCompleteRef.current?.();
    }
  }, [phase, remainingMs]);

  const start = useCallback(() => {
    baseElapsedRef.current = 0;
    completedRef.current = false;
    segmentStartRef.current = Date.now();
    setRemainingMs(durationMs);
    setPhase("running");
  }, [durationMs]);

  const pause = useCallback(() => {
    if (phase !== "running" || segmentStartRef.current == null) return;
    baseElapsedRef.current += Date.now() - segmentStartRef.current;
    segmentStartRef.current = null;
    setRemainingMs(Math.max(0, durationMs - baseElapsedRef.current));
    setPhase("paused");
  }, [phase, durationMs]);

  const resume = useCallback(() => {
    if (phase !== "paused") return;
    segmentStartRef.current = Date.now();
    setPhase("running");
  }, [phase]);

  const reset = useCallback(() => {
    baseElapsedRef.current = 0;
    segmentStartRef.current = null;
    completedRef.current = false;
    setRemainingMs(durationMs);
    setPhase("idle");
  }, [durationMs]);

  const elapsedMs = durationMs - effectiveRemainingMs;
  const progress =
    durationMs > 0 ? clampRatio(effectiveRemainingMs / durationMs) : 0;

  return {
    phase,
    elapsedMs,
    remainingMs: effectiveRemainingMs,
    progress,
    start,
    pause,
    resume,
    reset,
  };
}
