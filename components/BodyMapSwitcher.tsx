"use client";

import { useState } from "react";
import BodyMapFront from "./BodyMapFront";
import BodyMapBack from "./BodyMapBack";

type View = "front" | "back";

export type BodyMapSwitcherProps = {
  onSelect?: (id: string) => void;
  defaultView?: View;
};

/**
 * BodyMapSwitcher toggles the front/back body maps.
 *
 * Accessibility:
 * - The active view is exposed via the switch buttons' `aria-pressed` and an
 *   `aria-live` announcement, plus each map group's aria-label, so the state is
 *   recognizable by assistive technology.
 * - L/R direction is carried by the hotspot labels ("Left shoulder", ...).
 * - Focus is retained on the switch control after toggling (the buttons stay
 *   mounted), so switching does not lose page context.
 */
export default function BodyMapSwitcher({
  onSelect,
  defaultView = "front",
}: BodyMapSwitcherProps) {
  const [view, setView] = useState<View>(defaultView);
  const isFront = view === "front";

  return (
    <div>
      <div role="group" aria-label="Body view" className="inline-flex gap-2 pb-4">
        <button
          type="button"
          aria-pressed={isFront}
          onClick={() => setView("front")}
          className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
        >
          Front
        </button>
        <button
          type="button"
          aria-pressed={!isFront}
          onClick={() => setView("back")}
          className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
        >
          Back
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {isFront ? "Showing front body map" : "Showing back body map"}
      </p>
      {isFront ? (
        <BodyMapFront onSelect={onSelect} />
      ) : (
        <BodyMapBack onSelect={onSelect} />
      )}
    </div>
  );
}
