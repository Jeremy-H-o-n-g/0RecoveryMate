"use client";

import BodyPart, { type Hotspot } from "./BodyPart";

/**
 * Display canvas for the FRONT (anterior) figure of the AI-generated
 * color-coded muscle chart (`public/anatomy/muscle-chart-v3-front.webp`,
 * normalized 460x1310 crop of the owner-supplied 人体图3.png — see
 * docs/SourceLedger.md §4a). Coordinates live in a virtual 320x911 space
 * (the crop scaled so virtual width == the SMALLEST rendered max width) so
 * the >=44 touch-target invariant holds on touch-first viewports. Rendered
 * sizing lives in `.body-map-frame` (globals.css): responsive width steps
 * below lg, plus a viewport-height cap on lg+ so the whole figure fits on
 * screen (owner request). BodyPart converts virtual coordinates to
 * percentages, so the hotspots track the frame at every size.
 */
export const BODY_FRONT_SIZE = { width: 320, height: 911 } as const;

/**
 * Front-view hotspots over the anterior figure. Coordinates sit on the
 * visibly correct muscle groups (measured against the v3 grid overlay);
 * left/right follow the shipped convention (viewer-left = "-left").
 */
export const FRONT_HOTSPOTS: Hotspot[] = [
  { id: "shoulder-left", label: "Left shoulder", x: 40, y: 139, width: 56, height: 77 },
  { id: "shoulder-right", label: "Right shoulder", x: 224, y: 139, width: 56, height: 77 },
  { id: "arm-left", label: "Left arm", x: 14, y: 219, width: 76, height: 199 },
  { id: "arm-right", label: "Right arm", x: 230, y: 219, width: 76, height: 199 },
  { id: "knee-left", label: "Left knee", x: 95, y: 584, width: 52, height: 56 },
  { id: "knee-right", label: "Right knee", x: 173, y: 584, width: 52, height: 56 },
  { id: "calf-left", label: "Left calf", x: 75, y: 640, width: 70, height: 160 },
  { id: "calf-right", label: "Right calf", x: 175, y: 640, width: 70, height: 160 },
  { id: "ankle-left", label: "Left ankle", x: 82, y: 828, width: 63, height: 83 },
  { id: "ankle-right", label: "Right ankle", x: 175, y: 828, width: 63, height: 83 },
];

/** True when the two hotspots' rectangles intersect (test invariant). */
export function rectsOverlap(a: Hotspot, b: Hotspot): boolean {
  return !(
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y
  );
}

export type BodyMapFrontProps = {
  onSelect?: (id: string) => void;
};

export default function BodyMapFront({ onSelect }: BodyMapFrontProps) {
  return (
    <div
      className="body-map-frame relative min-w-0 overflow-hidden"
      role="group"
      aria-label="Front body map"
    >
      {/* Anterior crop of the AI-generated muscle chart. Decorative layer —
          the hotspot buttons carry the semantics. Source/license:
          docs/SourceLedger.md §4a. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/anatomy/muscle-chart-v4-front.webp"
        alt="Front view of a color-coded chart of the muscles of the human body"
        className="pointer-events-none absolute inset-0 h-full w-full object-fill"
      />
      {FRONT_HOTSPOTS.map((hotspot) => (
        <BodyPart
          key={hotspot.id}
          hotspot={hotspot}
          onSelect={onSelect}
          base={BODY_FRONT_SIZE}
        />
      ))}
    </div>
  );
}
