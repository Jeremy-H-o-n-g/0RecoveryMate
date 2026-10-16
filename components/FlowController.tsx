"use client";

import { useState } from "react";
import Link from "next/link";
import CompletionFeedback from "./CompletionFeedback";
import type { QueueResult } from "../lib/build-exercise-queue";

export type FlowControllerProps = {
  sportId: string;
  sportNameZh: string;
  queue: QueueResult;
  /** Where "Exit" returns to (default: home). */
  exitHref?: string;
  /** Prefers the guided detail page over the bare detail when told to. */
  startHref?: (exerciseId: string, index: number) => string;
};

const formatMinutes = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return s === 0 ? `${m} 分钟` : `${m} 分 ${s} 秒`;
};

/**
 * Recovery-flow queue controller (S22). 100% user-controlled:
 * - NOTHING advances on its own: no timers, no auto-play, no countdown that
 *   pushes the user to continue (S22 do-not-do). The user taps "完成，下一
 *   个" (or 上一个 / 跳过 / 退出 / 重新开始) — always.
 * - The queue is REVIEWABLE and EDITABLE before and during the flow: items can
 *   be skipped and skipped items can be restored; progress + estimated total
 *   time are always visible (state = text + position + ring, not color alone).
 * - Exiting is always available, framed neutrally ("本次先到这里" — no negative
 *   framing, no guilt copy), and returns to a clear place (exitHref).
 * - Completion is the S18 one-shot feedback (fires once per completion key,
 *   reduced-motion safe, user-chosen next steps only).
 * - Nothing is persisted: no health choices, no queues (refresh = fresh flow,
 *   which is the designed reset — nothing about the user is stored).
 * - This flow is a suggested ORDER of general warm-up guidance, not a
 *   treatment plan (visible disclaimer).
 */
