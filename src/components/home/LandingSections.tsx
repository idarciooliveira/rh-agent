import type { LucideIcon } from "lucide-react";
import { useLanguage } from "#/lib/i18n";
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
		<section id="example" className="bg-night text-background">
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

				<div className="reveal rounded-xl bg-background p-5 text-ink sm:p-8">
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
							<p className="leading-relaxed text-background/90">{card.text}</p>
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
