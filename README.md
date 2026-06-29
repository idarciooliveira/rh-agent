# LinkedIn Coach Agent

An AI career coach that analyzes your LinkedIn profile (via PDF export) against a career goal and delivers a SWOT analysis plus actionable profile recommendations.

## Prerequisites

- Node.js **22+**
- pnpm

## Quick Start

```bash
pnpm install
cp .env.example .env.local   # add AI_GATEWAY_API_KEY when running Phase 2+
pnpm db:push                 # create SQLite tables
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Docs

- [Product Requirements (PRD)](docs/PRD.md)
- [Implementation Roadmap](docs/ROADMAP.md)

## MVP Phases

| Phase | Scope |
|-------|--------|
| 0 | Foundation — scaffold, SQLite, session, docs |
| 1 | PDF upload + profile parsing + review |
| 2 | Career goal + SWOT analysis |
| 3 | LinkedIn-style recommendations preview |
| 4 | Polish + Vercel deploy |

## Environment Variables

See [`.env.example`](.env.example):

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | SQLite path (default: `./data/app.db`) |
| `AI_GATEWAY_API_KEY` | Phase 2+ | Vercel AI Gateway or provider key |
| `MAX_PDF_SIZE_MB` | No | PDF upload limit (default: 5) |
| `SESSION_COOKIE_NAME` | No | Anonymous session cookie name |

## Scripts

```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Production build
pnpm db:push      # Push schema to SQLite
pnpm db:generate  # Generate Drizzle migrations
pnpm db:studio    # Open Drizzle Studio
pnpm check        # Biome lint + format
```

## LinkedIn PDF Export

On LinkedIn desktop:

1. Go to your **Profile**
2. Click **More** → **Save to PDF**
3. Upload the file (Phase 1+)

## Tech Stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + SQLite
- [Vercel AI SDK](https://ai-sdk.dev/) (Phases 2–3)
- [unpdf](https://www.npmjs.com/package/unpdf) (Phase 1)

## License

Private — see repository owner.
