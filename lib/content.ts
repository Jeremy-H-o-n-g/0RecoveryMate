import bodyPartsData from "../data/body-parts.json";
import exercisesData from "../data/sample/exercises.json";
import { BodyPartSchema, type BodyPart } from "../schemas/body-part";

/**
 * Server-side content access. The body-parts data is validated with Zod at
 * module load (build-time validation); nothing here touches client state, so
 * routes derive entirely from params + this module (S08: routes do not depend
 * on client-only private state).
 */
export const bodyParts: BodyPart[] = BodyPartSchema.array().parse(bodyPartsData);

export function getBodyParts(): BodyPart[] {
  return bodyParts;
}

export function getBodyPart(id: string): BodyPart | null {
  return bodyParts.find((p) => p.id === id) ?? null;
}

export function isValidPart(id: string): boolean {
  return bodyParts.some((p) => p.id === id);
}

/**
 * Returns the approved exercise ids for a part. Anything that is not
 * `approved` (draft, in-review, rejected, blocked) is excluded by default, so
 * unreviewed content never reaches navigation results (S02/S08 safety).
 */
export function getApprovedExerciseIds(partId: string): string[] {
  const part = getBodyPart(partId);
  if (!part) return [];
  return exercisesData
    .filter(
      (e) => part.exerciseIds.includes(e.id) && e.reviewStatus === "approved"
    )
    .map((e) => e.id);
}

/** Raw exercise record shape (from the sample data). */
export type ExerciseRecord = (typeof exercisesData)[number];

export function getExercise(id: string): ExerciseRecord | null {
  return exercisesData.find((e) => e.id === id) ?? null;
}

export function getExerciseIds(): string[] {
  return exercisesData.map((e) => e.id);
}

/**
 * Demo-slice listing: returns the part's exercises INCLUDING clearly-marked
 * placeholders. Used only by the ankle vertical slice (S09), whose acceptance
 * allows clearly-marked, non-medical placeholders. Production release still
 * enforces approved-only via the build gate (S10/S11).
 */
export function getPartExercises(partId: string): ExerciseRecord[] {
  const part = getBodyPart(partId);
  if (!part) return [];
  return exercisesData.filter((e) => part.exerciseIds.includes(e.id));
}

/** Maps a hotspot id (e.g. "ankle-left") to its region id (e.g. "ankle"). */
export function getRegionByHotspot(hotspotId: string): string | null {
  return bodyParts.find((p) => p.svgIds.includes(hotspotId))?.id ?? null;
}
