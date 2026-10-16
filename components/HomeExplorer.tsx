"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BodyMapSwitcher from "./BodyMapSwitcher";
import SportQuickEntry from "./SportQuickEntry";
import type { Sport } from "../schemas/sport";

export type HomeExplorerProps = {
  /** Hotspot id -> region id, generated server-side from body-parts.json
   * (E1: the client never imports the content data or Zod). */
  hotspotToRegion: Record<string, string>;
  /** Validated sport list, passed from the server page as props (E1). */
  sports: Sport[];
  /** The six region ids. */
  knownRegionIds: string[];
  /** Region id -> nameZh for chip labels. */
  regionNames: Record<string, string>;
};

/**
 * Home interaction shell (client boundary). The page itself is a server
 * component that validates content at build time and injects plain data here,
 * so this bundle carries NO zod + NO content JSON (perf exception E1 fix).
 *
 * Entry paths (all optional, none blocks the direct body-map path):
 * - body map hotspots -> region page;
 * - sport quick entry -> region chips + a matching recovery-flow link;
 * - the full flow list -> one /flow/<sport> entry per registered sport (S22
 *   routes were previously reachable only by direct URL).
 */
export default function HomeExplorer({
  hotspotToRegion,
  sports,
  knownRegionIds,
  regionNames,
}: HomeExplorerProps) {
  const router = useRouter();
  const [selectedSportId, setSelectedSportId] = useState<string | null>(null);

  function handleSelect(hotspotId: string) {
    const region = hotspotToRegion[hotspotId];
    if (region) {
      router.push(`/body/${region}`);
    }
  }

  function handleSelectRegion(regionId: string) {
    router.push(`/body/${regionId}`);
  }

  const selectedSport =
    sports.find((s) => s.id === selectedSportId) ?? null;

  return (
    /* Two-column on large screens (body map | entries + flows); stacks in the
       same order below lg so tablet/mobile keep the proven path. */
    <div className="mt-8 lg:mt-4 lg:grid lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:items-start lg:gap-12 2xl:grid-cols-[minmax(0,35rem)_minmax(0,1fr)]">
      <BodyMapSwitcher onSelect={handleSelect} />

      <div>
        <SportQuickEntry
          sports={sports}
          knownRegionIds={knownRegionIds}
          regionNames={regionNames}
          onSelectRegion={handleSelectRegion}
          onSelectSport={setSelectedSportId}
        />

        {/* Contextual flow entry for the selected sport. */}
        {selectedSport ? (
          <p className="mt-3">
            <Link
              href={`/flow/${selectedSport.id}`}
              className="inline-block rounded-md border border-accent/60 bg-surface px-4 py-2 hover:bg-accent-soft/50"
            >
              开始{selectedSport.nameZh}恢复流程（约 5–8 分钟）
            </Link>
          </p>
        ) : null}

        {/* All recovery flows, directly reachable (S22 backlog wiring). */}
        <section aria-label="Recovery flows" className="mt-8">
          <h2 className="text-xl font-semibold text-foreground">运动恢复流程</h2>
          <p className="mt-1 text-sm text-muted">
            按常见训练负荷相关部位生成的建议顺序，全程由你控制，可随时跳过或退出。
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {sports.map((sport) => (
              <li key={sport.id}>
                <Link
                  href={`/flow/${sport.id}`}
                  className="inline-block rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/10"
                >
                  {sport.nameZh}恢复流程
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
