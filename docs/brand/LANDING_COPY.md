# Landing copy: Redline

Final copy for the rebrand. Strings are ready to paste into components. Anything in `[PLACEHOLDER: ...]` is optional and the page works without it.

## 1. Assumptions, name and tagline

### Assumptions

- Nobody has checked the name for trademarks or domain availability. Do that before shipping. `redline.so`, `getredline.com` and `redline.careers` are the domains to check first.
- Copy is English only, since the product doesn't support other languages yet.
- Results pages are scoped to the anonymous session cookie (`loadAnalysisForSession`). A results link only opens in the browser that created it, so the copy never says "share this link". The next-step CTA points to a re-run with a different goal.
- We store the fetched public profile and the analysis in our database, tied to the anonymous session. There is no delete button, so the FAQ doesn't promise deletion.
- The profile goes to a third-party AI model to produce the analysis. The FAQ says so.
- The analysis prompt bans invented employers and credentials. The copy describes that rule and doesn't promise perfect accuracy.
- No testimonials, user counts or logos exist. Proof on the page comes from the sample output and from describing what you actually receive.
- The fetch-profile limit is 5 per hour per session. The copy says "5 analyses an hour". If `/api/analyze` gets its own limit later, the wording still holds.
- "LinkedIn" appears only as a description of what we read, and the footer says we're not affiliated.

### Name options

| Name | Why it could work | Risk |
| --- | --- | --- |
| **Redline** | An editor's red pen on your profile. It matches the core output: what to cut, what to rewrite, what to add. | Common word. Needs a modifier in search ("Redline profile review"). |
| Goalfit | Says exactly what we measure: how well your profile fits your goal. | Literal and a little flat. Sounds like a fitness app. |
| Recruitable | The outcome people want, in one word. | Long, hard to spell, sounds like a promise we can't keep. |

**Pick: Redline.** It describes what you get (a marked-up profile), it's short enough for a logo, and it doesn't start with someone else's trademark.

**Tagline:** Your profile, marked up for the job you want.

## 2. Angles

I ran ten lenses (outcome, time, pain, identity, effort, speed, status, mechanism, niche, anti) and kept three.

1. **Mechanism plus outcome: "graded against your goal, not against a generic checklist".** Every other profile tip is generic. Our only real difference is that the score, the SWOT and the rewrites all depend on the goal you type. This angle carries the hero and the "how it works" section.
2. **Effort and speed: "username in, rewrites out, about 30 seconds, no signup".** Most "free" tools ask for an email, a PDF export or a login. We ask for a username. This is the risk reversal, so it goes in the microcopy under every CTA.
3. **Pain: "you're applying and nothing comes back".** Job seekers and career changers already feel this. Recruiters search by keyword, and a profile written for your last job doesn't match the next one. This angle carries the problem section.

Dropped: status ("stand out from the crowd") is vague and every competitor uses it. Time-to-hire ("land interviews in 2 weeks") promises an outcome we can't measure.

Hook formula used for the hero: who (anyone with a target role) + result (a profile that fits it) + speed (30 seconds) + objection removed (free, no signup, no PDF).

## 3. Homepage

### Nav

- Logo: `Redline`
- Links: `How it works` (anchor `#how-it-works`), `Example` (anchor `#example`)
- CTA button: `Review my profile` (scrolls to the form)

### Hero

- Eyebrow: `Free LinkedIn profile review`
- H1: `Fix your profile for the job you actually want`
- Subhead: `Enter your LinkedIn username and the role you're after. In about 30 seconds you get a score, a SWOT built around that goal, and rewrites you can paste in.`
- CTA button: `Review my profile`
- CTA button (loading): `Reading your profile...`
- Microcopy under the form: `Free. No signup. About 30 seconds.`

### Form

**Field 1**

- Label: `Your LinkedIn username or profile URL`
- Placeholder: `janedoe or linkedin.com/in/janedoe`
- Helper: `It's the part after /in/ in your profile link. Your profile has to be public.`

**Field 2**

- Label: `What job do you want next?`
- Placeholder: `Senior product manager at a B2B SaaS company, ideally remote`
- Helper: `Be specific. "Move from backend engineering into DevOps" gets you a sharper review than "a better job".`
- Character counter: `{n}/500`
- Too short (under 10 chars): `Add a bit more. Give us a role, an industry or a level.`

**Example goal chips** (optional, click to fill):

- `Move from backend engineering into DevOps`
- `First data analyst role after graduating`
- `Engineering manager at a Series B startup`
- `Switch from teaching into instructional design`

