"use client";

import { useRef } from "react";

export type StepIndicatorProps = {
  steps: string[];
  /** 0-based current step (highlighted). */
  currentStep: number;
  /** Manual step selection (clamped by the session controller). */
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
};

/**
 * Step guidance list for the exercise session (S17).
 * - The current step is highlighted with `aria-current="step"` (not color alone:
 *   text + position + ring styling all carry the state).
 * - Every step is a button, so manual navigation works by pointer, touch, and
 *   keyboard (Tab/Enter). Arrow/Home/End keys move between steps as a shortcut.
 * - The user can change steps at any time; nothing advances on its own.
 */
export default function StepIndicator({
  steps,
  currentStep,
  onSelect,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: StepIndicatorProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusAndSelect = (target: number) => {
    // All step buttons are always mounted, so focus can move before the state
    // update lands.
    buttonRefs.current[target]?.focus();
    onSelect(target);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLOListElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusAndSelect(Math.min(steps.length - 1, currentStep + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusAndSelect(Math.max(0, currentStep - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      focusAndSelect(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusAndSelect(steps.length - 1);
    }
  };

  return (
    <section aria-label="Steps" className="mt-6">
      <h2 className="text-xl font-semibold text-foreground">Steps</h2>
      <ol
        onKeyDown={handleKeyDown}
        className="mt-2 flex flex-col gap-1 text-foreground"
      >
        {steps.map((step, i) => {
          const isCurrent = i === currentStep;
          return (
            <li key={i}>
              <button
                type="button"
                ref={(el) => {
                  buttonRefs.current[i] = el;
                }}
                onClick={() => onSelect(i)}
                aria-current={isCurrent ? "step" : undefined}
                className={`w-full rounded-md border px-3 py-2 text-left ${
                  isCurrent
                    ? "border-accent bg-accent/10 font-semibold ring-1 ring-accent/50"
                    : "border-border hover:bg-accent/10"
                }`}
              >
                <span className="mr-2 inline-block min-w-6 text-muted">
                  {i + 1}.
                </span>
                {step}
                {isCurrent ? (
                  <span className="ml-2 text-sm text-accent">(current)</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canGoPrev}
          className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20 disabled:opacity-40"
        >
          Previous step
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20 disabled:opacity-40"
        >
          Next step
        </button>
      </div>
    </section>
  );
}
