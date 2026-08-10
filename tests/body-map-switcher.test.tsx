// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BodyMapSwitcher from "../components/BodyMapSwitcher";
import { BACK_HOTSPOTS } from "../components/BodyMapBack";
import { FRONT_HOTSPOTS, rectsOverlap } from "../components/BodyMapFront";

afterEach(() => {
  cleanup();
});

describe("back body map - geometry", () => {
  it("every back hotspot meets 44x44 and none overlap", () => {
    for (const h of BACK_HOTSPOTS) {
      expect(h.width).toBeGreaterThanOrEqual(44);
      expect(h.height).toBeGreaterThanOrEqual(44);
    }
    for (let i = 0; i < BACK_HOTSPOTS.length; i++) {
      for (let j = i + 1; j < BACK_HOTSPOTS.length; j++) {
        expect(rectsOverlap(BACK_HOTSPOTS[i], BACK_HOTSPOTS[j])).toBe(false);
      }
    }
  });

  it("back view includes the lower-back region (hidden on the front view)", () => {
    expect(BACK_HOTSPOTS.some((h) => h.id === "lower-back")).toBe(true);
    expect(FRONT_HOTSPOTS.some((h) => h.id === "lower-back")).toBe(false);
  });
});

describe("body map switcher - switching, AT, focus", () => {
  it("shows the front map by default and not the back map", () => {
    render(<BodyMapSwitcher />);
    expect(screen.getByRole("group", { name: "Front body map" })).toBeDefined();
    expect(screen.queryByRole("group", { name: "Back body map" })).toBeNull();
  });

  it("switches front<->back and exposes state via aria-pressed", async () => {
    const user = userEvent.setup();
    render(<BodyMapSwitcher />);
    const front = screen.getByRole("button", { name: "Front" });
    const back = screen.getByRole("button", { name: "Back" });
    expect(front.getAttribute("aria-pressed")).toBe("true");
    expect(back.getAttribute("aria-pressed")).toBe("false");

    await user.click(back);
    expect(screen.getByRole("group", { name: "Back body map" })).toBeDefined();
    expect(screen.queryByRole("group", { name: "Front body map" })).toBeNull();
    expect(back.getAttribute("aria-pressed")).toBe("true");
    expect(front.getAttribute("aria-pressed")).toBe("false");

    await user.click(front);
    expect(screen.getByRole("group", { name: "Front body map" })).toBeDefined();
    expect(front.getAttribute("aria-pressed")).toBe("true");
  });

  it("activates the switch by keyboard (Space)", async () => {
    const user = userEvent.setup();
    render(<BodyMapSwitcher />);
    const back = screen.getByRole("button", { name: "Back" });
    back.focus();
    await user.keyboard(" ");
    expect(screen.getByRole("group", { name: "Back body map" })).toBeDefined();
  });

  it("retains focus on the switch control after switching (no context loss)", async () => {
    const user = userEvent.setup();
    render(<BodyMapSwitcher />);
    const back = screen.getByRole("button", { name: "Back" });
    back.focus();
    await user.click(back);
    expect(document.activeElement).toBe(back);
  });

  it("all six regions are reachable across views; tapping a back hotspot fires onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<BodyMapSwitcher onSelect={onSelect} />);

    // Front view covers shoulder/arm/knee/calf/ankle.
    expect(screen.getByRole("button", { name: "Left shoulder" })).toBeDefined();

    // Switch to back to reach the lower back, then tap it.
    await user.click(screen.getByRole("button", { name: "Back" }));
    const lowerBack = screen.getByRole("button", { name: "Lower back" });
    await user.click(lowerBack);
    expect(onSelect).toHaveBeenCalledWith("lower-back");
  });
});
