// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  clampRatio,
  elapsedRatio,
  remainingMs,
  remainingRatio,
  ringGeometry,
} from "../lib/timer-math";
import { useExerciseTimer } from "../hooks/useExerciseTimer";

describe("timer math (boundaries 0 / 1 / T / T+1)", () => {
  const T = 60_000;

  it("0 ms -> ratio 0, remaining T", () => {
    expect(elapsedRatio(0, T)).toBe(0);
    expect(remainingMs(0, T)).toBe(T);
  });

  it("1 ms -> ~1/T elapsed", () => {
    expect(elapsedRatio(1, T)).toBeCloseTo(1 / T, 10);
    expect(remainingMs(1, T)).toBe(T - 1);
  });

  it("T ms -> ratio 1, remaining 0", () => {
    expect(elapsedRatio(T, T)).toBe(1);
    expect(remainingMs(T, T)).toBe(0);
  });

  it("T+1 ms -> clamped: ratio 1, remaining 0", () => {
    expect(elapsedRatio(T + 1, T)).toBe(1);
    expect(remainingMs(T + 1, T)).toBe(0);
    expect(remainingRatio(T + 1, T)).toBe(0);
  });

  it("ring geometry: dashoffset 0 at start, circumference at end", () => {
    const r = 50;
    const circ = 2 * Math.PI * r;
    expect(ringGeometry(0, T, r).dashoffset).toBe(0);
    expect(ringGeometry(T, T, r).dashoffset).toBeCloseTo(circ, 6);
  });

  it("clampRatio bounds to [0,1]", () => {
    expect(clampRatio(-1)).toBe(0);
    expect(clampRatio(0.5)).toBe(0.5);
    expect(clampRatio(2)).toBe(1);
  });
});

describe("useExerciseTimer state machine", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("idle -> running -> complete; completion fires exactly once", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useExerciseTimer({ durationMs: 1000, onComplete })
    );
    expect(result.current.phase).toBe("idle");

    act(() => result.current.start());
    expect(result.current.phase).toBe("running");

    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(result.current.phase).toBe("complete");
    expect(onComplete).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("paused time does not count toward elapsed", () => {
    const { result } = renderHook(() => useExerciseTimer({ durationMs: 5000 }));
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    act(() => result.current.pause());
    expect(result.current.phase).toBe("paused");

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    act(() => result.current.resume());
    expect(result.current.phase).toBe("running");
    // The 2000 ms spent paused must NOT have been subtracted.
    expect(result.current.remainingMs).toBeGreaterThan(3900);
    expect(result.current.remainingMs).toBeLessThanOrEqual(4000);
  });

  it("reset returns to idle with full remaining and re-enables completion", () => {
    const onComplete = vi.fn();
    const { result } = renderHook(() =>
      useExerciseTimer({ durationMs: 1000, onComplete })
    );
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);

    act(() => result.current.reset());
    expect(result.current.phase).toBe("idle");
    expect(result.current.remainingMs).toBe(1000);

    // A second run completes again (completion re-enabled by reset/start).
    act(() => result.current.start());
    act(() => {
      vi.advanceTimersByTime(1001);
    });
    expect(onComplete).toHaveBeenCalledTimes(2);
  });
});
