import { z } from "zod";

/**
 * Sport quick-entry contract (S21).
 *
 * A sport maps to the body regions that COMMONLY carry higher training load in
 * that sport ("常见训练负荷相关区域"). This is explainable navigation, NOT a
 * diagnosis: the mapping says nothing about the user, their body, or any
 * injury, and must never be worded as one (S21 safety; reviewer checks the
 * wording — see docs/mapping-review-S21.md).
 */
export const SportSchema = z.object({
  id: z.string().min(1),
  nameZh: z.string().min(1),
  nameEn: z.string().min(1),
  /** Region ids (shoulder/arm/lower-back/knee/calf/ankle), non-empty. */
  regionIds: z.array(z.string()).min(1),
  /**
   * Why these regions: general, sport-level explanation of typical training
   * load. Non-diagnostic by contract; the reviewer verifies the wording.
   */
  reasonZh: z.string().min(1),
});

export type Sport = z.infer<typeof SportSchema>;
