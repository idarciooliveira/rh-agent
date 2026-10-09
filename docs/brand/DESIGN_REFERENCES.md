# Design references and visual direction

Research for the homepage and results rebrand. Scraped 2026-10-09 with the Firecrawl CLI
(`markdown` + `branding` formats, 11 fetches). Hex values come from Firecrawl's branding
extractor, which is automated and sometimes picks up browser defaults (Cal.com's `#0000EE`
is the default link blue, not a brand color). Kickresume failed to scrape and Careerflow's
`/linkedin-optimization` URL returned a 404, so I used the Careerflow homepage instead.
Vercel was not fetched. Its notes are from prior knowledge.

## 1. Per-site notes

### Resume Worded, LinkedIn review (direct competitor)
- Hero: eyebrow "FREE LINKEDIN REVIEW", H1 "Get found on LinkedIn", one CTA button that opens a signup modal. No inline input, so there is a modal step before any value.
- Product preview: a static screenshot (`linkedin-showcase.png`) plus a "See preview" link.
- Palette: green `#17AF7D` CTA, navy `#032153` text, `#F5F7FA` background, 5px radius. Reads as 2016-era SaaS.
- Copy leans on stats ("95% of recruiters", "5x more opportunities") instead of logos.
- Takeaway: the offer matches ours, but the gate (signup modal) is the weak point. We skip signup entirely and should say so.

### Jobscan (adjacent, ATS scoring)
- H1 "Optimize your resume for the exact ATS" plus a "Scan Your Resume For Free" anchor that jumps to an uploader section lower on the page.
- Above the fold: a tabbed carousel of product screenshots (match report, LinkedIn optimization, auto apply). It shows breadth but no single "this is your result" moment.
- Social proof: "Jobscan users have been hired by" plus Apple, Meta and similar logos. We can't claim that.
- Palette: `#006EDC` blue on white, `#192838` ink, Open Sans. Competent and forgettable.
- Section order: hero, product tabs, logos, free score CTA, "how it scores", features, FAQ.

### Teal (adjacent, resume builder)
- The one competitor with a recognizable brand: marigold `#F5B501` pill CTA (100px radius) with black text, secondary `#5A6FEC`, dark teal `#005149` links.
- Fonts: Roobert body, Poppins headings, 64px H1, 22px body. Large body text makes it feel friendly.
- H1 makes a numeric promise: "Build Your Resume. Land 6X more Interviews." CTA "Sign Up! - It's 100% Free!"
- Hero has tabs (AI Resumes / Job Tracker / Matching Mode) that swap the screenshot.
- Proves that a warm, non-blue CTA reads as "career" without looking corporate.

### Careerflow (adjacent, LinkedIn optimizer)
- Eyebrow "Trusted by OVER 1.2 million JOB SEEKERS!" above a duplicated H1 "Land your dream job. Without the stress."
- Blue `#1570EF` on white, Onest + Rubik, 12px radius. Same blue as half the market.
- Uses a problem/solution flip ("Rejection, Time Wasted, Fragmented Tools" then "No More Rejections, Save Time, All in One") and a Fomo.com "41 users active" popup.
- What to avoid: live-visitor popups and pain-point grids read as growth hacks and cost trust.

### Taplio (adjacent, LinkedIn content)
- `#3556E6` blue with `#F0F5FF` tint, Inter body, Lemfont display, 16px card radius, 10px buttons.
- Hero preview is a live-looking calendar UI rendered in HTML, not an image. It reads as the product.
- Announcement bar and modal stack on top of the hero. Busy, and on mobile the hero gets pushed down.

### Linear (best-in-class)
- Near-black `#08090A`, Inter + SF Pro Display, 64px H1, 15px body. Accent `#E4F222` (acid lime) used very sparingly.
- The hero "screenshot" is real HTML: an issue with an activity feed ("Triage Intelligence added the labels Performance and iOS · 2min ago"). Product output is the hero.
- Primary button is a light pill `#E5E5E6` with layered 1px shadows. Quiet but precise.
- Sections are short, each with one claim and one live UI fragment. A changelog section works as social proof.

