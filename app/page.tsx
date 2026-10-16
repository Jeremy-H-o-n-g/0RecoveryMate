import HomeExplorer from "../components/HomeExplorer";
import { bodyParts, sports } from "../lib/content";

/**
 * Home (SERVER component). Content is validated at build time by lib/content
 * and injected into the client boundary (HomeExplorer) as plain props, so the
 * home-route client chunk carries NO zod + NO content JSON (perf E1 fix).
 * The direct body-map path stays primary; sport entries and recovery flows
 * are additional, never-blocking entry links (S21/S22 backlog wiring).
 */
export default function Home() {
  const hotspotToRegion: Record<string, string> = {};
  for (const part of bodyParts) {
    for (const svgId of part.svgIds) {
      hotspotToRegion[svgId] = part.id;
    }
  }
  const regionNames: Record<string, string> = Object.fromEntries(
    bodyParts.map((p) => [p.id, p.nameZh])
  );
  const knownRegionIds = bodyParts.map((p) => p.id);

  return (
    <main className="mx-auto w-full min-w-0 max-w-3xl px-4 py-8 sm:px-6 sm:py-12 md:max-w-4xl lg:max-w-6xl lg:pt-6 lg:pb-6">
      <header className="border-b border-border pb-6 lg:pb-3">
        <p className="plate-caption">Recovery &amp; warm-up atlas</p>
        <h1 className="font-display mt-1 text-4xl font-semibold text-foreground sm:text-5xl">
          Recover<span className="text-gradient">Mate</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Select a body region. General educational guidance only.
        </p>
      </header>

      <HomeExplorer
        hotspotToRegion={hotspotToRegion}
        sports={sports}
        knownRegionIds={knownRegionIds}
        regionNames={regionNames}
      />

      <p className="mt-4 text-xs text-muted">
        Body-map artwork: color-coded muscle chart — provenance and license
        recorded in docs/SourceLedger.md &sect;4a. RecoverMate provides general
        educational guidance only and does not diagnose, treat, or replace
        qualified professional advice.
      </p>
    </main>
  );
}
