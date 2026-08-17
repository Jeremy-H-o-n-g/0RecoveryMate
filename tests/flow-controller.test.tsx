// @vitest-environment jsdom
import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import FlowController from "../components/FlowController";
import FlowPage from "../app/flow/[sport]/page";
import {
  buildExerciseQueue,
  getQueueSport,
  MAX_SECONDS,
} from "../lib/build-exercise-queue";
import { bodyParts, exercises } from "../lib/content";

const queueFor = (sportId: string, mode: "approved" | "all" = "all") => {
  const sport = getQueueSport(sportId);
  if (!sport) throw new Error(`unknown sport ${sportId}`);
  return buildExerciseQueue({ sport, parts: bodyParts, exercises, mode });
};

// jsdom has no matchMedia; stub reduced-motion ON so CompletionFeedback's
// confetti never lazy-loads during tests.
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

describe("queue builder (S22)", () => {
  it("APPROVED-only default: a draft-only repository yields an empty queue", () => {
    // The hard contract: production queues contain ONLY approved exercises.
    // Today every entry is draft (S11 pending) -> the default queue is empty.
    const q = queueFor("basketball", "approved");
    expect(q.items).toEqual([]);
    expect(q.skippedRegionIds).toEqual(
      expect.arrayContaining(["knee", "calf", "lower-back", "shoulder", "arm"])
    );
  });

  it("approved exercises ARE included in approved mode", () => {
    const approved = exercises.map((e) => ({ ...e, reviewStatus: "approved" as const }));
    const q = buildExerciseQueue({
      sport: getQueueSport("archery")!,
      parts: bodyParts,
      exercises: approved,
      mode: "approved",
    });
    // Archery maps to lower-back (2 exercises) + shoulder (3): first round
    // takes one per region, then the 5-minute top-up adds the rest (exhausted
    // at 150 s < 300 s target — fewer items, never padded).
    expect(q.items.length).toBe(5);
    expect(q.totalSeconds).toBe(150);
    expect(q.totalSeconds).toBeLessThanOrEqual(MAX_SECONDS);
    for (const item of q.items) {
      expect(["lower-back", "shoulder"]).toContain(item.regionId);
    }
  });

  it("demo (all) mode builds a 5-8 minute queue in sport region order", () => {
    const q = queueFor("basketball");
    expect(q.items.length).toBeGreaterThanOrEqual(10);
    expect(q.totalSeconds).toBeGreaterThanOrEqual(300);
    expect(q.totalSeconds).toBeLessThanOrEqual(MAX_SECONDS);
    // Region order follows the sport mapping (knee first for basketball).
    expect(q.items[0].regionId).toBe("knee");
    expect(new Set(q.items.map((i) => i.regionId))).toEqual(
      new Set(["knee", "calf", "lower-back", "shoulder", "arm"])
    );
    // No duplicate exercises.
    expect(new Set(q.items.map((i) => i.exerciseId)).size).toBe(q.items.length);
  });

  it("excludes degenerate records (steps: []) even in all mode", () => {
    const broken = exercises.map((e) => ({ ...e, steps: [] as string[] }));
    const q = buildExerciseQueue({
      sport: getQueueSport("soccer")!,
      parts: bodyParts,
      exercises: broken,
      mode: "all",
    });
    expect(q.items).toEqual([]);
    expect(q.skippedRegionIds.length).toBeGreaterThan(0);
  });

  it("hard-trims at the 8-minute ceiling and reports it", () => {
    const long = exercises.map((e) => ({ ...e, durationSeconds: 200 }));
    const q = buildExerciseQueue({
      sport: getQueueSport("general")!,
      parts: bodyParts,
      exercises: long,
      mode: "all",
    });
    expect(q.totalSeconds).toBeLessThanOrEqual(MAX_SECONDS);
    expect(q.limited).toBe(true);
  });

  it("every queue references real exercises and regions", () => {
    for (const id of ["basketball", "archery", "general"]) {
      const q = queueFor(id);
      for (const item of q.items) {
        expect(exercises.some((e) => e.id === item.exerciseId)).toBe(true);
        expect(bodyParts.some((p) => p.id === item.regionId)).toBe(true);
      }
    }
  });
});

