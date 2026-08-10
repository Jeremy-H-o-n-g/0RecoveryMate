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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold text-accent">RecoverMate</h1>
      <p className="mt-2 text-muted">
        Select a body region. General educational guidance only.
      </p>
      <div className="mt-8">
        <BodyMapSwitcher onSelect={handleSelect} />
      </div>
    </main>
  );
}
