const SCORE = 58;
const RING_RADIUS = 26;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

const SWOT_CHIPS = [
	{
		letter: "S",
		text: "Built tooling 40 drivers use daily",
		className: "bg-strength-tint text-strength border-strength-border",
	},
	{
		letter: "W",
		text: "No product language yet",
		className: "bg-weakness-tint text-weakness border-weakness-border",
	},
	{
		letter: "O",
		text: "SQL + process design fit APM roles",
		className: "bg-opportunity-tint text-opportunity border-opportunity-border",
	},
	{
		letter: "T",
		text: "Title reads as ops, not product",
		className: "bg-threat-tint text-threat border-threat-border",
	},
];

export function HeroPreviewCard() {
	return (
		<div className="relative mx-auto w-full max-w-md lg:max-w-none">
			<div
				aria-hidden
				className="absolute -inset-3 -z-10 rotate-2 rounded-xl border border-border bg-surface-2"
			/>
			<figure className="float-card rounded-xl border border-border bg-surface p-5 shadow-lift sm:p-6">
				<figcaption className="mb-4 flex items-center justify-between gap-3">
					<span className="rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide text-background uppercase">
						Example review
					</span>
					<span className="truncate text-xs text-muted">
						Maya O. · goal: associate PM
					</span>
				</figcaption>

				<div className="flex items-center gap-4 border-b border-border pb-4">
					<div className="relative size-16 shrink-0">
						<svg
							viewBox="0 0 64 64"
							className="size-full -rotate-90"
							aria-hidden
							suppressHydrationWarning
						>
							<title>Profile score</title>
							<circle
								cx="32"
								cy="32"
								r={RING_RADIUS}
								fill="none"
								stroke="var(--color-surface-2)"
								strokeWidth="6"
							/>
							<circle
								className="ring-animate"
								cx="32"
								cy="32"
								r={RING_RADIUS}
								fill="none"
								stroke="var(--color-primary)"
								strokeWidth="6"
								strokeLinecap="round"
								strokeDasharray={RING_LENGTH}
								strokeDashoffset={RING_LENGTH * (1 - SCORE / 100)}
								style={{ "--ring-length": RING_LENGTH } as React.CSSProperties}
							/>
						</svg>
						<span
							className="count-up absolute inset-0 flex items-center justify-center font-mono text-lg font-medium text-ink"
							style={{ "--target": SCORE } as React.CSSProperties}
						>
							<span className="sr-only">{SCORE}</span>
						</span>
					</div>
					<div>
						<p className="text-sm font-semibold text-ink">Profile score</p>
						<p className="text-sm text-muted">
							Goal alignment <span className="font-mono text-ink">5/10</span>
						</p>
					</div>
				</div>

				<ul className="grid gap-2 py-4">
					{SWOT_CHIPS.map((chip, index) => (
						<li
							key={chip.letter}
							className={`animate-rise flex items-center gap-2.5 rounded-sm border px-2.5 py-1.5 text-sm ${chip.className}`}
							style={{ "--i": index + 4 } as React.CSSProperties}
						>
							<span className="font-display text-base font-semibold">
								{chip.letter}
							</span>
							<span className="truncate">{chip.text}</span>
						</li>
					))}
				</ul>

				<div className="rounded-md bg-background p-3.5">
					<p className="mb-1.5 font-mono text-[11px] tracking-wide text-muted uppercase">
						Headline
					</p>
					<p className="text-sm">
						<span className="strike strike-animate">
							Operations Coordinator at Brightline Logistics
						</span>
					</p>
					<p className="animate-rise mt-1.5 text-sm font-medium text-ink [--i:14]">
						Operations coordinator moving into product | Built the dispatch
						tracker 40 drivers use daily
					</p>
				</div>
			</figure>
		</div>
	);
}
