# Roadmap — LinkedIn Coach Agent

## MVP Phases

| Phase | Name | Status | Deliverable |
|-------|------|--------|-------------|
| **0** | Foundation | ✅ Complete | App scaffold, SQLite, session cookie, PRD/ROADMAP |
| **1** | Profile Ingestion | ✅ Complete | PDF upload → parse → structured snapshot |
| **2** | SWOT Analysis | ✅ Complete | Career goal + analysis agent + results dashboard |
| **3** | Recommendations | ✅ Complete | LinkedIn-style preview modal with original/improved toggle |
| **4** | Polish & Deploy | **In progress** | Errors, rate limiting, Vercel production deploy |

**Current focus:** Phase 4 — production polish and deployment.

---

## Implementation notes (vs original plan)

The shipped MVP streamlined a few early design choices:

| Original plan | Shipped |
|---------------|---------|
| Separate profile review/edit page before analysis | Single-page flow: upload PDF + career goal → analyze |
| `ToolLoopAgent` for SWOT + recommendations | Single `generateObject()` call produces full analysis |
| Dedicated `/recommendations/:analysisId` route | Recommendations in `OptimizedProfilePreviewModal` on results page |
| Editable profile review (US-04) | Deferred — `/api/profile` exists; no review UI |

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

**Goal:** User uploads LinkedIn PDF; app extracts and structures profile data.

### Tasks

- [x] PDF upload dropzone + LinkedIn export guide
- [x] `unpdf` text extraction
- [x] Profile parser agent (`generateObject`)
- [x] `/api/upload`, `/api/parse`, `/api/profile`
- [x] AI mock mode for local dev (`AI_MOCK_MODE`, `pnpm dev:mock`)
- [x] Phase 1 E2E proof script (`pnpm test:phase1:mock`)
- [ ] ~~Editable profile review page~~ — deferred (see implementation notes)

### Exit criteria

- [x] Valid LinkedIn PDF parses to structured profile
- [x] Parsed snapshot persisted and available to analysis pipeline

---

## Phase 2 — SWOT Analysis

**Goal:** User sets career goal and receives SWOT analysis.

### Tasks

- [x] Career goal form (homepage, combined with upload)
- [x] Analysis agent (`generateObject` with `fullAnalysisSchema`)
- [x] `/api/analyze`
- [x] Results page at `/results/:analysisId` — profile score, goal alignment, SWOT quadrants, strategic suggestions, quick wins
- [x] Analysis loading screen with progress messaging
- [x] Mock analysis path for local testing

### Exit criteria

- [x] Full flow: upload → goal → analyze → SWOT results
- [x] Results shareable via `/results/:analysisId`

---

## Phase 3 — Recommendations Preview

**Goal:** Complete core product loop with LinkedIn-style recommendation view.

### Tasks

- [x] LinkedIn profile preview component (`OptimizedProfilePreviewModal`)
- [x] Current vs recommended toggle per section (headline, about, experience, skills)
- [x] Copy-to-clipboard for improved text
- [x] "Preview Optimized Profile" CTA on results page
- [ ] ~~Dedicated `/recommendations/:analysisId` route~~ — not needed; modal covers MVP scope

### Exit criteria

- [x] Full E2E: upload → goal → SWOT → recommendations preview

---

## Phase 4 — Polish & Deploy

**Goal:** Production-ready MVP on Vercel.

### Tasks

- [ ] Error boundaries on route tree
- [x] Empty/not-found states (e.g. invalid `analysisId`)
- [x] Loading states (analysis pipeline UI)
- [x] Responsive layout pass (homepage + results)
- [ ] Basic rate limiting on API routes
- [ ] Vercel deployment (Node.js runtime for `unpdf`)
- [ ] Manual QA with real LinkedIn PDFs
- [ ] Full-flow E2E proof script (Phase 2/3)

### Exit criteria

- [ ] Deployed to Vercel
- [ ] All P0 user stories pass QA

---

## Post-MVP

| Version | Theme | Features |
|---------|-------|----------|
| **v1.0.1** | Input quality | Restore editable profile review step (US-04) |
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
| SWOT + recommendations | AI SDK `generateObject()` (single structured output) |
| Validation | `zod` |
| Persistence | SQLite + Drizzle |
| Session | HTTP-only cookie |
| Local dev / testing | AI mock mode (`AI_MOCK_MODE`) |
