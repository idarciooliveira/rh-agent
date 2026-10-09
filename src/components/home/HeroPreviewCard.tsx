import { useLanguage } from "#/lib/i18n";
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

function EditTag({ label }: { label: string }) {
	return (
		<span className="inline-flex items-center gap-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-primary-ink">
			<PenLineIcon className="size-2.5" aria-hidden />
			{label}
		</span>
	);
}

function ScoreCard() {
	const { copy } = useLanguage();

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
						<title>{copy.preview.profileScore}</title>
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
					<p className="text-sm font-semibold text-ink">
						{copy.preview.profileScore}
					</p>
					<p className="text-xs text-muted">
						{copy.preview.goalAlignment}{" "}
						<span className="font-semibold text-ink">5/10</span>
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
						<span className="text-[10px] font-medium">
							{item.count} {copy.preview.swotFound}
						</span>
					</li>
				))}
			</ul>
			<p className="mt-3 flex items-start gap-1.5 border-t border-border pt-2.5 text-xs leading-snug text-ink">
				<ZapIcon className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden />
				<span>
					<span className="font-semibold">{copy.preview.quickWinLabel}</span>{" "}
					{copy.preview.quickWinBody}
				</span>
			</p>
		</div>
	);
}

function SkillsCard() {
	const { copy } = useLanguage();

	return (
		<div className="h-full rounded-lg bg-surface p-3.5 shadow-lift">
			<p className="mb-2 text-xs font-semibold text-ink">
				{copy.preview.skillsTitle}
			</p>
			<ul className="flex flex-wrap gap-1.5">
				{copy.preview.skills.map((skill, index) => (
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
	const { copy } = useLanguage();

	return (
		<div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
			<figure className="overflow-hidden rounded-lg bg-surface shadow-lift">
				<figcaption className="sr-only">{copy.preview.figcaption}</figcaption>
				<div className="li-banner relative h-20 sm:h-24" aria-hidden>
					<img
						src="/banners/luanda-skyline.jpg"
						alt=""
						className="absolute inset-0 size-full object-cover"
					/>
					<span className="absolute top-3 left-3 rounded-full bg-black/55 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
						{copy.preview.exampleBadge}
					</span>
				</div>

				<div className="px-4 pb-4 sm:px-5">
					<img
						src="/avatars/ana-domingos.jpg"
						alt=""
						width={80}
						height={80}
						className="relative -mt-10 mb-2 size-20 rounded-full border-4 border-surface object-cover outline-3 -outline-offset-7 outline-open"
					/>
					<p className="text-lg leading-tight font-semibold text-ink">
						Ana Domingos
					</p>

					<div className="mt-1 space-y-1">
						<p className="text-sm leading-snug">
							<span className="strike strike-animate">
								{copy.preview.oldHeadline}
							</span>
						</p>
						<p
							className="animate-rise rounded-sm bg-accent/50 py-1 pr-1 pl-2 text-sm leading-snug font-medium text-ink shadow-[inset_3px_0_0_var(--color-primary)]"
							style={{ "--i": 13 } as React.CSSProperties}
						>
							{copy.preview.newHeadline}
						</p>
					</div>
					<p className="mt-1.5 text-xs text-muted">
						{copy.preview.location} ·{" "}
						<span className="font-semibold text-primary">
							{copy.preview.contactInfo}
						</span>
					</p>

					<div className="mt-3 flex gap-1.5" aria-hidden>
						<span className="btn-primary px-3 py-1 text-xs font-semibold">
							{copy.preview.openTo}
						</span>
						<span className="btn-secondary px-3 py-1 text-xs font-semibold">
							{copy.preview.addSection}
						</span>
					</div>
				</div>

				<div className="border-t border-border px-4 py-3.5 sm:px-5">
					<div className="mb-1.5 flex items-center justify-between gap-2">
						<p className="text-sm font-semibold text-ink">
							{copy.preview.about}
						</p>
						<EditTag label={copy.preview.editTag} />
					</div>
					<p className="line-clamp-3 text-xs leading-relaxed text-ink">
						{copy.preview.aboutPre}
						<span className="highlight highlight-animate">
							{copy.preview.aboutHighlight}
						</span>
						{copy.preview.aboutPost}
					</p>
				</div>

				<div className="border-t border-border px-4 pt-3.5 pb-14 sm:px-5">
					<div className="mb-2 flex items-center justify-between gap-2">
						<p className="text-sm font-semibold text-ink">
							{copy.preview.experience}
						</p>
						<EditTag label={copy.preview.editTag} />
					</div>
					<div className="flex gap-2.5">
						<img
							src="/logos/banco-kianda.svg"
							alt=""
							width={36}
							height={36}
							className="size-9 shrink-0 rounded-sm"
						/>
						<div className="min-w-0 text-xs">
							<p className="font-semibold text-ink">{copy.preview.role}</p>
							<p className="text-muted">{copy.preview.companyDate}</p>
							<p
								className="animate-rise mt-1 text-ink"
								style={{ "--i": 15 } as React.CSSProperties}
							>
								{copy.preview.experienceBullet}
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
