import { z } from "zod";

export const BodyViewSchema = z.enum(["front", "back", "both"]);

export const BodyPartSchema = z.object({
  id: z.string().min(1),
  nameZh: z.string().min(1),
  nameEn: z.string().min(1),
  view: BodyViewSchema,
  svgIds: z.array(z.string().min(1)).min(1),
  exerciseIds: z.array(z.string()),
  commonSports: z.array(z.string()),
});

/** Canonical BodyPart type, derived from the schema (single source of truth). */
export type BodyPart = z.infer<typeof BodyPartSchema>;