export default function FlowController({
  sportId,
  sportNameZh,
  queue,
  exitHref = "/",
  startHref,
}: FlowControllerProps) {
  const [position, setPosition] = useState(0);
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  // Completion is keyed per sport per mount: finishing, restarting, and
  // finishing again re-arms the (purely decorative) feedback exactly once
  // per completion (S18 fire-once contract).
  const [completionCount, setCompletionCount] = useState(0);

  const active = queue.items
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => !removed.has(index));
  const remaining = active.length - position;
  const current = active[position] ?? null;
  const finished = current === null && position > 0;

  const doneCount = active.length - Math.max(remaining, 0);
  const estimatedRemainingSeconds = active.slice(position).reduce(
    (sum, { item }) => sum + item.durationSeconds,
    0
  );

  const goto = (index: number) => setPosition(Math.max(0, index));
  const next = () => setPosition((p) => p + 1);
  const prev = () => setPosition((p) => Math.max(0, p - 1));
  const skip = (index: number) => {
    setRemoved((prevSet) => new Set(prevSet).add(index));
  };
  const restore = (index: number) => {
    setRemoved((prevSet) => {
      const nextSet = new Set(prevSet);
      nextSet.delete(index);
      return nextSet;
    });
  };
  const restart = () => {
    setPosition(0);
    setRemoved(new Set());
    // Re-arms the S18 one-shot completion feedback for the next full pass.
    setCompletionCount((c) => c + 1);
  };

  const detailHref = (exerciseId: string, index: number) =>
    startHref ? startHref(exerciseId, index) : `/exercise/${exerciseId}`;

  return (
    <section aria-label="Recovery flow" className="mt-6">
      {/* Progress + estimated time — always visible. */}
      <p aria-live="polite" className="text-sm text-muted">
        {finished
          ? "流程已完成。"
          : `第 ${doneCount + 1} / ${active.length} 个 · 预计剩余约 ${formatMinutes(
              estimatedRemainingSeconds
            )}（共 ${formatMinutes(queue.totalSeconds)}）`}
      </p>

      {/* Two-column on large screens (current step | editable queue); stacks
          in the same order below lg — the grid gap preserves the spacing. */}
      <div className="mt-4 grid items-start gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div>
          {finished ? (
            <CompletionFeedback
              triggerKey={`${sportId}-flow-${completionCount}`}
              heading="本次流程完成"
              message="你按自己的节奏完成了这份流程。拉伸感即可，不需要追求痛感——随时可以停止。"
              nextHref={exitHref}
              nextLabel="返回"
              backHref="/"
              backLabel="首页"
            />
          ) : (
            current && (
              <div className="rounded-lg border border-accent/30 bg-surface/40 p-4">
                <p className="text-sm text-muted">{sportNameZh} · 常见训练负荷相关区域流程</p>
                <h2 className="mt-1 text-xl font-semibold text-foreground">
                  {current.item.nameZh}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  约 {current.item.durationSeconds} 秒 · {current.item.regionId}
                </p>

                {/* User-controlled advance only — no timer, no auto-play. */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href={detailHref(current.item.exerciseId, current.index)}
                    className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
                  >
                    查看动作指引
                  </Link>
                  <button
                    type="button"
                    onClick={next}
                    className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
                  >
                    完成，下一个
                  </button>
                  <button
                    type="button"
                    onClick={prev}
                    disabled={position === 0}
                    className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20 disabled:opacity-40"
                  >
                    上一个
                  </button>
                  <button
                    type="button"
                    onClick={() => skip(current.index)}
                    className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
                  >
                    跳过这个动作
                  </button>
                  <Link
                    href={exitHref}
                    className="rounded-md border border-border px-4 py-2 hover:bg-accent/10"
                  >
                    本次先到这里（退出）
                  </Link>
                </div>
              </div>
            )
          )}
        </div>

        {/* Reviewable + editable queue. */}
        <div>
          <h3 className="text-sm font-semibold text-foreground">流程队列（可调整）</h3>
          <ol className="mt-2 flex flex-col gap-1">
            {queue.items.map((item, index) => {
              const isCurrent = current?.index === index;
              const isDone = active.findIndex((a) => a.index === index) < position;
              const isRemoved = removed.has(index);
              return (
                <li key={item.exerciseId}>
                  <div
                    className={`flex flex-wrap items-center gap-2 rounded-md border px-3 py-2 ${
                      isCurrent
                        ? "border-accent bg-accent/10 ring-1 ring-accent/50"
                        : "border-border"
                    }`}
                  >
                    <span className="text-sm text-foreground">
                      {index + 1}. {item.nameZh}（{item.durationSeconds} 秒）
                      {isCurrent ? "（当前）" : ""}
                      {isDone && !isCurrent ? "（已完成）" : ""}
                      {isRemoved ? "（已跳过）" : ""}
                    </span>
                    {isRemoved ? (
                      <button
                        type="button"
                        onClick={() => restore(index)}
                        className="rounded border border-accent/50 px-2 py-1 text-xs hover:bg-accent/20"
                      >
                        恢复
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => (isCurrent ? undefined : goto(
                          active.findIndex((a) => a.index === index)
                        ))}
                        disabled={isCurrent}
                        className="rounded border border-accent/50 px-2 py-1 text-xs hover:bg-accent/20 disabled:opacity-40"
                      >
                        从这里开始
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={restart}
              className="rounded-md border border-border px-4 py-2 hover:bg-accent/10"
            >
              重新开始
            </button>
            <Link
              href={exitHref}
              className="rounded-md border border-border px-4 py-2 hover:bg-accent/10"
            >
              本次先到这里（退出）
            </Link>
          </div>
        </div>
      </div>

      {/* Skipped regions surfaced honestly (fallback transparency). */}
      {queue.skippedRegionIds.length > 0 ? (
        <p role="status" className="mt-4 text-sm text-focus">
          以下部位暂无可用指引：{queue.skippedRegionIds.join("、")}。你仍然可以直接从人体图选择它们。
        </p>
      ) : null}
      {queue.limited ? (
        <p className="mt-2 text-sm text-muted">
          流程已按 8 分钟上限截短。
        </p>
      ) : null}

      <p className="mt-4 text-xs text-muted">
        这只是一份建议顺序的通用热身/放松指引，不是治疗方案；不会自动播放下一个动作，也不会保存你的任何选择。
      </p>
    </section>
  );
}
