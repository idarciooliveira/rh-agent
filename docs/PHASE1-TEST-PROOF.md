# Phase 1 E2E Test Proof

**Run at:** 2026-06-29T20:58:31.049Z  
**Base URL:** http://localhost:3000  
**Result:** 10/10 passed  
**Snapshot ID:** 1fac7831-09f0-46dd-a8b2-615f79308b5b  
**Analysis ID:** cec35707-dd23-48db-b0a3-7543d7a80e54

## Summary

| Test | Result | Detail |
|------|--------|--------|
| Home page loads (200) | ✅ PASS | status=200, has SWOT Analyzer=true |
| Anonymous session cookie issued | ✅ PASS | linkedin_coach_session=37cf8d72-ed79-4878-91fb-068c5c6187a1 |
| Upload rejects non-PDF (400) | ✅ PASS | {"error":"Only application/pdf files are accepted"} |
| Upload accepts valid PDF (200) | ✅ PASS | {"snapshotId":"1fac7831-09f0-46dd-a8b2-615f79308b5b","totalPages":1,"textLength":567} |
| Parse returns structured profile (200) — mock | ✅ PASS | status=200, name=Jane Smith, experiences=1 |
| Profile GET returns parsed data (200) | ✅ PASS | {"status":200,"name":"Jane Smith","experienceCount":1} |
| Analyze returns analysisId (200) — mock | ✅ PASS | status=200, analysisId=cec35707-dd23-48db-b0a3-7543d7a80e54 |
| Results page loads (200) | ✅ PASS | status=200, has Analysis Complete=true |
| Profile GET without session returns 401 | ✅ PASS | {"error":"Unauthorized: session cookie missing"} |
| Unknown snapshot returns 404 | ✅ PASS | {"error":"Profile snapshot not found"} |

## Screenshots

- `artifacts/01-home-upload.png` — Home page with upload UI
- `artifacts/02-analysis-results.png` — Analysis results page for analysis `cec35707-dd23-48db-b0a3-7543d7a80e54`

## Environment

- `AI_MOCK_MODE`: true (mock parse tested)
- `AI_MOCK_DELAY_MS`: 0
- `AI_GATEWAY_API_KEY`: not set
- Node: v22.14.0

## Raw JSON

See `artifacts/phase1-proof.json` for machine-readable results.
