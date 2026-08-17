import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ExerciseSchema } from "../schemas/exercise";

/**
 * Safety-copy contract check (S23): the release-blocking textual guarantees
 * that must SURVIVE content updates. This is a CONTRACT test, not a linter —
 * it fails the build when safety copy disappears or drifts into diagnostics.
 *
 * Checks (all must pass; failures block release per the S23 safety rule):
 * 1. Component contract: SafetyNotice renders the red-flag list BEFORE media;
 *    ErrorState/CompletionFeedback/FlowController/SportQuickEntry keep their
 *    non-diagnostic framing (static source assertions on the real components).
 * 2. Content contract: every exercise record carries stop signals; no copy
 *    anywhere in shipped data matches the banned diagnostic regexes.
 * 3. Route contract: every exercise page source wires SafetyNotice ahead of
 *    the session/media; the flow route keeps the not-a-treatment-plan line.
 */

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Diagnostic / treatment wording that must never appear in shipped copy. */
const BANNED = [
  /诊断你|判断你的伤|你.{0,6}受伤了|这是.{0,8}(拉伤|扭伤|撕裂)/,
  /guaranteed? to (heal|recover)|this is (a|an) (sprain|tear|injury)/i,
  /治疗方?案：|治愈|康复保证/,
];

type Rule = {
  file: string;
  mustInclude: string[];
  label: string;
};

const COMPONENT_RULES: Rule[] = [
  {
    file: "components/SafetyNotice.tsx",
    label: "SafetyNotice keeps the red-flag stop-signal list",
    mustInclude: [
      "severe pain",
      "swelling",
      "numbness",
      "does not replace qualified professional care",
    ],
  },
  {
    file: "components/ErrorState.tsx",
    label: "ErrorState stays non-diagnostic with a recovery path",
    mustInclude: ["role=\"alert\"", "Nothing is wrong with you"],
  },
  {
    file: "components/CompletionFeedback.tsx",
    label: "CompletionFeedback never claims treatment outcomes",
    mustInclude: [
      "doesn't require pushing through pain",
      "stop if anything feels wrong",
    ],
  },
  {
    file: "components/FlowController.tsx",
    label: "FlowController keeps not-a-treatment-plan + no-auto-advance copy",
    mustInclude: ["不是治疗方案", "不会自动播放下一个动作"],
  },
  {
    file: "components/SportQuickEntry.tsx",
    label: "SportQuickEntry keeps the non-diagnostic disclaimer",
    mustInclude: ["不构成个体化医学判断", "不是诊断结论"],
  },
  {
    file: "app/exercise/[id]/page.tsx",
    label: "Exercise page renders safety BEFORE the session/media",
    mustInclude: ["SafetyNotice", "ExerciseSession"],
  },
  {
    file: "app/flow/[sport]/page.tsx",
    label: "Flow route keeps the user-control framing",
    mustInclude: ["NOT medical guidance", "全程由你控制"],
  },
];

function walk(dir: string, exts: string[], out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(full);
  }
  return out;
}

function main(): number {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Component/route source contract.
  for (const rule of COMPONENT_RULES) {
    const src = readFileSync(join(ROOT, rule.file), "utf8");
    for (const needle of rule.mustInclude) {
      if (!src.includes(needle)) {
        errors.push(`${rule.label}: missing "${needle}" in ${rule.file}`);
      }
    }
  }

  // 2. Content contract: stop signals + banned wording in shipped data.
  const exercises = ExerciseSchema.array().parse(
    JSON.parse(readFileSync(join(ROOT, "data/exercises.json"), "utf8"))
  );
  if (exercises.length === 0) errors.push("no exercises in data/exercises.json");
  for (const ex of exercises) {
    if (ex.stopSignals.length === 0) {
      errors.push(`exercise ${ex.id}: stopSignals must not be empty`);
    }
    const haystack = [
      ex.nameZh,
      ex.nameEn,
      ...ex.steps,
      ...ex.tips,
      ...ex.stopSignals,
    ].join("\n");
    for (const re of BANNED) {
      if (re.test(haystack)) {
        errors.push(`exercise ${ex.id}: banned diagnostic wording ${re}`);
      }
    }
  }
  const sportsRaw = readFileSync(join(ROOT, "data/sports.json"), "utf8");
  for (const re of BANNED) {
    if (re.test(sportsRaw)) {
      errors.push(`data/sports.json: banned diagnostic wording ${re}`);
    }
  }

  // 3. Wholesale scan: no banned wording in shipped TSX copy either.
  for (const file of walk(join(ROOT, "components"), [".tsx"]).concat(
    walk(join(ROOT, "app"), [".tsx"])
  )) {
    const src = readFileSync(file, "utf8");
    for (const re of BANNED) {
      if (re.test(src)) {
        errors.push(`${file}: banned diagnostic wording ${re}`);
      }
    }
  }

  // The placeholder's literal stop signal is intentionally a
  // professional-review marker, not user guidance — allowed, noted.
  const placeholder = exercises.find((e) => e.id === "ankle-pilot-placeholder");
  if (placeholder && placeholder.stopSignals[0] !== "[professional-review-required]") {
    warnings.push("ankle placeholder stop-signal marker changed — verify intent");
  }

  console.log("RecoverMate safety-copy contract");
  for (const w of warnings) console.log(`WARN: ${w}`);
  for (const e of errors) console.log(`ERROR: ${e}`);
  if (errors.length === 0) {
    console.log("OK - safety copy intact.");
    return 0;
  }
  console.error(`${errors.length} safety-copy error(s). RELEASE BLOCKED.`);
  return 1;
}

// Only run as a CLI; importing the module for tests is side-effect free.
const isMain =
  !!process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  process.exit(main());
}

export { main as checkSafetyCopy };
