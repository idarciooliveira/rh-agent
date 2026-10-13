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
		<section className="border-t-2 border-ink pt-4">
			<div className="flex items-start justify-between gap-4">
				<h2 className="kicker text-ink">Goal alignment</h2>
				<TargetIcon className="size-4 shrink-0 text-pen" aria-hidden />
			</div>

			<p className="mt-6 font-display text-[6.5rem] leading-[0.8] text-ink">
				<span
					className="count-up"
					style={{ "--target": score } as CSSProperties}
					aria-hidden
				/>
				<span className="ml-1 text-3xl text-muted" aria-hidden>
					/{goalAlignment.maxScore}
				</span>
				<span className="sr-only">
					{score} out of {goalAlignment.maxScore}
				</span>
			</p>

			<div className="mt-8 h-2 bg-surface-2">
				<div
					className="bar-animate h-full bg-ink"
					style={{ width: `${percentage}%` }}
				/>
			</div>

			<p className="mt-6 font-display text-xl leading-relaxed text-ink">
				{goalAlignment.summary}
			</p>
		</section>
	);
}
