type ProfileScoreGaugeProps = {
	score: number;
};

export function ProfileScoreGauge({ score }: ProfileScoreGaugeProps) {
	const radius = 54;
	const circumference = 2 * Math.PI * radius;
	const progress = (score / 100) * circumference;
	const offset = circumference - progress;

	return (
		<div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 shadow-sm">
			<div className="relative size-36">
				<svg
					className="size-full -rotate-90"
					viewBox="0 0 120 120"
					role="img"
					aria-label={`Profile score ${score} out of 100`}
					suppressHydrationWarning
				>
					<circle
						cx="60"
						cy="60"
						r={radius}
						fill="none"
						stroke="#e5e7eb"
						strokeWidth="10"
					/>
					<circle
						cx="60"
						cy="60"
						r={radius}
						fill="none"
						stroke="#f97316"
						strokeWidth="10"
						strokeLinecap="round"
						strokeDasharray={circumference}
						strokeDashoffset={offset}
					/>
				</svg>
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="text-4xl font-bold text-text">{score}</span>
				</div>
			</div>
			<p className="mt-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
				Profile Score
			</p>
		</div>
	);
}
