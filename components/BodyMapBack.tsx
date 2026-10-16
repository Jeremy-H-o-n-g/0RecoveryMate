"use client";

import BodyPart, { type Hotspot } from "./BodyPart";

/**
 * Display canvas for the BACK (posterior) figure of the AI-generated
 * color-coded muscle chart (`public/anatomy/muscle-chart-v3-back.webp`,
 * normalized 460x1310 crop of the owner-supplied 人体图3.png — see
 * docs/SourceLedger.md §4a). Same virtual 320x911 space and the same
 * `.body-map-frame` responsive sizing as the front view (see BodyMapFront).
 */
export const BODY_BACK_SIZE = { width: 320, height: 911 } as const;

/**
 * Back-view hotspots over the posterior figure. The lower-back region
 * (hidden on the front view) is reachable here, so front + back covers
 * all six regions.
 */
export const BACK_HOTSPOTS: Hotspot[] = [
  { id: "lower-back", label: "Lower back", x: 122, y: 292, width: 77, height: 70 },
  { id: "shoulder-left", label: "Left shoulder", x: 38, y: 139, width: 58, height: 77 },
  { id: "shoulder-right", label: "Right shoulder", x: 224, y: 139, width: 58, height: 77 },
  { id: "arm-left", label: "Left arm", x: 6, y: 219, width: 72, height: 199 },
  { id: "arm-right", label: "Right arm", x: 242, y: 219, width: 72, height: 199 },
  { id: "knee-left", label: "Left knee", x: 80, y: 584, width: 63, height: 56 },
  { id: "knee-right", label: "Right knee", x: 177, y: 584, width: 63, height: 56 },
  { id: "calf-left", label: "Left calf", x: 70, y: 640, width: 72, height: 153 },
  { id: "calf-right", label: "Right calf", x: 178, y: 640, width: 72, height: 153 },
  { id: "ankle-left", label: "Left ankle", x: 64, y: 821, width: 76, height: 90 },
  { id: "ankle-right", label: "Right ankle", x: 180, y: 821, width: 76, height: 90 },
];

export type BodyMapBackProps = {
  onSelect?: (id: string) => void;
};

export default function BodyMapBack({ onSelect }: BodyMapBackProps) {
  return (
    <div
      className="body-map-frame relative min-w-0 overflow-hidden"
      role="group"
      aria-label="Back body map"
    >
      {/* Posterior crop of the AI-generated muscle chart. Decorative layer —
          the hotspot buttons carry the semantics. Source/license:
          docs/SourceLedger.md §4a. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/anatomy/muscle-chart-v4-back.webp"
        alt="Back view of a color-coded chart of the muscles of the human body"
        className="pointer-events-none absolute inset-0 h-full w-full object-fill"
      />
      {BACK_HOTSPOTS.map((hotspot) => (
        <BodyPart
          key={hotspot.id}
          hotspot={hotspot}
          onSelect={onSelect}
          base={BODY_BACK_SIZE}
        />
      ))}
    </div>
  );
}
