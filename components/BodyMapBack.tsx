"use client";

import BodyPart, { type Hotspot } from "./BodyPart";

/** Fixed canvas size for the back body map (px). Matches the front map. */
export const BODY_BACK_SIZE = { width: 400, height: 720 } as const;

/**
 * Back-view hotspots. The lower-back region (hidden on the front view) is
 * reachable here, so the union of front + back covers all six default regions.
 */
export const BACK_HOTSPOTS: Hotspot[] = [
  { id: "lower-back", label: "Lower back", x: 150, y: 300, width: 100, height: 70 },
  { id: "shoulder-left", label: "Left shoulder", x: 108, y: 70, width: 48, height: 48 },
  { id: "shoulder-right", label: "Right shoulder", x: 244, y: 70, width: 48, height: 48 },
  { id: "arm-left", label: "Left arm", x: 70, y: 150, width: 48, height: 110 },
  { id: "arm-right", label: "Right arm", x: 282, y: 150, width: 48, height: 110 },
  { id: "knee-left", label: "Left knee", x: 120, y: 430, width: 48, height: 70 },
  { id: "knee-right", label: "Right knee", x: 232, y: 430, width: 48, height: 70 },
  { id: "calf-left", label: "Left calf", x: 122, y: 520, width: 46, height: 90 },
  { id: "calf-right", label: "Right calf", x: 232, y: 520, width: 46, height: 90 },
  { id: "ankle-left", label: "Left ankle", x: 124, y: 626, width: 46, height: 60 },
  { id: "ankle-right", label: "Right ankle", x: 230, y: 626, width: 46, height: 60 },
];

export type BodyMapBackProps = {
  onSelect?: (id: string) => void;
};

export default function BodyMapBack({ onSelect }: BodyMapBackProps) {
  return (
    <div
      className="relative mx-auto"
      style={{ width: BODY_BACK_SIZE.width, height: BODY_BACK_SIZE.height }}
      role="group"
      aria-label="Back body map"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/body-back.svg"
        alt="Stylized back view of a human body for navigation"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {BACK_HOTSPOTS.map((hotspot) => (
        <BodyPart key={hotspot.id} hotspot={hotspot} onSelect={onSelect} />
      ))}
    </div>
  );
}
