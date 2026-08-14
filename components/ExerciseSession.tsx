"use client";

import { useRef } from "react";
import { ringGeometry } from "../lib/timer-math";
import {
  useExerciseSession,
  type SessionPhase,
} from "../hooks/useExerciseSession";
import StepIndicator from "./StepIndicator";

export type ExerciseSessionProps = {
  steps: string[];
  /** Countdown for the CURRENT step (exercise-level duration until reviewed
   * content defines per-step timing — S11/S13). */
  stepDurationSeconds: number;
  videoUrl: string;
  posterUrl: string;
  captionUrl: string;
  transcriptUrl: string;
};

const RADIUS = 54;
const SIZE = 120;

const PHASE_LABEL: Record<SessionPhase, string> = {
  idle: "Ready",
  playing: "Playing",
  paused: "Paused",
  ended: "Ended",
};

/**
 * Exercise session: video player + step guidance + step timer, coordinated by
 * the session controller hook (S17).
 *
 * Media: rendered here (not via VideoPlayer) because the session needs direct
 * media-event access (play/pause/ended/seeked/error) to keep one source of
 * truth. The S15 accessibility rules are preserved: native controls, NO
 * autoplay, captions <track>, graceful no-video fallback with transcript link.
 * Unifying this with VideoPlayer is S19 integration work.
 *
 * Safety: no auto-advance when a step timer or the video completes; Stop/Reset
 * is always available; native media errors are surfaced, not suppressed.
 */
export default function ExerciseSession({
  steps,
  stepDurationSeconds,
  videoUrl,
  posterUrl,
  captionUrl,
  transcriptUrl,
}: ExerciseSessionProps) {
  const hasVideo = videoUrl !== "";
  // The component owns the media element; the session controller only borrows
  // the ref (reads it in handlers/controls), so its return stays ref-free.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const session = useExerciseSession({
    stepCount: steps.length,
    stepDurationSeconds,
    hasVideo,
    videoRef,
  });

  const durationMs = stepDurationSeconds * 1000;
  const { circumference, dashoffset } = ringGeometry(
    session.timer.elapsedMs,
    durationMs,
    RADIUS
  );
  const secondsLeft = Math.ceil(session.timer.remainingMs / 1000);

  const toggleLabel =
    session.phase === "playing"
      ? "Pause"
      : session.phase === "paused"
        ? "Resume"
        : session.phase === "ended"
          ? "Replay"
          : "Start";

  return (
    <section aria-label="Exercise session" className="mt-6">
      {/* Session status (changes rarely, so the live region stays quiet). */}
      <p aria-live="polite" className="text-sm text-muted">
        Step {session.stepIndex + 1} of {session.stepCount} ·{" "}
        {PHASE_LABEL[session.phase]}
        {session.stepComplete ? " · step complete" : ""}
      </p>

      {/* Native media errors are surfaced, never suppressed (S17). */}
      {session.mediaError ? (
        <p role="alert" className="mt-2 rounded-md border border-focus/60 bg-focus/10 p-3 text-sm text-foreground">
          {session.mediaError} Steps and the timer remain usable; Reset to
          recover.
        </p>
      ) : null}

      {/* The action: follow-along video (native controls, no autoplay). */}
      {hasVideo ? (
        <div className="mt-4 overflow-hidden rounded-lg border border-accent/30">
          <video
            ref={videoRef}
            className="w-full"
            controls
            preload="metadata"
            poster={posterUrl || undefined}
            {...session.mediaHandlers}
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
      ) : (
        <div className="mt-4 rounded-lg border border-accent/30 bg-surface/40 p-4">
          <p className="text-sm text-muted">
            Video pending (awaiting capture + review). The steps and timer below
            still work.
          </p>
          {transcriptUrl ? (
            <p className="mt-1">
              <a className="text-sm underline hover:text-accent" href={transcriptUrl}>
                Read transcript
              </a>
            </p>
          ) : null}
        </div>
      )}

      {/* Step guidance under user control (manual navigation, keyboard). */}
      <StepIndicator
        steps={steps}
        currentStep={session.stepIndex}
        onSelect={session.goToStep}
        onPrev={session.prevStep}
        onNext={session.nextStep}
        canGoPrev={session.canGoPrev}
        canGoNext={session.canGoNext}
      />

      {/* Step timer (one timer, owned by the session controller). */}
      <section aria-label="Step timer" className="mt-6 flex flex-col items-center gap-4">
        <svg
          role="img"
          aria-label={`Time remaining: ${secondsLeft} seconds. State: ${session.timer.phase}.`}
          width="140"
          height="140"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={RADIUS}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            transform="rotate(-90 60 60)"
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
            className="motion-reduce:transition-none"
          />
          <text x="60" y="68" textAnchor="middle" fontSize="28" fill="var(--foreground)">
            {secondsLeft}
          </text>
        </svg>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={session.toggle}
            className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
          >
            {toggleLabel}
          </button>
          {/* Always available: the safe exit for any state (S17 safety). */}
          <button
            type="button"
            onClick={session.resetSession}
            className="rounded-md border border-accent/50 px-4 py-2 hover:bg-accent/20"
          >
            Stop / Reset
          </button>
        </div>

        {session.stepComplete ? (
          <p className="text-sm text-muted">
            Step timer complete — move on when you are ready. Nothing advances
            automatically.
          </p>
        ) : null}
        {session.phase === "ended" ? (
          <p className="text-sm text-muted">
            Video ended. Replay, go to the next step, or Reset — your choice.
          </p>
        ) : null}
      </section>
    </section>
  );
}
