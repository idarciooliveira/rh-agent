import type { LucideIcon } from "lucide-react";
import { useLanguage } from "#/lib/i18n";
import {
	ArrowRightIcon,
	AwardIcon,
	BriefcaseIcon,
	Building2Icon,
	CheckCircle2Icon,
	CheckIcon,
	CrosshairIcon,
	GaugeIcon,
	GraduationCapIcon,
	LightbulbIcon,
	ListChecksIcon,
	PenLineIcon,
	PlusIcon,
	ScanSearchIcon,
	ShieldCheckIcon,
	ShuffleIcon,
	SparklesIcon,
	TagIcon,
	UsersIcon,
	WandSparklesIcon,
	ZapIcon,
} from "#/lib/icons";
import { planCopy } from "#/lib/plan-copy";
import {
	PAYMENT_METHOD_LABELS,
	type Plan,
	priceFor,
	REGION_CONFIG,
	REGIONS,
} from "#/lib/pricing";
import { useRegion } from "#/lib/use-region";

function SectionEyebrow({ children }: { children: React.ReactNode }) {
	return (
		<p className="mb-4 font-mono text-xs font-medium tracking-[0.14em] text-primary-ink uppercase">
			{children}
		</p>
	);
}

function CtaLink({ label }: { label: string }) {
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
	const { copy } = useLanguage();

	return (
		<section className="border-y border-border bg-surface">
			<div className="reveal mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-28">
				<div>
					<SectionEyebrow>{copy.problem.eyebrow}</SectionEyebrow>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
						{copy.problem.titlePre}
						<em className="text-primary-ink">{copy.problem.titleEm}</em>.
					</h2>
				</div>
				<div className="space-y-5 text-lg leading-relaxed text-muted">
					<p>{copy.problem.p1}</p>
					<p className="font-display text-2xl font-medium text-ink italic">
						{copy.problem.p2}
					</p>
					<p>{copy.problem.p3}</p>
				</div>
			</div>
		</section>
	);
}

const STEP_ICONS = [CrosshairIcon, ScanSearchIcon, PenLineIcon];

