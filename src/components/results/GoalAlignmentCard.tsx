import type { CSSProperties } from "react";
import type { GoalAlignment } from "#/lib/analysis-schema";
import { TargetIcon } from "#/lib/icons";

type GoalAlignmentCardProps = {
	goalAlignment: GoalAlignment;
};

export function GoalAlignmentCard({ goalAlignment }: GoalAlignmentCardProps) {
	const percentage =
		goalAlignment.maxScore > 0
			? Math.max(
					0,
					Math.min(100, (goalAlignment.score / goalAlignment.maxScore) * 100),
				)
			: 0;
	const score = Math.round(goalAlignment.score);

	return (
		<section className="rounded-lg border border-border bg-surface p-5 shadow-card sm:p-6">
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0">
					<h2 className="font-display text-xl font-semibold text-ink">
						Goal alignment
					</h2>
					<p className="mt-1 text-sm leading-relaxed text-muted">
						How close your profile is to the job you described.
					</p>
				</div>
				<TargetIcon className="size-5 shrink-0 text-primary-ink" aria-hidden />
			</div>

			<p className="mt-4 font-mono text-4xl font-medium text-ink">
				<span
					className="count-up"
					style={{ "--target": score } as CSSProperties}
					aria-hidden
				/>
				<span className="text-lg text-muted" aria-hidden>
					/{goalAlignment.maxScore}
				</span>
				<span className="sr-only">
					{score} out of {goalAlignment.maxScore}
				</span>
			</p>

			<div className="mt-3 h-2.5 overflow-hidden rounded-full bg-surface-2">
				<div
					className="bar-animate h-full rounded-full bg-primary"
					style={{ width: `${percentage}%` }}
				/>
			</div>

			<p className="mt-4 text-[15px] leading-relaxed text-ink">
				{goalAlignment.summary}
			</p>
		</section>
	);
}
