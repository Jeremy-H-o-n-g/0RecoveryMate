import type { ReactEventHandler, ReactNode, Ref, SyntheticEvent } from "react";

/** Media-event surface the session controller borrows (S17 unification). */
export type VideoMediaHandlers = {
  onPlay?: ReactEventHandler<HTMLVideoElement>;
  onPause?: ReactEventHandler<HTMLVideoElement>;
  onEnded?: ReactEventHandler<HTMLVideoElement>;
  onSeeked?: ReactEventHandler<HTMLVideoElement>;
  onError?: (e: SyntheticEvent<HTMLVideoElement>) => void;
};

export type VideoPlayerProps = {
  videoUrl: string;
  posterUrl: string;
  captionUrl: string;
  transcriptUrl: string;
  /** Exercise id for the click-to-preview data contract (S24). Optional. */
  exerciseId?: string;
  /** Session controller borrows the element (S17 single source of truth). */
  videoRef?: Ref<HTMLVideoElement>;
  /** Media events delegated to the session controller (S17 unification). */
  mediaHandlers?: VideoMediaHandlers;
  /** Extra sentence for the no-media fallback (session context). */
  emptyStateNote?: string;
};

/**
 * Native, accessible video player.
 * - Uses the browser's native controls (S15 do-not-do: do not build inaccessible
 *   custom controls).
 * - Does NOT autoplay (safety: do not auto-start movement content).
 * - S24 media-budget strategy:
 *   * `preload="metadata"` (was `"auto"`): the first screen downloads only
 *     dimension/track metadata, never the full video (S24 acceptance). The
 *     full media stream starts only on an explicit user press of play.
 *   * `poster` is always rendered when provided so the visual slot is stable
 *     before any bytes of video arrive (CLS).
 *   * A preview clip is referenced ONLY after first interaction: the
 *     `previewUrl` attribute is attached as `data-preview` for the
 *     click-to-preview enhancement; no preview is fetched on load. (No real
 *     media exists yet — S12/S13 placeholder strategy — so the wiring is
 *     contract-first, exercised by tests.)
 * - Exposes captions via a <track> when a caption URL exists.
 * - Degrades gracefully when there is no media yet (S12/S13 pending): shows a
 *   notice + transcript link so steps remain usable.
 * - Collects no viewing behavior.
 * - Single media renderer for the app (S19 unification, 2026-09-01): the
 *   guided session (S17) renders THIS component and borrows the element via
 *   `videoRef` + `mediaHandlers`, instead of keeping a second <video> markup.
 */
export default function VideoPlayer({
  videoUrl,
  posterUrl,
  captionUrl,
  transcriptUrl,
  exerciseId,
  videoRef,
  mediaHandlers,
  emptyStateNote,
}: VideoPlayerProps): ReactNode {
  if (!videoUrl) {
    return (
      <div className="rounded-lg border border-accent/30 bg-surface/40 p-4">
        <p className="text-sm text-muted">
          Video pending (awaiting capture + review).
          {emptyStateNote ? ` ${emptyStateNote}` : ""}
        </p>
        {transcriptUrl ? (
          <p className="mt-1">
            <a className="text-sm underline hover:text-accent" href={transcriptUrl}>
              Read transcript
            </a>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-accent/30">
      <video
        ref={videoRef}
        className="w-full"
        controls
        preload="metadata"
        poster={posterUrl || undefined}
        data-preview={exerciseId ? `/videos/${exerciseId}-preview.mp4` : undefined}
        data-preview-policy="after-interaction"
        onPlay={mediaHandlers?.onPlay}
        onPause={mediaHandlers?.onPause}
        onEnded={mediaHandlers?.onEnded}
        onSeeked={mediaHandlers?.onSeeked}
        onError={mediaHandlers?.onError}
      >
        <source src={videoUrl} type="video/mp4" />
        {captionUrl ? (
          <track
            default
            kind="subtitles"
            srcLang="en"
            src={captionUrl}
            label="English"
          />
        ) : null}
        Your browser does not support the video tag.
      </video>
      {transcriptUrl ? (
        <div className="border-t border-accent/20 p-2">
          <a className="text-sm underline hover:text-accent" href={transcriptUrl}>
            Read transcript
          </a>
        </div>
      ) : null}
    </div>
  );
}
