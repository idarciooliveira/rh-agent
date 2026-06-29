# Product Requirements Document — LinkedIn Coach Agent

## 1. Product Overview

**Product name:** LinkedIn Coach Agent

**One-liner:** An AI career coach that analyzes your LinkedIn profile against a career goal and delivers a SWOT analysis plus actionable profile rewrite recommendations.

**Problem:** Professionals struggle to optimize their LinkedIn profile for a specific career target. Generic advice lacks context; manual review is time-consuming and subjective.

**Solution:** Upload your LinkedIn PDF export, state your career goal, and receive a structured SWOT analysis with a visual preview of recommended profile changes.

## 2. Target Users

| Persona | Need |
|---------|------|
| Job seeker | Align profile to target role/industry |
| Career changer | Reposition experience for a new field |
| Recent graduate | Strengthen headline, about, and experience framing |
| Senior professional | Highlight leadership narrative for executive roles |

## 3. Goals and Non-Goals

### Goals (MVP)

- Accept LinkedIn PDF profile export as input
- Parse profile into structured data (name, headline, about, experience, education, skills)
- Let user review/correct parsed data before analysis
- Accept a free-text career goal
- Generate SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)
- Generate concrete profile rewrite recommendations
- Display recommendations in a LinkedIn-style profile preview with diff highlighting

### Non-Goals (MVP)

- LinkedIn OAuth sign-in or live profile sync
- Applying changes directly to LinkedIn
- User accounts / login
- Payment or subscription
- Mobile-native LinkedIn PDF export (LinkedIn requires desktop)
- Non-English profile support

## 4. User Stories

| ID | Story | Priority |
|----|-------|----------|
| US-01 | As a user, I want instructions on how to export my LinkedIn profile as PDF so I know what file to upload | P0 |
| US-02 | As a user, I want to upload my PDF via drag-and-drop so ingestion is frictionless | P0 |
| US-03 | As a user, I want my PDF parsed into profile sections so I don't have to retype my data | P0 |
| US-04 | As a user, I want to edit parsed fields before analysis so errors are corrected | P0 |
| US-05 | As a user, I want to enter my career goal so the analysis is personalized | P0 |
| US-06 | As a user, I want a SWOT analysis of my profile relative to my goal | P0 |
| US-07 | As a user, I want to see recommended profile changes in a LinkedIn-like layout | P0 |
| US-08 | As a user, I want to compare current vs recommended text side-by-side or toggled | P1 |
| US-09 | As a user, I want clear errors if my PDF is invalid or unreadable | P1 |

## 5. Functional Requirements

### FR-1: PDF Upload

- Accept `application/pdf` only
- Max size: 5 MB
- Drag-and-drop + file picker
- Show upload/parse progress indicator

### FR-2: Profile Parsing

- Extract text via `unpdf`
- Structure into: name, headline, location (optional), about, experiences[], education[], skills[], certifications (optional)
- Reject PDFs with insufficient extractable text (< 200 chars)

### FR-3: Profile Review

- Display all parsed fields in editable form
- Allow add/remove experience and education entries
- Save confirmed snapshot before proceeding

### FR-4: Career Goal

- Single free-text field, min 10 chars, max 500 chars
- Examples shown as placeholder/helper text

### FR-5: SWOT Analysis

- Four quadrants: Strengths, Weaknesses, Opportunities, Threats
- Each item: title + detail (2–5 items per quadrant)
- Persisted by `analysisId`, retrievable via URL

### FR-6: Recommendations

- Fields: headline, about, per-experience title/description, skills (add/remove)
- Each change includes a `reason` explaining why
- LinkedIn-style profile preview UI
- Toggle or inline diff: Current vs Recommended

### FR-7: Session

- Anonymous cookie-based `sessionId`
- Snapshots and analyses tied to session (no login)

## 6. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| PDF parse latency | < 15s (incl. LLM) |
| SWOT generation latency | < 30s |
| Privacy | Do not store raw PDF file; store extracted text + structured JSON only |
| Deployment | Vercel, Node.js runtime |
| Browser support | Latest Chrome, Firefox, Safari, Edge |

## 7. Success Metrics (MVP)

| Metric | Target |
|--------|--------|
| End-to-end completion rate | > 60% of uploads reach SWOT results |
| Profile review edit rate | Track % who edit before analyze (quality signal) |
| Parse error rate | < 10% of valid LinkedIn PDFs |

## 8. Input Model

Users export their profile on LinkedIn desktop:

1. Go to **Profile**
2. Click **More** → **Save to PDF**
3. Upload the downloaded file to this app

This approach provides full profile content (experience, education, about, skills) without LinkedIn Partner API approval.
