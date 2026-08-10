export type { BodyPart } from "../schemas/body-part";

/**
 * Exercise content contract. Mirrors data/sample/exercises.json. Review status
 * is part of the contract so unreviewed content can be excluded from query
 * results (S02/S08 safety: general guidance only, unreviewed = blocked).
 */
export type Exercise = {
  id: string;
  nameZh: string;
  durationSeconds: number;
  difficulty: string;
  muscles: string[];
  videoUrl: string;
  previewUrl: string;
  posterUrl: string;
  captionUrl: string;
  transcriptUrl: string;
  steps: string[];
  tips: string[];
  stopSignals: string[];
  sourceTitle: string;
  sourceUrl: string;
  licenseId: string;
  reviewStatus: "draft" | "in-review" | "approved" | "rejected" | "blocked";
  reviewedBy: string;
  reviewedAt: string;
};
