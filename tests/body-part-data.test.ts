import { describe, expect, it } from "vitest";
import bodyPartsData from "../data/body-parts.json";
import { BodyPartSchema } from "../schemas/body-part";
import {
  bodyParts,
  getApprovedExerciseIds,
  getBodyPart,
  getBodyParts,
  isValidPart,
} from "../lib/content";
import { FRONT_HOTSPOTS } from "../components/BodyMapFront";
import { BACK_HOTSPOTS } from "../components/BodyMapBack";

const HOTSPOT_IDS = new Set(
  [...FRONT_HOTSPOTS, ...BACK_HOTSPOTS].map((h) => h.id)
);

describe("body-part data contract", () => {
  it("parses the data file against the Zod schema", () => {
    const parsed = BodyPartSchema.array().parse(bodyPartsData);
    expect(parsed).toHaveLength(bodyParts.length);
  });

  it("has exactly six unique region ids", () => {
    const ids = getBodyParts().map((p) => p.id);
    expect(ids).toHaveLength(6);
    expect(new Set(ids).size).toBe(6);
    expect(ids).toEqual(
      expect.arrayContaining([
        "shoulder",
        "arm",
        "lower-back",
        "knee",
        "calf",
        "ankle",
      ])
    );
  });

  it("every svgId references a real hotspot id (front/back components)", () => {
    for (const p of bodyParts) {
      expect(p.svgIds.length).toBeGreaterThan(0);
      for (const svgId of p.svgIds) {
        expect(HOTSPOT_IDS.has(svgId)).toBe(true);
      }
    }
  });

  it("returns a part for a valid id and null for an invalid id", () => {
    expect(getBodyPart("ankle")?.id).toBe("ankle");
    expect(getBodyPart("not-a-region")).toBeNull();
    expect(isValidPart("ankle")).toBe(true);
    expect(isValidPart("not-a-region")).toBe(false);
  });

  it("excludes unreviewed exercises from query results (blocked by default)", () => {
    // The only sample exercise (ankle-pilot-placeholder) is draft -> excluded.
    expect(getApprovedExerciseIds("ankle")).toEqual([]);
  });
});
