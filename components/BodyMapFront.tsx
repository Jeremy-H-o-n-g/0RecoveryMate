"use client";

import BodyPart, { type Hotspot } from "./BodyPart";

/**
 * Display canvas for the front plate, in the SAME coordinate space as the
 * shipped 760px image (`public/anatomy/muscles-anterior.png`). Hotspot coords
 * are defined against BODY_FRONT_SIZE; BodyPart converts them to percentages
 * so the map scales fluidly (S23 responsive fix preserved).
 */
export const BODY_FRONT_SIZE = { width: 760, height: 883 } as const;

/**
 * Front-view hotspots over the Gray's Anatomy anterior muscle plate
 * (public-domain, 1918; see docs/SourceLedger.md). Coordinates sit on the
 * visibly correct muscle groups in the engraving.
 */
export const FRONT_HOTSPOTS: Hotspot[] = [
  { id: "shoulder-left", label: "Left shoulder", x: 252, y: 145, width: 78, height: 72 },
  { id: "shoulder-right", label: "Right shoulder", x: 430, y: 145, width: 78, height: 72 },
  { id: "arm-left", label: "Left arm", x: 208, y: 225, width: 68, height: 190 },
  { id: "arm-right", label: "Right arm", x: 484, y: 225, width: 68, height: 190 },
  { id: "knee-left", label: "Left knee", x: 300, y: 610, width: 76, height: 95 },
  { id: "knee-right", label: "Right knee", x: 386, y: 610, width: 76, height: 95 },
  { id: "calf-left", label: "Left calf", x: 298, y: 715, width: 72, height: 118 },
  { id: "calf-right", label: "Right calf", x: 392, y: 715, width: 72, height: 118 },
  { id: "ankle-left", label: "Left ankle", x: 302, y: 836, width: 66, height: 47 },
  { id: "ankle-right", label: "Right ankle", x: 394, y: 836, width: 66, height: 47 },
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
      className="relative mx-auto w-full min-w-0"
      style={{
        maxWidth: BODY_FRONT_SIZE.width,
        aspectRatio: `${BODY_FRONT_SIZE.width} / ${BODY_FRONT_SIZE.height}`,
      }}
      role="group"
      aria-label="Front body map"
    >
      {/* Public-domain engraving (Gray's Anatomy, 1918) — decorative layer;
          the hotspot buttons carry the semantics. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/anatomy/muscles-anterior.png"
        alt="Front view of the muscles of the human body (Gray's Anatomy, 1918)"
        className="pointer-events-none absolute inset-0 h-full w-full max-w-full object-contain"
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
