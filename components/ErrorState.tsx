import type { ReactNode } from "react";

export type ErrorStateProps = {
  title?: string;
  /** Non-diagnostic explanation (never suggests the user judge an injury). */
  message?: string;
  /** Recovery actions (links/buttons); at least one must always be provided by
   * the caller so every error state has an explicit next step (S19). */
  children?: ReactNode;
};

/**
 * Recoverable error state for the core flow (S19).
 *
 * - role="alert" so assistive tech announces the failure immediately.
 * - Copy is deliberately non-diagnostic and calm: it says THIS PAGE could not
 *   show content — it never asks or hints for the user to judge an injury
 *   (S19 safety: error states must not suggest self-assessment).
 * - Always paired with recovery actions (children) so there is a next step;
   * the safety copy shown elsewhere on the page remains reachable via them.
 */
export default function ErrorState({
  title = "This content can't be shown",
  message = "Something went wrong loading this page. Nothing is wrong with you — please go back and try again.",
  children,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      aria-label="Error state"
      className="rounded-lg border border-focus/60 bg-focus/10 p-4"
    >
      <p className="font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted">{message}</p>
      {children ? <div className="mt-3 flex flex-wrap gap-2">{children}</div> : null}
    </section>
  );
}
