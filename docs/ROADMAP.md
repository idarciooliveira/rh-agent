# Roadmap — LinkedIn Coach Agent

## MVP Phases

| Phase | Name | Status | Deliverable |
|-------|------|--------|-------------|
| **0** | Foundation | ✅ Complete | App scaffold, SQLite, session cookie, PRD/ROADMAP |
| **1** | Profile Ingestion | Planned | PDF upload → parse → profile review |
| **2** | SWOT Analysis | Planned | Career goal + coach agent + results page |
| **3** | Recommendations | Planned | LinkedIn-style preview + diff UI |
| **4** | Polish & Deploy | Planned | Errors, loading states, Vercel production deploy |

---

## Phase 0 — Foundation

**Goal:** Runnable project skeleton with persistence and documentation.

### Tasks

- [x] Scaffold TanStack Start + Tailwind
- [x] Drizzle SQLite schema (`sessions`, `profile_snapshots`, `analyses`)
- [x] Cookie-based anonymous session
- [x] Landing placeholder page
- [x] `docs/PRD.md` and `docs/ROADMAP.md`
- [x] `.env.example` and README

### Exit criteria

- [x] `pnpm dev` runs without errors
- [x] DB migrations apply
- [x] Session cookie set on first visit

---

## Phase 1 — Profile Ingestion

**Goal:** User uploads LinkedIn PDF and reviews a structured profile.

### Tasks

- PDF upload dropzone + LinkedIn export guide
- `unpdf` text extraction
- Profile parser agent (`generateObject`)
- `/api/upload`, `/api/parse`, `/api/profile`
- Editable profile review page

### Exit criteria

- Valid LinkedIn PDF parses to structured profile
- User can edit and save snapshot

---

## Phase 2 — SWOT Analysis

**Goal:** User sets career goal and receives SWOT analysis.

### Tasks

- Career goal form
- SWOT coach agent (`ToolLoopAgent`)
- `/api/analyze`
- SWOT results page (4 quadrants)

### Exit criteria

- Full flow: review → goal → analyze → SWOT results
- Results shareable via `/results/:analysisId`

---

## Phase 3 — Recommendations Preview

**Goal:** Complete core product loop with LinkedIn-style recommendation view.

### Tasks

- LinkedIn profile preview component
- Current vs recommended diff highlighting
- `/recommendations/:analysisId`
- "Show me recommendations" CTA on SWOT page

### Exit criteria

- Full E2E: upload → review → goal → SWOT → recommendations

---

## Phase 4 — Polish & Deploy

**Goal:** Production-ready MVP on Vercel.

### Tasks

- Error boundaries and empty states
- Responsive layout pass
- Basic rate limiting on API routes
- Vercel deployment (Node.js runtime for `unpdf`)
- Manual QA with real LinkedIn PDFs

### Exit criteria

- Deployed to Vercel
- All P0 user stories pass QA

---

## Post-MVP

| Version | Theme | Features |
|---------|-------|----------|
| **v1.1** | Retention | Email magic link; analysis history; re-run with new goal |
| **v1.2** | Quality | Parse confidence scores; export SWOT as PDF |
| **v1.3** | Input | LinkedIn data export ZIP; manual paste fallback |
| **v2.0** | Integration | Composio LinkedIn OAuth to apply changes (where API allows) |
| **v2.1** | Accounts | Auth.js / Clerk login; saved profiles |
| **v2.2** | i18n | Non-English profile support |
| **v3.0** | Pro | Job description comparison; industry benchmarks; paid tier |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | TanStack Start + file-based routing |
| Styling | Tailwind CSS |
| Profile input | LinkedIn PDF upload |
| PDF extraction | `unpdf` |
| Profile structuring | AI SDK `generateObject()` |
| SWOT + recommendations | AI SDK `ToolLoopAgent` + `Output.object()` |
| Validation | `zod` |
| Persistence | SQLite + Drizzle |
| Session | HTTP-only cookie |
