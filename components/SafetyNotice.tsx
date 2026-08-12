import type { ReactNode } from "react";

export type SafetyNoticeProps = {
  stopSignals: string[];
};

/**
 * The page-level safety / stop-signal notice. Must be shown BEFORE the action
 * starts (S02/S15). Non-diagnostic; directs to qualified assessment for red
 * flags. Rendered ahead of the video/action on the exercise detail page.
 */
export default function SafetyNotice({ stopSignals }: SafetyNoticeProps): ReactNode {
  return (
    <section
      aria-label="Stop signals and safety"
      className="rounded-md border border-focus/60 bg-focus/10 p-3 text-sm text-foreground"
    >
      <p className="font-semibold">Stop signals</p>
      <p className="mt-1 text-muted">
        Stop and seek qualified assessment for severe pain, noticeable swelling,
        inability to move or bear weight, numbness, or symptoms that persist or
        affect performance. RecoverMate is general educational guidance only and
        does not replace qualified professional care.
      </p>
      {stopSignals.length > 0 ? (
        <p className="mt-1 text-muted">{stopSignals.join("; ")}</p>
      ) : null}
    </section>
  );
}
