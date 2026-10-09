import type { LucideIcon } from "lucide-react";
import {
	ArrowRightIcon,
	AwardIcon,
	BriefcaseIcon,
	CheckCircle2Icon,
	CrosshairIcon,
	GaugeIcon,
	GraduationCapIcon,
	LightbulbIcon,
	ListChecksIcon,
	PenLineIcon,
	PlusIcon,
	ScanSearchIcon,
	ShuffleIcon,
	SparklesIcon,
	TagIcon,
	WandSparklesIcon,
	ZapIcon,
} from "#/lib/icons";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
	return (
		<p className="mb-4 font-mono text-xs font-medium tracking-[0.14em] text-primary-ink uppercase">
			{children}
		</p>
	);
}

function CtaLink({ label = "Review my profile" }: { label?: string }) {
	return (
		<a
			href="#review"
			className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-base font-semibold sm:w-auto"
		>
			{label}
			<ArrowRightIcon className="size-4" aria-hidden />
		</a>
	);
}

export function ProblemSection() {
	return (
		<section className="border-y border-border bg-surface">
			<div className="reveal mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-28">
				<div>
					<SectionEyebrow>The problem</SectionEyebrow>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
						Your profile was written for the job you{" "}
						<em className="text-primary-ink">have</em>.
					</h2>
				</div>
				<div className="space-y-5 text-lg leading-relaxed text-muted">
					<p>
						You've applied to 30 roles and heard back from two. You rewrote your
						headline three times and it still sounds like everyone else's. Every
						LinkedIn tip you find is the same list: add a photo, use keywords,
						be authentic.
					</p>
					<p className="font-display text-2xl font-medium text-ink italic">
						None of it says which keywords, or for which job.
					</p>
					<p>
						Recruiters search for the role they're filling. If your headline,
						About section and bullets describe your last job, you don't show up
						for the next one. You can't see the gap from the inside.
					</p>
				</div>
			</div>
		</section>
	);
}

const STEPS = [
	{
		icon: CrosshairIcon,
		title: "Tell us who you are and where you're going.",
		body: "Your LinkedIn username, plus the role you want in a sentence or two.",
	},
	{
		icon: ScanSearchIcon,
		title: "We read your public profile and grade it against that goal.",
		body: "Headline, About, experience, education and skills, all checked against what that role needs.",
	},
	{
		icon: PenLineIcon,
		title: "You get the review and the rewrites.",
		body: "A score, a SWOT, a prioritized plan, and new text for each section, in a LinkedIn-style preview with copy buttons.",
	},
];

export function HowItWorksSection() {
	return (
		<section
			id="how-it-works"
			className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28"
		>
			<div className="reveal mb-12 max-w-2xl">
				<SectionEyebrow>How it works</SectionEyebrow>
				<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
					Username in, rewrites out.
				</h2>
			</div>
			<ol className="grid gap-5 md:grid-cols-3">
				{STEPS.map((step, index) => {
					const Icon = step.icon;
					return (
						<li
							key={step.title}
							className="reveal relative rounded-lg border border-border bg-surface p-6 shadow-card"
						>
							<div className="mb-6 flex items-center justify-between">
								<span className="flex size-11 items-center justify-center rounded-md border-[1.5px] border-ink bg-accent">
									<Icon className="size-5 text-ink" aria-hidden />
								</span>
								<span className="font-mono text-sm text-muted">
									0{index + 1}
								</span>
							</div>
							<h3 className="text-lg leading-snug font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-2 leading-relaxed text-muted">{step.body}</p>
						</li>
					);
				})}
			</ol>
		</section>
	);
}

type ValueItem = { icon: LucideIcon; title: string; body: string };

const DIAGNOSIS: ValueItem[] = [
	{
		icon: GaugeIcon,
		title: "Know where you stand",
		body: "A profile score from 0 to 100, so you see the starting point before you change anything.",
	},
	{
		icon: CrosshairIcon,
		title: "See how far you are from the goal",
		body: "A goal alignment score out of 10 with a short explanation of what's missing.",
	},
	{
		icon: LightbulbIcon,
		title: "Know what to keep and what to fix",
		body: "A SWOT with up to 5 strengths, weaknesses, opportunities and threats, each with a reason.",
	},
	{
		icon: ListChecksIcon,
		title: "Know what to do first",
		body: 'Suggestions tagged high, medium or low priority, with a timeframe like "This week".',
	},
	{
		icon: ZapIcon,
		title: "Get something done in 10 minutes",
		body: "A short checklist of quick wins you can finish today.",
	},
];

const REWRITES: ValueItem[] = [
	{
		icon: AwardIcon,
		title: "A headline recruiters can find",
		body: "Rewritten around the keywords for your target role.",
	},
	{
		icon: PenLineIcon,
		title: "An About section that tells the right story",
		body: "Connects what you've done to what you want next.",
	},
	{
		icon: BriefcaseIcon,
		title: "Bullets that sound like the new job",
		body: "Your experience rewritten around outcomes that matter for the goal.",
	},
	{
		icon: TagIcon,
		title: "Skills worth adding",
		body: "Skills your profile supports or the target role commonly needs.",
	},
	{
		icon: SparklesIcon,
		title: "A first post to publish",
		body: "A draft LinkedIn post that signals your direction to your network.",
	},
];

