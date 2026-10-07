# LinkedIn Coach Agent

An AI career coach that analyzes your LinkedIn profile (via PDF export) against a career goal and delivers a SWOT analysis plus actionable profile recommendations.

## Prerequisites

- Node.js **22+**
- pnpm

## Quick Start

```bash
pnpm install
cp .env.example .env.local
pnpm db:push                 # create SQLite tables
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Local development without API key

To test the full upload → parse → analyze flow without calling the real AI gateway, enable mock mode in `.env.local`:

```bash
AI_MOCK_MODE=true
AI_MOCK_DELAY_MS=1500   # optional — simulates parsing latency for UI testing
```

Or use the convenience script:

```bash
pnpm dev:mock
```

Mock mode returns simulated profile and analysis data derived from your PDF text. It is disabled in production builds. For live parsing, set `AI_GATEWAY_API_KEY` instead (mock mode takes priority when both are set).

## Project Docs

- [Product Requirements (PRD)](docs/PRD.md)
- [Implementation Roadmap](docs/ROADMAP.md)

## MVP Phases

| Phase | Scope | Status |
|-------|--------|--------|
| 0 | Foundation — scaffold, SQLite, session, docs | ✅ Complete |
| 1 | PDF upload + profile parsing | ✅ Complete |
| 2 | Career goal + SWOT analysis + results dashboard | ✅ Complete |
| 3 | LinkedIn-style recommendations preview (modal) | ✅ Complete |
| 4 | Polish + Railway Docker deploy | In progress |

See [Implementation Roadmap](docs/ROADMAP.md) for task details and post-MVP plans.

## Environment Variables

See [`.env.example`](.env.example):

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | SQLite path (default: `./data/app.db`) |
| `AI_GATEWAY_API_KEY` | Live mode | Vercel AI Gateway key for analysis |
| `APIFY_TOKEN` | Live mode | Apify token used to fetch LinkedIn profiles by username |
| `APIFY_LINKEDIN_ACTOR_ID` | No | Apify actor to use (default: `harvestapi/linkedin-profile-scraper`) |
| `APIFY_MAX_COST_USD` | No | Spend cap per profile fetch (default: 0.05, real cost is about 0.004) |
| `AI_MOCK_MODE` | No | Set to `true` to simulate AI responses without API calls (dev/test) |
| `AI_MOCK_DELAY_MS` | No | Mock parsing delay in ms (default: 1500) |
| `MAX_PDF_SIZE_MB` | No | PDF upload limit (default: 5) |
| `SESSION_COOKIE_NAME` | No | Anonymous session cookie name |

## Scripts

```bash
pnpm dev          # Start dev server (port 3000)
pnpm dev:mock     # Dev server with AI mock mode enabled
pnpm build        # Production build
pnpm start        # Run Nitro production server (after build)
pnpm db:push      # Push schema to SQLite
pnpm db:generate  # Generate Drizzle migrations
pnpm db:studio    # Open Drizzle Studio
pnpm check        # Biome lint + format
pnpm test:phase1:mock  # Phase 1 E2E proof with mock AI (requires dev server)
pnpm capture:mock      # Capture mock-flow screenshots/artifacts (requires dev server)
```

## Production (Docker / Railway)

The app ships with a multi-stage [Dockerfile](Dockerfile) and [docker-compose.yml](docker-compose.yml) for local production smoke tests.

### Local Docker smoke test

```bash
pnpm build
docker compose build
AI_GATEWAY_API_KEY=your-key docker compose up
```

Open [http://localhost:3000](http://localhost:3000). SQLite persists in the `app-data` Docker volume across restarts.

### Railway deployment

1. Push the repo to GitHub and connect it in [Railway](https://railway.com).
2. Railway auto-detects the Dockerfile (see [railway.toml](railway.toml)).
3. Add a **persistent volume** mounted at `/app/data` (dashboard or `railway volume add --mount-path /app/data`).
4. Set environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | `/app/data/app.db` |
| `AI_GATEWAY_API_KEY` | Your Vercel AI Gateway key (required) |
| `APIFY_TOKEN` | Your Apify token, used to fetch LinkedIn profiles by username (required for lookups) |

`PORT` and `NODE_ENV` are set by Railway automatically. Mock AI (`AI_MOCK_MODE`) is disabled in production.

**Notes:**
- SQLite requires a single replica — do not scale horizontally with a volume attached.
- If you hit volume permission errors, set `RAILWAY_RUN_UID=0` on the service.
- Container startup runs `pnpm db:deploy` (Drizzle migrations) before the Nitro server starts.

## LinkedIn username

Enter your LinkedIn username (or profile URL) on the homepage. The profile has to be public. The app reads it through Apify, so each lookup costs about $0.004 and is limited to 5 per hour per session.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/) + SQLite
- [Vercel AI SDK](https://ai-sdk.dev/) — structured profile parsing and full analysis via `generateObject()`
- [unpdf](https://www.npmjs.com/package/unpdf) — PDF text extraction

## License

Private — see repository owner.
