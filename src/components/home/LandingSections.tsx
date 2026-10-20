import type { LucideIcon } from "lucide-react";
import { RhaiLogo } from "#/components/RhaiLogo";
import { useLanguage } from "#/lib/i18n";
import {
	ArrowRightIcon,
	AwardIcon,
	BriefcaseIcon,
	Building2Icon,
	CheckIcon,
	CrosshairIcon,
	GaugeIcon,
	GraduationCapIcon,
	LightbulbIcon,
	ListChecksIcon,
	PenLineIcon,
	PlusIcon,
	ShieldCheckIcon,
	ShuffleIcon,
	SparklesIcon,
	TagIcon,
	WandSparklesIcon,
	ZapIcon,
} from "#/lib/icons";
import { planCopy } from "#/lib/plan-copy";
import {
	PAYMENT_METHOD_LABELS,
	PLANS,
	priceFor,
	REGION_CONFIG,
	REGIONS,
} from "#/lib/pricing";
import { useRegion } from "#/lib/use-region";

function SectionEyebrow({
	children,
	tone = "dark",
}: {
	children: React.ReactNode;
	tone?: "dark" | "light";
}) {
	return (
		<p
			className={`mb-5 inline-flex items-center gap-2 text-sm font-medium ${
				tone === "light" ? "text-night-muted" : "text-muted"
			}`}
		>
			<span className="size-1.5 rounded-full bg-primary" aria-hidden />
			{children}
		</p>
	);
}

const H2 =
	"font-display text-4xl leading-[1.06] font-normal text-balance sm:text-5xl";

function CtaLink({ label }: { label: string }) {
	return (
		<a
			href="#review"
			className="btn-primary inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold sm:w-auto"
		>
			{label}
			<ArrowRightIcon className="size-4" aria-hidden />
		</a>
	);
}

export function ProblemSection() {
	const { copy } = useLanguage();

	return (
		<section className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 md:grid-cols-[1.1fr_1fr] md:gap-20 md:py-32">
			<div className="reveal">
				<SectionEyebrow>{copy.problem.eyebrow}</SectionEyebrow>
				<h2 className={`${H2} text-ink`}>
					{copy.problem.titlePre}
					<em className="text-primary">{copy.problem.titleEm}</em>.
				</h2>
			</div>
			<div className="reveal space-y-6 text-lg leading-relaxed text-muted md:pt-12">
				<p>{copy.problem.p1}</p>
				<blockquote className="border-l-2 border-primary pl-5 font-display text-2xl leading-snug text-ink italic">
					{copy.problem.p2}
				</blockquote>
				<p>{copy.problem.p3}</p>
			</div>
		</section>
	);
}

