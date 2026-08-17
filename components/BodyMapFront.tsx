import BodyPart, { type Hotspot } from "./BodyPart";

/** Fixed canvas size for the front body map (px). Hotspot geometry is in px. */
export const BODY_FRONT_SIZE = { width: 400, height: 720 } as const;

/**
 * Front-view hotspots. Lower back is intentionally omitted from the front view
 * (it is reached via the back view in S07). Geometry is hand-placed so no two
 * hotspots overlap and each meets the 44x44 touch target.
 */
export const FRONT_HOTSPOTS: Hotspot[] = [
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

/** True if two hotspot rectangles overlap (axis-aligned). */
export function rectsOverlap(a: Hotspot, b: Hotspot): boolean {
  const separate =
    a.x + a.width <= b.x ||
    b.x + b.width <= a.x ||
    a.y + a.height <= b.y ||
    b.y + b.height <= a.y;
  return !separate;
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
      {/* Plain <img> for a static, self-authored SVG; alt carries the name. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/body-front.svg"
        alt="Stylized front view of a human body for navigation"
        className="pointer-events-none absolute inset-0 h-full w-full"
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