### Resend (best-in-class)
- Black background, Inter body, ABC Favorit display at 96px H1. Huge type does the branding work.
- "Integrate this morning" section puts a real code sample right after the hero: the output, not a description.
- Social proof is a single line ("Companies of all sizes trust Resend") over logos. Closing CTA repeats the H1 rhythm: "Email reimagined. Available today."
- Lighting effects (`bg-light.avif` light ray) are images, not gradient blobs.

### Cal.com (best-in-class, light theme)
- Light `#F4F4F4` background, Cal Sans display (their own, free) + Inter. 8px radius.
- Hero has two CTAs ("Sign up with Google" / "Sign up with email") plus "No credit card required" microcopy, and a fully interactive booking widget on the right. The demo is the product.
- Section order: hero + live widget, logos, 3-step "how it works", feature grid, notification toasts as UI fragments, testimonials, FAQ, final CTA.
- Shows that a light, near-monochrome palette plus one strong display face looks premium without gradients.

### Raycast and Vercel (best-in-class, brief)
- Raycast: `#07080A` dark, `#FF6363` red accent, a `#59D499 / #56C2FF / #FFC531` spot palette for categories, GeistMono for numbers. A good model for a four-color category system like SWOT.
- Vercel (from memory): Geist + Geist Mono, pure black and white, 1px borders instead of shadows, grid lines as decoration. Geist is now free on Google Fonts.

## 2. Patterns

### Steal, ranked
1. **Inline input in the hero.** Nobody in our category does this. Resume Worded, Jobscan, Teal and Careerflow all send you to a modal, signup or another section. `linkedin.com/in/ [username] → Analyze` in the hero is our biggest differentiator. Pair it with microcopy like "No signup. Free. ~30 seconds."
2. **Product output as HTML in the hero** (Linear, Cal.com, Taplio). Render a real, mock-data results card (score ring + SWOT chips + rewritten headline) with our own components, not a PNG. It stays crisp, themable, and animates.
3. **One display face at large size** (Resend 96px, Cal Sans 64px). The font carries the brand, not gradients.
4. **Before/after rewrite as proof.** We don't have logos. Show the old headline struck through and the AI rewrite under it. That is our version of Resend's code block.
5. **Numbers in mono** (Raycast, Vercel). Score `72/100` and timers in a mono face read as measured, not marketing.
6. **Short section rhythm** (Linear, Cal.com): hero, how it works in 3 steps, sample report, before/after, FAQ, closing CTA that repeats the form.
7. **Four-color category system** (Raycast) mapped to SWOT, used consistently across homepage preview and results page.
8. **Warm CTA color** (Teal's marigold, Raycast's red). It separates us from the blue crowd at first glance.

