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
		label: "HIGH PRIORITY",
		className: "bg-red-50 text-red-600 border-red-100",
	},
	medium: {
		label: "MEDIUM PRIORITY",
		className: "bg-amber-50 text-amber-700 border-amber-100",
	},
	low: {
		label: "LOW PRIORITY",
		className: "bg-gray-50 text-gray-600 border-gray-100",
	},
};

export function StrategicSuggestions({
	suggestions,
}: StrategicSuggestionsProps) {
	return (
		<div>
			<div className="mb-5 flex items-center gap-2">
				<ListChecksIcon className="size-5 text-primary" aria-hidden />
				<h2 className="text-lg font-bold text-text">Strategic Suggestions</h2>
			</div>
			<div className="space-y-4">
				{suggestions.map((suggestion) => {
					const priority = priorityStyles[suggestion.priority];
					return (
						<div
							key={`${suggestion.category}-${suggestion.text.slice(0, 40)}`}
							className="rounded-2xl border border-border bg-card p-5 shadow-sm"
						>
							<span
								className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${priority.className}`}
							>
								{priority.label}
							</span>
							<p className="mt-3 text-sm font-semibold leading-relaxed text-text">
								{suggestion.text}
							</p>
							<div className="mt-4 flex flex-wrap gap-2">
								<span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
									<TagIcon className="size-3" aria-hidden />
									{suggestion.category}
								</span>
								<span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
									<ClockIcon className="size-3" aria-hidden />
									{suggestion.timeframe}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
