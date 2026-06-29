# Phase 1 API Transcript (live curl)

Captured from cloud agent against http://localhost:3000 on 2026-06-29.

## 1. Session bootstrap

```bash
curl -c cookies.txt -b cookies.txt http://localhost:3000/
# Sets: linkedin_coach_session=<uuid>
```

## 2. Upload valid PDF → 200

```json
{
  "snapshotId": "81f09d74-df0f-4512-9ae2-dd1f8996f473",
  "totalPages": 1,
  "textLength": 567
}
```

## 3. Upload non-PDF → 400

```json
{
  "error": "Only application/pdf files are accepted"
}
```

## 4. Parse without AI_GATEWAY_API_KEY → 503

```json
{
  "error": "AI parsing is unavailable: set AI_GATEWAY_API_KEY in your environment to enable profile parsing."
}
```

## 5. Save profile (PUT /api/profile) → 200

```json
{
  "snapshotId": "81f09d74-df0f-4512-9ae2-dd1f8996f473",
  "profile": {
    "name": "Jane Smith",
    "headline": "Senior Product Manager at TechCo",
    "location": "London, UK",
    "about": "Product leader with 8 years experience in B2B SaaS.",
    "experiences": [{ "title": "Product Manager", "company": "TechCo" }],
    "education": [{ "school": "University of London", "degree": "MBA" }],
    "skills": ["Product Strategy", "Agile", "SQL"]
  }
}
```

## 6. Load profile (GET /api/profile) → 200

Returns saved profile JSON scoped to session cookie.

## 7. Review page SSR → 200

`GET /profile/81f09d74-df0f-4512-9ae2-dd1f8996f473` returns HTML containing "Review your profile".

## 8. Auth guards

- No cookie → `401 Unauthorized: session cookie missing`
- Unknown snapshot → `404 Profile snapshot not found`
