import { PenLineIcon, PlusIcon, ZapIcon } from "#/lib/icons";

const SCORE = 58;
const RING_RADIUS = 26;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

const SWOT = [
	{ letter: "S", count: 3, className: "bg-strength-tint text-strength" },
	{ letter: "W", count: 4, className: "bg-weakness-tint text-weakness" },
	{ letter: "O", count: 3, className: "bg-opportunity-tint text-opportunity" },
	{ letter: "T", count: 2, className: "bg-threat-tint text-threat" },
];

const SKILLS_TO_ADD = ["Product discovery", "Roadmapping", "User research"];

function EditTag() {
	return (
		<span className="inline-flex items-center gap-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-primary-ink">
			<PenLineIcon className="size-2.5" aria-hidden />
			Redline edit
		</span>
	);
}

function ScoreCard() {
	return (
		<div className="h-full rounded-lg bg-surface p-3.5 shadow-lift">
			<div className="flex items-center gap-3">
				<div className="relative size-14 shrink-0">
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
						className="count-up absolute inset-0 flex items-center justify-center text-base font-semibold text-ink"
						style={{ "--target": SCORE } as React.CSSProperties}
					>
						<span className="sr-only">{SCORE}</span>
					</span>
				</div>
				<div className="min-w-0">
					<p className="text-sm font-semibold text-ink">Profile score</p>
					<p className="text-xs text-muted">
						Goal alignment <span className="font-semibold text-ink">5/10</span>
					</p>
				</div>
			</div>
			<ul className="mt-3 grid grid-cols-4 gap-1.5">
				{SWOT.map((item) => (
					<li
						key={item.letter}
						className={`flex flex-col items-center rounded-sm py-1 ${item.className}`}
					>
						<span className="text-sm font-bold">{item.letter}</span>
						<span className="text-[10px] font-medium">{item.count} found</span>
					</li>
				))}
			</ul>
			<p className="mt-3 flex items-start gap-1.5 border-t border-border pt-2.5 text-xs leading-snug text-ink">
				<ZapIcon className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden />
				<span>
					<span className="font-semibold">Quick win, 10 min.</span> Rename the
					dispatch tracker as a product you shipped.
				</span>
			</p>
		</div>
	);
}

function SkillsCard() {
	return (
		<div className="h-full rounded-lg bg-surface p-3.5 shadow-lift">
			<p className="mb-2 text-xs font-semibold text-ink">Skills to add</p>
			<ul className="flex flex-wrap gap-1.5">
				{SKILLS_TO_ADD.map((skill, index) => (
					<li
						key={skill}
						className="animate-rise inline-flex items-center gap-1 rounded-full border border-strength-border bg-strength-tint px-2 py-0.5 text-xs font-semibold text-strength"
						style={{ "--i": index + 16 } as React.CSSProperties}
					>
						<PlusIcon className="size-3" aria-hidden />
						{skill}
					</li>
				))}
			</ul>
		</div>
	);
}

export function HeroPreviewCard() {
	return (
		<div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
			<figure className="overflow-hidden rounded-lg bg-surface shadow-lift">
				<figcaption className="sr-only">
					Example review of a fictional profile, Maya Okafor, aiming for an
					associate product manager role.
				</figcaption>
				<div className="li-banner relative h-20 sm:h-24" aria-hidden>
					<span className="absolute top-3 left-3 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
						Example
					</span>
				</div>

				<div className="px-4 pb-4 sm:px-5">
					<div className="relative -mt-10 mb-2 flex size-20 items-center justify-center rounded-full border-4 border-surface bg-[#6c8ea8] text-2xl font-semibold text-white shadow-[0_0_0_3px_var(--color-open)_inset]">
						MO
					</div>
					<p className="text-lg leading-tight font-semibold text-ink">
						Maya Okafor
					</p>

					<div className="mt-1 space-y-1">
						<p className="text-sm leading-snug">
							<span className="strike strike-animate">
								Operations Coordinator at Brightline Logistics
							</span>
						</p>
						<p
							className="animate-rise rounded-sm bg-accent/50 py-1 pr-1 pl-2 text-sm leading-snug font-medium text-ink shadow-[inset_3px_0_0_var(--color-primary)]"
							style={{ "--i": 13 } as React.CSSProperties}
						>
							Operations coordinator moving into product | Built the dispatch
							tracker 40 drivers use daily
						</p>
					</div>
					<p className="mt-1.5 text-xs text-muted">
						Chicago, Illinois ·{" "}
						<span className="font-semibold text-primary">Contact info</span>
					</p>

					<div className="mt-3 flex gap-1.5" aria-hidden>
						<span className="btn-primary px-3 py-1 text-xs font-semibold">
							Open to
						</span>
						<span className="btn-secondary px-3 py-1 text-xs font-semibold">
							Add section
						</span>
					</div>
				</div>

				<div className="border-t border-border px-4 py-3.5 sm:px-5">
					<div className="mb-1.5 flex items-center justify-between gap-2">
						<p className="text-sm font-semibold text-ink">About</p>
						<EditTag />
					</div>
					<p className="line-clamp-3 text-xs leading-relaxed text-ink">
						I turn messy operations into tools people use. At Brightline I{" "}
						<span className="highlight highlight-animate">
							interviewed 40 drivers
						</span>
						, mapped where dispatch broke down, and shipped the tracker that cut
						missed pickups by a third.
					</p>
				</div>

				<div className="border-t border-border px-4 pt-3.5 pb-14 sm:px-5">
					<div className="mb-2 flex items-center justify-between gap-2">
						<p className="text-sm font-semibold text-ink">Experience</p>
						<EditTag />
					</div>
					<div className="flex gap-2.5">
						<span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-[10px] font-semibold text-muted">
							BL
						</span>
						<div className="min-w-0 text-xs">
							<p className="font-semibold text-ink">Operations Coordinator</p>
							<p className="text-muted">
								Brightline Logistics · 2022 - Present
							</p>
							<p
								className="animate-rise mt-1 text-ink"
								style={{ "--i": 15 } as React.CSSProperties}
							>
								• Scoped and launched a dispatch tracker now used by 40 drivers
								daily
							</p>
						</div>
					</div>
				</div>
			</figure>

			<div className="relative z-10 -mt-10 flex flex-col gap-3 px-3 sm:flex-row sm:items-stretch">
				<div
					className="animate-rise sm:flex-1"
					style={{ "--i": 6 } as React.CSSProperties}
				>
					<ScoreCard />
				</div>
				<div
					className="animate-rise sm:flex-1"
					style={{ "--i": 14 } as React.CSSProperties}
				>
					<SkillsCard />
				</div>
			</div>
		</div>
	);
}
