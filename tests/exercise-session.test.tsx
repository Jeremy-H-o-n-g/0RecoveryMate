// @vitest-environment jsdom
import type { RefObject } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import ExerciseSession from "../components/ExerciseSession";
import { useExerciseSession } from "../hooks/useExerciseSession";

// jsdom does not implement media playback; stub play/pause so calls are silent
// (and assertable) instead of logging "Not implemented".
let playSpy: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  playSpy = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
  vi.useRealTimers();
});

const BASE_PROPS = {
  steps: ["Warm up gently", "Roll slowly", "Hold and breathe"],
  stepDurationSeconds: 10,
  videoUrl: "/videos/session.mp4",
  posterUrl: "/videos/session-poster.jpg",
  captionUrl: "/captions/session.vtt",
  transcriptUrl: "/transcripts/session.md",
};

function videoOf(container: HTMLElement): HTMLVideoElement {
  const v = container.querySelector("video");
  if (!v) throw new Error("video element not rendered");
  return v;
}

/** Media events don't bubble natively; React handles them in capture at the
 * root, so a bubbling dispatch reaches the handler either way. */
const fireMedia = (el: Element, type: string) =>
  fireEvent(el, new Event(type, { bubbles: true }));

const timerLabel = (container: HTMLElement): string =>
  container.querySelector("svg")?.getAttribute("aria-label") ?? "";

const statusText = (): string =>
  (screen.getByText(/step \d of \d/i).textContent ?? "").replace(/\s+/g, " ").trim();

const stepButton = (name: string | RegExp) =>
  screen.getByRole("button", { name });

