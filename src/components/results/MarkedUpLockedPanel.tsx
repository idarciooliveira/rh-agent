import { UnlockForm } from "#/components/results/UnlockForm";
import { LockIcon } from "#/lib/icons";

type MarkedUpLockedPanelProps = {
	analysisId: string;
	/** Total rewrites, including the headline that is shown for free. */
	rewriteCount: number;
	experienceCount: number;
};

const MAX_EXPERIENCE_ROWS = 3;

function LockedRow({ label }: { label: string }) {
	return (
		<li className="flex items-start gap-3 py-4">
			<LockIcon className="mt-0.5 size-4 shrink-0 text-pen" aria-hidden />
			<div className="min-w-0 flex-1">
				<p className="text-sm font-semibold text-ink">{label}</p>
				<div className="mt-2.5 space-y-2" aria-hidden>
					<div className="h-2.5 w-11/12 rounded bg-border blur-[2px]" />
					<div className="h-2.5 w-2/3 rounded bg-border blur-[2px]" />
				</div>
			</div>
		</li>
	);
}

/**
 * The rest of the rewrites, drawn as a marked-up page. The fake lines are
 * blurred so the layout shows what is there without showing the text.
 */
export function MarkedUpLockedPanel({
	analysisId,
	rewriteCount,
	experienceCount,
}: MarkedUpLockedPanelProps) {
	const visibleExperience = Math.min(experienceCount, MAX_EXPERIENCE_ROWS);
	const hiddenExperience = experienceCount - visibleExperience;
	const experienceLabels = Array.from(
		{ length: visibleExperience },
		(_, index) => `Experience, role ${index + 1}`,
	);

	return (
		<section
			id="unlock"
			className="mb-12 rounded-lg border-l-2 border-pen bg-surface p-6 shadow-card sm:p-8"
		>
			<h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
				{rewriteCount - 1} more edits on your profile
			</h2>
			<p className="mt-2 text-base text-muted">
				Your new headline is above. Leave your email to see the rest.
			</p>

			<ul className="mt-6 divide-y divide-border border-t border-border">
				<LockedRow label="About section" />
				{experienceLabels.map((label) => (
					<LockedRow key={label} label={label} />
				))}
				{hiddenExperience > 0 ? (
					<li className="py-4 pl-7 text-sm text-muted">
						+{hiddenExperience} more experience entries
					</li>
				) : null}
				<LockedRow label="Skills to add" />
				<LockedRow label="Post to announce your move" />
			</ul>

			<div className="mt-6 rounded-md bg-surface-2 p-4 sm:p-5">
				<UnlockForm analysisId={analysisId} submitLabel="Show all my edits" />
			</div>
		</section>
	);
}
