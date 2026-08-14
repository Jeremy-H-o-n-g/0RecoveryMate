"use client";

import { useEffect, useState } from "react";
import ConfettiEffect from "./ConfettiEffect";

export type CompletionFeedbackProps = {
  /** Identity of the completion event; particles fire once per distinct value. */
  triggerKey: string | number;
  heading?: string;
  /** Non-clinical copy only: no treatment claims, no pain-pushing (S18 safety). */
  message?: string;
  /** Optional next action, rendered as a link the USER chooses to follow.
   * Never auto-followed: this component schedules no navigation of any kind. */
  nextHref?: string;
  nextLabel?: string;
  backHref?: string;
  backLabel?: string;
};

const DEFAULT_HEADING = "Exercise complete";
const DEFAULT_MESSAGE =
  "You finished this exercise at your own pace. Progress doesn't require pushing through pain — stop if anything feels wrong.";

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * One-shot completion feedback (S18):
 * - A STATIC success cue that is always present and announced politely
 *   (role="status"): text + check-mark shape + green ring — state is never
 *   carried by color or motion alone, so it works with reduced motion and for
 *   screen readers with zero animation.
 * - Decorative particles + a single gentle bounce fire exactly once per
 *   triggerKey (idempotent; a new key re-arms). Under prefers-reduced-motion
 *   neither happens (no particles, no scale animation).
 * - The next step is USER-CONTROLLED: actions are plain links the user chooses
 *   to click. There is no timer, no router, no forced redirect in this
 *   component (S18 do-not-do: no forced auto-jump; verified by test: zero
 *   scheduled timers after mount).
 * - Copy is deliberately non-clinical: it celebrates pacing, not pushing
 *   through pain, and claims no treatment or recovery outcome.
 */
export default function CompletionFeedback({
  triggerKey,
  heading = DEFAULT_HEADING,
  message = DEFAULT_MESSAGE,
  nextHref,
  nextLabel = "Next exercise",
  backHref,
  backLabel = "Back",
}: CompletionFeedbackProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      aria-label="Completion feedback"
      className="mt-6 rounded-lg border border-success/50 bg-surface/40 p-4"
    >
      <ConfettiEffect triggerKey={triggerKey} enabled={!reducedMotion} />

      <div className="flex items-center gap-3">
        {/* Decorative ring + check: aria-hidden because the text below carries
            the state. Bounce is skipped under reduced motion (class absent AND
            globals.css kills the animation as a second guard). */}
        <svg
          aria-hidden="true"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          className={reducedMotion ? undefined : "completion-bounce"}
        >
          <circle cx="22" cy="22" r="19" fill="none" stroke="var(--success)" strokeWidth="3" />
          <path
            d="M13 22.5l6 6L31 16"
            fill="none"
            stroke="var(--success)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <p role="status" className="text-lg font-semibold text-success">
            {heading}
          </p>
          <p className="mt-1 max-w-md text-sm text-muted">{message}</p>
        </div>
      </div>

      {/* User-confirmed next step only — links, never automatic navigation. */}
      <div className="mt-4 flex flex-wrap gap-2">
        {nextHref ? (
          <a
            href={nextHref}
            className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
          >
            {nextLabel}
          </a>
        ) : null}
        {backHref ? (
          <a
            href={backHref}
            className="rounded-md border border-border px-4 py-2 hover:bg-accent/10"
          >
            {backLabel}
          </a>
        ) : null}
      </div>
    </section>
  );
}
