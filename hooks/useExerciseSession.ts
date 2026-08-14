"use client";

import { useEffect, useRef, useState } from "react";
import { useExerciseTimer } from "./useExerciseTimer";
import { clampRatio } from "../lib/timer-math";

/**
 * Session controller for one exercise: coordinates (1) the video player, (2) the
 * current step, and (3) one step timer, under the user's control (S17).
 *
 * Single source of truth: when a video is present, the <video> element's own
 * media state leads; session controls delegate to it (play/pause), and the
 * media events (play/pause/ended/error) drive the session phase + timer. The
 * idempotent `syncTimerToPlaying` makes the control path and the event path
 * safe to both fire (S17: 不要创建循环依赖的多个计时器 — there is exactly one
 * timer, owned here). When there is no video yet (placeholder content), the
 * session controls drive the timer directly (user-controlled automation).
 *
 * Safety (S17 + ContentSafetyPolicy):
 * - Never auto-advance to the next step or exercise (不得强迫自动进入下一动作). A
 *   finished step timer or an ended video only signals completion; the user
 *   taps "Next step".
 * - A Stop/Reset exit (resetSession) is always available and returns everything
 *   to a safe idle state.
 * - Native media errors are surfaced, never suppressed (不要屏蔽原生媒体错误).
 */

export type SessionPhase = "idle" | "playing" | "paused" | "ended";

export type UseExerciseSessionOptions = {
  stepCount: number;
  stepDurationSeconds: number;
  /** True when a real video element is rendered (caller: Boolean(videoUrl)). */
  hasVideo: boolean;
  /** Ref to the caller's <video> element (read only in handlers/controls). */
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** Fired once when the current step's timer completes (no forced advance). */
  onStepComplete?: (stepIndex: number) => void;
  /** Fired when the video ends (no forced advance). */
  onEnded?: () => void;
};

function mediaErrorMessage(code: number | null | undefined): string {
  switch (code) {
    case 1:
      return "Media playback was aborted.";
    case 2:
      return "A network error stopped the video.";
    case 3:
      return "The video could not be decoded.";
    case 4:
      return "The video source is not supported.";
    default:
      return "The video reported an error.";
  }
}

export function useExerciseSession({
  stepCount,
  stepDurationSeconds,
  hasVideo,
  videoRef,
  onStepComplete,
  onEnded,
}: UseExerciseSessionOptions) {
  const safeCount = Math.max(1, stepCount);
  const durationMs = stepDurationSeconds * 1000;

  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>("idle");
  const [mediaError, setMediaError] = useState<string | null>(null);

  // Latest callbacks/step read inside handlers without re-subscribing.
  const onStepCompleteRef = useRef(onStepComplete);
  const onEndedRef = useRef(onEnded);
  const stepIndexRef = useRef(stepIndex);
  useEffect(() => {
    onStepCompleteRef.current = onStepComplete;
    onEndedRef.current = onEnded;
    stepIndexRef.current = stepIndex;
  }, [onStepComplete, onEnded, stepIndex]);

  const timer = useExerciseTimer({
    durationMs,
    onComplete: () => onStepCompleteRef.current?.(stepIndexRef.current),
  });

  const clampStep = (i: number) => Math.max(0, Math.min(safeCount - 1, i));

  /**
   * Idempotent: resume a paused timer, start an idle/complete one, and leave an
   * already-running timer untouched (so control + media-event paths never
   * double-start and reset elapsed time).
   */
  const syncTimerToPlaying = () => {
    if (timer.phase === "paused") timer.resume();
    else if (timer.phase !== "running") timer.start();
  };

  // --- Video event handlers (attached by ExerciseSession). -----------------

  const handlePlay = () => {
    setPhase("playing");
    setMediaError(null);
    syncTimerToPlaying();
  };

  const handlePause = () => {
    setPhase("paused");
    timer.pause(); // no-op unless running
  };

  const handleEnded = () => {
    setPhase("ended");
    // The video is done: return the step timer to Ready so an explicit Replay
    // restarts the step cleanly. Nothing advances on its own.
    timer.reset();
    onEndedRef.current?.();
  };

  // Seeking changes only media position. Step highlight is user-controlled and
  // the step timer is step-scoped (no reviewed timecodes yet — S11/S13), so a
  // seek must NOT perturb phase, step, or timer. Kept explicit as the future
  // timecode->step hook (S19) and as a regression guard against accidental sync.
  const handleSeeked = () => {
    /* intentional no-op; see comment */
  };

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const code = e.currentTarget.error?.code ?? null;
    setMediaError(mediaErrorMessage(code)); // surface, do not suppress
    setPhase("paused");
    timer.pause();
  };

  // --- User controls ------------------------------------------------------

  const beginPlayback = () => {
    setPhase("playing");
    syncTimerToPlaying();
    if (hasVideo) {
      // Delegate to the media element; its onPlay event re-asserts the same
      // state (idempotent). A rejected play() is surfaced, not swallowed.
      const p = videoRef.current?.play();
      if (p && typeof p.then === "function") {
        p.catch((err: DOMException) => {
          // AbortError is benign (play interrupted by pause); anything else
          // falls back to a safe paused state with the reason shown.
          if (err?.name !== "AbortError") {
            setMediaError(
              "Playback was blocked — start the video with its native controls."
            );
            setPhase("paused");
            timer.pause();
          }
        });
      }
    }
  };

  const stopPlayback = () => {
    videoRef.current?.pause();
    setPhase("paused");
    timer.pause();
  };

  /** Start/Resume/Replay when not playing; Pause when playing. */
  const toggle = () => {
    if (phase === "playing") stopPlayback();
    else beginPlayback();
  };

  const goToStep = (target: number) => {
    const next = clampStep(target);
    setStepIndex(next);
    stepIndexRef.current = next;
    timer.reset(); // fresh timer for the new step
    if (phase === "playing") timer.start(); // keep moving only if still playing
  };

  const nextStep = () => goToStep(stepIndex + 1);
  const prevStep = () => goToStep(stepIndex - 1);

  const resetSession = () => {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    setStepIndex(0);
    stepIndexRef.current = 0;
    timer.reset();
    setPhase("idle");
    setMediaError(null);
  };

  const progress =
    durationMs > 0 ? clampRatio(timer.remainingMs / durationMs) : 0;

  return {
    // state
    stepIndex,
    stepCount: safeCount,
    phase,
    mediaError,
    stepComplete: timer.phase === "complete",
    timer: {
      phase: timer.phase,
      remainingMs: timer.remainingMs,
      elapsedMs: timer.elapsedMs,
      progress,
    },
    canGoPrev: stepIndex > 0,
    canGoNext: stepIndex < safeCount - 1,
    // media events for the caller's <video> element
    mediaHandlers: {
      onPlay: handlePlay,
      onPause: handlePause,
      onEnded: handleEnded,
      onSeeked: handleSeeked,
      onError: handleError,
    },
    // controls
    toggle,
    resetSession,
    goToStep,
    nextStep,
    prevStep,
  };
}
