import { Link } from "@tanstack/react-router";
import { RedlineLogo } from "#/components/RedlineLogo";
import { ArrowLeftIcon, EyeIcon, FileTextIcon, LockIcon } from "#/lib/icons";

type AnalysisResultsHeaderProps = {
	analysisId: string;
	firstName: string | null;
	careerGoal: string;
	locked: boolean;
	onPreviewClick: () => void;
};

export function ResultsTopBar() {
	return (
		<div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-xl">
			<div className="flex h-12 items-center justify-between px-4 sm:px-5">
				<div className="flex items-center gap-3 text-[13px]">
					<RedlineLogo />
					<span className="text-border-strong" aria-hidden>
						/
					</span>
					<span className="text-muted">Reviews</span>
				</div>
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
	analysisId,
	firstName,
	careerGoal,
	locked,
	onPreviewClick,
}: AnalysisResultsHeaderProps) {
	return (
		<header className="mb-8 flex flex-col gap-6 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
			<div className="min-w-0">
				<p className="flex items-center gap-2 font-mono text-[11px] text-muted uppercase">
					<span className="size-1.5 rounded-full bg-open shadow-[0_0_8px_var(--color-open)]" />
					Review complete · {analysisId.slice(0, 8)}
				</p>
				<h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
					{firstName ? `${firstName}'s profile review` : "Your profile review"}
				</h1>
				<p className="mt-3 flex max-w-2xl items-start gap-2 text-sm leading-relaxed break-words text-muted">
					<span className="mt-0.5 shrink-0 rounded-sm border border-border-strong bg-surface-2 px-1.5 py-px font-mono text-[10px] text-ink uppercase">
						Goal
					</span>
					{careerGoal}
				</p>
			</div>

			<div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
				<button
					type="button"
					onClick={onPreviewClick}
					className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium sm:w-auto"
				>
					{locked ? (
						<LockIcon className="size-4" aria-hidden />
					) : (
						<EyeIcon className="size-4" aria-hidden />
					)}
					{locked ? "Unlock my rewritten profile" : "See my rewritten profile"}
				</button>
				{locked ? (
					<Link
						to="/"
						className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border-strong bg-surface px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-surface-2 sm:w-auto"
					>
						<ArrowLeftIcon className="size-4" aria-hidden />
						Start over
					</Link>
				) : (
					<Link
						to="/cv/$analysisId"
						params={{ analysisId }}
						className="btn-secondary inline-flex w-full items-center justify-center gap-1.5 px-4 py-2 text-[13px] font-medium sm:w-auto"
					>
						<FileTextIcon className="size-4" aria-hidden />
						Export CV
					</Link>
				)}
			</div>
		</header>
	);
}
