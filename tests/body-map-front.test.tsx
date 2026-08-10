// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

// Isolate the DOM between tests (vitest globals are off, so Testing Library's
// auto-cleanup is not registered automatically).
afterEach(() => {
  cleanup();
});
import userEvent from "@testing-library/user-event";
import BodyMapFront, {
  FRONT_HOTSPOTS,
  rectsOverlap,
} from "../components/BodyMapFront";

describe("front body map - geometry invariants", () => {
  it("every hotspot meets the 44x44 minimum touch target", () => {
    for (const h of FRONT_HOTSPOTS) {
      expect(h.width).toBeGreaterThanOrEqual(44);
      expect(h.height).toBeGreaterThanOrEqual(44);
    }
  });

  it("no two hotspots overlap", () => {
    for (let i = 0; i < FRONT_HOTSPOTS.length; i++) {
      for (let j = i + 1; j < FRONT_HOTSPOTS.length; j++) {
        expect(rectsOverlap(FRONT_HOTSPOTS[i], FRONT_HOTSPOTS[j])).toBe(false);
      }
    }
  });

  it("every hotspot has a unique, non-empty id and label", () => {
    const ids = FRONT_HOTSPOTS.map((h) => h.id);
    const labels = FRONT_HOTSPOTS.map((h) => h.label);
    expect(ids.every(Boolean)).toBe(true);
    expect(labels.every(Boolean)).toBe(true);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe("front body map - rendering and keyboard activation", () => {
  it("renders one button per hotspot with an accessible name", () => {
    render(<BodyMapFront />);
    for (const h of FRONT_HOTSPOTS) {
      // getByRole throws if the button or its accessible name is missing.
      const btn = screen.getByRole("button", { name: h.label });
      expect(btn.getAttribute("aria-label")).toBe(h.label);
    }
  });

  it("activates a hotspot on Enter and Space (keyboard)", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<BodyMapFront onSelect={onSelect} />);
    const target = FRONT_HOTSPOTS[0];
    const btn = screen.getByRole("button", { name: target.label });
    btn.focus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onSelect).toHaveBeenCalledWith(target.id);
    expect(onSelect.mock.calls.length).toBeGreaterThanOrEqual(1);
  });
});
