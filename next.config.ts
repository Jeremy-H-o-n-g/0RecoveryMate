import type { NextConfig } from "next";

/**
 * RecoverMate static-first configuration (S24: performance + media budget).
 *
 * Budget contract lives in docs/PerformanceBudget.md. Key in-config levers:
 * - Long-lived immutable caching for local media + map artwork (they are
 *   content-addressed by filename; a media update = new filename).
 * - Everything stays same-origin: no external fonts/CDNs at runtime (verified
 *   S24: built HTML references zero third-party origins), so offline demo and
 *   privacy hold (分析工具不得收集健康选择 — no analytics at all).
 */
const nextConfig: NextConfig = {
  // Static export is NOT enabled: /exercise/[id] reads ?done= (S09 decision);
  // static-export optimization remains deferred to deployment (S27).
  async headers() {
    return [
      {
        // Local media: cache hard, never block first screen (preload=metadata
        // in VideoPlayer; full video downloads only on user play).
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Map artwork: static assets that change by filename
        // (2026-09-01: muscle-chart.webp replaced the Gray plates).
        source: "/anatomy/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
