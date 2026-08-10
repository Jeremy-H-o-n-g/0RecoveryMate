// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ExerciseCard from "../../components/ExerciseCard";
import {
  getBodyParts,
  getExercise,
  getExerciseIds,
  getPartExercises,
  getRegionByHotspot,
} from "../../lib/content";

afterEach(() => {
  cleanup();
});

const ANKLE_HOTSPOT = "ankle-left";
const ANKLE_EXERCISE_ID = "ankle-pilot-placeholder";

describe("ankle vertical slice (S09) - end-to-end data chain", () => {
  it("hotspot -> region -> exercise resolves without a break", () => {
    // Step 1->2: selecting an ankle hotspot maps to the ankle region.
    const region = getRegionByHotspot(ANKLE_HOTSPOT);
    expect(region).toBe("ankle");
    expect(region).not.toBeNull();
    // Step 2->3: the ankle region surfaces a (clearly placeholder) exercise.
    const exercises = getPartExercises(region as string);
    expect(exercises.map((e) => e.id)).toContain(ANKLE_EXERCISE_ID);
    // Step 3->4: the exercise resolves (and is explicitly draft/placeholder).
    const exercise = getExercise(ANKLE_EXERCISE_ID);
    expect(exercise?.id).toBe(ANKLE_EXERCISE_ID);
    expect(exercise?.reviewStatus).toBe("draft");
  });

  it("renders a clearly-marked placeholder card linking to the detail", () => {
    const exercise = getExercise(ANKLE_EXERCISE_ID);
    expect(exercise).not.toBeNull();
    render(<ExerciseCard exercise={exercise as NonNullable<typeof exercise>} />);
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe(`/exercise/${ANKLE_EXERCISE_ID}`);
    // Placeholder is clearly marked (not medical content).
    expect(screen.getByText(/\[Demo placeholder/i)).toBeDefined();
  });

  it("invalid exercise id yields null (404 path)", () => {
    expect(getExercise("not-an-exercise")).toBeNull();
  });

  it("the exercise id is a pre-renderable route (deep-linkable)", () => {
    expect(getExerciseIds()).toContain(ANKLE_EXERCISE_ID);
  });

  it("the slice stays ankle-thin (no 18x copy across regions)", () => {
    const withExercises = getBodyParts().filter(
      (p) => getPartExercises(p.id).length > 0
    );
    expect(withExercises.map((p) => p.id)).toEqual(["ankle"]);
  });
});