describe("FlowController (S22 acceptance)", () => {
  it("shows progress + estimated total, and NEVER auto-advances (no countdown pressure)", () => {
    vi.useFakeTimers();
    const q = queueFor("basketball");
    render(
      <FlowController sportId="basketball" sportNameZh="篮球" queue={q} />
    );
    expect(screen.getByText(/第 1 \/ \d+ 个/)).toBeTruthy();
    expect(screen.getByText(/共 5 分钟/)).toBeTruthy();
    // A full minute passing on its own must NOT move the flow (user taps only).
    vi.advanceTimersByTime(60000);
    expect(screen.getByText(/第 1 \/ \d+ 个/)).toBeTruthy(); // still on #1
    vi.useRealTimers();
  });

  it("advances ONLY on user tap; prev disabled at start; skip removes + restore brings back", () => {
    const q = queueFor("archery");
    render(<FlowController sportId="archery" sportNameZh="射箭" queue={q} />);

    const nextBtn = () => screen.getByRole("button", { name: /完成，下一个/ });
    expect(screen.getByRole("button", { name: /上一个/ })).toHaveProperty(
      "disabled",
      true
    );

    fireEvent.click(nextBtn());
    expect(screen.getByText(/第 2 \/ \d+ 个/)).toBeTruthy();
    expect(screen.getByRole("button", { name: /上一个/ })).toHaveProperty(
      "disabled",
      false
    );

    // Skip the current item -> it leaves the active queue and shows 已跳过.
    const currentName = screen.getAllByText(/./); // render snapshot guard
    expect(currentName.length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: /跳过这个动作/ }));
    expect(screen.getAllByText(/已跳过/).length).toBeGreaterThanOrEqual(1);

    // Restore returns it to the queue.
    fireEvent.click(screen.getByRole("button", { name: /恢复/ }));
    expect(screen.queryAllByText(/已跳过/).length).toBe(0);
  });

  it("finishing shows one-shot completion feedback with user-chosen exits; restart re-arms", () => {
    const q = queueFor("archery");
    render(<FlowController sportId="archery" sportNameZh="射箭" queue={q} />);
    for (let i = 0; i < q.items.length; i++) {
      fireEvent.click(screen.getByRole("button", { name: /完成，下一个/ }));
    }
    expect(screen.getByRole("status").textContent).toMatch(/本次流程完成/);
    expect(screen.getByRole("link", { name: /返回/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: /首页/ })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /重新开始/ }));
    expect(screen.getByText(/第 1 \/ \d+ 个/)).toBeTruthy();

    for (let i = 0; i < q.items.length; i++) {
      fireEvent.click(screen.getByRole("button", { name: /完成，下一个/ }));
    }
    expect(screen.getByRole("status").textContent).toMatch(/本次流程完成/);
  });

  it("exits are neutral (no guilt copy) and the queue never auto-plays the next exercise", () => {
    const q = queueFor("badminton");
    render(<FlowController sportId="badminton" sportNameZh="羽毛球" queue={q} />);
    const exits = screen.getAllByText(/本次先到这里（退出）/);
    expect(exits.length).toBeGreaterThanOrEqual(1);
    // No guilt/negative framing anywhere.
    const page = screen.getByRole("region", { name: /recovery flow/i }) ?? document.body;
    expect(page.textContent).not.toMatch(/失败|放弃|偷懒|坚持住|fail|quit/i);
    // The flow is explicitly labeled as not a treatment plan.
    expect(screen.getByText(/不是治疗方案/)).toBeTruthy();
    expect(screen.getByText(/不会自动播放下一个动作/)).toBeTruthy();
  });

  it("surfaces skipped regions honestly", () => {
    const q = queueFor("archery", "approved"); // all regions skipped (draft repo)
    render(<FlowController sportId="archery" sportNameZh="射箭" queue={q} />);
    expect(
      screen.getByText(/以下部位暂无可用指引/)
    ).toBeTruthy();
  });
});

describe("/flow/[sport] route (S22)", () => {
  const renderFlow = async (sport: string) => {
    const el = await FlowPage({ params: Promise.resolve({ sport }) });
    return render(el);
  };

  it("generates static params for all 8 sports", async () => {
    const params = await generateStaticParamsHelper();
    expect(params.length).toBe(8);
  });

  it("renders the basketball flow with progress, draft banner, and reason", async () => {
    await renderFlow("basketball");
    expect(screen.getByRole("heading", { name: /篮球恢复流程/ })).toBeTruthy();
    expect(screen.getByText(/占位内容 — 未经过专业审核/)).toBeTruthy();
    expect(screen.getByText(/第 1 \/ \d+ 个/)).toBeTruthy();
    expect(screen.getByRole("heading", { name: /为什么是这些部位/ })).toBeTruthy();
  });

  it("invalid sport id rejects (notFound)", async () => {
    await expect(
      FlowPage({ params: Promise.resolve({ sport: "not-a-sport" }) })
    ).rejects.toThrow();
  });

  it("no auto-advance on the route render either (time passing moves nothing)", async () => {
    vi.useFakeTimers();
    await renderFlow("basketball");
    vi.advanceTimersByTime(120000);
    expect(screen.getByText(/第 1 \/ \d+ 个/)).toBeTruthy(); // still on #1
    vi.useRealTimers();
  });

  it("never persists flow state (no storage writes in the flow files)", () => {
    // S22 do-not-do: 不要持久化健康选择. Static scan of the shipped sources.
    const files = [
      "components/FlowController.tsx",
      path.join("app", "flow", "[sport]", "page.tsx"),
    ];
    for (const file of files) {
      const src = readFileSync(path.resolve(process.cwd(), file), "utf8");
      expect(
        src.includes("localStorage") || src.includes("sessionStorage"),
        `${file} must not persist user choices`
      ).toBe(false);
    }
  });
});

// generateStaticParams is not exported from the test-imported module object;
// read it through the page module's export.
async function generateStaticParamsHelper(): Promise<{ sport: string }[]> {
  const mod = (await import("../app/flow/[sport]/page")) as {
    generateStaticParams: () => { sport: string }[];
  };
  return mod.generateStaticParams();
}
