// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import SportQuickEntry from "../components/SportQuickEntry";
import { SportSchema, type Sport } from "../schemas/sport";
import sportsData from "../data/sports.json";
import bodyPartsData from "../data/body-parts.json";

const SIX_REGIONS = (bodyPartsData as { id: string }[]).map((p) => p.id);

afterEach(() => {
  cleanup();
});

const BANNED_WORDING =
  /受伤|损伤|拉伤|诊断|你的伤|疼痛感|痊[愈复]|injur|diagnos|sprain|cure/i;

describe("sport schema + data (S21)", () => {
  it("data/sports.json parses against the Sport schema", () => {
    const sports = SportSchema.array().parse(sportsData);
    expect(sports.length).toBe(8);
  });

  it("has the user-approved entry set: 7 sports + 通用", () => {
    const ids = SportSchema.array().parse(sportsData).map((s) => s.id);
    expect(ids).toEqual([
      "basketball",
      "soccer",
      "badminton",
      "flag-football",
      "archery",
      "tennis",
      "ultimate",
      "general",
    ]);
  });

  it("every regionId references one of the six regions (referential integrity)", () => {
    for (const sport of SportSchema.array().parse(sportsData)) {
      for (const id of sport.regionIds) {
        expect(SIX_REGIONS).toContain(id);
      }
    }
  });

  it("region counts match the user's table (verified mapping decisions)", () => {
    const byId = Object.fromEntries(
      SportSchema.array().parse(sportsData).map((s) => [s.id, s.regionIds])
    );
    // 大腿→膝区；髋臀/腰腹→腰背区（user decision 2026-08-14）
    expect(byId["basketball"].sort()).toEqual(
      ["arm", "calf", "knee", "lower-back", "shoulder"].sort()
    );
    expect(byId["soccer"].sort()).toEqual(["calf", "knee", "lower-back"].sort());
    expect(byId["archery"].sort()).toEqual(["lower-back", "shoulder"].sort());
    expect(byId["general"].sort()).toEqual([...SIX_REGIONS].sort());
  });

  it("reason wording stays non-diagnostic (no injury/medical claims)", () => {
    for (const sport of SportSchema.array().parse(sportsData)) {
      expect(sport.reasonZh, sport.id).not.toMatch(BANNED_WORDING);
      expect(sport.reasonZh.length).toBeGreaterThan(10);
    }
  });

  it("schema rejects an empty regionIds list and missing reason", () => {
    const base = {
      id: "x",
      nameZh: "x",
      nameEn: "x",
      regionIds: ["knee"],
      reasonZh: "ok",
    };
    expect(() => SportSchema.parse({ ...base, regionIds: [] })).toThrow();
    expect(() => SportSchema.parse({ ...base, reasonZh: "" })).toThrow();
    const noReason: Record<string, unknown> = { ...base };
    delete noReason.reasonZh;
    expect(() => SportSchema.parse(noReason)).toThrow();
  });
});

describe("SportQuickEntry component (S21 acceptance)", () => {
  it("renders all 8 entries as keyboard-operable buttons", () => {
    render(<SportQuickEntry />);
    const names = ["篮球", "足球", "羽毛球", "腰旗橄榄球", "射箭", "网球", "飞盘", "通用"];
    for (const name of names) {
      const btn = screen.getByRole("button", { name: new RegExp(name) });
      expect(btn.tagName).toBe("BUTTON");
      expect(btn.getAttribute("aria-pressed")).toBe("false");
    }
  });

  it("selecting a sport shows the reason + region chips and highlights via callback", () => {
    const onHighlight = vi.fn();
    const onSelectRegion = vi.fn();
    render(<SportQuickEntry onHighlight={onHighlight} onSelectRegion={onSelectRegion} />);

    fireEvent.click(screen.getByRole("button", { name: /篮球/ }));
    const btn = screen.getByRole("button", { name: /篮球/ });
    expect(btn.getAttribute("aria-pressed")).toBe("true");
    expect(onHighlight).toHaveBeenCalledWith([
      "knee",
      "calf",
      "lower-back",
      "shoulder",
      "arm",
    ]);

    // Reason visible (why-recommended text — intro + selection panel both carry
    // the phrase, so assert at least one visible explanation).
    expect(screen.getAllByText(/常见训练负荷相关区域/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/篮球常见跳跃/)).toBeTruthy();

    // Region chips navigate via the callback.
    const chip = screen.getByRole("button", { name: /前往膝/ });
    fireEvent.click(chip);
    expect(onSelectRegion).toHaveBeenCalledWith("knee");

    // Toggling off clears highlight and reason.
    fireEvent.click(btn);
    expect(btn.getAttribute("aria-pressed")).toBe("false");
    expect(onHighlight).toHaveBeenLastCalledWith(null);
    expect(screen.queryByText(/篮球常见跳跃/)).toBeNull();
  });

  it("shows the non-diagnostic disclaimer (never an individualized judgment)", () => {
    render(<SportQuickEntry />);
    expect(
      screen.getByText(/不构成个体化医学判断/)
    ).toBeTruthy();
    expect(screen.getByText(/不是诊断结论/)).toBeTruthy();
  });

  it("general entry assumes no sport and covers all six regions", () => {
    const onHighlight = vi.fn();
    render(<SportQuickEntry onHighlight={onHighlight} />);
    fireEvent.click(screen.getByRole("button", { name: /通用/ }));
    expect(onHighlight).toHaveBeenCalledWith([...SIX_REGIONS]);
    expect(screen.getByText(/不预设任何运动项目/)).toBeTruthy();
  });

  it("no-match safe fallback: unknown regions degrade, map path stays open", () => {
    const onHighlight = vi.fn();
    const brokenSport: Sport = {
      id: "broken",
      nameZh: "测试运动",
      nameEn: "Test",
      regionIds: ["not-a-region"],
      reasonZh: "测试用无匹配区域。",
    };
    render(<SportQuickEntry sports={[brokenSport]} onHighlight={onHighlight} />);
    fireEvent.click(screen.getByRole("button", { name: /测试运动/ }));
    // Filtered to the known set -> empty -> fallback notice, no fake matches.
    expect(onHighlight).toHaveBeenCalledWith([]);
    expect(
      screen.getByText(/暂无已收录的部位指引，请直接使用人体图/)
    ).toBeTruthy();
  });

  it("works without callbacks (graceful degradation)", () => {
    render(<SportQuickEntry />);
    fireEvent.click(screen.getByRole("button", { name: /射箭/ }));
    expect(screen.getByText(/射箭需要长时间保持开弓姿势/)).toBeTruthy();
    expect(screen.getByRole("button", { name: /前往腰背/ })).toBeTruthy();
  });
});
