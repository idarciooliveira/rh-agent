import { Link } from "@tanstack/react-router";
import { ArrowLeft, Eye } from "lucide-react";

type AnalysisResultsHeaderProps = {
	onPreviewClick: () => void;
};

export function AnalysisResultsHeader({
	onPreviewClick,
}: AnalysisResultsHeaderProps) {
	return (
		<header className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
			<div>
				<h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
					Analysis Complete
				</h1>
				<p className="mt-2 text-base text-text-muted">
					Here is your personalized strategic breakdown.
				</p>
			</div>

			<div className="flex shrink-0 flex-wrap items-center gap-3">
				<button
					type="button"
					onClick={onPreviewClick}
					className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-600/25 transition-opacity hover:opacity-95"
				>
					<Eye className="size-4" aria-hidden />
					Preview Optimized Profile
				</button>
				<Link
					to="/"
					className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface"
				>
					<ArrowLeft className="size-4" aria-hidden />
					Start Over
				</Link>
			</div>
		</header>
	);
}