describe("ExerciseSession — player/timer sync (S17 acceptance)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a native-controls video (no autoplay), captions, steps, and idle status", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);
    expect(video.hasAttribute("controls")).toBe(true);
    expect(video.hasAttribute("autoplay")).toBe(false); // safety: no autoplay
    const track = container.querySelector("track");
    expect(track?.getAttribute("kind")).toBe("subtitles");
    expect(track?.getAttribute("src")).toBe("/captions/session.vtt");

    expect(statusText()).toBe("Step 1 of 3 · Ready");
    expect(stepButton(/warm up gently/i).getAttribute("aria-current")).toBe("step");
    expect(stepButton(/roll slowly/i).getAttribute("aria-current")).toBeNull();
    expect(timerLabel(container)).toBe("Time remaining: 10 seconds. State: idle.");
  });

  it("pausing the video also pauses the timer; resuming continues (sync)", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);

    fireMedia(video, "play");
    expect(statusText()).toBe("Step 1 of 3 · Playing");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 9 seconds. State: running.");

    fireMedia(video, "pause");
    expect(statusText()).toBe("Step 1 of 3 · Paused");
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // Paused video time must NOT count down the step timer.
    expect(timerLabel(container)).toBe("Time remaining: 9 seconds. State: paused.");

    fireMedia(video, "play");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 8 seconds. State: running.");
  });

  it("session Start/Pause controls delegate to the video element (single source of truth)", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    expect(videoOf(container)).toBeTruthy(); // media present; controls act on it
    playSpy.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(playSpy).toHaveBeenCalledTimes(1); // controls drive the media, not a second timer
    expect(statusText()).toBe("Step 1 of 3 · Playing");

    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    expect(statusText()).toBe("Step 1 of 3 · Paused");
    expect(timerLabel(container)).toBe("Time remaining: 10 seconds. State: paused.");
  });

  it("video ended ends the session WITHOUT advancing steps; timer returns to ready", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);
    fireMedia(video, "play");
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    fireMedia(video, "ended");
    expect(statusText()).toBe("Step 1 of 3 · Ended");
    expect(stepButton(/warm up gently/i).getAttribute("aria-current")).toBe("step"); // no auto-advance
    expect(timerLabel(container)).toBe("Time remaining: 10 seconds. State: idle.");
    expect(screen.getByRole("button", { name: "Replay" })).toBeTruthy();
    // Manual step control remains available after ended.
    expect(screen.getByRole("button", { name: "Next step" })).toBeTruthy();
  });

  it("seeking does not perturb phase, step, or timer (no timecodes yet)", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);

    fireMedia(video, "play");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    fireMedia(video, "seeked");
    expect(statusText()).toBe("Step 1 of 3 · Playing");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 8 seconds. State: running.");

    fireMedia(video, "pause");
    fireMedia(video, "seeked");
    expect(statusText()).toBe("Step 1 of 3 · Paused");
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 8 seconds. State: paused.");
  });

  it("surfaces native media errors (not suppressed) and pauses the timer", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);
    fireMedia(video, "play");
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    fireMedia(video, "error");
    const alert = screen.getByRole("alert");
    expect(alert.textContent).toMatch(/the video reported an error/i);
    expect(statusText()).toBe("Step 1 of 3 · Paused");
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 9 seconds. State: paused.");
  });

  it("step timer completion does not force advance; the user moves on", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);
    fireMedia(video, "play");
    act(() => {
      vi.advanceTimersByTime(10_001);
    });

    expect(statusText()).toBe("Step 1 of 3 · Playing · step complete");
    expect(stepButton(/warm up gently/i).getAttribute("aria-current")).toBe("step");
    expect(screen.getByText(/nothing advances automatically/i)).toBeTruthy();
    // Steps stay navigable after completion.
    expect(screen.getByRole("button", { name: "Next step" }).hasAttribute("disabled")).toBe(false);
  });

  it("manual step change gives the new step a fresh timer (and restarts it while playing)", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);
    fireMedia(video, "play");
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    fireEvent.click(screen.getByRole("button", { name: "Next step" }));
    expect(statusText()).toBe("Step 2 of 3 · Playing");
    expect(stepButton(/roll slowly/i).getAttribute("aria-current")).toBe("step");
    expect(timerLabel(container)).toBe("Time remaining: 10 seconds. State: running.");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 9 seconds. State: running.");
  });

  it("any state can be safely reset (stop exit always available)", () => {
    const { container } = render(<ExerciseSession {...BASE_PROPS} />);
    const video = videoOf(container);
    fireMedia(video, "play");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    fireEvent.click(screen.getByRole("button", { name: "Next step" }));
    fireMedia(video, "error");
    expect(screen.getByRole("alert")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Stop / Reset" }));
    expect(statusText()).toBe("Step 1 of 3 · Ready");
    expect(stepButton(/warm up gently/i).getAttribute("aria-current")).toBe("step");
    expect(timerLabel(container)).toBe("Time remaining: 10 seconds. State: idle.");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByRole("button", { name: "Start" })).toBeTruthy();
  });

  it("without a video the session still works (fallback + transcript)", () => {
    const { container } = render(
      <ExerciseSession {...BASE_PROPS} videoUrl="" posterUrl="" captionUrl="" />
    );
    expect(container.querySelector("video")).toBeNull();
    expect(screen.getByText(/video pending/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /read transcript/i })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(statusText()).toBe("Step 1 of 3 · Playing");
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 9 seconds. State: running.");
    fireEvent.click(screen.getByRole("button", { name: "Pause" }));
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(timerLabel(container)).toBe("Time remaining: 9 seconds. State: paused.");
  });
});

describe("StepIndicator — manual + keyboard step navigation (S17 acceptance)", () => {
  it("arrow/Home/End keys move the current step and focus; clamped at the ends", () => {
    render(<ExerciseSession {...BASE_PROPS} />);
    const list = screen.getByRole("list");

    fireEvent.keyDown(list, { key: "ArrowRight" });
    const step2 = stepButton(/roll slowly/i);
    // Keyboard nav alone does not start playback — steps stay user-controlled.
    expect(statusText()).toBe("Step 2 of 3 · Ready");
    expect(step2.getAttribute("aria-current")).toBe("step");
    expect(document.activeElement).toBe(step2); // focus follows the highlight

    const step3 = stepButton(/hold and breathe/i);
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(step3.getAttribute("aria-current")).toBe("step");

    // Clamped: ArrowRight at the last step stays on the last step.
    fireEvent.keyDown(list, { key: "ArrowRight" });
    expect(step3.getAttribute("aria-current")).toBe("step");

    fireEvent.keyDown(list, { key: "ArrowLeft" });
    expect(step2.getAttribute("aria-current")).toBe("step");

    const step1 = stepButton(/warm up gently/i);
    fireEvent.keyDown(list, { key: "Home" });
    expect(step1.getAttribute("aria-current")).toBe("step");
    expect(document.activeElement).toBe(step1);

    fireEvent.keyDown(list, { key: "End" });
    expect(step3.getAttribute("aria-current")).toBe("step");
    expect(document.activeElement).toBe(step3);
  });

  it("clicking a step button (or Prev/Next) adjusts the step manually", () => {
    render(<ExerciseSession {...BASE_PROPS} />);
    expect(screen.getByRole("button", { name: "Previous step" })).toHaveProperty("disabled", true);

    fireEvent.click(stepButton(/hold and breathe/i));
    expect(statusText()).toBe("Step 3 of 3 · Ready");
    expect(screen.getByRole("button", { name: "Next step" })).toHaveProperty("disabled", true);

    fireEvent.click(screen.getByRole("button", { name: "Previous step" }));
    expect(statusText()).toBe("Step 2 of 3 · Ready");
  });
});

