"use client";

import { useRef, useState } from "react";
import { ringGeometry } from "../lib/timer-math";
import {
  useExerciseSession,
  type SessionPhase,
} from "../hooks/useExerciseSession";
import StepIndicator from "./StepIndicator";
import TimerDurationControl from "./TimerDurationControl";
import VideoPlayer from "./VideoPlayer";

export type ExerciseSessionProps = {
  steps: string[];
  /** Countdown for the CURRENT step (exercise-level duration until reviewed
   * content defines per-step timing — S11/S13). */
  stepDurationSeconds: number;
  videoUrl: string;
  posterUrl: string;
  captionUrl: string;
  transcriptUrl: string;
  /** Feeds the S24 click-to-preview data contract on the session video. */
  exerciseId?: string;
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
 * Media: rendered through the shared VideoPlayer (2026-09-01 unification — the
 * former second <video> markup lived here). The session borrows the element
 * via videoRef + mediaHandlers so media events still lead and controls still
 * delegate (one source of truth). The S15 accessibility rules come with the
 * shared player: native controls, NO autoplay, captions <track>, graceful
 * no-video fallback with transcript link.
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
  exerciseId,
}: ExerciseSessionProps) {
  const hasVideo = videoUrl !== "";
  // The component owns the media element; the session controller only borrows
  // the ref (reads it in handlers/controls), so its return stays ref-free.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // User-adjustable step duration (2026-09-01 backlog): defaults to the
  // exercise's authored duration; presets/stepper adjust it while idle.
  const [durationSeconds, setDurationSeconds] = useState(stepDurationSeconds);
  const session = useExerciseSession({
    stepCount: steps.length,
    stepDurationSeconds: durationSeconds,
    hasVideo,
    videoRef,
  });

  const durationMs = durationSeconds * 1000;
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

      {/* The action: follow-along video via the shared player (native
          controls, no autoplay; media events lead the session — S17). */}
      <div className="mt-4">
        <VideoPlayer
          videoUrl={videoUrl}
          posterUrl={posterUrl}
          captionUrl={captionUrl}
          transcriptUrl={transcriptUrl}
          exerciseId={exerciseId}
          videoRef={videoRef}
          mediaHandlers={session.mediaHandlers}
          emptyStateNote="The steps and timer below still work."
        />
      </div>

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

        {/* User-adjustable countdown: presets (incl. 15 s rest) + stepper.
            Idle-only; a live countdown is never silently re-timed. */}
        <TimerDurationControl
          valueSeconds={durationSeconds}
          defaultSeconds={stepDurationSeconds}
          disabled={session.timer.phase !== "idle"}
          onChange={setDurationSeconds}
        />

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
