# Phase 1 E2E Test Proof

**Run at:** 2026-06-29T18:30:30.501Z  
**Base URL:** http://localhost:3000  
**Result:** 11/11 passed  
**Snapshot ID:** 81f09d74-df0f-4512-9ae2-dd1f8996f473

## Summary

| Test | Result | Detail |
|------|--------|--------|
| Home page loads (200) | ✅ PASS | status=200, has Phase 1 copy=true |
| Anonymous session cookie issued | ✅ PASS | linkedin_coach_session=437e9b57-9e0f-404d-a13b-c79f67f47974 |
| Upload rejects non-PDF (400) | ✅ PASS | {"error":"Only application/pdf files are accepted"} |
| Upload accepts valid PDF (200) | ✅ PASS | {"snapshotId":"81f09d74-df0f-4512-9ae2-dd1f8996f473","totalPages":1,"textLength":567} |
| Parse returns 503 without AI_GATEWAY_API_KEY | ✅ PASS | {"error":"AI parsing is unavailable: set AI_GATEWAY_API_KEY in your environment to enable profile parsing."} |
| Profile save works (PUT 200) — seeded for review test | ✅ PASS | {"status":200,"name":"Jane Smith"} |
| Profile GET returns saved data (200) | ✅ PASS | {"status":200,"name":"Jane Smith","experienceCount":1} |
| Profile PUT updates headline (200) | ✅ PASS | {"status":200,"headline":"Senior Product Manager at TechCo"} |
| Profile review page loads (200) | ✅ PASS | status=200, has review heading=true |
| Profile GET without session returns 401 | ✅ PASS | {"error":"Unauthorized: session cookie missing"} |
| Unknown snapshot returns 404 | ✅ PASS | {"error":"Profile snapshot not found"} |

## Screenshots

![Home page — Phase 1 upload UI](01-home-upload.png)

Captured via headless Chrome in cloud agent. Shows LinkedIn export guide + PDF dropzone.

## Re-run tests

```bash
pnpm dev          # in one terminal
pnpm test:phase1  # in another — expects http://localhost:3000
```

## Environment

- `AI_GATEWAY_API_KEY`: not set (parse 503 expected; profile flow seeded via PUT)
- Node: v22.14.0

## Raw JSON

See `artifacts/phase1-proof.json` for machine-readable results.
