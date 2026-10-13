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
		<div className="border-b border-ink/80 bg-background">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
				<div className="flex items-baseline gap-5">
					<RedlineLogo />
					<span className="kicker hidden sm:inline">Profile audit</span>
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
		<header className="mb-12 border-b border-ink pb-10">
			<div className="flex items-center justify-between gap-4 border-b border-border pb-3">
				<p className="kicker text-ink">
					Report{" "}
					<span className="text-pen">
						No. {analysisId.slice(0, 6).toUpperCase()}
					</span>
				</p>
				<p className="kicker">{locked ? "Summary edition" : "Full edition"}</p>
			</div>
			<div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<div className="min-w-0">
					<h1 className="font-display text-5xl leading-[1] text-ink sm:text-7xl">
						{firstName ? (
							<>
								Your review, <em className="text-pen">{firstName}</em>.
							</>
						) : (
							"Your profile review."
						)}
					</h1>
					<p className="kicker mt-8">Assessed against</p>
					<p className="mt-2 max-w-2xl font-display text-2xl leading-snug break-words text-ink italic">
						"{careerGoal}"
					</p>
				</div>

				<div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
					<button
						type="button"
						onClick={onPreviewClick}
						className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold sm:w-auto"
					>
						{locked ? (
							<LockIcon className="size-4" aria-hidden />
						) : (
							<EyeIcon className="size-4" aria-hidden />
						)}
						{locked
							? "Unlock my rewritten profile"
							: "See my rewritten profile"}
					</button>
					{locked ? (
						<Link
							to="/"
							className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2 sm:w-auto"
						>
							<ArrowLeftIcon className="size-4" aria-hidden />
							Start over
						</Link>
					) : (
						<Link
							to="/cv/$analysisId"
							params={{ analysisId }}
							className="btn-secondary inline-flex w-full items-center justify-center gap-1.5 px-5 py-3 text-sm font-semibold sm:w-auto"
						>
							<FileTextIcon className="size-4" aria-hidden />
							Export CV
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
