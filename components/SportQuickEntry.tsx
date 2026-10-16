"use client";

import { useState } from "react";
import type { Sport } from "../schemas/sport";

export type SportQuickEntryProps = {
  /** Validated sport list — injected by the server page (E1: data + Zod stay
   * out of the client bundle; build-time validation lives in lib/content). */
  sports: Sport[];
  /** Known region ids (the six regions in body-parts.json). */
  knownRegionIds: string[];
  /** Region id -> display name (nameZh) for the navigation chips. */
  regionNames: Record<string, string>;
  /** Notified with the highlighted region ids (null = cleared). Optional:
   * without it the entry still shows regions + reasons (graceful degradation). */
  onHighlight?: (regionIds: string[] | null) => void;
  /** Region chip activation (navigation decided by the parent). Optional. */
  onSelectRegion?: (regionId: string) => void;
  /** Notified with the selected sport id (null = cleared). Optional; lets the
   * parent offer a matching recovery-flow entry. */
  onSelectSport?: (sportId: string | null) => void;
};

/**
 * Sport quick entries (S21): 7 sports + 通用 as explainable navigation.
 *
 * - Selecting a sport shows WHY those regions are listed (常见训练负荷相关区域
 *   wording) and highlights them via onHighlight. This is navigation help, not
 *   a judgment about the user's body — the visible footnote states that no
 *   individualized medical conclusion is being made (S21 safety).
 * - "通用" assumes no sport and points at the whole map; the DIRECT body-map
 *   path is never blocked or hidden (S21 do-not-do).
 * - Safe fallback: if a sport maps to no known region, a notice says so and
 *   keeps the direct map path — no dead ends, no invented matches.
 * - Buttons are natively keyboard-operable (Tab + Enter/Space); selection is
 *   aria-pressed + border + text, never color alone.
 */
export default function SportQuickEntry({
  sports,
  knownRegionIds,
  regionNames,
  onHighlight,
  onSelectRegion,
  onSelectSport,
}: SportQuickEntryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = sports.find((s) => s.id === selectedId) ?? null;
  const highlighted = selected
    ? selected.regionIds.filter((id) => knownRegionIds.includes(id))
    : [];
  const hasMatches = selected !== null && highlighted.length > 0;

  const regionName = (id: string): string => regionNames[id] ?? id;

  const toggle = (sport: Sport) => {
    const next = selectedId === sport.id ? null : sport.id;
    setSelectedId(next);
    onSelectSport?.(next);
    if (!onHighlight) return;
    if (next === null) {
      onHighlight(null);
    } else {
      onHighlight(sport.regionIds.filter((id) => knownRegionIds.includes(id)));
    }
  };

  return (
    <section aria-label="Sport quick entry" className="mt-6">
      <h2 className="text-xl font-semibold text-foreground">运动类型快捷入口</h2>
      <p className="mt-1 text-sm text-muted">
        选择运动类型查看常见训练负荷相关区域（只是导航提示，不是诊断结论）。
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {sports.map((sport) => {
          const isPressed = selectedId === sport.id;
          return (
            <button
              key={sport.id}
              type="button"
              aria-pressed={isPressed}
              onClick={() => toggle(sport)}
              className={`rounded-md border px-4 py-2 ${
                isPressed
                  ? "border-accent bg-accent/20 font-semibold ring-1 ring-accent/50"
                  : "border-accent/50 hover:bg-accent/10"
              }`}
            >
              {sport.nameZh}
              {isPressed ? <span className="ml-1 text-accent">●</span> : null}
            </button>
          );
        })}
      </div>

      {/* Why these regions — visible, announced, non-diagnostic. */}
      <div aria-live="polite" className="mt-3">
        {selected ? (
          <div className="rounded-lg border border-accent/30 bg-surface/40 p-3">
            <p className="text-sm text-foreground">
              <span className="font-semibold">{selected.nameZh}</span>：常见训练负荷相关区域
            </p>
            <p className="mt-1 text-sm text-muted">{selected.reasonZh}</p>

            {hasMatches ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {highlighted.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSelectRegion?.(id)}
                    className="rounded-md border border-accent/50 px-3 py-1 text-sm hover:bg-accent/20"
                  >
                    前往{regionName(id)}
                  </button>
                ))}
              </div>
            ) : (
              /* No-match safe fallback: no dead end, direct map path kept. */
              <p role="status" className="mt-2 text-sm text-focus">
                该运动暂无已收录的部位指引，请直接使用人体图选择部位。
              </p>
            )}
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-xs text-muted">
        区域列表仅表示该运动中常见承受较高训练负荷的身体部位，不针对你的身体状况，也不构成个体化医学判断。随时可以直接使用人体图。
      </p>
    </section>
  );
}
