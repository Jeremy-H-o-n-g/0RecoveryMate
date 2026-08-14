// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import CompletionFeedback from "../components/CompletionFeedback";
import ConfettiEffect from "../components/ConfettiEffect";

// Control the mocked canvas-confetti module. The mock replaces the dynamically
// imported module; `failImport.current` makes the module's default throw so the
// .then path rejects exactly like a failed chunk load would.
const { confettiMock, failImport } = vi.hoisted(() => {
  const confettiMock = vi.fn<(opts?: unknown) => void>();
  return { confettiMock, failImport: { current: false } };
});

vi.mock("canvas-confetti", () => ({
  default: (opts: unknown) => {
    if (failImport.current) throw new Error("chunk load failed");
    return confettiMock(opts);
  },
}));

// jsdom does not implement matchMedia at all; define it per-test.
let reducedMotion = false;
beforeEach(() => {
  confettiMock.mockClear();
  failImport.current = false;
  reducedMotion = false;
  window.matchMedia = ((query: string) =>
    ({
      matches: reducedMotion,
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
  vi.restoreAllMocks();
  cleanup();
  vi.useRealTimers();
});

const props = (over: Partial<Parameters<typeof CompletionFeedback>[0]> = {}) => ({
  triggerKey: "ex-1",
  nextHref: "/body/ankle",
  backHref: "/",
  ...over,
});

describe("CompletionFeedback — static cue + user control (S18 acceptance)", () => {
  it("renders an announced, non-clinical static success cue with user-chosen actions", () => {
    render(<CompletionFeedback {...props()} />);

    const status = screen.getByRole("status");
    expect(status.textContent).toMatch(/exercise complete/i);
    const message = screen.getByText(/at your own pace/i).textContent ?? "";
    // Safety: no treatment/outcome claims in the default copy.
    expect(message).not.toMatch(/heal|cure|treat|guarantee|recovery promise/i);

    // Next step is a link the user clicks — not an automatic jump.
    const next = screen.getByRole("link", { name: /next exercise/i });
    expect(next.getAttribute("href")).toBe("/body/ankle");
    expect(screen.getByRole("link", { name: /^back$/i }).getAttribute("href")).toBe("/");

    // The ring + check are decorative; text carries the state (not color alone).
    expect(document.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("schedules no timers and never auto-navigates (no forced redirect)", () => {
    vi.useFakeTimers();
    render(<CompletionFeedback {...props()} />);
    // Nothing timed is ever scheduled by the component: no delayed redirect,
    // no auto-advance (S18 do-not-do; the old 'forced 3s jump' pattern).
    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(5000);
    expect(vi.getTimerCount()).toBe(0);
    expect(screen.getByRole("status").textContent).toMatch(/exercise complete/i);
  });

  it("shows the static cue unchanged under reduced motion, with no bounce class", () => {
    reducedMotion = true;
    render(<CompletionFeedback {...props()} />);
    expect(screen.getByRole("status").textContent).toMatch(/exercise complete/i);
    const svg = document.querySelector("svg");
    expect(svg?.className.baseVal ?? "").not.toContain("completion-bounce");
  });

  it("applies the one-shot bounce class when motion is allowed", () => {
    render(<CompletionFeedback {...props()} />);
    const svg = document.querySelector("svg");
    expect(svg?.className.baseVal ?? "").toContain("completion-bounce");
  });
});

describe("ConfettiEffect — one-shot, lazy, reduced-motion-safe (S18 acceptance)", () => {
  it("fires exactly once per completion key and re-arms for a new key", async () => {
    const { rerender } = render(<CompletionFeedback {...props()} />);
    await waitFor(() => expect(confettiMock).toHaveBeenCalledTimes(1));

    // Re-renders with the SAME key never re-fire (idempotent).
    rerender(<CompletionFeedback {...props()} />);
    rerender(<CompletionFeedback {...props()} message="still done" />);
    expect(confettiMock).toHaveBeenCalledTimes(1);

    // A new completion (new key) re-arms and fires exactly once more.
    rerender(<CompletionFeedback {...props({ triggerKey: "ex-2" })} />);
    await waitFor(() => expect(confettiMock).toHaveBeenCalledTimes(2));
    rerender(<CompletionFeedback {...props({ triggerKey: "ex-2" })} />);
    expect(confettiMock).toHaveBeenCalledTimes(2);

    // Library-level reduced-motion guard is requested too.
    expect(confettiMock.mock.calls[0][0]).toMatchObject({
      disableForReducedMotion: true,
    });
  });

  it("never imports/fires confetti under reduced motion (static cue only)", async () => {
    reducedMotion = true;
    render(<CompletionFeedback {...props()} />);
    // Give the (absent) dynamic import a real chance to resolve.
    await new Promise((r) => setTimeout(r, 20));
    expect(confettiMock).not.toHaveBeenCalled();

    // Defense in depth: the effect's own media check also skips when the
    // parent's `enabled` gate is missing.
    confettiMock.mockClear();
    render(<ConfettiEffect triggerKey="direct-1" />);
    await new Promise((r) => setTimeout(r, 20));
    expect(confettiMock).not.toHaveBeenCalled();
  });

  it("does nothing when disabled", async () => {
    render(<ConfettiEffect triggerKey="off-1" enabled={false} />);
    await new Promise((r) => setTimeout(r, 20));
    expect(confettiMock).not.toHaveBeenCalled();
  });

  it("falls back to the static cue when the confetti module fails to load", async () => {
    failImport.current = true;
    render(<CompletionFeedback {...props()} />);
    // The designed fallback: no particles, no crash, completion still readable.
    await new Promise((r) => setTimeout(r, 20));
    expect(confettiMock).not.toHaveBeenCalled();
    expect(screen.getByRole("status").textContent).toMatch(/exercise complete/i);
    expect(screen.getByRole("link", { name: /next exercise/i })).toBeTruthy();
  });
});
