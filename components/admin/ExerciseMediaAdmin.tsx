"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { UrlField, UploadKind } from "../../lib/upload-rules";

/**
 * Per-exercise media upload card (admin surface only — never rendered on
 * public pages).
 *
 * Flow per kind (client-direct; video bytes never traverse the function):
 *   1. POST /api/admin/upload        → path-scoped Blob client token
 *   2. put() from @vercel/blob/client → browser → Blob, with progress events
 *   3. POST /api/admin/upload/complete → head() confirm + manifest commit
 *   4. router.refresh()               → server page re-reads the manifest
 *
 * Concurrency: ALL controls are disabled while any operation is in flight
 * (single-flight) — the mitigation for the manifest read-modify-write race
 * (single-admin tool; a re-upload is idempotent).
 *
 * E1 note: only TYPES are imported from lib/upload-rules (erased at compile
 * time); the kind rules arrive as plain serializable props, so no zod/content
 * JSON enters the client chunk.
 */

export type AdminKindInfo = {
  kind: UploadKind;
  labelEn: string;
  accept: string;
  extension: string;
  maxBytes: number;
  urlField: UrlField;
};

export type OverlayEntryLite = { url: string; uploadedAt: string };

export type ExerciseMediaAdminProps = {
  exerciseId: string;
  nameZh: string;
  nameEn: string;
  reviewStatus: string;
  kinds: AdminKindInfo[];
  /** Current manifest state for this exercise, keyed by URL field. */
  overlay: Partial<Record<UrlField, OverlayEntryLite>>;
};

type RowState =
  | { phase: "idle" }
  | { phase: "requesting" }
  | { phase: "uploading"; pct: number }
  | { phase: "completing" }
  | { phase: "removing" }
  | { phase: "done"; message: string }
  | { phase: "error"; message: string };

const MB = 1024 * 1024;

function formatBytes(n: number): string {
  return n >= MB ? `${Math.round(n / MB)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`;
}

function statusMessage(state: RowState | undefined): string {
  switch (state?.phase) {
    case "requesting":
      return "Requesting upload authorization…";
    case "uploading":
      return `Uploading… ${state.pct}%`;
    case "completing":
      return "Finalizing…";
    case "removing":
      return "Removing…";
    case "done":
      return state.message;
    case "error":
      return `Error: ${state.message}`;
    default:
      return "";
  }
}

