import { Link } from "@tanstack/react-router";
import { RedlineLogo } from "#/components/RedlineLogo";
import { ArrowLeftIcon, EyeIcon, FileTextIcon, LockIcon } from "#/lib/icons";

type AnalysisResultsHeaderProps = {
	analysisId: string;
	firstName: string | null;
	name: string;
	headline: string;
	careerGoal: string;
	locked: boolean;
	onPreviewClick: () => void;
};

function initials(name: string): string {
	return (
		name
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase() ?? "")
			.join("") || "?"
	);
}

export function ResultsTopBar() {
	return (
		<div className="border-b border-border bg-surface">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
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
	analysisId,
	firstName,
	name,
	headline,
	careerGoal,
	locked,
	onPreviewClick,
}: AnalysisResultsHeaderProps) {
	return (
		<header className="mb-8 overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
			<div className="li-banner h-24 sm:h-28" aria-hidden />
			<div className="flex flex-col gap-6 px-6 pb-7 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
				<div className="min-w-0">
					<span
						className="-mt-12 flex size-24 items-center justify-center rounded-full border-4 border-surface bg-primary font-display text-3xl font-bold text-white shadow-card"
						aria-hidden
					>
						{initials(name)}
					</span>
					<p className="mt-4 text-sm font-semibold text-primary">
						{firstName
							? `${firstName}'s profile scorecard`
							: "Profile scorecard"}
					</p>
					<h1 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
						{name || "Your profile review"}
					</h1>
					{headline ? (
						<p className="mt-1 max-w-2xl text-[15px] text-muted">{headline}</p>
					) : null}
					<p className="mt-4 inline-flex max-w-2xl items-start gap-2 rounded-2xl bg-accent/60 px-3.5 py-2 text-sm leading-relaxed break-words text-ink">
						<span className="font-semibold text-primary">Target role</span>
						{careerGoal}
					</p>
				</div>

				<div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
					<button
						type="button"
						onClick={onPreviewClick}
						className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold sm:w-auto"
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
							className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border-strong bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2 sm:w-auto"
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
