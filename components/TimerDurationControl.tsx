"use client";

import {
  clampDurationSeconds,
  REST_PRESET_SECONDS,
  TIMER_MAX_SECONDS,
  TIMER_MIN_SECONDS,
  TIMER_PRESET_SECONDS,
  TIMER_STEP_SECONDS,
} from "../lib/timer-math";

export type TimerDurationControlProps = {
  /** Currently selected countdown (seconds). */
  valueSeconds: number;
  /** The authored default for this exercise (shown as context). */
  defaultSeconds: number;
  /** Adjustment is only offered while the countdown is idle (safety: a live
   * countdown is never silently re-timed). */
  disabled?: boolean;
  onChange: (seconds: number) => void;
};

/**
 * User-adjustable countdown (2026-09-01 backlog, user request): preset buttons
 * — including the 15 s between-set rest — plus a ±5 s stepper, clamped to
 * [TIMER_MIN_SECONDS, TIMER_MAX_SECONDS] by lib/timer-math.
 *
 * Safety framing: the timer stays a follow-along TOOL. Adjusting it never
 * starts, stops, or advances anything; when a countdown is live the control is
 * disabled and the hint points at Stop / Reset (the always-available exit).
 * State is text + aria-pressed, never color alone.
 */
export default function TimerDurationControl({
  valueSeconds,
  defaultSeconds,
  disabled = false,
  onChange,
}: TimerDurationControlProps) {
  const presetLabel = (seconds: number): string =>
    seconds === REST_PRESET_SECONDS ? `${seconds} s rest` : `${seconds} s`;

  return (
    <div
      role="group"
      aria-label="Countdown duration"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {TIMER_PRESET_SECONDS.map((seconds) => {
        const isCurrent = valueSeconds === seconds;
        return (
          <button
            key={seconds}
            type="button"
            disabled={disabled}
            aria-pressed={isCurrent}
            onClick={() => onChange(seconds)}
            className={`rounded-md border px-3 py-1 text-sm disabled:opacity-40 ${
              isCurrent
                ? "border-accent bg-accent/20 font-semibold ring-1 ring-accent/50"
                : "border-accent/50 hover:bg-accent/10"
            }`}
          >
            {presetLabel(seconds)}
          </button>
        );
      })}
      <button
        type="button"
        disabled={disabled || valueSeconds <= TIMER_MIN_SECONDS}
        aria-label={`Decrease by ${TIMER_STEP_SECONDS} seconds`}
        onClick={() => onChange(clampDurationSeconds(valueSeconds - TIMER_STEP_SECONDS))}
        className="rounded-md border border-accent/50 px-3 py-1 text-sm hover:bg-accent/10 disabled:opacity-40"
      >
        −{TIMER_STEP_SECONDS} s
      </button>
      <button
        type="button"
        disabled={disabled || valueSeconds >= TIMER_MAX_SECONDS}
        aria-label={`Increase by ${TIMER_STEP_SECONDS} seconds`}
        onClick={() => onChange(clampDurationSeconds(valueSeconds + TIMER_STEP_SECONDS))}
        className="rounded-md border border-accent/50 px-3 py-1 text-sm hover:bg-accent/10 disabled:opacity-40"
      >
        +{TIMER_STEP_SECONDS} s
      </button>
      <p className="w-full text-center text-xs text-muted">
        {disabled
          ? "Stop / Reset to adjust the countdown."
          : `Default ${defaultSeconds} s · countdown ${valueSeconds} s. The timer is a guide, not a requirement.`}
      </p>
    </div>
  );
}
