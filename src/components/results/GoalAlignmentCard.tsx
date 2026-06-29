import { Bookmark } from "lucide-react";
import type { GoalAlignment } from "#/lib/analysis-schema";

type GoalAlignmentCardProps = {
	goalAlignment: GoalAlignment;
};

export function GoalAlignmentCard({ goalAlignment }: GoalAlignmentCardProps) {
	const percentage = (goalAlignment.score / goalAlignment.maxScore) * 100;

	return (
		<div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
			<Bookmark
				className="absolute right-5 top-5 size-5 text-primary"
				aria-hidden
			/>
			<p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
				Goal Alignment
			</p>
			<p className="mt-2 text-3xl font-bold text-text">
				{goalAlignment.score}/{goalAlignment.maxScore}
			</p>
			<div className="mt-4 h-2.5 overflow-hidden rounded-full bg-gray-100">
				<div
					className="h-full rounded-full bg-primary transition-all"
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<p className="mt-4 text-sm leading-relaxed text-text-muted">
				{goalAlignment.summary}
			</p>
		</div>
	);
}
