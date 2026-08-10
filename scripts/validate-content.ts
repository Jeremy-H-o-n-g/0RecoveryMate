import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { BodyPartSchema, type BodyPart } from "../schemas/body-part";
import { ExerciseSchema, type Exercise } from "../schemas/exercise";

export type ValidationReport = {
  errors: string[];
  warnings: string[];
};

/**
 * Validate content data: Zod schemas, unique ids, body->exercise referential
 * integrity, and (for approved exercises) local media-file existence.
 * Pure function — imported by tests; also run as a CLI (see main).
 */
export function validateContent(args: {
  bodyParts: unknown;
  exercises: unknown;
  mediaRoot?: string;
}): ValidationReport {
  const errors: string[] = [];
  const warnings: string[] = [];
  const { bodyParts, exercises, mediaRoot } = args;

  const bodyResult = BodyPartSchema.array().safeParse(bodyParts);
  if (!bodyResult.success) {
    for (const issue of bodyResult.error.issues) {
      errors.push(`body-parts schema ${issue.path.join(".")}: ${issue.message}`);
    }
  }
  const exResult = ExerciseSchema.array().safeParse(exercises);
  if (!exResult.success) {
    for (const issue of exResult.error.issues) {
      errors.push(`exercise schema ${issue.path.join(".")}: ${issue.message}`);
    }
  }
  if (!bodyResult.success || !exResult.success) {
    return { errors, warnings };
  }

  const parts = bodyResult.data as BodyPart[];
  const exs = exResult.data as Exercise[];

  const partIds = parts.map((p) => p.id);
  if (new Set(partIds).size !== partIds.length) {
    errors.push("duplicate body-part ids");
  }
  const exIds = exs.map((e) => e.id);
  if (new Set(exIds).size !== exIds.length) {
    errors.push("duplicate exercise ids");
  }

  const exIdSet = new Set(exIds);
  for (const p of parts) {
    for (const id of p.exerciseIds) {
      if (!exIdSet.has(id)) {
        errors.push(
          `body part "${p.id}" references unknown exercise "${id}"`
        );
      }
    }
  }

  if (mediaRoot) {
    for (const e of exs) {
      if (e.reviewStatus !== "approved") continue;
      for (const url of [e.videoUrl, e.captionUrl, e.transcriptUrl]) {
        if (!url || !url.startsWith("/")) continue; // only local files
        const abs = isAbsolute(url)
          ? url
          : join(mediaRoot, url.replace(/^\//, ""));
        if (!existsSync(abs)) {
          errors.push(
            `approved exercise "${e.id}" references missing media file: ${url}`
          );
        }
      }
    }
  } else {
    warnings.push("mediaRoot not provided; skipping media-file existence checks");
  }

  return { errors, warnings };
}

function main() {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const bodyParts = JSON.parse(
    readFileSync(join(root, "data/body-parts.json"), "utf8")
  );
  const exercises = JSON.parse(
    readFileSync(join(root, "data/exercises.json"), "utf8")
  );
  const report = validateContent({
    bodyParts,
    exercises,
    mediaRoot: join(root, "public"),
  });

  console.log("RecoverMate content validation");
  for (const w of report.warnings) console.log(`WARN: ${w}`);
  for (const e of report.errors) console.log(`ERROR: ${e}`);
  if (report.errors.length === 0) {
    console.log("OK - no content errors.");
    return;
  }
  console.error(`${report.errors.length} content error(s).`);
  process.exit(1);
}

const isMain =
  !!process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  main();
}
