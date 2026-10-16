import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "./globals.css";

// Single self-hosted family (restyle 2026-09-05): Manrope carries both UI
// text and the heavy display headings, per the owner's mockup. Self-hosted
// by next/font — no runtime third-party requests (privacy + offline demo
// contract).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RecoverMate",
  description:
    "Interactive body-map recovery and warm-up guidance. General educational guidance only.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