export default function ExerciseMediaAdmin({
  exerciseId,
  nameZh,
  nameEn,
  reviewStatus,
  kinds,
  overlay,
}: ExerciseMediaAdminProps) {
  const router = useRouter();
  const [rows, setRows] = useState<Partial<Record<UploadKind, RowState>>>({});
  const [confirmRemove, setConfirmRemove] = useState<UploadKind | null>(null);
  const inputs = useRef<Partial<Record<UploadKind, HTMLInputElement | null>>>({});

  const busy = Object.values(rows).some(
    (r) =>
      r?.phase === "requesting" ||
      r?.phase === "uploading" ||
      r?.phase === "completing" ||
      r?.phase === "removing"
  );

  function setRow(kind: UploadKind, state: RowState) {
    setRows((prev) => ({ ...prev, [kind]: state }));
  }

  async function handleUpload(info: AdminKindInfo, file: File) {
    const { kind, extension, maxBytes } = info;
    // Local pre-checks (the Blob token enforces size/MIME storage-side too).
    if (!file.name.toLowerCase().endsWith(extension)) {
      setRow(kind, { phase: "error", message: `file must be a ${extension} file` });
      return;
    }
    if (file.size === 0) {
      setRow(kind, { phase: "error", message: "file is empty" });
      return;
    }
    if (file.size > maxBytes) {
      setRow(kind, {
        phase: "error",
        message: `file exceeds the ${formatBytes(maxBytes)} limit for ${info.labelEn}`,
      });
      return;
    }
    try {
      setRow(kind, { phase: "requesting" });
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ exerciseId, kind }),
      });
      const data = (await res.json().catch(() => null)) as {
        clientToken?: string;
        pathname?: string;
        mimeTypes?: string[];
        error?: string;
      } | null;
      if (!res.ok || !data?.clientToken || !data.pathname) {
        throw new Error(data?.error ?? `authorization failed (${res.status})`);
      }
      setRow(kind, { phase: "uploading", pct: 0 });
      const { put } = await import("@vercel/blob/client");
      await put(data.pathname, file, {
        access: "public",
        token: data.clientToken,
        // Force the kind's canonical MIME so browser guessing can't mismatch
        // the token's allowedContentTypes.
        contentType: data.mimeTypes?.[0],
        multipart: file.size > 4 * MB,
        onUploadProgress: (p) =>
          setRow(kind, { phase: "uploading", pct: Math.round(p.percentage) }),
      });
      setRow(kind, { phase: "completing" });
      const done = await fetch("/api/admin/upload/complete", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ exerciseId, kind }),
      });
      const doneData = (await done.json().catch(() => null)) as { error?: string } | null;
      if (!done.ok) {
        throw new Error(doneData?.error ?? `commit failed (${done.status})`);
      }
      setRow(kind, {
        phase: "done",
        message: `${info.labelEn} uploaded — live on the exercise page.`,
      });
      router.refresh();
    } catch (err) {
      setRow(kind, {
        phase: "error",
        message: err instanceof Error ? err.message : "upload failed",
      });
    }
  }

  async function handleRemove(kind: UploadKind) {
    setConfirmRemove(null);
    try {
      setRow(kind, { phase: "removing" });
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ exerciseId, kind }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error ?? `remove failed (${res.status})`);
      setRow(kind, {
        phase: "done",
        message: "Removed — the exercise page falls back to base content.",
      });
      router.refresh();
    } catch (err) {
      setRow(kind, {
        phase: "error",
        message: err instanceof Error ? err.message : "remove failed",
      });
    }
  }

  return (
    <article className="plate-frame rounded-lg p-4" aria-label={`${nameEn} media uploads`}>
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-display text-xl text-foreground">
          {nameZh}
          <span className="ml-2 text-sm font-normal text-muted">{nameEn}</span>
        </h2>
        <p className="plate-caption">
          {exerciseId} · status: {reviewStatus}
        </p>
      </header>

      <div className="mt-4 space-y-3">
        {kinds.map((info) => {
          const current = overlay[info.urlField];
          const state = rows[info.kind];
          const inputId = `file-${exerciseId}-${info.kind}`;
          const busyThis =
            state?.phase === "requesting" ||
            state?.phase === "uploading" ||
            state?.phase === "completing" ||
            state?.phase === "removing";
          return (
            <div key={info.kind} className="rounded-md border border-border bg-surface-2/40 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
                  {info.labelEn}
                  <span className="ml-2 text-xs font-normal text-muted">
                    {info.extension} · max {formatBytes(info.maxBytes)}
                  </span>
                </label>
                {current ? (
                  <span className="text-xs text-success">
                    ✓ uploaded{" "}
                    <time dateTime={current.uploadedAt} className="text-muted">
                      {new Date(current.uploadedAt).toLocaleString()}
                    </time>{" "}
                    ·{" "}
                    <a
                      href={current.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-accent"
                    >
                      view
                    </a>
                  </span>
                ) : (
                  <span className="text-xs text-muted">not set</span>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <input
                  id={inputId}
                  ref={(el) => {
                    inputs.current[info.kind] = el;
                  }}
                  type="file"
                  accept={info.accept}
                  disabled={busy}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = ""; // allow re-picking the same file
                    if (file) void handleUpload(info, file);
                  }}
                  className="text-sm text-muted disabled:opacity-50 file:mr-2 file:rounded-md file:border file:border-accent/60 file:bg-surface file:px-3 file:py-1.5 file:text-sm file:text-foreground hover:file:bg-accent-soft/50"
                />
                {current ? (
                  confirmRemove === info.kind ? (
                    <span className="flex items-center gap-2 text-sm">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleRemove(info.kind)}
                        className="rounded-md border border-focus/60 bg-focus/10 px-3 py-1.5 hover:bg-focus/20 disabled:opacity-50"
                      >
                        Confirm remove
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => setConfirmRemove(null)}
                        className="rounded-md border border-border px-3 py-1.5 text-muted hover:bg-accent-soft/40 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => setConfirmRemove(info.kind)}
                      className="rounded-md border border-border px-3 py-1.5 text-sm text-muted hover:bg-accent-soft/40 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  )
                ) : null}
                {busyThis ? <span className="text-sm text-muted">working…</span> : null}
              </div>

              {state?.phase === "uploading" ? (
                <progress
                  value={state.pct}
                  max={100}
                  aria-label={`${info.labelEn} upload progress`}
                  className="mt-2 h-2 w-full accent-[var(--accent)]"
                />
              ) : null}
              {state?.phase === "error" ? (
                <p role="alert" className="mt-2 rounded-md border border-focus/60 bg-focus/10 p-2 text-sm text-foreground">
                  {state.message}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Single quiet live region per card; row states change rarely. */}
      <p aria-live="polite" className="mt-3 min-h-[1.25rem] text-sm text-muted">
        {kinds
          .map((k) => statusMessage(rows[k.kind]))
          .find((m) => m !== "") ?? ""}
      </p>
    </article>
  );
}