### Problem

- Heading: `Your profile was written for the job you have`
- Body:

  > You've applied to 30 roles and heard back from two. You rewrote your headline three times and it still sounds like everyone else's. Every LinkedIn tip you find is the same list: add a photo, use keywords, be authentic.
  >
  > None of it says which keywords, or for which job.
  >
  > Recruiters search for the role they're filling. If your headline, About section and bullets describe your last job, you don't show up for the next one. You can't see the gap from the inside.

### How it works

- Heading: `How it works`
- Step 1: `Tell us who you are and where you're going.` Your LinkedIn username, plus the role you want in a sentence or two.
- Step 2: `We read your public profile and grade it against that goal.` Headline, About, experience, education and skills, all checked against what that role needs.
- Step 3: `You get the review and the rewrites.` A score, a SWOT, a prioritized plan, and new text for each section, shown in a LinkedIn-style preview with copy buttons.

### What you get

- Heading: `What you get in one review`
- Subhead: `Every item is written for the goal you typed. Change the goal and you get a different review.`

| Title | Line |
| --- | --- |
| `Know where you stand` | A profile score from 0 to 100, so you can see the starting point before you change anything. |
| `See how far you are from the goal` | A goal alignment score out of 10 with a short explanation of what's missing. |
| `Know what to keep and what to fix` | A SWOT with up to 5 strengths, weaknesses, opportunities and threats, each with a reason. |
| `Know what to do first` | Strategic suggestions, each tagged high, medium or low priority, with the section it touches and a timeframe like "This week". |
| `Get something done in 10 minutes` | A short checklist of quick wins you can finish today. |
| `A headline recruiters can find` | A rewritten headline built around the keywords for your target role. |
| `An About section that tells the right story` | A rewritten About that connects what you've done to what you want next. |
| `Bullets that sound like the new job` | Your experience bullets rewritten around outcomes that matter for the goal. |
| `Skills worth adding` | Suggested skills that your profile supports or that the target role commonly needs. |
| `A first post to publish` | A draft LinkedIn post that signals your direction to your network. |

- Value-stack close: `Career coaches and resume writers charge for this kind of review. Here it costs nothing and takes about 30 seconds.`
- CTA button: `Review my profile`
- Microcopy: `Free. No signup. About 30 seconds.`

Note: the close skips a price figure on purpose. We have no sourced number for typical coach rates, and a made-up anchor would be the one dishonest line on the page.

### Example output

- Heading: `What a review looks like`
- Label (above the card, always visible): `Example. Maya is a fictional profile.`
- Setup line: `Maya Okafor is an operations coordinator at a logistics company. Her goal: "Move into an associate product manager role at a logistics or supply chain software company."`

**Before**

> Operations Coordinator at Brightline Logistics

**After**

> Operations coordinator moving into product | Built the dispatch tracking sheet 40 drivers use daily | Process design, SQL, user interviews

- Caption under the pair: `Same person, same experience. The rewrite pulls the dispatch project and the SQL work out of her experience section and puts them where a product recruiter looks first.`

**One item from each part of Maya's review** (small cards, also labeled as example):

- Goal alignment: `5/10. Strong process and tooling work, but nothing on the profile says "product" yet.`
- Weakness: `No product language. Her bullets describe tasks, not the users she built for or the problems she solved.`
- Quick win: `Rename her dispatch tracking project as a product she shipped, with who uses it and how often.`

- Link under the example: `Run yours` (scrolls to form)

[PLACEHOLDER: swap Maya for a screenshot of a real results page once a user agrees to share one. Keep the "Example" label either way.]

### Who it's for

- Heading: `Built for people with a next step in mind`
- `Job seekers.` Line up your profile with the roles you're applying to, before the recruiter looks.
- `Career changers.` Turn experience from your old field into proof for the new one.
- `Recent grads.` Get a headline and About section that say more than "student at...".
- `Senior professionals.` Tell a leadership story that matches director and VP searches.

### FAQ

- Heading: `Questions`

**Is it really free?**
Yes. No trial, no card, no account. You can run 5 reviews an hour.

**What do you read, and what do you keep?**
Only your public LinkedIn profile: headline, About, experience, education and skills. We never log in as you and can't see messages, connections or anything private. An AI model processes the profile and your goal to write the review. We save the profile data and the review so the results page loads in your browser. There's no account, so nothing ties the review to your name or email.