### Avoid
- Blue primary in any shade near `#0A66C2`, `#1570EF`, `#2D5BFF`, `#3556E6`. Four of five competitors use it, and so does our current UI.
- Indigo/violet gradient blobs, glassmorphism hero glows, "AI sparkle" icons next to every heading.
- Stat claims we can't source ("5x more opportunities", "6X more interviews").
- Fake live-visitor popups (Careerflow's Fomo widget), announcement bars stacked over the hero.
- Tabbed screenshot carousels in the hero. They push the single result moment below the fold on mobile.
- Duplicate H1s and walls of identical feature cards with emoji icons.
- Pure white backgrounds with grey cards. That is exactly where we are now.

## 3. Recommended direction: "Red pen on paper"

The idea: a sharp career coach marking up your profile. Warm paper background, near-black ink,
one hot coral "red pen" for actions and edits, a yellow highlighter for emphasis. Editorial serif
headlines, clean grotesk body, mono numbers. A dark ink section breaks up the page (the sample report).

### Palette

All text pairs checked against WCAG 2.1 contrast formula.

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| `background` | `#FAF7F2` | page (warm paper) | |
| `surface` | `#FFFFFF` | cards, inputs | |
| `surface-2` | `#F2EDE4` | wells, hover rows, tag fills | |
| `ink` | `#1B1A17` | body + headings | 16.3:1 on bg |
| `muted` | `#5F5A52` | secondary text | 6.4:1 on bg, 6.8:1 on white |
| `border` | `#E4DDD0` | 1px card and input borders | decorative |
| `border-strong` | `#CFC6B6` | input borders, dividers | decorative |
| `primary` | `#FF5A36` | CTA fill, focus ring, score arc | |
| `primary-foreground` | `#1B1A17` | text on primary | 5.6:1 |
| `primary-ink` | `#B83A1A` | primary as text/links on paper | 5.4:1 on bg |
| `accent` | `#FFE14D` | highlighter swipe behind ink text | ink on it 13.4:1 |
| `night` | `#14130F` | dark sections | paper text 17.4:1 |
| `night-muted` | `#A8A196` | muted text on night | 7.3:1 |

Note: white text on `#FF5A36` is only 3.1:1, so primary buttons use ink text. That is also more distinctive.

SWOT (text on its own tint, all AA for normal text):

| Quadrant | Text / icon | Tint | Border | Contrast |
| --- | --- | --- | --- | --- |
| Strengths | `#17663F` | `#E5F3EA` | `#B9DEC6` | 6.1:1 |
| Weaknesses | `#8A5200` | `#FBEFD6` | `#F0D49A` | 5.6:1 |
| Opportunities | `#0B5C6B` | `#E0F1F3` | `#B3DCE2` | 6.5:1 |
| Threats | `#A3341A` | `#FCE9E2` | `#F2C3B4` | 5.8:1 |

### Typography (Google Fonts, all free)
- Display: **Fraunces** (variable, opsz + wght, use 600 at `opsz 144`, italic for one emphasized word per headline).
- Body/UI: **Geist** 400/500/600.
- Numbers: **Geist Mono** 500 for scores, timers, "~30s", character counts.
- Scale: H1 `clamp(2.5rem, 6vw, 4.5rem)` / line-height 1.02 / tracking -0.02em. Body 17px desktop, 16px mobile.

### Tailwind v4 tokens

```css
@theme {
  --color-background: #FAF7F2;
  --color-surface: #FFFFFF;
  --color-surface-2: #F2EDE4;
  --color-ink: #1B1A17;
  --color-muted: #5F5A52;
  --color-border: #E4DDD0;
  --color-border-strong: #CFC6B6;
  --color-primary: #FF5A36;
  --color-primary-foreground: #1B1A17;
  --color-primary-ink: #B83A1A;
  --color-accent: #FFE14D;
  --color-night: #14130F;
  --color-night-muted: #A8A196;
  --color-strength: #17663F;  --color-strength-tint: #E5F3EA;
  --color-weakness: #8A5200;  --color-weakness-tint: #FBEFD6;
  --color-opportunity: #0B5C6B; --color-opportunity-tint: #E0F1F3;
  --color-threat: #A3341A;    --color-threat-tint: #FCE9E2;

  --font-display: "Fraunces", ui-serif, Georgia, serif;
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  --radius-sm: 6px;   /* chips, tags */
  --radius-md: 10px;  /* inputs, buttons */
  --radius-lg: 16px;  /* cards */
  --radius-xl: 24px;  /* hero preview card, dark section */
  --radius-pill: 999px;

  --shadow-card: 0 1px 0 #E4DDD0, 0 12px 32px -16px rgb(27 26 23 / 0.18);
  --shadow-lift: 0 1px 0 #CFC6B6, 0 24px 48px -20px rgb(27 26 23 / 0.28);
  --shadow-press: 3px 3px 0 #1B1A17; /* "stamp" offset shadow on primary CTA */
}
```

Shadow style: 1px warm borders plus one soft, low, warm-tinted drop shadow. The primary CTA gets a hard
offset ink shadow (`--shadow-press`) that collapses on `:active`, like a rubber stamp. No glows.

### Motion (pure CSS keyframes)

Wrap every one in `@media (prefers-reduced-motion: no-preference) { ... }` so the default is static.
Under `reduce`, show the end state (full score arc, all chips visible, highlight drawn).

1. **Highlighter swipe.** One H1 word gets a `::after` in `--color-accent` that scales `scaleX(0 → 1)` from the left, 600ms `cubic-bezier(.2,.7,.2,1)`, 300ms delay.
2. **Score ring fill.** SVG circle `stroke-dashoffset` from full to the score value, 1.2s ease-out, while a CSS `@property --score` integer counter counts 0 → 72 in the mono label.
3. **SWOT chips stagger in.** `opacity 0 → 1` and `translateY(6px → 0)`, 300ms each, `animation-delay: calc(var(--i) * 70ms)`.
4. **Red-pen strikethrough.** On the before/after card, a `::before` line across the old headline grows `scaleX(0 → 1)`, then the rewritten headline fades up beneath it.
5. **CTA stamp press.** `:active` moves the button `translate(3px, 3px)` and drops the shadow to `0 0 0`, 80ms. A transition, so it needs no reduced-motion fallback beyond removing the translate.
6. **Loading "pen scan".** On `AnalysisLoadingScreen`, a 2px coral bar sweeps down a skeleton profile card (`translateY` loop, 1.6s linear infinite). Reduced motion: replace with a static step list ("Fetching profile, Scoring, Writing").
7. **Input focus caret.** The `linkedin.com/in/` prefix shifts to `--color-primary-ink` and the border animates to coral over 150ms on focus.

## 4. Hero layout

Desktop (≥1024px), two columns, 7/5 split, form in the left column above the fold:

```
+--------------------------------------------------------------------------+
|  [logo]  Coach                                  How it works   Sample    |
+--------------------------------------------------------------------------+
|                                          |                               |
|  FREE LINKEDIN REVIEW · NO SIGNUP        |   +-------------------------+ |
|                                          |   | (72)  Profile score     | |
|  Your LinkedIn, marked up by             |   |  ring  Senior PM goal   | |
|  a ~~recruiter~~ coach in 30s.           |   |-------------------------| |
|      ^^^^^^^^^ highlighter swipe         |   | [S] Clear impact metrics| |
|                                          |   | [W] Vague About section | |
|  Score, SWOT, and a rewritten headline,  |   | [O] Add AI/ML keywords  | |
|  About and experience for the role you   |   | [T] Title mismatch      | |
|  want next.                              |   |-------------------------| |
|                                          |   | Headline                | |
|  +------------------------------------+  |   | ~~Product person~~      | |
|  | linkedin.com/in/ [ janedoe       ] |  |   | Senior PM, B2B payments | |
|  +------------------------------------+  |   | shipping 0→1 products   | |
|  | Goal: [ Senior Product Manager   ] |  |   +-------------------------+ |
|  +------------------------------------+  |     slight -2deg tilt,        |
|  [   Mark up my profile  ->   ]##        |     --shadow-lift             |
|  Free · ~30 seconds · nothing saved publicly                             |
+--------------------------------------------------------------------------+
|  How it works: 1 Paste username  2 Pick a goal  3 Get your markup        |
+--------------------------------------------------------------------------+
```

Mobile (<640px), single column. Form stays above the fold. The preview card sits directly
under the form, untilted, and shows only score + 2 SWOT chips + headline rewrite to keep it short:

```
+------------------------------+
| [logo] Coach           [=]   |
+------------------------------+
| FREE · NO SIGNUP             |
| Your LinkedIn,               |
| marked up in 30s.            |
|                              |
| Score, SWOT and rewrites     |
| for the job you want next.   |
|                              |
| linkedin.com/in/ [janedoe  ] |
| Goal [Senior PM           ]  |
| [  Mark up my profile  ->  ] |  full-width, 52px tall
| Free · ~30s                  |
|                              |
| +--------------------------+ |
| | (72) Profile score       | |
| | [S] Clear impact metrics | |
| | [W] Vague About section  | |
| | ~~Product person~~       | |
| | Senior PM, B2B payments  | |
| +--------------------------+ |
+------------------------------+
| How it works (3 stacked)     |
```

Mobile notes: inputs at 16px font size to stop iOS zoom. Stack the two fields with the prefix
inside the username input. Make the CTA sticky at the bottom only after the user scrolls past the
hero form. Keep the dark `night` section for the full sample report further down the page.
