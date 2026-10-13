import type { CSSProperties } from "react";

type ProfileScoreGaugeProps = {
	score: number;
	/** Score from the last review of the same profile, if any. */
	previousScore?: number | null;
};

export function ProfileScoreGauge({
	score,
	previousScore = null,
}: ProfileScoreGaugeProps) {
	const radius = 54;
	const circumference = 2 * Math.PI * radius;
	const clamped = Math.max(0, Math.min(100, Math.round(score)));
	const offset = circumference - (clamped / 100) * circumference;

	return (
		<section className="flex items-center gap-5 rounded-lg border border-border bg-surface p-5 shadow-card sm:p-6 md:flex-col md:items-start">
			<div className="relative size-28 shrink-0 sm:size-32">
				<svg
					className="size-full -rotate-90"
					viewBox="0 0 120 120"
					role="img"
					aria-label={`Profile score ${clamped} out of 100`}
					suppressHydrationWarning
				>
					<circle
						cx="60"
						cy="60"
						r={radius}
						fill="none"
						className="stroke-surface-2"
						strokeWidth="10"
					/>
					<circle
						cx="60"
						cy="60"
						r={radius}
						fill="none"
						className="ring-animate stroke-primary [filter:drop-shadow(0_0_6px_rgb(110_118_255/0.7))]"
						strokeWidth="10"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						style={{ "--ring-length": circumference } as CSSProperties}
					/>
				</svg>
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span
						className="count-up font-mono text-4xl font-medium text-ink"
						style={{ "--target": clamped } as CSSProperties}
						aria-hidden
					/>
					<span className="font-mono text-xs text-muted" aria-hidden>
						/100
					</span>
				</div>
			</div>
			<div className="min-w-0">
				<h2 className="font-display text-xl font-semibold text-ink">
					Profile score
				</h2>
				<p className="mt-1 text-sm leading-relaxed text-muted">
					How strong your profile is for this goal, out of 100.
				</p>
				{previousScore !== null ? (
					<ScoreDelta previous={previousScore} current={clamped} />
				) : null}
			</div>
		</section>
	);
}

function ScoreDelta({
	previous,
	current,
}: {
	previous: number;
	current: number;
}) {
	const delta = current - Math.round(previous);
	const tone =
		delta > 0
			? "border-strength-border bg-strength-tint text-strength"
			: delta < 0
				? "border-threat-border bg-threat-tint text-threat"
				: "border-border bg-surface-2 text-muted";

	return (
		<p
			className={`mt-3 inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-xs font-semibold ${tone}`}
		>
			{Math.round(previous)} → {current}
			<span>
				({delta > 0 ? "+" : ""}
				{delta} since last review)
			</span>
		</p>
	);
}