export function HowItWorksSection() {
	const { copy } = useLanguage();

	return (
		<section id="how-it-works" className="border-t border-border bg-surface">
			<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
				<div className="reveal mb-14 max-w-2xl">
					<SectionEyebrow>{copy.howItWorks.eyebrow}</SectionEyebrow>
					<h2 className={`${H2} text-ink`}>{copy.howItWorks.title}</h2>
				</div>
				<ol className="grid gap-10 md:grid-cols-3 md:gap-8">
					{copy.howItWorks.steps.map((step, index) => (
						<li key={step.title} className="reveal border-t border-ink pt-6">
							<p className="font-display text-5xl leading-none text-primary">
								{String(index + 1).padStart(2, "0")}
							</p>
							<h3 className="mt-8 text-lg leading-snug font-semibold text-ink">
								{step.title}
							</h3>
							<p className="mt-2 leading-relaxed text-muted">{step.body}</p>
						</li>
					))}
				</ol>
			</div>
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
		<div className="reveal rounded-2xl bg-surface-2 p-6 sm:p-8">
			<p className="mb-6 font-display text-2xl text-ink">{label}</p>
			<ul className="divide-y divide-border">
				{items.map((item, index) => {
					const Icon = icons[index % icons.length];
					return (
						<li
							key={item.title}
							className="flex gap-4 py-4 first:pt-0 last:pb-0"
						>
							<span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-surface shadow-card">
								<Icon className="size-4 text-primary" aria-hidden />
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
		<section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
			<div className="reveal mb-14 max-w-2xl">
				<SectionEyebrow>{copy.valueStack.eyebrow}</SectionEyebrow>
				<h2 className={`${H2} text-ink`}>{copy.valueStack.title}</h2>
				<p className="mt-5 text-lg text-muted">{copy.valueStack.subtitle}</p>
			</div>
			<div className="grid gap-4 lg:grid-cols-2">
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
			<div className="reveal mt-4 flex flex-col items-start gap-5 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
				<p className="max-w-xl text-lg leading-relaxed text-ink">
					{copy.valueStack.banner}
				</p>
				<CtaLink label={copy.valueStack.cta} />
			</div>
		</section>
	);
}

const EXAMPLE_DOT_CLASSES = ["bg-opportunity", "bg-weakness", "bg-strength"];

export function ExampleSection() {
	const { copy } = useLanguage();

	return (
		<section
			id="example"
			className="relative overflow-hidden bg-night text-white"
		>
			<div
				className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[48rem] rounded-full bg-primary/25 blur-[120px]"
				aria-hidden
			/>
			<div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
				<div className="reveal mb-14 max-w-2xl">
					<SectionEyebrow tone="light">{copy.example.eyebrow}</SectionEyebrow>
					<h2 className={`${H2} text-white`}>{copy.example.title}</h2>
					<p className="mt-5 text-lg leading-relaxed text-night-muted">
						{copy.example.intro}
					</p>
				</div>

				<div className="reveal overflow-hidden rounded-2xl bg-surface text-ink shadow-lift">
					<div className="grid md:grid-cols-2">
						<div className="border-b border-border p-6 sm:p-8 md:border-r md:border-b-0">
							<p className="mb-3 text-xs font-semibold tracking-[0.12em] text-muted uppercase">
								{copy.example.before}
							</p>
							<p className="text-lg sm:text-xl">
								<span className="strike">{copy.example.beforeText}</span>
							</p>
						</div>
						<div className="bg-accent/40 p-6 sm:p-8">
							<p className="mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-[0.12em] text-primary uppercase">
								<WandSparklesIcon className="size-3.5" aria-hidden />
								{copy.example.after}
							</p>
							<p className="text-lg leading-snug font-semibold sm:text-xl">
								{copy.example.afterText}
							</p>
						</div>
					</div>
					<p className="border-t border-border px-6 py-5 leading-relaxed text-muted sm:px-8">
						{copy.example.explanation}
					</p>
				</div>

				<ul className="mt-4 grid gap-4 md:grid-cols-3">
					{copy.example.cards.map((card, index) => (
						<li
							key={card.label}
							className="reveal rounded-2xl border border-white/10 bg-night-2 p-6"
						>
							<p className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
								<span
									className={`size-2 rounded-full ${EXAMPLE_DOT_CLASSES[index % EXAMPLE_DOT_CLASSES.length]}`}
									aria-hidden
								/>
								{card.label}
							</p>
							<p className="leading-relaxed text-night-muted">{card.text}</p>
						</li>
					))}
				</ul>

				<a
					href="#review"
					className="mt-12 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-surface-2 sm:w-auto"
				>
					{copy.example.cta}
					<ArrowRightIcon className="size-4" aria-hidden />
				</a>
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
		<section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
			<div className="reveal mb-14 max-w-2xl">
				<SectionEyebrow>{copy.personas.eyebrow}</SectionEyebrow>
				<h2 className={`${H2} text-ink`}>
					{copy.personas.titlePre}
					<em className="text-primary">{copy.personas.titleEm}</em>
					{copy.personas.titlePost}
				</h2>
			</div>
			<ul className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
				{copy.personas.items.map((persona, index) => {
					const Icon = PERSONA_ICONS[index % PERSONA_ICONS.length];
					return (
						<li key={persona.title} className="reveal bg-surface p-6 sm:p-7">
							<Icon className="mb-8 size-6 text-primary" aria-hidden />
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

export function PricingSection() {
	const { copy, lang } = useLanguage();
	const [region, setRegion] = useRegion();
	const plans = planCopy[lang];

	return (
		<section
			id="pricing"
			className="scroll-mt-20 border-t border-border bg-surface"
		>
			<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
				<div className="reveal mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<SectionEyebrow>{copy.pricing.eyebrow}</SectionEyebrow>
						<h2 className={`${H2} text-ink`}>
							{copy.pricing.titlePre}
							<em className="text-primary">{copy.pricing.titleEm}</em>
						</h2>
						<p className="mt-5 text-lg text-muted">{copy.pricing.subtitle}</p>
					</div>
					<fieldset className="flex shrink-0 flex-wrap items-center gap-0.5 self-start rounded-full bg-surface-2 p-1 md:self-auto">
						<legend className="sr-only">{copy.pricing.regionLabel}</legend>
						{REGIONS.map((option) => (
							<button
								key={option}
								type="button"
								onClick={() => setRegion(option)}
								aria-pressed={region === option}
								className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
									region === option
										? "bg-surface text-ink shadow-card"
										: "text-muted hover:text-ink"
								}`}
							>
								{REGION_CONFIG[option].label}
							</button>
						))}
					</fieldset>
				</div>

				<div className="grid gap-4 lg:grid-cols-[1fr_1.25fr_1.25fr]">
					<div className="reveal flex flex-col rounded-2xl bg-surface-2 p-7">
						<h3 className="text-lg font-semibold text-ink">
							{copy.pricing.free.name}
						</h3>
						<p className="mt-1 min-h-10 text-sm text-muted">
							{copy.pricing.free.tagline}
						</p>
						<p className="mt-6 font-display text-5xl leading-none text-ink">
							{priceFor(region, "report").replace(/[\d.,]+/, "0")}
						</p>
						<ul className="mt-7 flex-1 space-y-3 border-t border-border-strong/40 pt-6">
							{copy.pricing.free.features.map((feature) => (
								<li
									key={feature}
									className="flex items-start gap-2.5 text-sm text-ink"
								>
									<CheckIcon
										className="mt-0.5 size-4 shrink-0 text-muted"
										aria-hidden
									/>
									{feature}
								</li>
							))}
						</ul>
						<a
							href="#review"
							className="btn-secondary mt-8 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold"
						>
							{copy.header.cta}
						</a>
					</div>

					{PLANS.map((plan) => {
						const card = plans[plan];
						const featured = plan === "pass30";
						return (
							<div
								key={plan}
								className={`reveal relative flex flex-col rounded-2xl p-7 ${
									featured
										? "bg-night text-white shadow-lift"
										: "border border-border bg-surface shadow-card"
								}`}
							>
								<div className="flex items-start justify-between gap-3">
									<div>
										<h3 className="text-lg font-semibold">{card.name}</h3>
										<p
											className={`mt-1 min-h-10 text-sm ${featured ? "text-night-muted" : "text-muted"}`}
										>
											{card.tagline}
										</p>
									</div>
									{card.badge ? (
										<span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
											{card.badge}
										</span>
									) : null}
								</div>
								<p className="mt-6 flex items-baseline gap-2">
									<span className="font-display text-5xl leading-none whitespace-nowrap">
										{priceFor(region, plan)}
									</span>
									<span
										className={`text-sm ${featured ? "text-night-muted" : "text-muted"}`}
									>
										{card.period}
									</span>
								</p>
								<ul
									className={`mt-7 flex-1 space-y-3 border-t pt-6 ${featured ? "border-white/10" : "border-border"}`}
								>
									{card.features.map((feature) => (
										<li
											key={feature}
											className="flex items-start gap-2.5 text-sm"
										>
											<CheckIcon
												className={`mt-0.5 size-4 shrink-0 ${featured ? "text-[#70b5f9]" : "text-primary"}`}
												aria-hidden
											/>
											{feature}
										</li>
									))}
								</ul>
								<a
									href="#review"
									className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
										featured
											? "bg-white text-ink hover:bg-surface-2"
											: "btn-primary"
									}`}
								>
									{copy.pricing.cta}
									<ArrowRightIcon className="size-4" aria-hidden />
								</a>
							</div>
						);
					})}
				</div>

				<div className="mt-6 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
					<span className="inline-flex items-center gap-1.5">
						<ShieldCheckIcon className="size-4 text-primary" aria-hidden />
						{copy.pricing.guarantee}
					</span>
					<span>{copy.pricing.note}</span>
					<span>
						{REGION_CONFIG[region].methods
							.map((method) => PAYMENT_METHOD_LABELS[method])
							.join(" · ")}
					</span>
				</div>
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
		<section className="border-t border-border">
			<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
				<div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
					<div className="max-w-2xl">
						<SectionEyebrow>{copy.teams.eyebrow}</SectionEyebrow>
						<h2 className={`${H2} text-ink`}>{copy.teams.title}</h2>
					</div>
					<a
						href={`mailto:${copy.teams.email}`}
						className="btn-secondary inline-flex shrink-0 items-center gap-2 self-start px-5 py-3 text-sm font-semibold md:self-auto"
					>
						{copy.teams.cta}
						<ArrowRightIcon className="size-4" aria-hidden />
					</a>
				</div>
				<div className="mt-12 grid gap-4 md:grid-cols-3">
					{copy.teams.items.map((item, index) => {
						const Icon = TEAM_ICONS[index] ?? BriefcaseIcon;
						return (
							<div
								key={item.title}
								className="reveal rounded-2xl bg-surface-2 p-7"
							>
								<span className="flex size-10 items-center justify-center rounded-full bg-surface shadow-card">
									<Icon className="size-5 text-primary" aria-hidden />
								</span>
								<h3 className="mt-6 text-lg font-semibold text-ink">
									{item.title}
								</h3>
								<p className="mt-2 text-[15px] leading-relaxed text-muted">
									{item.body}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export function FaqSection() {
	const { copy } = useLanguage();

	return (
		<section
			id="faq"
			className="scroll-mt-20 border-t border-border bg-surface"
		>
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-16 md:py-32">
				<div className="reveal">
					<SectionEyebrow>{copy.faq.eyebrow}</SectionEyebrow>
					<h2 className={`${H2} text-ink`}>{copy.faq.title}</h2>
				</div>
				<div className="reveal divide-y divide-border border-y border-border">
					{copy.faq.items.map((faq) => (
						<details key={faq.q} className="faq-item group">
							<summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-left text-lg font-medium text-ink">
								{faq.q}
								<span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2">
									<PlusIcon
										className="faq-icon size-4 text-ink transition-transform duration-200"
										aria-hidden
									/>
								</span>
							</summary>
							<p className="-mt-1 max-w-2xl pb-6 leading-relaxed text-muted">
								{faq.a}
							</p>
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
		<section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
			<div className="reveal relative overflow-hidden rounded-3xl bg-night px-6 py-16 text-center text-white sm:px-12 md:py-24">
				<div
					className="pointer-events-none absolute -bottom-48 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-primary/35 blur-[120px]"
					aria-hidden
				/>
				<div className="relative">
					<h2 className="mx-auto max-w-3xl font-display text-4xl leading-[1.06] text-balance sm:text-6xl">
						{copy.finalCta.title}
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-lg text-night-muted">
						{copy.finalCta.body}
					</p>
					<a
						href="#review"
						className="mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-semibold text-ink transition-colors hover:bg-surface-2 sm:w-auto"
					>
						{copy.finalCta.cta}
						<ArrowRightIcon className="size-4" aria-hidden />
					</a>
					<p className="mt-5 text-sm text-night-muted">
						{copy.finalCta.footnote}
					</p>
				</div>
			</div>
		</section>
	);
}

export function SiteFooter() {
	const { copy } = useLanguage();
	const productLinks = [
		{ href: "#how-it-works", label: copy.header.howItWorks },
		{ href: "#example", label: copy.header.example },
		{ href: "#pricing", label: copy.header.pricing },
		{ href: "#faq", label: copy.header.faq },
	];

	return (
		<footer className="border-t border-border">
			<div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
				<div className="max-w-sm">
					<RhaiLogo />
					<p className="mt-4 text-sm leading-relaxed text-muted">
						{copy.footer.tagline}
					</p>
				</div>
				<div>
					<p className="text-sm font-semibold text-ink">
						{copy.footer.product}
					</p>
					<ul className="mt-4 space-y-2.5 text-sm text-muted">
						{productLinks.map((link) => (
							<li key={link.href}>
								<a href={link.href} className="hover:text-ink">
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="text-sm font-semibold text-ink">
						{copy.footer.contact}
					</p>
					<ul className="mt-4 space-y-2.5 text-sm text-muted">
						<li>
							<a href={`mailto:${copy.teams.email}`} className="hover:text-ink">
								{copy.teams.email}
							</a>
						</li>
						<li>
							<a href={`mailto:${copy.teams.email}`} className="hover:text-ink">
								{copy.teams.eyebrow}
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-border">
				<div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
					<p>
						© {new Date().getFullYear()} RHAI. {copy.footer.rights}
					</p>
					<p>
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
