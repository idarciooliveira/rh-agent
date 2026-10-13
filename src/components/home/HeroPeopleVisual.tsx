import { useLanguage } from "#/lib/i18n";
import { CheckCircle2Icon, PlusIcon, TrendingUpIcon } from "#/lib/icons";

const SCORE = 58;
const RING_RADIUS = 22;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** Portrait with floating product cards, the hero pattern used by HR platforms. */
export function HeroPeopleVisual() {
	const { copy } = useLanguage();

	return (
		<figure className="relative mx-auto w-full max-w-lg lg:max-w-none">
			<figcaption className="sr-only">{copy.preview.figcaption}</figcaption>
			<div className="relative overflow-hidden rounded-[2rem] bg-accent shadow-lift">
				<img
					src="/images/people-hero.jpg"
					alt=""
					className="aspect-[4/5] w-full object-cover object-[60%_30%]"
				/>
				<div
					className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night/50 to-transparent"
					aria-hidden
				/>
			</div>

			<div
				className="animate-rise absolute top-8 -left-4 w-60 rounded-2xl bg-surface p-4 shadow-lift sm:-left-12"
				style={{ "--i": 6 } as React.CSSProperties}
				aria-hidden
			>
				<div className="flex items-center gap-3">
					<div className="relative size-12 shrink-0">
						<svg viewBox="0 0 52 52" className="size-full -rotate-90">
							<circle
								cx="26"
								cy="26"
								r={RING_RADIUS}
								fill="none"
								stroke="var(--color-surface-2)"
								strokeWidth="5"
							/>
							<circle
								className="ring-animate"
								cx="26"
								cy="26"
								r={RING_RADIUS}
								fill="none"
								stroke="var(--color-open)"
								strokeWidth="5"
								strokeLinecap="round"
								strokeDasharray={RING_LENGTH}
								strokeDashoffset={RING_LENGTH * (1 - SCORE / 100)}
								style={{ "--ring-length": RING_LENGTH } as React.CSSProperties}
							/>
						</svg>
						<span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-ink">
							{SCORE}
						</span>
					</div>
					<div>
						<p className="text-sm font-bold text-ink">
							{copy.preview.profileScore}
						</p>
						<p className="text-xs text-muted">
							{copy.preview.goalAlignment}{" "}
							<span className="font-semibold text-ink">5/10</span>
						</p>
					</div>
				</div>
				<div className="mt-3 flex items-start gap-2 rounded-xl bg-strength-tint p-2.5 text-xs leading-snug text-strength">
					<TrendingUpIcon className="mt-px size-3.5 shrink-0" />
					<span>
						<span className="font-semibold">{copy.preview.quickWinLabel}</span>{" "}
						{copy.preview.quickWinBody}
					</span>
				</div>
			</div>

			<div
				className="animate-rise absolute -right-4 bottom-24 w-72 rounded-2xl bg-surface p-4 shadow-lift sm:-right-10"
				style={{ "--i": 9 } as React.CSSProperties}
				aria-hidden
			>
				<div className="flex items-center justify-between gap-2">
					<p className="text-xs font-bold tracking-wide text-muted uppercase">
						{copy.preview.headline}
					</p>
					<span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-primary">
						<CheckCircle2Icon className="size-3" />
						{copy.preview.editTag}
					</span>
				</div>
				<p className="mt-2 text-xs">
					<span className="strike">{copy.preview.oldHeadline}</span>
				</p>
				<p className="mt-1.5 text-sm leading-snug font-semibold text-ink">
					{copy.preview.newHeadline}
				</p>
			</div>

			<div
				className="animate-rise absolute bottom-6 left-6 flex flex-wrap gap-1.5"
				style={{ "--i": 12 } as React.CSSProperties}
				aria-hidden
			>
				{copy.preview.skills.map((skill) => (
					<span
						key={skill}
						className="inline-flex items-center gap-1 rounded-full bg-surface/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-card backdrop-blur"
					>
						<PlusIcon className="size-3 text-open" />
						{skill}
					</span>
				))}
			</div>
		</figure>
	);
}