**My profile is private. Will it work?**
No. We can only read what LinkedIn shows logged-out visitors. If we can't find your profile, open LinkedIn's public profile settings, make it visible, and try again.

**How accurate is it?**
It's an AI review, so treat it as a strong first draft, not a verdict. The model works from what's on your profile and is told not to invent employers or credentials. Still, read every line before you paste it, especially numbers and skills. If the review says you did something you didn't, delete it.

**Will the rewrites sound like me?**
Not exactly. They're written in a clear professional tone. Most people keep the structure and keywords and change a few words to sound like themselves.

**How long does it take?**
About 30 seconds from clicking the button to seeing your results.

**Does it change my LinkedIn profile?**
No. We never touch your account. You copy what you like and paste it in yourself.

**Can I try a different goal?**
Yes. Start over and type a new goal. Comparing two reviews is a quick way to see which direction your profile already supports.

### Final CTA

- Heading: `See your profile the way the next recruiter will`
- Body: `One username, one goal, about 30 seconds. Worst case, you spent half a minute and got a free second opinion.`
- CTA button: `Review my profile`
- Microcopy: `Free. No signup. Public profile only.`

### Footer

`Redline reviews public LinkedIn profiles against your career goal. Not affiliated with or endorsed by LinkedIn.`

## 4. Loading screen messages

Rotate in order, about 4 seconds each. Keep the last one up until results load.

1. `Finding your public profile...`
2. `Reading your headline and About section...`
3. `Going through your experience, one role at a time...`
4. `Checking it against the job you want...`
5. `Sorting strengths from gaps...`
6. `Rewriting your headline. This is the fun part.`
7. `Almost there. Putting the plan in order...`

## 5. Results page

- Page title (H1): `Your review, {firstName}`
- Fallback H1 (no name): `Your profile review`
- Subtitle: `Graded against your goal: "{careerGoal}"`
- Primary button: `See my rewritten profile`
- Secondary button: `Start over`
- Modal title: `Your rewritten profile`
- Modal subtitle: `Copy each section into LinkedIn. Read it first and change anything that isn't true or doesn't sound like you.`
- Copy button: `Copy` → on success `Copied`
- Modal section labels: `Headline`, `About`, `Experience`, `Skills to add`, `Post to publish`

### Section headings

| Section | Heading | Descriptor |
| --- | --- | --- |
| Profile score | `Profile score` | `How strong your profile is for this goal, out of 100.` |
| Goal alignment | `Goal alignment` | `How close your profile is to the job you described.` |
| Strengths | `Strengths` | `What already works for this goal. Keep it.` |
| Weaknesses | `Weaknesses` | `What's missing or holding you back.` |
| Opportunities | `Opportunities` | `Openings you can use with what you already have.` |
| Threats | `Threats` | `What competing candidates or recruiters might hold against you.` |
| Strategic suggestions | `Your plan` | `Ranked by impact. Start at the top.` |
| Quick wins | `Quick wins` | `Small fixes you can make today.` |

- Priority badges: `High`, `Medium`, `Low`

### Next-step CTA

`Not sure this is the right direction? Start over with a different goal and compare the two reviews.`

Button: `Try another goal`

## 6. Error and empty states

**Profile not found or private**

- Title: `We couldn't find that profile`
- Body: `Check the username (it's the part after /in/ in your profile link) and make sure your profile is visible to the public. Private profiles don't work.`
- Button: `Try again`

**Rate limited**

- Title: `That's 5 reviews this hour`
- Body: `You've hit the hourly limit. Try again in {minutes} minutes. Your earlier results still open in this browser.`
- Fallback when minutes aren't known: `Try again in a little while.`

**Generic failure**

- Title: `Something broke on our end`
- Body: `Your profile is fine. The review didn't finish. Wait a few seconds and try again.`
- Button: `Try again`

**Analysis not found (404 page)**

- Title: `This review isn't here`
- Body: `Reviews open only in the browser that created them. If you cleared cookies or switched devices, run a new one. It takes about 30 seconds.`
- Button: `Start a new review`

## 7. Page titles and meta

**Home**

- `<title>`: `Redline: free LinkedIn profile review for your next job`
- Meta description: `Enter your LinkedIn username and the role you want. Get a score, a goal-specific SWOT and rewritten headline, About and bullets in about 30 seconds. Free, no signup.`

**Results**

- `<title>`: `Your profile review | Redline`
- Meta description: `Your profile score, goal alignment, SWOT and rewritten profile sections from Redline.`
- Add `<meta name="robots" content="noindex">`. Results are private to the session.