describe("useExerciseSession — controller hook", () => {
  /** Stand-in for the component-owned ref (no element mounted in hook tests). */
  const makeRef = (): RefObject<HTMLVideoElement | null> => ({ current: null });

  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("step completion fires once per step and never advances", () => {
    const onStepComplete = vi.fn();
    const { result } = renderHook(() =>
      useExerciseSession({
        stepCount: 3,
        stepDurationSeconds: 2,
        hasVideo: false,
        videoRef: makeRef(),
        onStepComplete,
      })
    );

    act(() => result.current.toggle());
    expect(result.current.phase).toBe("playing");
    act(() => {
      vi.advanceTimersByTime(2001);
    });
    expect(result.current.stepComplete).toBe(true);
    expect(onStepComplete).toHaveBeenCalledTimes(1);
    expect(onStepComplete).toHaveBeenCalledWith(0);
    expect(result.current.stepIndex).toBe(0); // no forced advance

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(onStepComplete).toHaveBeenCalledTimes(1); // exactly once
  });

  it("changing steps restarts that step's timer and reports the right step", () => {
    const onStepComplete = vi.fn();
    const { result } = renderHook(() =>
      useExerciseSession({
        stepCount: 3,
        stepDurationSeconds: 2,
        hasVideo: false,
        videoRef: makeRef(),
        onStepComplete,
      })
    );
    act(() => result.current.toggle());
    act(() => result.current.goToStep(2));
    expect(result.current.stepIndex).toBe(2);
    expect(result.current.timer.remainingMs).toBe(2000);
    act(() => {
      vi.advanceTimersByTime(2001);
    });
    expect(onStepComplete).toHaveBeenCalledWith(2);
    expect(result.current.stepIndex).toBe(2);
  });

  it("video ended callback fires once and the safe reset restores idle", () => {
    const onEnded = vi.fn();
    const { result } = renderHook(() =>
      useExerciseSession({
        stepCount: 2,
        stepDurationSeconds: 5,
        hasVideo: true,
        videoRef: makeRef(),
        onEnded,
      })
    );
    act(() => result.current.toggle());
    expect(result.current.phase).toBe("playing");
    act(() => result.current.goToStep(1));
    act(() => result.current.mediaHandlers.onEnded());
    expect(result.current.phase).toBe("ended");
    expect(onEnded).toHaveBeenCalledTimes(1);
    expect(result.current.stepIndex).toBe(1); // ended does not move steps

    act(() => result.current.resetSession());
    expect(result.current.phase).toBe("idle");
    expect(result.current.stepIndex).toBe(0);
    expect(result.current.timer.remainingMs).toBe(5000);
    expect(result.current.mediaError).toBeNull();
  });

  it("goToStep clamps out-of-range indices", () => {
    const { result } = renderHook(() =>
      useExerciseSession({
        stepCount: 3,
        stepDurationSeconds: 1,
        hasVideo: false,
        videoRef: makeRef(),
      })
    );
    act(() => result.current.goToStep(99));
    expect(result.current.stepIndex).toBe(2);
    expect(result.current.canGoNext).toBe(false);
    act(() => result.current.goToStep(-5));
    expect(result.current.stepIndex).toBe(0);
    expect(result.current.canGoPrev).toBe(false);
  });
});