export function HowItWorksSection() {
	const { copy } = useLanguage();

	return (
		<section
			id="how-it-works"
			className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28"
		>
			<div className="reveal mb-12 max-w-2xl">
				<SectionEyebrow>{copy.howItWorks.eyebrow}</SectionEyebrow>
				<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
					{copy.howItWorks.title}
				</h2>
			</div>
			<ol className="grid gap-5 md:grid-cols-3">
				{copy.howItWorks.steps.map((step, index) => {
					const Icon = STEP_ICONS[index % STEP_ICONS.length];
					return (
						<li
							key={step.title}
							className="reveal relative rounded-lg border border-border bg-surface p-6 shadow-card"
						>
							<div className="mb-6 flex items-center justify-between">
								<span className="flex size-11 items-center justify-center rounded-full bg-accent">
									<Icon className="size-5 text-primary" aria-hidden />
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

const DIAGNOSIS_ICONS = [
	GaugeIcon,
	CrosshairIcon,
	LightbulbIcon,
	ListChecksIcon,
	ZapIcon,
];

const REWRITE_ICONS = [
	AwardIcon,
	PenLineIcon,
	BriefcaseIcon,
	TagIcon,
	SparklesIcon,
];

type ValueItem = { title: string; body: string };

function ValueList({
	label,
	items,
	icons,
}: {
	label: string;
	items: ValueItem[];
	icons: LucideIcon[];
}) {
	return (
		<div className="reveal rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
			<p className="mb-6 font-display text-2xl font-semibold text-ink">
				{label}
			</p>
			<ul className="space-y-5">
				{items.map((item, index) => {
					const Icon = icons[index % icons.length];
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
	const { copy } = useLanguage();

	return (
		<section className="border-y border-border bg-surface-2/60">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
				<div className="reveal mb-12 max-w-2xl">
					<SectionEyebrow>{copy.valueStack.eyebrow}</SectionEyebrow>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
						{copy.valueStack.titlePre}
						<span className="highlight">{copy.valueStack.titleHighlight}</span>
					</h2>
					<p className="mt-5 text-lg text-muted">{copy.valueStack.subtitle}</p>
				</div>
				<div className="grid gap-5 lg:grid-cols-2">
					<ValueList
						label={copy.valueStack.diagnosisLabel}
						items={copy.valueStack.diagnosis}
						icons={DIAGNOSIS_ICONS}
					/>
					<ValueList
						label={copy.valueStack.rewritesLabel}
						items={copy.valueStack.rewrites}
						icons={REWRITE_ICONS}
					/>
				</div>
				<div className="reveal mt-10 flex flex-col items-start gap-5 rounded-lg border border-primary/30 bg-surface-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
					<p className="max-w-xl text-lg text-ink">{copy.valueStack.banner}</p>
					<CtaLink label={copy.valueStack.cta} />
				</div>
			</div>
		</section>
	);
}

const EXAMPLE_CARD_CLASSES = [
	"border-opportunity-border/40 text-opportunity-tint",
	"border-weakness-border/40 text-weakness-tint",
	"border-strength-border/40 text-strength-tint",
];

export function ExampleSection() {
	const { copy } = useLanguage();

	return (
		<section id="example" className="border-y border-border bg-night text-ink">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
				<div className="reveal mb-12 max-w-2xl">
					<p className="mb-4 font-mono text-xs font-medium tracking-[0.14em] text-[#71b7fb] uppercase">
						{copy.example.eyebrow}
					</p>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl">
						{copy.example.title}
					</h2>
					<p className="mt-5 text-lg leading-relaxed text-night-muted">
						{copy.example.intro}
					</p>
				</div>

				<div className="reveal rounded-xl border border-border bg-surface p-5 text-ink sm:p-8">
					<div className="grid gap-6 md:grid-cols-2 md:gap-8">
						<div>
							<p className="mb-2 font-mono text-xs tracking-wide text-muted uppercase">
								{copy.example.before}
							</p>
							<p className="text-lg sm:text-xl">
								<span className="strike">{copy.example.beforeText}</span>
							</p>
						</div>
						<div>
							<p className="mb-2 flex items-center gap-1.5 font-mono text-xs tracking-wide text-primary-ink uppercase">
								<WandSparklesIcon className="size-3.5" aria-hidden />
								{copy.example.after}
							</p>
							<p className="text-lg leading-snug font-semibold sm:text-xl">
								{copy.example.afterText}
							</p>
						</div>
					</div>
					<p className="mt-6 border-t border-border pt-5 leading-relaxed text-muted">
						{copy.example.explanation}
					</p>
				</div>

				<ul className="mt-5 grid gap-5 md:grid-cols-3">
					{copy.example.cards.map((card, index) => (
						<li
							key={card.label}
							className={`reveal rounded-lg border bg-night-2 p-5 ${EXAMPLE_CARD_CLASSES[index % EXAMPLE_CARD_CLASSES.length]}`}
						>
							<p className="mb-2 font-mono text-xs tracking-wide uppercase">
								{card.label}
							</p>
							<p className="leading-relaxed text-ink/90">{card.text}</p>
						</li>
					))}
				</ul>

				<div className="mt-10">
					<CtaLink label={copy.example.cta} />
				</div>
			</div>
		</section>
	);
}

const PERSONA_ICONS = [
	BriefcaseIcon,
	ShuffleIcon,
	GraduationCapIcon,
	AwardIcon,
];

export function PersonasSection() {
	const { copy } = useLanguage();

	return (
		<section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
			<div className="reveal mb-12 max-w-2xl">
				<SectionEyebrow>{copy.personas.eyebrow}</SectionEyebrow>
				<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
					{copy.personas.titlePre}
					<em className="text-primary-ink">{copy.personas.titleEm}</em>
					{copy.personas.titlePost}
				</h2>
			</div>
			<ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{copy.personas.items.map((persona, index) => {
					const Icon = PERSONA_ICONS[index % PERSONA_ICONS.length];
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

type PriceCard = {
	key: string;
	name: string;
	tagline: string;
	price: string;
	period: string;
	features: string[];
	badge?: string;
	featured?: boolean;
};

export function PricingSection() {
	const { copy, lang } = useLanguage();
	const [region, setRegion] = useRegion();
	const plans = planCopy[lang];
	const paidCard = (
		plan: Plan,
		period: string,
		featured = false,
	): PriceCard => ({
		key: plan,
		...plans[plan],
		price: priceFor(region, plan),
		period,
		featured,
	});
	const cards: PriceCard[] = [
		{
			key: "free",
			...copy.pricing.free,
			price: priceFor(region, "report").replace(/[\d.,]+/, "0"),
			period: "",
		},
		paidCard("report", copy.pricing.perReview),
		paidCard("pass30", copy.pricing.perPass, true),
		paidCard("pack3", copy.pricing.perReview),
	];
	const humanReview = plans.human_review;

	return (
		<section id="pricing" className="scroll-mt-20 border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
				<div className="reveal mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<SectionEyebrow>{copy.pricing.eyebrow}</SectionEyebrow>
						<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
							{copy.pricing.titlePre}
							<span className="highlight">{copy.pricing.titleHighlight}</span>
						</h2>
						<p className="mt-5 text-lg text-muted">{copy.pricing.subtitle}</p>
					</div>
					<fieldset className="flex shrink-0 flex-wrap items-center gap-1 rounded-full border border-border bg-surface p-1">
						<legend className="sr-only">{copy.pricing.regionLabel}</legend>
						{REGIONS.map((option) => (
							<button
								key={option}
								type="button"
								onClick={() => setRegion(option)}
								aria-pressed={region === option}
								className={`rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
									region === option
										? "bg-primary text-primary-foreground"
										: "text-muted hover:text-ink"
								}`}
							>
								{REGION_CONFIG[option].label}
							</button>
						))}
					</fieldset>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{cards.map((card) => (
						<div
							key={card.key}
							className={`reveal relative flex flex-col rounded-xl border p-6 ${
								card.featured
									? "border-primary bg-night text-ink shadow-lift"
									: "border-border bg-surface shadow-card"
							}`}
						>
							{card.badge ? (
								<span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-white">
									{card.badge}
								</span>
							) : null}
							<h3
								className={`text-lg font-semibold ${card.featured ? "text-ink" : "text-ink"}`}
							>
								{card.name}
							</h3>
							<p
								className={`mt-1 text-sm ${card.featured ? "text-night-muted" : "text-muted"}`}
							>
								{card.tagline}
							</p>
							<p className="mt-5 font-mono text-3xl font-medium">
								<span className="whitespace-nowrap">{card.price}</span>
								{card.period ? (
									<span
										className={`ml-1.5 font-sans text-sm font-normal ${card.featured ? "text-night-muted" : "text-muted"}`}
									>
										{card.period}
									</span>
								) : null}
							</p>
							<ul className="mt-5 flex-1 space-y-2">
								{card.features.map((feature) => (
									<li key={feature} className="flex items-start gap-2 text-sm">
										<CheckIcon
											className={`mt-0.5 size-4 shrink-0 ${card.featured ? "text-primary-ink" : "text-strength"}`}
											aria-hidden
										/>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="reveal mt-4 flex flex-col gap-4 rounded-xl border border-dashed border-border-strong bg-surface-2/60 p-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-start gap-3">
						<UsersIcon
							className="mt-0.5 size-5 shrink-0 text-primary-ink"
							aria-hidden
						/>
						<div>
							<p className="font-semibold text-ink">
								<span className="mr-2 rounded-sm bg-accent px-1.5 py-0.5 font-mono text-xs text-primary-ink uppercase">
									{copy.pricing.addOn}
								</span>
								{humanReview.name}, {priceFor(region, "human_review")}
							</p>
							<p className="mt-1 text-sm text-muted">
								{humanReview.features.join(". ")}.
							</p>
						</div>
					</div>
					<CtaLink label={copy.pricing.cta} />
				</div>

				<p className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
					<span className="inline-flex items-center gap-1.5">
						<ShieldCheckIcon className="size-4 text-strength" aria-hidden />
						{copy.pricing.guarantee}
					</span>
					<span>
						{REGION_CONFIG[region].methods
							.map((method) => PAYMENT_METHOD_LABELS[method])
							.join(", ")}
					</span>
				</p>
			</div>
		</section>
	);
}

const TEAM_ICONS: LucideIcon[] = [
	GraduationCapIcon,
	Building2Icon,
	BriefcaseIcon,
];

export function TeamsSection() {
	const { copy } = useLanguage();

	return (
		<section className="border-y border-border bg-night text-ink">
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
				<div className="reveal max-w-2xl">
					<p className="mb-4 font-mono text-xs font-medium tracking-[0.14em] text-primary-ink uppercase">
						{copy.teams.eyebrow}
					</p>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
						{copy.teams.title}
					</h2>
				</div>
				<div className="mt-10 grid gap-4 md:grid-cols-3">
					{copy.teams.items.map((item, index) => {
						const Icon = TEAM_ICONS[index] ?? BriefcaseIcon;
						return (
							<div
								key={item.title}
								className="reveal rounded-xl border border-white/10 bg-night-2 p-6"
							>
								<Icon className="size-6 text-primary-ink" aria-hidden />
								<h3 className="mt-4 text-lg font-semibold text-ink">
									{item.title}
								</h3>
								<p className="mt-2 text-sm leading-relaxed text-night-muted">
									{item.body}
								</p>
							</div>
						);
					})}
				</div>
				<a
					href={`mailto:${copy.teams.email}`}
					className="mt-8 inline-flex items-center gap-2 btn-primary rounded-full px-6 py-3 text-sm font-semibold"
				>
					{copy.teams.cta}
					<ArrowRightIcon className="size-4" aria-hidden />
				</a>
			</div>
		</section>
	);
}

export function FaqSection() {
	const { copy } = useLanguage();

	return (
		<section className="border-t border-border bg-surface">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-16 md:py-28">
				<div className="reveal">
					<SectionEyebrow>{copy.faq.eyebrow}</SectionEyebrow>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-ink sm:text-5xl">
						{copy.faq.title}
					</h2>
				</div>
				<div className="reveal divide-y divide-border border-y border-border">
					{copy.faq.items.map((faq) => (
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
	const { copy } = useLanguage();

	return (
		<section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
			<div className="reveal relative overflow-hidden rounded-xl bg-primary px-6 py-14 text-center text-white shadow-lift sm:px-12 md:py-20">
				<h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.05] font-semibold text-balance text-white sm:text-6xl">
					{copy.finalCta.title}
				</h2>
				<p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
					{copy.finalCta.body}
				</p>
				<a
					href="#review"
					className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-primary transition-colors hover:bg-accent sm:w-auto"
				>
					{copy.finalCta.cta}
					<ArrowRightIcon className="size-4" aria-hidden />
				</a>
				<p className="mt-4 flex items-center justify-center gap-2 text-sm text-white/80">
					<CheckCircle2Icon className="size-4" aria-hidden />
					{copy.finalCta.footnote}
				</p>
			</div>
		</section>
	);
}

export function SiteFooter() {
	const { copy } = useLanguage();

	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
				<p className="font-display text-base font-semibold text-ink">
					Red<span className="text-primary">line</span>
				</p>
				<div className="max-w-xl space-y-1 sm:text-right">
					<p>{copy.footer.tagline}</p>
					<p className="text-xs">
						{copy.footer.photoCreditPre}
						<a
							href="https://commons.wikimedia.org/wiki/File:Luanda_Skyline_-_Angola_2015_(cropped).jpg"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-ink"
						>
							Luanda Skyline
						</a>
						, David Stanley,{" "}
						<a
							href="https://creativecommons.org/licenses/by/2.0/"
							target="_blank"
							rel="noopener noreferrer"
							className="underline hover:text-ink"
						>
							CC BY 2.0
						</a>
						{copy.footer.photoCreditPost}
					</p>
				</div>
			</div>
		</footer>
	);
}
