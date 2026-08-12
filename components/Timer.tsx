"use client";

import { useExerciseTimer } from "../hooks/useExerciseTimer";
import { ringGeometry } from "../lib/timer-math";

export type TimerProps = {
  durationSeconds: number;
  onComplete?: () => void;
};

const RADIUS = 54;
const SIZE = 120;

/**
 * Circular exercise timer. The SVG ring depletes with the remaining time
 * (stroke-dash math from lib/timer-math.ts). Provides immediate Stop/Reset
 * (safety: the timer is a follow-along tool, not a requirement to push through
 * pain). The transition is disabled under prefers-reduced-motion.
 *
 * Wiring into the exercise flow (player + steps sync) is S17; this component is
 * self-contained and unit-tested here.
 */
export default function Timer({ durationSeconds, onComplete }: TimerProps) {
  const durationMs = durationSeconds * 1000;
  const { phase, elapsedMs, remainingMs, start, pause, resume, reset } =
    useExerciseTimer({ durationMs, onComplete });

  const { circumference, dashoffset } = ringGeometry(
    elapsedMs,
    durationMs,
    RADIUS
  );
  const secondsLeft = Math.ceil(remainingMs / 1000);

  return (
    <section aria-label="Exercise timer" className="flex flex-col items-center gap-4">
      <svg
        role="img"
        aria-label={`Time remaining: ${secondsLeft} seconds. State: ${phase}.`}
        width="140"
        height="140"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
      >
        <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          transform="rotate(-90 60 60)"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
          className="motion-reduce:transition-none"
        />
        <text x="60" y="68" textAnchor="middle" fontSize="28" fill="var(--foreground)">
          {secondsLeft}
        </text>
      </svg>

      <div className="flex gap-2">
        {phase === "idle" && (
          <button type="button" onClick={start} className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20">
            Start
          </button>
        )}
        {phase === "running" && (
          <button type="button" onClick={pause} className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20">
            Pause
          </button>
        )}
        {phase === "paused" && (
          <button type="button" onClick={resume} className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20">
            Resume
          </button>
        )}
        <button
          type="button"
          onClick={reset}
          disabled={phase === "idle"}
          className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20 disabled:opacity-40"
        >
          Stop / Reset
        </button>
      </div>
    </section>
  );
}
