// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Link from "next/link";
import BodyPartPage from "../../app/body/[part]/page";
import ExercisePage from "../../app/exercise/[id]/page";
import Home from "../../app/page";
import ErrorState from "../../components/ErrorState";
import ExerciseSession from "../../components/ExerciseSession";
import { getRegionByHotspot } from "../../lib/content";

/*
 * S19 core regression suite. Follows the S09 e2e convention: jsdom-level
 * assertions over the real data chain and real route components. True
 * viewport/layout verification (375/768/1280) is student manual work
 * (responsive-matrix-S19.pdf) — here we verify the structural contract.
 */

const ANKLE_HOTSPOT = "ankle-left";
const EXERCISE_ID = "ankle-pilot-placeholder";

// Home is a client component using useRouter(); the pages import notFound().
// Mock the module with both so the whole tree renders outside a Next runtime.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: () => {} }),
  notFound: () => {
    throw new Error("NEXT_HTTP_ERROR_FALLBACK:404");
  },
}));

// jsdom has no matchMedia; stub reduced-motion ON so CompletionFeedback never
// lazy-loads canvas-confetti inside jsdom (no canvas -> noise), and the static
// cue path is the one exercised.
beforeEach(() => {
  window.matchMedia = ((query: string) =>
    ({
      matches: true,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList) as typeof window.matchMedia;
});
afterEach(() => {
  delete (window as { matchMedia?: typeof window.matchMedia }).matchMedia;
  cleanup();
  vi.restoreAllMocks();
});

const renderBodyPart = async (part: string) => {
  const el = await BodyPartPage({ params: Promise.resolve({ part }) });
  return render(el);
};

const renderExercise = async (id: string, done?: string) => {
  const el = await ExercisePage({
    params: Promise.resolve({ id }),
    searchParams: Promise.resolve(done ? { done } : {}),
  });
  return render(el);
};

describe("core flow regression (S19): home -> region -> detail -> finish", () => {
  it("home renders the body map switcher (entry point intact)", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { name: /recovermate/i })).toBeTruthy();
    expect(screen.getByText(/select a body region/i)).toBeTruthy();
  });

  it("region page surfaces the placeholder card linking to the detail", async () => {
    const { container } = await renderBodyPart("ankle");
    expect(getRegionByHotspot(ANKLE_HOTSPOT)).toBe("ankle");
    const cardLink = container.querySelector(
      `a[href="/exercise/${EXERCISE_ID}"]`
    );
    expect(cardLink).not.toBeNull();
    // Every unreviewed (draft) card is clearly marked — since the S20 fill all
    // entries are draft, so every visible card carries the banner (S19 wrote
    // this when the ankle page had a single card).
    expect(screen.getAllByText(/\[Placeholder/i).length).toBeGreaterThanOrEqual(1);
    // Home return path (every state has a return route).
    expect(screen.getByRole("link", { name: "Home" })).toBeTruthy();
    expect(container.querySelector("main")?.className).toContain("px-4");
  });

  it("detail integrates safety + session (steps + timer) with one Steps heading", async () => {
    await renderExercise(EXERCISE_ID);
    // Safety BEFORE the action.
    expect(screen.getByText(/stop signals/i)).toBeTruthy();
    // Exactly one level-2 Steps heading (session's StepIndicator, not duplicated).
    expect(screen.getAllByRole("heading", { name: /steps/i, level: 2 })).toHaveLength(1);
    // The guided session is present: step button + step timer + stop exit.
    expect(
      screen.getByRole("button", { name: /\[professional-review-required\]/i })
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "Stop / Reset" })).toBeTruthy();
    expect(screen.getByLabelText(/step timer/i)).toBeTruthy();
    // No media yet -> graceful fallback, steps still usable.
    expect(screen.getByText(/video pending/i)).toBeTruthy();
  });

  it("back path is computed from the owning region (not hardcoded)", async () => {
    await renderExercise(EXERCISE_ID);
    const back = screen.getByRole("link", { name: /back to ankle/i });
    expect(back.getAttribute("href")).toBe("/body/ankle");
  });

  it("completion is user-confirmed and URL-driven (?done=1, no auto-jump)", async () => {
    await renderExercise(EXERCISE_ID);
    const mark = screen.getByRole("link", { name: /mark exercise complete/i });
    expect(mark.getAttribute("href")).toBe("?done=1");
    // Nothing completes on its own before the user acts.
    expect(screen.queryByRole("status")).toBeNull();

    cleanup();
    await renderExercise(EXERCISE_ID, "1");
    // Static completion cue + user-chosen next steps (reduced motion: no
    // particles — the static cue is the contract).
    expect(screen.getByRole("status").textContent).toMatch(/exercise complete/i);
    // Both the page back link and the feedback's next link lead to the region.
    const backLinks = screen.getAllByRole("link", { name: /back to ankle/i });
    expect(backLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of backLinks) {
      expect(link.getAttribute("href")).toBe("/body/ankle");
    }
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/");
  });

  it("media failure is recoverable inside the integrated session", () => {
    // jsdom doesn't implement media playback; the reset path calls pause().
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    const { container } = render(
      <ExerciseSession
        steps={["Step one", "Step two"]}
        stepDurationSeconds={30}
        videoUrl="/videos/broken.mp4"
        posterUrl=""
        captionUrl=""
        transcriptUrl="/transcripts/x.md"
      />
    );
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    fireEvent.error(video as HTMLVideoElement);
    // Error surfaced (not suppressed)...
    expect(screen.getByRole("alert").textContent).toMatch(/video reported an error/i);
    // ...steps remain usable...
    expect(screen.getByRole("button", { name: /step two/i })).toBeTruthy();
    // ...and the always-available stop exit clears it (safe recovery).
    fireEvent.click(screen.getByRole("button", { name: "Stop / Reset" }));
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("ErrorState announces, stays non-diagnostic, and offers recovery", () => {
    render(
      <ErrorState>
        <Link href="/body/ankle">Back to Ankle</Link>
        <Link href="/">Home</Link>
      </ErrorState>
    );
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toMatch(/can't be shown/i);
    // Safety: error copy never suggests self-assessment of an injury.
    expect(alert.textContent).not.toMatch(/injury|sprain|diagnos|grade|hurt/i);
    expect(screen.getByRole("link", { name: /back to ankle/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Home" })).toBeTruthy();
  });
});

describe("responsive contract (S19): no horizontal-scroll hacks", () => {
  const pageFiles = [
    "app/page.tsx",
    path.join("app", "body", "[part]", "page.tsx"),
    path.join("app", "exercise", "[id]", "page.tsx"),
    "app/globals.css",
  ];

  it("never hides horizontal overflow to mask layout errors (do-not-do)", () => {
    for (const file of pageFiles) {
      const src = readFileSync(path.resolve(process.cwd(), file), "utf8");
      expect(src.includes("overflow-x-hidden"), `${file} must not use overflow-x-hidden`).toBe(
        false
      );
    }
  });

  it("route containers use mobile-first fluid widths + breakpoint paddings", async () => {
    const home = render(<Home />);
    expect(home.container.querySelector("main")?.className).toContain("sm:px-6");
    cleanup();

    const region = await renderBodyPart("ankle");
    expect(region.container.querySelector("main")?.className).toContain("sm:px-6");
    cleanup();

    const detail = await renderExercise(EXERCISE_ID);
    expect(detail.container.querySelector("main")?.className).toContain("sm:px-6");
  });
});

describe("console cleanliness (S19)", () => {
  it("the core flow renders without console errors", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(<Home />);
    cleanup();
    await renderBodyPart("ankle");
    cleanup();
    await renderExercise(EXERCISE_ID);
    cleanup();
    await renderExercise(EXERCISE_ID, "1");
    expect(errorSpy).not.toHaveBeenCalled();
  });
});
