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
      <h1 className="text-2xl font-semibold text-accent sm:text-3xl">RecoverMate</h1>
      <p className="mt-2 text-muted">
        Select a body region. General educational guidance only.
      </p>
      <div className="mt-8">
        <BodyMapSwitcher onSelect={handleSelect} />
      </div>
    </main>
  );
}
