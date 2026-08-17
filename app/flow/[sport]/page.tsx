import Link from "next/link";
import { notFound } from "next/navigation";
import FlowController from "../../../components/FlowController";
import ErrorState from "../../../components/ErrorState";
import {
  buildExerciseQueue,
  getQueueSport,
  getQueueSportIds,
} from "../../../lib/build-exercise-queue";
import { bodyParts, exercises } from "../../../lib/content";

export function generateStaticParams() {
  return getQueueSportIds().map((sport) => ({ sport }));
}

export default async function FlowPage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport: sportId } = await params;
  const sport = getQueueSport(sportId);
  if (!sport) {
    // Invalid id -> safe error page (Next 404). No health/diagnostic content.
    notFound();
  }

  // DEMO mode: the flow must be walkable with clearly-marked DRAFT content
  // while S11 review is pending (same pattern as /body/[part]). The queue
  // builder's DEFAULT (production) mode is "approved"-only — tested as the
  // contract; nothing here is claimed to be reviewed.
  const queue = buildExerciseQueue({
    sport,
    parts: bodyParts,
    exercises,
    mode: "all",
  });

  const hasDraft = queue.items.some((item) => {
    const ex = exercises.find((e) => e.id === item.exerciseId);
    return ex ? ex.reviewStatus !== "approved" : false;
  });

  return (
    <main className="mx-auto w-full min-w-0 max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="text-sm text-muted">
        <Link href="/" className="underline hover:text-accent">
          首页
        </Link>{" "}
        / 运动流程
      </p>

      <h1 className="mt-2 text-2xl font-semibold text-accent sm:text-3xl">
        {sport.nameZh}恢复流程
      </h1>
      <p className="mt-1 text-muted">
        按常见训练负荷相关部位生成的建议顺序，约 5–8 分钟。全程由你控制。
      </p>

      {hasDraft && (
        <p
          role="alert"
          className="mt-4 rounded-md border border-focus/60 bg-focus/10 p-3 text-sm text-foreground"
        >
          [占位内容 — 未经过专业审核；仅通用热身概念，NOT medical guidance。]
        </p>
      )}

      <div className="mt-6">
        {queue.items.length === 0 ? (
          /* 动作不可用 fallback: explicit next step, never a dead end. */
          <ErrorState
            title="该运动暂无可用的动作指引"
            message="相关部位的内容尚未完成审核，暂时无法生成流程。这是内容侧的问题，不是你的问题。"
          >
            <Link
              href="/"
              className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
            >
              返回首页
            </Link>
            <Link
              href="/body/ankle"
              className="rounded-md border border-border px-4 py-2 hover:bg-accent/10"
            >
              浏览部位指引
            </Link>
          </ErrorState>
        ) : (
          <FlowController
            sportId={sport.id}
            sportNameZh={sport.nameZh}
            queue={queue}
            exitHref="/"
          />
        )}
      </div>

      {/* Explainability: why these regions (S21 reason, verbatim). */}
      <section aria-label="Why these regions" className="mt-8">
        <h2 className="text-xl font-semibold text-foreground">为什么是这些部位</h2>
        <p className="mt-1 text-sm text-muted">{sport.reasonZh}</p>
      </section>
    </main>
  );
}
