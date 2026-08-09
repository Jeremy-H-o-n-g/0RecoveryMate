import type { CSSProperties } from "react";

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type BodyPartProps = {
  hotspot: Hotspot;
  onSelect?: (id: string) => void;
};

/**
 * BodyPart is an accessible hotspot over the body map.
 *
 * It is a native <button>, so it is reachable by Tab and activated by Enter and
 * Space (platform behavior). A visible focus ring comes from the global
 * :focus-visible rule in app/globals.css. The 44x44 minimum touch target is
 * enforced via inline style so the hit area stays usable on mobile even when the
 * visual region is smaller.
 */
export default function BodyPart({ hotspot, onSelect }: BodyPartProps) {
  const style: CSSProperties = {
    left: hotspot.x,
    top: hotspot.y,
    width: hotspot.width,
    height: hotspot.height,
    minWidth: 44,
    minHeight: 44,
  };

  return (
    <button
      type="button"
      data-part-id={hotspot.id}
      aria-label={hotspot.label}
      onClick={() => onSelect?.(hotspot.id)}
      className="absolute rounded-md border border-accent/50 bg-accent/10 hover:bg-accent/20"
      style={style}
    />
  );
}
