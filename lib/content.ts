import bodyPartsData from "../data/body-parts.json";
import exercisesData from "../data/exercises.json";
import { BodyPartSchema, type BodyPart } from "../schemas/body-part";
import { ExerciseSchema, type Exercise } from "../schemas/exercise";

/**
 * Server-side content access. Both data files are validated with Zod at module
 * load (build-time validation), and body->exercise references are checked, so a
 * bad schema value or a dangling reference fails the build (S08/S10). Nothing
 * here touches client state, so routes derive entirely from params + this module.
 */
export const bodyParts: BodyPart[] = BodyPartSchema.array().parse(bodyPartsData);

export const exercises: Exercise[] = ExerciseSchema.array().parse(exercisesData);

// Referential integrity: every referenced exercise id must exist (build gate).
for (const part of bodyParts) {
  for (const exId of part.exerciseIds) {
    if (!exercises.some((e) => e.id === exId)) {
      throw new Error(
        `Content error: body part "${part.id}" references unknown exercise "${exId}"`
      );
    }
  }
}

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
  return exercises
    .filter(
      (e) => part.exerciseIds.includes(e.id) && e.reviewStatus === "approved"
    )
    .map((e) => e.id);
}

/** Canonical exercise record (validated). */
export type ExerciseRecord = Exercise;

export function getExercise(id: string): Exercise | null {
  return exercises.find((e) => e.id === id) ?? null;
}

export function getExerciseIds(): string[] {
  return exercises.map((e) => e.id);
}

/**
 * Demo-slice listing: returns the part's exercises INCLUDING clearly-marked
 * placeholders. Used only by the ankle vertical slice (S09), whose acceptance
 * allows clearly-marked, non-medical placeholders. Production release still
 * enforces approved-only via the build gate (S10/S11).
 */
export function getPartExercises(partId: string): Exercise[] {
  const part = getBodyPart(partId);
  if (!part) return [];
  return exercises.filter((e) => part.exerciseIds.includes(e.id));
}

/** Maps a hotspot id (e.g. "ankle-left") to its region id (e.g. "ankle"). */
export function getRegionByHotspot(hotspotId: string): string | null {
  return bodyParts.find((p) => p.svgIds.includes(hotspotId))?.id ?? null;
}
