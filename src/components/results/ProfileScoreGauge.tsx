import type { CSSProperties } from "react";

type ProfileScoreGaugeProps = {
	score: number;
};

export function ProfileScoreGauge({ score }: ProfileScoreGaugeProps) {
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
						className="ring-animate stroke-primary"
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
			</div>
		</section>
	);
}
