# LinkedIn Coach Agent — agent guide

AI career coach: upload LinkedIn PDF → parse profile → SWOT analysis + recommendations.

**Stack:** TanStack Start, Tailwind v4, Drizzle + SQLite, Vercel AI SDK (`generateObject`), unpdf, Zod, Biome.

**Status:** Phases 0–3 done. **Phase 4 in progress** — polish + Railway Docker deploy. See `docs/ROADMAP.md`.

---

## Principles

1. **Reuse first** — extend existing routes, schemas, components, and mock/live AI paths before adding new ones.
2. **Small diffs** — prefer the smallest change that works. No drive-by refactors.
3. **Match conventions** — read nearby code; copy its patterns.
4. **Mock-friendly** — every AI feature needs a mock path (`AI_MOCK_MODE`). Test with `pnpm dev:mock`.
5. **Docs when scope shifts** — update `docs/ROADMAP.md` if behavior diverges from the plan.

---

## Layout

```
src/
  routes/           # pages + API (file-based)
    index.tsx       # upload + career goal form
    results.$analysisId.tsx
    api/upload|parse|analyze|profile.ts
  components/       # UI (results/* for dashboard)
  lib/
    ai/             # parse-profile, analyze-profile, mock-* , fixtures/
    *-schema.ts     # Zod schemas (profile, analysis)
    icons.ts        # hydration-safe Lucide icons — use this, not lucide-react directly
    pdf.ts, api-client.ts, api-error.ts
  server/           # createServerFn helpers (session, profile, analysis, ai-mode)
  db/schema.ts      # sessions, profile_snapshots, analyses
  env.ts            # @t3-oss/env-core — all env access goes here
```

Import alias: `#/*` → `./src/*`.

---

## User flow (don't break)

```
POST /api/upload  → snapshotId
POST /api/parse   → structured profile saved
POST /api/analyze → analysisId
GET  /results/:analysisId → SWOT dashboard + recommendations modal
```

Session: anonymous cookie via `ensureSession()` in root loader. All writes scoped to session.

---

## Adding things

| Task                   | Where to look / extend                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| New API endpoint       | Copy `src/routes/api/parse.ts` pattern; use `jsonError`, session utils                            |
| AI output shape        | Edit `lib/analysis-schema.ts` or `lib/profile-schema.ts`; update mock fixtures + prompts together |
| Results UI             | Add to `components/results/`; wire in `results.$analysisId.tsx`                                   |
| Homepage flow          | `HomeAnalysisForm.tsx` + `AnalysisLoadingScreen.tsx`                                              |
| Server data for routes | `createServerFn` in `src/server/` (see `analysis.ts`)                                             |
| Icons                  | Import from `#/lib/icons` (`TargetIcon`, etc.)                                                    |
| Client-only UI         | `ClientOnly` wrapper (devtools, browser-only widgets)                                             |
| SSR hydration          | `suppressHydrationWarning` on `<html>`/`<body>`; safe icons for SVGs                              |

**AI pattern:** live fn in `lib/ai/*.ts` + paired `mock-*.ts` + fixture in `fixtures/`. Branch on `resolveAiMode()` / `env.AI_MOCK_MODE`.

**Don't:** add auth, new ORMs, ToolLoopAgent, or a profile-review page unless explicitly requested.

---

## Commands

```bash
pnpm dev              # port 3000
pnpm dev:mock         # no API key needed
pnpm build && pnpm check
pnpm db:push          # after schema changes
pnpm test:phase1:mock # E2E (dev server must be running)
```

Env: copy `.env.example` → `.env.local`. Never commit secrets.

---

## Phase 4 backlog (quick wins first)

- [ ] Rate limit `/api/upload`, `/api/parse`, `/api/analyze`
- [ ] Route-level error boundaries
- [ ] Railway Docker deploy (Node runtime for unpdf + SQLite volume)
- [ ] Full-flow E2E script
- [ ] QA with real LinkedIn PDFs

Defer unless asked: editable profile review (US-04), dedicated `/recommendations` route, auth, i18n.

---

## References

- `docs/PRD.md` — user stories
- `docs/ROADMAP.md` — phases + post-MVP
- `README.md` — setup + scripts
