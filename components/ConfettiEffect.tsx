"use client";

import { useEffect, useRef } from "react";

export type ConfettiEffectProps = {
  /**
   * Identity of the completion event. Particles fire EXACTLY ONCE per distinct
   * value (S18: effects only fire once); a new value re-arms the effect. The
   * parent can persist/re-supply this key to recover a completion state.
   */
  triggerKey: string | number;
  /** Extra gate; the effect also self-checks prefers-reduced-motion. */
  enabled?: boolean;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Decorative one-shot confetti (S18). Renders NO DOM.
 *
 * - The particle library is loaded ON DEMAND via dynamic import(), so it is
 *   never part of the first-screen bundle (S18 do-not-do: load the particle
 *   library on demand). If the chunk fails to load or the library throws, this
 *   degrades silently to the static completion cue that CompletionFeedback
 *   always renders — confetti is purely decorative, so the fallback is the
 *   designed behavior, not suppressed error reporting.
 * - Under prefers-reduced-motion nothing is imported or fired (S18: when motion
 *   is reduced, no particles/scaling); canvas-confetti's own
 *   disableForReducedMotion is set as a second guard.
 * - Fires once per triggerKey and never on unmount/remount of the same key.
 */
export default function ConfettiEffect({
  triggerKey,
  enabled = true,
}: ConfettiEffectProps) {
  const firedForRef = useRef<string | number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (firedForRef.current === triggerKey) return; // exactly once per completion
    firedForRef.current = triggerKey;

    if (prefersReducedMotion()) return; // reduced motion: no particles at all

    let cancelled = false;
    import("canvas-confetti")
      .then((module) => {
        if (cancelled) return;
        module.default({
          particleCount: 80,
          spread: 70,
          startVelocity: 35,
          gravity: 0.8,
          scalar: 0.9,
          ticks: 180,
          disableForReducedMotion: true,
          origin: { y: 0.7 },
          colors: ["#00e5d1", "#7c5cff", "#ffd24d", "#4ade80"],
        });
      })
      .catch(() => {
        // Import/runtime failure -> designed fallback: no particles; the static
        // cue (status text + ring) in CompletionFeedback still communicates
        // completion (S18 dynamic-import-failure fallback test).
      });

    return () => {
      cancelled = true;
    };
  }, [triggerKey, enabled]);

  return null;
}
