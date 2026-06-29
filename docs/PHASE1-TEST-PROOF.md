# Phase 1 E2E Test Proof

**Run at:** 2026-06-29T21:03:37.945Z  
**Base URL:** http://localhost:3000  
**Result:** 10/10 passed  
**Snapshot ID:** 9c71cc93-540c-4542-89d8-7cc1fef872fa  
**Analysis ID:** 7680dee2-9eb5-4957-a25e-bfabeafd148b

## Summary

| Test | Result | Detail |
|------|--------|--------|
| Home page loads (200) | ✅ PASS | status=200, has SWOT Analyzer=true |
| Anonymous session cookie issued | ✅ PASS | linkedin_coach_session=9f80837b-e083-431e-941f-81a078d5c4d8 |
| Upload rejects non-PDF (400) | ✅ PASS | {"error":"Only application/pdf files are accepted"} |
| Upload accepts valid PDF (200) | ✅ PASS | {"snapshotId":"9c71cc93-540c-4542-89d8-7cc1fef872fa","totalPages":1,"textLength":567} |
| Parse returns structured profile (200) — mock | ✅ PASS | status=200, name=Jane Smith, experiences=1 |
| Profile GET returns parsed data (200) | ✅ PASS | {"status":200,"name":"Jane Smith","experienceCount":1} |
| Analyze returns analysisId (200) — mock | ✅ PASS | status=200, analysisId=7680dee2-9eb5-4957-a25e-bfabeafd148b |
| Results page loads (200) | ✅ PASS | status=200, has Analysis Complete=true |
| Profile GET without session returns 401 | ✅ PASS | {"error":"Unauthorized: session cookie missing"} |
| Unknown snapshot returns 404 | ✅ PASS | {"error":"Profile snapshot not found"} |

## Screenshots

- `artifacts/01-home-upload.png` — Home page with upload UI
- `artifacts/02-analysis-results.png` — Analysis results page for analysis `7680dee2-9eb5-4957-a25e-bfabeafd148b`

## Environment

- `AI_MOCK_MODE`: true (mock parse tested)
- `AI_MOCK_DELAY_MS`: 0
- `AI_GATEWAY_API_KEY`: not set
- Node: v22.14.0

## Raw JSON

See `artifacts/phase1-proof.json` for machine-readable results.
