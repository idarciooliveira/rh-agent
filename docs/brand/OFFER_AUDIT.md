# OFFER_AUDIT.md: RHAI

Audit of the two-plan offer shipped on `feat/rhai-final-polish` (2026-10-20), using the Hormozi value equation:

> Value = (Dream outcome × Perceived likelihood) ÷ (Time delay × Effort and sacrifice)

Constraint for every fix: no claim we can't back. We have no real testimonials, no outcome data and no refund flow yet.

## 1. Offer summary

- **Who it's for:** professionals in Angola (first), Brazil, Portugal and abroad who are applying for a specific next role and aren't hearing back: job seekers, career changers, recent graduates, senior people aiming at director searches.
- **What it promises:** a LinkedIn profile written for the job you want, so you show up when recruiters search for that role.
- **How it works:** LinkedIn username + target role → 30 seconds → score, goal alignment, SWOT, ranked plan, quick wins, and a rewritten headline, About, experience and skills, ready to paste.
- **Price:** free score; Full review 2.900 Kz / $9 one-off; Career pass 6.900 Kz / $19 for 30 days.

> RHAI helps job seekers get found for the role they want by rewriting their LinkedIn profile around that role, in 30 seconds, for less than a lunch.

## 2. Overall diagnosis

**Strengths**
- Time to value is the best in the category: a real score in 30 seconds, no signup, no PDF export.
- The free tier delivers something real (score, strengths, two quick wins), so the paywall sells from proof, not from a promise.
- The unlock banner shows exact counts of what's locked ("8 more SWOT findings, 3-step plan, 1 rewritten role"). That's concrete and honest.
- Effort after paying is near zero: the text is written for you, with copy buttons.

**Weaknesses**
- The headline sells the *review*, not the *result*. "Reviewed" is a process word. People buy "get found by recruiters", not "get reviewed".
- The biggest effort reducer ("we write it, you paste it") is buried in step 3 and the value list.
- Plan names are generic. "Full review" describes the deliverable, "Career pass" describes nothing.
- No price anchor on the plan cards. The only anchor ("career coaches charge by the hour") sits in a banner two sections above pricing.
- No risk reversal beyond "free score". No guarantee, because no refund flow exists.
- Proof is samples only.

## 3. Value equation analysis

### Dream outcome: 5/10
- **Issues:** "Your LinkedIn, reviewed for the job you want next" names the activity. The outcome (recruiters find you for that role, recruiter messages, interviews) is never stated up front.
- **Fixes:** lead with the outcome we can honestly influence: *showing up when recruiters search for the role*. Don't promise interviews or a timeline.

### Perceived likelihood: 5/10
- **Issues:** the method isn't named, so "AI review" sounds like every other GPT wrapper. The before/after for Ana is the strongest proof and sits halfway down the page. Testimonials are samples.
- **Fixes:** name the mechanism ("graded the way a recruiter searches: title, skills, industry, results"). Keep "nothing invented" next to the before/after. Replace sample testimonials with real ones before any paid traffic (tracked in `src/lib/testimonials.ts`).

### Time delay: 9/10
- **Issues:** the speed is strong but only shown as "30s". The second fast win, the 10-minute quick wins, isn't sold as a result you get today.
- **Fixes:** add "update your profile today": score in 30 seconds, first fixes live in 10 minutes.

### Effort and sacrifice: 8/10
- **Issues:** the user's remaining job (copy and paste) is never framed as *the only* job.
- **Fixes:** add "We write it. You paste it." to the hero and pricing.

## 4. Market fit
- **Issues:** personas are broad. Pain is real but only urgent for people actively applying.
- **Fixes:** speak to the active applicant first ("applied to 30 jobs, heard back from two"). Keep the B2B block for universities and employers; it's where volume will come from in Angola.

## 5. Offer structure
- **Issues:** two plans are easy to compare, but nothing says who each plan is for, so the choice still takes thought.
- **Fixes:** add a "Best if…" line to each card. Rename to outcome names: **Profile Makeover** (one goal, every fix) and **Job Search Pass** (30 days of rewrites, job matching and cover letters).

## 6. Value stack
- **Issues:** the pass's extras (job matching, cover letters, post plan) read as features in a list, not as separate tools you'd otherwise pay for or do by hand.
- **Fixes:** stack them as named items with what each saves you. Cover letters written per job and a 4-week post plan are each a few hours of work.

## 7. Pricing
- **Issues:** prices are fine for the market (an impulse Multicaixa payment), but there's no anchor on the cards and no math on the pass.
- **Fixes:** anchor against an hour with a career coach directly above the cards. On the pass: "Two reviews cost more than the pass." No invented "value" figures.

## 8. Messaging
- **Issues:** hero, problem and pricing headlines are clean but soft. Hooks don't name the pain the buyer feels ("applying and hearing nothing").
- **Fixes:** hero = outcome + mechanism + effort. Problem = the silent inbox. Pricing = "less than an hour with a coach".

## 9. Objections and trust
- **Issues:** missing answers to "I'm not actively looking", "will it work in my field", "is this just ChatGPT", "is it worth paying if I can write it myself".
- **Fixes:** add those to the FAQ. Honest risk reversal: *you see your score, your strengths and exactly what's locked before you pay*. No money-back guarantee until refunds exist (see `docs/ROADMAP.md`). Once they do, add a 7-day "if the rewrite isn't usable, we refund" guarantee.

## 10. Top priority fixes
1. Outcome-first hero: "Show up when recruiters search for the job you want." *(done)*
2. "We write it. You paste it." in the hero and pricing. *(done)*
3. Rename plans to Profile Makeover and Job Search Pass, add "Best if…" lines and a stacked pass. *(done)*
4. Coach anchor and pass math on the pricing section. *(done)*
5. FAQ entries for the four missing objections and the "see before you pay" risk reversal. *(done)*
6. Real testimonials. *(open: needs real users)*
7. Refund flow, then a guarantee. *(open)*

## 11. Quick wins
- Swap "Get my free score" for a CTA that names the result: "Score my profile free".
- Repeat the risk reversal under every CTA: free score, no signup, see what's locked before you pay.
- Put "nothing invented" next to every before/after.
