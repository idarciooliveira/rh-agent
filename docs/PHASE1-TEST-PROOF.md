# Phase 1 E2E Test Proof

**Run at:** 2026-06-29T18:46:23.097Z  
**Base URL:** http://localhost:3000  
**Result:** 10/10 passed  
**Snapshot ID:** 21db5ab3-00dc-4e98-8bb7-9e91ed4b5350

## Summary

| Test | Result | Detail |
|------|--------|--------|
| Home page loads (200) | ✅ PASS | status=200, has Phase 1 copy=true |
| Anonymous session cookie issued | ✅ PASS | linkedin_coach_session=bbaaf02c-fb65-4cc2-a97a-3b972c93819b |
| Upload rejects non-PDF (400) | ✅ PASS | {"error":"Only application/pdf files are accepted"} |
| Upload accepts valid PDF (200) | ✅ PASS | {"snapshotId":"21db5ab3-00dc-4e98-8bb7-9e91ed4b5350","totalPages":1,"textLength":567} |
| Parse returns structured profile (200) — mock | ✅ PASS | status=200, name=Jane Smith, experiences=1 |
| Profile GET returns saved data (200) | ✅ PASS | {"status":200,"name":"Jane Smith","experienceCount":1} |
| Profile PUT updates headline (200) | ✅ PASS | {"status":200,"headline":"Senior Product Manager at TechCo"} |
| Profile review page loads (200) | ✅ PASS | status=200, has review heading=true |
| Profile GET without session returns 401 | ✅ PASS | {"error":"Unauthorized: session cookie missing"} |
| Unknown snapshot returns 404 | ✅ PASS | {"error":"Profile snapshot not found"} |

## Screenshots

- `artifacts/01-home-upload.png` — Home page with upload UI
- `artifacts/02-profile-review.png` — Profile review page for snapshot `21db5ab3-00dc-4e98-8bb7-9e91ed4b5350`

## Environment

- `AI_MOCK_MODE`: true (mock parse tested)
- `AI_MOCK_DELAY_MS`: 0
- `AI_GATEWAY_API_KEY`: not set
- Node: v22.14.0

## Raw JSON

See `artifacts/phase1-proof.json` for machine-readable results.
