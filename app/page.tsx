"use client";

import { useRouter } from "next/navigation";
import BodyMapSwitcher from "../components/BodyMapSwitcher";
import { getRegionByHotspot } from "../lib/content";

export default function Home() {
  const router = useRouter();

  function handleSelect(hotspotId: string) {
    const region = getRegionByHotspot(hotspotId);
    if (region) {
      router.push(`/body/${region}`);
    }
  }

  return (
    <main className="mx-auto w-full min-w-0 max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="border-b border-border pb-6">
        <p className="plate-caption">Recovery &amp; warm-up atlas</p>
        <h1 className="font-display mt-1 text-4xl font-semibold text-foreground sm:text-5xl">
          Recover<span className="text-accent">Mate</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted">
          Select a body region. General educational guidance only.
        </p>
      </header>

      <div className="mt-8">
        <BodyMapSwitcher onSelect={handleSelect} />
      </div>

      <p className="mt-6 text-xs text-muted">
        Figures after Henry Gray, <em>Anatomy of the Human Body</em> (1918) —
        public domain. RecoverMate provides general educational guidance only
        and does not diagnose, treat, or replace qualified professional advice.
      </p>
    </main>
  );
}