function ValueList({ label, items }: { label: string; items: ValueItem[] }) {
	return (
		<div className="reveal rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
			<p className="mb-6 font-display text-2xl font-semibold text-ink">
				{label}
			</p>
			<ul className="space-y-5">
				{items.map((item) => {
					const Icon = item.icon;
					return (
						<li key={item.title} className="flex gap-4">
							<span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm bg-surface-2">
								<Icon className="size-4 text-primary-ink" aria-hidden />
							</span>
							<div>
								<p className="font-semibold text-ink">{item.title}</p>
								<p className="mt-0.5 text-[15px] leading-relaxed text-muted">
									{item.body}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export function ValueStackSection() {
	return (
		<section className="border-y border-border bg-surface-2/60">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
				<div className="reveal mb-12 max-w-2xl">
					<SectionEyebrow>What you get</SectionEyebrow>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
						What you get in <span className="highlight">one review</span>
					</h2>
					<p className="mt-5 text-lg text-muted">
						Every item is written for the goal you typed. Change the goal and
						you get a different review.
					</p>
				</div>
				<div className="grid gap-5 lg:grid-cols-2">
					<ValueList label="The diagnosis" items={DIAGNOSIS} />
					<ValueList label="The rewrites" items={REWRITES} />
				</div>
				<div className="reveal mt-10 flex flex-col items-start gap-5 rounded-lg border-[1.5px] border-ink bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
					<p className="max-w-xl text-lg text-ink">
						Career coaches and resume writers charge for this kind of review.
						Here it costs nothing and takes about 30 seconds.
					</p>
					<CtaLink />
				</div>
			</div>
		</section>
	);
}

const EXAMPLE_CARDS = [
	{
		label: "Goal alignment",
		text: '5/10. Strong process and tooling work, but nothing on the profile says "product" yet.',
		className: "border-opportunity-border/40 text-opportunity-tint",
	},
	{
		label: "Weakness",
		text: "No product language. Her bullets describe tasks, not the users she built for or the problems she solved.",
		className: "border-weakness-border/40 text-weakness-tint",
	},
	{
		label: "Quick win",
		text: "Rename her dispatch tracking project as a product she shipped, with who uses it and how often.",
		className: "border-strength-border/40 text-strength-tint",
	},
];

export function ExampleSection() {
	return (
		<section id="example" className="bg-night text-background">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
				<div className="reveal mb-12 max-w-2xl">
					<p className="mb-4 font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase">
						Example. Maya is a fictional profile.
					</p>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl">
						What a review looks like
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-night-muted">
						Maya Okafor is an operations coordinator at a logistics company. Her
						goal: "Move into an associate product manager role at a logistics or
						supply chain software company."
					</p>
				</div>

				<div className="reveal rounded-xl bg-background p-5 text-ink sm:p-8">
					<div className="grid gap-6 md:grid-cols-2 md:gap-8">
						<div>
							<p className="mb-2 font-mono text-xs tracking-wide text-muted uppercase">
								Before
							</p>
							<p className="text-lg sm:text-xl">
								<span className="strike">
									Operations Coordinator at Brightline Logistics
								</span>
							</p>
						</div>
						<div>
							<p className="mb-2 flex items-center gap-1.5 font-mono text-xs tracking-wide text-primary-ink uppercase">
								<WandSparklesIcon className="size-3.5" aria-hidden />
								After
							</p>
							<p className="text-lg leading-snug font-semibold sm:text-xl">
								Operations coordinator moving into product | Built the dispatch
								tracking sheet 40 drivers use daily | Process design, SQL, user
								interviews
							</p>
						</div>
					</div>
					<p className="mt-6 border-t border-border pt-5 leading-relaxed text-muted">
						Same person, same experience. The rewrite pulls the dispatch project
						and the SQL work out of her experience section and puts them where a
						product recruiter looks first.
					</p>
				</div>

				<ul className="mt-5 grid gap-5 md:grid-cols-3">
					{EXAMPLE_CARDS.map((card) => (
						<li
							key={card.label}
							className={`reveal rounded-lg border bg-night-2 p-5 ${card.className}`}
						>
							<p className="mb-2 font-mono text-xs tracking-wide uppercase">
								{card.label}
							</p>
							<p className="leading-relaxed text-background/90">{card.text}</p>
						</li>
					))}
				</ul>

				<div className="mt-10">
					<CtaLink label="Run yours" />
				</div>
			</div>
		</section>
	);
}

const PERSONAS = [
	{
		icon: BriefcaseIcon,
		title: "Job seekers",
		body: "Line up your profile with the roles you're applying to, before the recruiter looks.",
	},
	{
		icon: ShuffleIcon,
		title: "Career changers",
		body: "Turn experience from your old field into proof for the new one.",
	},
	{
		icon: GraduationCapIcon,
		title: "Recent grads",
		body: 'Get a headline and About section that say more than "student at...".',
	},
	{
		icon: AwardIcon,
		title: "Senior professionals",
		body: "Tell a leadership story that matches director and VP searches.",
	},
];

export function PersonasSection() {
	return (
		<section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
			<div className="reveal mb-12 max-w-2xl">
				<SectionEyebrow>Who it's for</SectionEyebrow>
				<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
					Built for people with a{" "}
					<em className="text-primary-ink">next step</em> in mind
				</h2>
			</div>
			<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{PERSONAS.map((persona) => {
					const Icon = persona.icon;
					return (
						<li
							key={persona.title}
							className="reveal group rounded-lg border border-border bg-surface p-6 transition-shadow hover:shadow-lift"
						>
							<Icon
								className="mb-5 size-6 text-primary-ink transition-transform group-hover:-rotate-6"
								aria-hidden
							/>
							<h3 className="text-lg font-semibold text-ink">
								{persona.title}
							</h3>
							<p className="mt-2 leading-relaxed text-muted">{persona.body}</p>
						</li>
					);
				})}
			</ul>
		</section>
	);
}

const FAQS = [
	{
		q: "Is it really free?",
		a: "Yes. No trial, no card, no account. You can run 5 reviews an hour.",
	},
	{
		q: "What do you read, and what do you keep?",
		a: "Only your public LinkedIn profile: headline, About, experience, education and skills. We never log in as you and can't see messages, connections or anything private. An AI model processes the profile and your goal to write the review. We save the profile data and the review so the results page loads in your browser. There's no account, so nothing ties the review to your name or email.",
	},
	{
		q: "My profile is private. Will it work?",
		a: "No. We can only read what LinkedIn shows logged-out visitors. If we can't find your profile, open LinkedIn's public profile settings, make it visible, and try again.",
	},
	{
		q: "How accurate is it?",
		a: "It's an AI review, so treat it as a strong first draft, not a verdict. The model works from what's on your profile and is told not to invent employers or credentials. Still, read every line before you paste it, especially numbers and skills. If the review says you did something you didn't, delete it.",
	},
	{
		q: "Will the rewrites sound like me?",
		a: "Not exactly. They're written in a clear professional tone. Most people keep the structure and keywords and change a few words to sound like themselves.",
	},
	{
		q: "How long does it take?",
		a: "About 30 seconds from clicking the button to seeing your results.",
	},
	{
		q: "Does it change my LinkedIn profile?",
		a: "No. We never touch your account. You copy what you like and paste it in yourself.",
	},
	{
		q: "Can I try a different goal?",
		a: "Yes. Start over and type a new goal. Comparing two reviews is a quick way to see which direction your profile already supports.",
	},
];

export function FaqSection() {
	return (
		<section className="border-t border-border bg-surface">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-16 md:py-28">
				<div className="reveal">
					<SectionEyebrow>FAQ</SectionEyebrow>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-ink sm:text-5xl">
						Questions
					</h2>
				</div>
				<div className="reveal divide-y divide-border border-y border-border">
					{FAQS.map((faq) => (
						<details key={faq.q} className="faq-item group">
							<summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-ink">
								{faq.q}
								<PlusIcon
									className="faq-icon size-5 shrink-0 text-primary-ink transition-transform duration-200"
									aria-hidden
								/>
							</summary>
							<p className="-mt-1 pb-5 leading-relaxed text-muted">{faq.a}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}

export function FinalCtaSection() {
	return (
		<section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
			<div className="reveal relative overflow-hidden rounded-xl border-[1.5px] border-ink bg-primary px-6 py-14 text-center shadow-[6px_6px_0_var(--color-ink)] sm:px-12 md:py-20">
				<h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-6xl">
					See your profile the way the next recruiter will
				</h2>
				<p className="mx-auto mt-5 max-w-xl text-lg text-ink/80">
					One username, one goal, about 30 seconds. Worst case, you spent half a
					minute and got a free second opinion.
				</p>
				<a
					href="#review"
					className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-ink bg-ink px-7 py-4 text-base font-semibold text-background shadow-[3px_3px_0_var(--color-background)] transition-transform active:translate-x-[3px] active:translate-y-[3px] active:shadow-none sm:w-auto"
				>
					Review my profile
					<ArrowRightIcon className="size-4" aria-hidden />
				</a>
				<p className="mt-4 flex items-center justify-center gap-2 text-sm text-ink/75">
					<CheckCircle2Icon className="size-4" aria-hidden />
					Free. No signup. Public profile only.
				</p>
			</div>
		</section>
	);
}

export function SiteFooter() {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
				<p className="font-display text-base font-semibold text-ink">
					Red<span className="text-primary-ink">line</span>
				</p>
				<p className="max-w-xl sm:text-right">
					Redline reviews public LinkedIn profiles against your career goal. Not
					affiliated with or endorsed by LinkedIn.
				</p>
			</div>
		</footer>
	);
}
