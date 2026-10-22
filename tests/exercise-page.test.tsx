// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import VideoPlayer from "../components/VideoPlayer";
import SafetyNotice from "../components/SafetyNotice";
import ExercisePage from "../app/exercise/[id]/page";

afterEach(() => {
  cleanup();
});

describe("VideoPlayer", () => {
  it("renders a native-controls video with a captions track (no autoplay)", () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="/videos/x.mp4"
        posterUrl="/videos/x-poster.jpg"
        captionUrl="/captions/x.vtt"
        transcriptUrl="/transcripts/x.md"
        exerciseId="x"
      />
    );
    const video = container.querySelector("video");
    expect(video).not.toBeNull();
    expect(video?.hasAttribute("controls")).toBe(true);
    expect(video?.hasAttribute("autoplay")).toBe(false); // safety: no autoplay
    const track = container.querySelector("track");
    expect(track?.getAttribute("kind")).toBe("subtitles");
    expect(track?.getAttribute("src")).toBe("/captions/x.vtt");
    expect(screen.getByRole("link", { name: /read transcript/i })).toBeTruthy();
  });

  it("uses the provided previewUrl for the S24 data-preview contract", () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="/videos/x.mp4"
        posterUrl=""
        captionUrl=""
        transcriptUrl=""
        exerciseId="x"
        previewUrl="https://store.public.blob.vercel-storage.com/videos/x-preview.mp4"
      />
    );
    const video = container.querySelector("video");
    expect(video?.getAttribute("data-preview")).toBe(
      "https://store.public.blob.vercel-storage.com/videos/x-preview.mp4"
    );
  });

  it("falls back to the /videos/<id>-preview.mp4 convention when previewUrl is absent", () => {
    const { container } = render(
      <VideoPlayer
        videoUrl="/videos/x.mp4"
        posterUrl=""
        captionUrl=""
        transcriptUrl=""
        exerciseId="x"
      />
    );
    const video = container.querySelector("video");
    expect(video?.getAttribute("data-preview")).toBe("/videos/x-preview.mp4");
  });

  it("degrades gracefully when there is no video (transcript still reachable)", () => {
    render(
      <VideoPlayer
        videoUrl=""
        posterUrl=""
        captionUrl=""
        transcriptUrl="/transcripts/x.md"
        exerciseId="x"
      />
    );
    expect(screen.getByText(/video pending/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /read transcript/i })).toBeTruthy();
  });
});

describe("SafetyNotice", () => {
  it("renders stop signals, to be shown before the action", () => {
    render(<SafetyNotice stopSignals={["stop if pain"]} />);
    expect(screen.getByText(/stop signals/i)).toBeTruthy();
    expect(screen.getByText(/stop if pain/i)).toBeTruthy();
  });
});

describe("exercise detail page (S15)", () => {
  const page = (id: string, done?: string) =>
    ExercisePage({
      params: Promise.resolve({ id }),
      searchParams: Promise.resolve(done ? { done } : {}),
    });

  it("renders steps and a safety notice for a valid id (no JS exception)", async () => {
    const el = await page("ankle-pilot-placeholder");
    render(el);
    // Steps are readable without the video.
    expect(screen.getByRole("heading", { name: /steps/i, level: 2 })).toBeTruthy();
    // Safety notice is present (before the action).
    expect(screen.getByText(/stop signals/i)).toBeTruthy();
  });

  it("rejects (notFound) for an invalid id", async () => {
    await expect(page("does-not-exist")).rejects.toThrow();
  });
});
