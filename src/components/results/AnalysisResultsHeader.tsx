import { Link } from "@tanstack/react-router";
import { RedlineLogo } from "#/components/RedlineLogo";
import { ArrowLeftIcon, EyeIcon } from "#/lib/icons";

type AnalysisResultsHeaderProps = {
	firstName: string | null;
	careerGoal: string;
	onPreviewClick: () => void;
};

export function ResultsTopBar() {
	return (
		<div className="border-b border-border bg-background">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
				<RedlineLogo />
				<Link
					to="/"
					className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-2 hover:text-ink"
				>
					<ArrowLeftIcon className="size-4" aria-hidden />
					Start over
				</Link>
			</div>
		</div>
	);
}

export function AnalysisResultsHeader({
	firstName,
	careerGoal,
	onPreviewClick,
}: AnalysisResultsHeaderProps) {
	return (
		<header className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
			<div className="min-w-0">
				<h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
					{firstName ? (
						<>
							Your review,{" "}
							<span className="highlight highlight-animate">{firstName}</span>
						</>
					) : (
						"Your profile review"
					)}
				</h1>
				<p className="mt-3 max-w-2xl text-base leading-relaxed text-muted break-words">
					Graded against your goal:{" "}
					<span className="font-medium text-ink">"{careerGoal}"</span>
				</p>
			</div>

			<div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
				<button
					type="button"
					onClick={onPreviewClick}
					className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold sm:w-auto"
				>
					<EyeIcon className="size-4" aria-hidden />
					See my rewritten profile
				</button>
				<Link
					to="/"
					className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2 sm:w-auto"
				>
					<ArrowLeftIcon className="size-4" aria-hidden />
					Start over
				</Link>
			</div>
		</header>
	);
}
