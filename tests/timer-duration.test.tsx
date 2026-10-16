// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import TimerDurationControl from "../components/TimerDurationControl";
import ExerciseSession from "../components/ExerciseSession";
import {
  TIMER_MAX_SECONDS,
  TIMER_MIN_SECONDS,
} from "../lib/timer-math";

// jsdom has no media playback; stub like exercise-session.test.tsx.
beforeEach(() => {
  vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
  cleanup();
  vi.useRealTimers();
});

const timerLabel = (container: HTMLElement): string =>
  container.querySelector("svg")?.getAttribute("aria-label") ?? "";

describe("TimerDurationControl (2026-09-01 backlog)", () => {
  it("offers the rest preset + defaults and reports selections", () => {
    const onChange = vi.fn();
    render(
      <TimerDurationControl
        valueSeconds={30}
        defaultSeconds={30}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /15 s rest/ }));
    expect(onChange).toHaveBeenCalledWith(15);
    fireEvent.click(screen.getByRole("button", { name: /^60 s$/ }));
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it("marks the current value with aria-pressed (not color alone)", () => {
    render(
      <TimerDurationControl valueSeconds={45} defaultSeconds={30} onChange={() => {}} />
    );
    expect(
      screen.getByRole("button", { name: /^45 s$/ }).getAttribute("aria-pressed")
    ).toBe("true");
    expect(
      screen.getByRole("button", { name: /^30 s$/ }).getAttribute("aria-pressed")
    ).toBe("false");
  });

  it("stepper clamps at the policy bounds", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <TimerDurationControl
        valueSeconds={TIMER_MIN_SECONDS}
        defaultSeconds={30}
        onChange={onChange}
      />
    );
    expect(
      screen.getByRole("button", { name: /decrease by/i }).hasAttribute("disabled")
    ).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: /increase by/i }));
    expect(onChange).toHaveBeenCalledWith(TIMER_MIN_SECONDS + 5);

    rerender(
      <TimerDurationControl
        valueSeconds={TIMER_MAX_SECONDS}
        defaultSeconds={30}
        onChange={onChange}
      />
    );
    expect(
      screen.getByRole("button", { name: /increase by/i }).hasAttribute("disabled")
    ).toBe(true);
  });

  it("disables every adjustment while a countdown is live", () => {
    render(
      <TimerDurationControl
        valueSeconds={30}
        defaultSeconds={30}
        disabled
        onChange={() => {}}
      />
    );
    const group = screen.getByRole("group", { name: /countdown duration/i });
    const buttons = group.querySelectorAll("button");
    expect(buttons.length).toBeGreaterThan(0);
    for (const b of Array.from(buttons)) {
      expect(b.hasAttribute("disabled")).toBe(true);
    }
    expect(screen.getByText(/stop \/ reset to adjust/i)).toBeTruthy();
  });
});

describe("ExerciseSession integration: adjustable countdown with rest preset", () => {
  const PROPS = {
    steps: ["Warm up gently", "Hold and breathe"],
    stepDurationSeconds: 30,
    videoUrl: "",
    posterUrl: "",
    captionUrl: "",
    transcriptUrl: "",
  };

  it("shows the authored default, then follows a preset selection while idle", () => {
    const { container } = render(<ExerciseSession {...PROPS} />);
    expect(timerLabel(container)).toBe(
      "Time remaining: 30 seconds. State: idle."
    );

    fireEvent.click(screen.getByRole("button", { name: /15 s rest/ }));
    expect(timerLabel(container)).toBe(
      "Time remaining: 15 seconds. State: idle."
    );
  });

  it("locks the control once the countdown runs; Stop / Reset unlocks it", () => {
    const { container } = render(<ExerciseSession {...PROPS} />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(timerLabel(container)).toContain("State: running.");

    const rest = screen.getByRole("button", { name: /15 s rest/ });
    expect(rest.hasAttribute("disabled")).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: "Stop / Reset" }));
    expect(
      screen.getByRole("button", { name: /15 s rest/ }).hasAttribute("disabled")
    ).toBe(false);
  });

  it("a re-timed countdown runs the NEW duration to completion (once)", () => {
    vi.useFakeTimers();
    const { container } = render(<ExerciseSession {...PROPS} />);
    fireEvent.click(screen.getByRole("button", { name: /^45 s$/ }));
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    // 45 s chosen: still running after the old default would have expired.
    expect(timerLabel(container)).toContain("State: running.");
    act(() => {
      vi.advanceTimersByTime(16_000);
    });
    expect(timerLabel(container)).toContain("State: complete.");
    vi.useRealTimers();
  });
});
