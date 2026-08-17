"use client";

import BodyPart, { type Hotspot } from "./BodyPart";

/** Coordinate space of the shipped 760px posterior plate. */
export const BODY_BACK_SIZE = { width: 760, height: 928 } as const;

/**
 * Back-view hotspots over the Gray's Anatomy posterior muscle plate
 * (public-domain, 1918). The lower-back region (hidden on the front view) is
 * reachable here, so front + back covers all six regions.
 */
export const BACK_HOTSPOTS: Hotspot[] = [
  { id: "lower-back", label: "Lower back", x: 320, y: 290, width: 120, height: 130 },
  { id: "shoulder-left", label: "Left shoulder", x: 252, y: 140, width: 80, height: 76 },
  { id: "shoulder-right", label: "Right shoulder", x: 430, y: 140, width: 80, height: 76 },
  { id: "arm-left", label: "Left arm", x: 214, y: 222, width: 66, height: 175 },
  { id: "arm-right", label: "Right arm", x: 482, y: 222, width: 66, height: 175 },
  { id: "knee-left", label: "Left knee", x: 306, y: 632, width: 72, height: 92 },
  { id: "knee-right", label: "Right knee", x: 388, y: 632, width: 72, height: 92 },
  { id: "calf-left", label: "Left calf", x: 304, y: 730, width: 70, height: 120 },
  { id: "calf-right", label: "Right calf", x: 392, y: 730, width: 70, height: 120 },
  { id: "ankle-left", label: "Left ankle", x: 308, y: 854, width: 62, height: 47 },
  { id: "ankle-right", label: "Right ankle", x: 396, y: 854, width: 62, height: 47 },
];

export type BodyMapBackProps = {
  onSelect?: (id: string) => void;
};

export default function BodyMapBack({ onSelect }: BodyMapBackProps) {
  return (
    <div
      className="relative mx-auto w-full min-w-0"
      style={{
        maxWidth: BODY_BACK_SIZE.width,
        aspectRatio: `${BODY_BACK_SIZE.width} / ${BODY_BACK_SIZE.height}`,
      }}
      role="group"
      aria-label="Back body map"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/anatomy/muscles-posterior.png"
        alt="Back view of the muscles of the human body (Gray's Anatomy, 1918)"
        className="pointer-events-none absolute inset-0 h-full w-full max-w-full object-contain"
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
