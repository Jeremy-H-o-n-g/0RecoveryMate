"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

/**
 * Shared-secret login for the admin media surface (no accounts — TASKS.md
 * baseline). Posts the token to /api/admin/session, which verifies it with a
 * timing-safe compare and sets an httpOnly cookie holding only its sha256
 * hash. On success router.refresh() re-renders the server page, which now
 * sees the cookie and swaps this form for the body-part grid.
 */
export default function AdminLoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const token = String(form.get("token") ?? "");
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? `Login failed (${res.status})`);
    } catch {
      setError("Network error — could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="plate-frame mt-6 max-w-sm rounded-lg p-4">
      <label htmlFor="admin-token" className="plate-caption block">
        Admin token
      </label>
      <input
        id="admin-token"
        name="token"
        type="password"
        autoComplete="off"
        required
        disabled={busy}
        className="mt-2 w-full rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-foreground"
      />
      {error ? (
        <p role="alert" className="mt-3 rounded-md border border-focus/60 bg-focus/10 p-3 text-sm text-foreground">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="mt-4 rounded-md border border-accent/60 bg-surface px-4 py-2 hover:bg-accent-soft/50 disabled:opacity-50"
      >
        {busy ? "Verifying…" : "Unlock media admin"}
      </button>
      <p className="mt-3 text-xs text-muted">
        Uploads are admin-only; this page is unlisted and excluded from search
        indexing.
      </p>
    </form>
  );
}
