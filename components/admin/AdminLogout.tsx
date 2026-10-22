"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Clears the admin session cookie (DELETE /api/admin/session) and re-renders. */
export default function AdminLogout() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } finally {
      setBusy(false);
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm hover:bg-accent-soft/40 disabled:opacity-50"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
