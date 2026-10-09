import type { StrategicSuggestion } from "#/lib/analysis-schema";
import { ClockIcon, ListChecksIcon, TagIcon } from "#/lib/icons";

type StrategicSuggestionsProps = {
	suggestions: StrategicSuggestion[];
};

const priorityStyles: Record<
	StrategicSuggestion["priority"],
	{ label: string; className: string }
> = {
	high: {
		label: "High",
		className: "border-threat-border bg-threat-tint text-threat",
	},
	medium: {
		label: "Medium",
		className: "border-weakness-border bg-weakness-tint text-weakness",
	},
	low: {
		label: "Low",
		className: "border-border bg-surface-2 text-muted",
	},
};

export function StrategicSuggestions({
	suggestions,
}: StrategicSuggestionsProps) {
	return (
		<section>
			<div className="mb-5">
				<div className="flex items-center gap-2">
					<ListChecksIcon className="size-5 text-primary-ink" aria-hidden />
					<h2 className="font-display text-2xl font-semibold text-ink">
						Your plan
					</h2>
				</div>
				<p className="mt-1 text-sm leading-relaxed text-muted">
					Ranked by impact. Start at the top.
				</p>
			</div>
			<ol className="space-y-4">
				{suggestions.map((suggestion, index) => {
					const priority = priorityStyles[suggestion.priority];
					return (
						<li
							key={`${suggestion.category}-${suggestion.text.slice(0, 40)}`}
							className="flex gap-4 rounded-lg border border-border bg-surface p-4 shadow-card sm:p-5"
						>
							<span
								className="font-mono text-lg font-medium leading-6 text-primary-ink"
								aria-hidden
							>
								{String(index + 1).padStart(2, "0")}
							</span>
							<div className="min-w-0 flex-1">
								<span
									className={`inline-block rounded-sm border px-2 py-0.5 text-xs font-semibold ${priority.className}`}
								>
									{priority.label}
									<span className="sr-only"> priority</span>
								</span>
								<p className="mt-2 text-[15px] font-medium leading-relaxed text-ink">
									{suggestion.text}
								</p>
								<div className="mt-3 flex flex-wrap gap-2">
									<span className="inline-flex items-center gap-1 rounded-sm bg-surface-2 px-2 py-1 text-xs font-medium text-muted">
										<TagIcon className="size-3" aria-hidden />
										{suggestion.category}
									</span>
									<span className="inline-flex items-center gap-1 rounded-sm bg-surface-2 px-2 py-1 text-xs font-medium text-muted">
										<ClockIcon className="size-3" aria-hidden />
										{suggestion.timeframe}
									</span>
								</div>
							</div>
						</li>
					);
				})}
			</ol>
		</section>
	);
}
