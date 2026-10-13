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
	const clamped = Math.max(0, Math.min(100, Math.round(score)));

	return (
		<section className="border-t-2 border-ink pt-4">
			<p className="kicker text-ink">Profile score</p>
			<p className="mt-6 font-display text-[6.5rem] leading-[0.8] text-ink">
				<span
					className="count-up"
					style={{ "--target": clamped } as CSSProperties}
					aria-hidden
				/>
				<span className="ml-1 text-3xl text-muted" aria-hidden>
					/100
				</span>
				<span className="sr-only">Profile score {clamped} out of 100</span>
			</p>

			<div className="mt-8" aria-hidden>
				<div className="relative h-2 bg-surface-2">
					<div
						className="bar-animate absolute inset-y-0 left-0 bg-ink"
						style={{ width: `${clamped}%` }}
					/>
					<div
						className="absolute -top-1.5 -bottom-1.5 w-0.5 bg-pen"
						style={{ left: `calc(${clamped}% - 1px)` }}
					/>
				</div>
				<div className="mt-2 flex justify-between font-mono text-[10px] text-muted">
					{[0, 25, 50, 75, 100].map((tick) => (
						<span key={tick}>{tick}</span>
					))}
				</div>
			</div>

			<p className="mt-5 text-sm leading-relaxed text-muted">
				How strong your profile is for this goal, out of 100.
			</p>
			{previousScore !== null ? (
				<ScoreDelta previous={previousScore} current={clamped} />
			) : null}
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
