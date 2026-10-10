import { UnlockForm } from "#/components/results/UnlockForm";
import { LockIcon, WandSparklesIcon } from "#/lib/icons";

type LockedRewritesPanelProps = {
	analysisId: string;
	currentHeadline: string;
	teaserHeadline: string;
	rewriteCount: number;
	experienceCount: number;
};

const MAX_EXPERIENCE_ROWS = 3;

/** Fake text lines behind each lock. Widths vary so the rows read as real copy. */
const BAR_WIDTHS = [
	["w-full", "w-11/12", "w-2/3"],
	["w-5/6", "w-full"],
	["w-3/4", "w-11/12", "w-1/2"],
];

function LockedRow({ label, barSet }: { label: string; barSet: number }) {
	const bars = BAR_WIDTHS[barSet % BAR_WIDTHS.length];

	return (
		<li className="flex items-start gap-3">
			<span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-sm bg-surface-2">
				<LockIcon className="size-4 text-primary-ink" aria-hidden />
			</span>
			<div className="min-w-0 flex-1">
				<p className="font-semibold text-ink">{label}</p>
				<div className="mt-2 space-y-2" aria-hidden>
					{bars.map((width) => (
						<div
							key={width}
							className={`h-2.5 rounded bg-border blur-[2px] ${width}`}
						/>
					))}
				</div>
			</div>
		</li>
	);
}

/**
 * Teaser shown to visitors who have not left an email yet. Shows the real
 * headline rewrite and lists what is locked, then unlocks via UnlockForm.
 */
export function LockedRewritesPanel({
	analysisId,
	currentHeadline,
	teaserHeadline,
	rewriteCount,
	experienceCount,
}: LockedRewritesPanelProps) {
	const experienceLabels = Array.from(
		{ length: Math.min(experienceCount, MAX_EXPERIENCE_ROWS) },
		(_, index) => `Experience: role ${index + 1}`,
	);
	const hiddenExperiences = experienceCount - experienceLabels.length;

	return (
		<section
			id="unlock"
			className="mb-8 rounded-xl border border-border bg-surface p-6 shadow-card sm:p-8"
		>
			<div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
				<div className="min-w-0">
					<p className="font-mono text-xs font-medium tracking-[0.14em] text-primary-ink uppercase">
						{rewriteCount} rewrites ready
					</p>

					<div className="mt-5 space-y-5">
						<div>
							<p className="mb-2 font-mono text-xs tracking-wide text-muted uppercase">
								Before
							</p>
							<p className="text-lg sm:text-xl">
								<span className="strike">{currentHeadline}</span>
							</p>
						</div>
						<div>
							<p className="mb-2 flex items-center gap-1.5 font-mono text-xs tracking-wide text-primary-ink uppercase">
								<WandSparklesIcon className="size-3.5" aria-hidden />
								After
							</p>
							<p className="text-lg leading-snug font-semibold text-ink sm:text-xl">
								{teaserHeadline}
							</p>
						</div>
					</div>

					<ul className="mt-8 space-y-5 border-t border-border pt-8">
						<LockedRow label="About section" barSet={0} />
						{experienceLabels.map((label, index) => (
							<LockedRow key={label} label={label} barSet={index + 1} />
						))}
						{hiddenExperiences > 0 ? (
							<li className="pl-12 text-sm text-muted">
								+{hiddenExperiences} more
							</li>
						) : null}
						<LockedRow label="Skills to add" barSet={2} />
						<LockedRow label="Post to announce your move" barSet={0} />
					</ul>
				</div>

				<div className="flex min-w-0 flex-col justify-center lg:border-l lg:border-border lg:pl-12">
					<p className="font-display text-2xl leading-snug font-semibold text-ink">
						Unlock the full review for the job you named.
					</p>
					<p className="mt-3 leading-relaxed text-muted">
						Leave your email to see every rewrite on this page. Copy the text
						you like into LinkedIn. We never touch your account.
					</p>
					<UnlockForm
						analysisId={analysisId}
						submitLabel={`Unlock my ${rewriteCount} rewrites`}
						className="mt-6"
					/>
				</div>
			</div>
		</section>
	);
}
