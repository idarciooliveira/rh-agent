import type { GoalAlignment, SwotItem } from "#/lib/analysis-schema";
import { TargetIcon } from "#/lib/icons";

type ScorecardPanelProps = {
	goalAlignment: GoalAlignment;
	swot: {
		strengths: SwotItem[];
		weaknesses: SwotItem[];
		opportunities: SwotItem[];
		threats: SwotItem[];
	};
};

type Tone = "good" | "mixed" | "poor";

const TONE_CHIP: Record<Tone, string> = {
	good: "bg-strength-tint text-strength",
	mixed: "bg-weakness-tint text-weakness",
	poor: "bg-threat-tint text-threat",
};

const TONE_DOT: Record<Tone, string> = {
	good: "bg-strength",
	mixed: "bg-weakness",
	poor: "bg-threat",
};

function Dots({
	filled,
	total,
	tone,
}: {
	filled: number;
	total: number;
	tone: Tone;
}) {
	return (
		<span className="flex gap-1" aria-hidden>
			{Array.from({ length: total }, (_, index) => (
				<span
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length scale
					key={index}
					className={`size-2.5 rounded-full ${index < filled ? TONE_DOT[tone] : "bg-surface-2"}`}
				/>
			))}
		</span>
	);
}

/** Hiring-style scorecard: one row per criterion, a dot scale and a verdict chip. */
export function ScorecardPanel({ goalAlignment, swot }: ScorecardPanelProps) {
	const ratio =
		goalAlignment.maxScore > 0
			? goalAlignment.score / goalAlignment.maxScore
			: 0;
	const fitTone: Tone = ratio >= 0.7 ? "good" : ratio >= 0.5 ? "mixed" : "poor";
	const gaps = swot.weaknesses.length + swot.threats.length;
	const rows: {
		label: string;
		detail: string;
		filled: number;
		total: number;
		tone: Tone;
		verdict: string;
	}[] = [
		{
			label: "Goal alignment",
			detail: `${Math.round(goalAlignment.score)} of ${goalAlignment.maxScore}`,
			filled: Math.round(ratio * 5),
			total: 5,
			tone: fitTone,
			verdict:
				fitTone === "good"
					? "Strong fit"
					: fitTone === "mixed"
						? "Partial fit"
						: "Weak fit",
		},
		{
			label: "Strengths to keep",
			detail: `${swot.strengths.length} found`,
			filled: Math.min(5, swot.strengths.length),
			total: 5,
			tone: swot.strengths.length >= 3 ? "good" : "mixed",
			verdict: swot.strengths.length >= 3 ? "Solid base" : "Thin",
		},
		{
			label: "Gaps to close",
			detail: `${gaps} found`,
			filled: Math.min(5, gaps),
			total: 5,
			tone: gaps <= 3 ? "mixed" : "poor",
			verdict: gaps <= 3 ? "Fixable" : "Needs work",
		},
		{
			label: "Openings to use",
			detail: `${swot.opportunities.length} found`,
			filled: Math.min(5, swot.opportunities.length),
			total: 5,
			tone: "good",
			verdict: "Upside",
		},
	];

	return (
		<section className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-7">
			<div className="flex items-start justify-between gap-4">
				<div>
					<h2 className="font-display text-xl font-bold text-ink">Scorecard</h2>
					<p className="mt-1 text-sm text-muted">
						How a recruiter for this role would rate the profile today.
					</p>
				</div>
				<span className="flex size-10 items-center justify-center rounded-full bg-accent">
					<TargetIcon className="size-5 text-primary" aria-hidden />
				</span>
			</div>

			<dl className="mt-5 divide-y divide-border border-y border-border">
				{rows.map((row) => (
					<div
						key={row.label}
						className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5 py-3.5 sm:grid-cols-[minmax(0,1fr)_auto_7rem]"
					>
						<dt className="min-w-0">
							<p className="text-[15px] font-semibold text-ink">{row.label}</p>
							<p className="text-xs text-muted">{row.detail}</p>
						</dt>
						<dd className="hidden sm:block">
							<Dots filled={row.filled} total={row.total} tone={row.tone} />
						</dd>
						<dd className="justify-self-end">
							<span
								className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${TONE_CHIP[row.tone]}`}
							>
								{row.verdict}
							</span>
						</dd>
					</div>
				))}
			</dl>

			<p className="mt-5 text-[15px] leading-relaxed text-ink">
				{goalAlignment.summary}
			</p>
		</section>
	);
}
