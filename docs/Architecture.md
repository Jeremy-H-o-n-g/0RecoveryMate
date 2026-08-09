# RecoverMate Architecture

- Static-first Next.js App Router + TypeScript.
- Tailwind CSS and Framer Motion; accessible SVG body map.
- JSON content validated at build time with Zod.
- Local media first; optional object storage after performance review.
- No accounts, database, or production health-data collection.
- Routes: `/`, `/body/[part]`, `/exercise/[id]`, optional `/flow/[sport]`.
- Production: Vercel plus one local offline ankle vertical slice.
- Information architecture, seven-step flow, and responsive breakpoints: see [UXBlueprint.md](UXBlueprint.md).
- State model with a return path for every state (loading/empty/error included): see [StateModel.md](StateModel.md).
- Mobile-first layout: no horizontal scrolling on mobile; keyboard and touch parity (no hover-only paths); color is never the sole state cue.
