// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ExerciseCard from "../components/ExerciseCard";
import ExercisePanel from "../components/ExercisePanel";
import type { Exercise } from "../schemas/exercise";

afterEach(() => {
  cleanup();
});

const approved: Exercise = {
  id: "calf-raise",
  nameZh: "小腿提踵",
  nameEn: "Calf raise",
  durationSeconds: 45,
  difficulty: "beginner",
  muscles: ["gastrocnemius", "soleus"],
  videoUrl: "",
  previewUrl: "",
  posterUrl: "",
  captionUrl: "",
  transcriptUrl: "",
  steps: ["rise onto toes"],
  tips: [],
  stopSignals: ["stop if pain"],
  sourceTitle: "S",
  sourceUrl: "https://e.com/s",
  licenseId: "self-authored",
  reviewedBy: "R",
  reviewedAt: "2026-01-01",
  reviewStatus: "approved",
};

const draft: Exercise = {
  ...approved,
  id: "draft-one",
  reviewStatus: "draft",
  nameZh: "Draft one",
  muscles: [],
};

describe("ExerciseCard", () => {
  it("shows name, duration, difficulty, muscles, and links to the detail", () => {
    render(<ExerciseCard exercise={approved} />);
    expect(screen.getByText("小腿提踵")).toBeTruthy();
    expect(screen.getByText(/45s/)).toBeTruthy();
    expect(screen.getByText(/beginner/)).toBeTruthy();
    expect(screen.getByText("gastrocnemius")).toBeTruthy();
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/exercise/calf-raise");
  });

  it("does not hide review status and flags non-approved as a placeholder", () => {
    render(<ExerciseCard exercise={draft} />);
    expect(screen.getByText(/\[Placeholder — not reviewed\]/i)).toBeTruthy();
    expect(screen.getByText(/Status:\s*Draft/i)).toBeTruthy();
  });

  it("an approved card has no placeholder banner", () => {
    render(<ExerciseCard exercise={approved} />);
    expect(screen.queryByText(/\[Placeholder/i)).toBeNull();
    expect(screen.getByText(/Status:\s*Reviewed/i)).toBeTruthy();
  });
});

describe("ExercisePanel", () => {
  it("default (approved-only) hides unreviewed content -> actionable empty state", () => {
    render(<ExercisePanel partId="ankle" />);
    // Current data has only a draft placeholder -> approved-only shows nothing.
    expect(screen.getByRole("status")).toBeTruthy();
    expect(screen.getByText(/No reviewed guidance yet/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /choose another region/i })).toBeTruthy();
  });

  it("statusFilter='all' surfaces the clearly-marked draft placeholder card", () => {
    render(<ExercisePanel partId="ankle" statusFilter="all" />);
    const links = screen.getAllByRole("link");
    expect(
      links.some((a) => a.getAttribute("href") === "/exercise/ankle-pilot-placeholder")
    ).toBe(true);
  });

  it("loading renders a busy skeleton list", () => {
    render(<ExercisePanel partId="ankle" loading />);
    const list = screen.getByRole("list");
    expect(list.getAttribute("aria-busy")).toBe("true");
  });
});
