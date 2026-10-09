import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
	AnalysisResultsHeader,
	ResultsTopBar,
} from "#/components/results/AnalysisResultsHeader";
import { GoalAlignmentCard } from "#/components/results/GoalAlignmentCard";
import { OptimizedProfilePreviewModal } from "#/components/results/OptimizedProfilePreviewModal";
import { ProfileScoreGauge } from "#/components/results/ProfileScoreGauge";
import { QuickWinsPanel } from "#/components/results/QuickWinsPanel";
import { StrategicSuggestions } from "#/components/results/StrategicSuggestions";
import { SwotCard } from "#/components/results/SwotCard";
import { ArrowRightIcon } from "#/lib/icons";
import { getAnalysis } from "#/server/analysis";

export const Route = createFileRoute("/results/$analysisId")({
	loader: async ({ params }) => {
		try {
			return await getAnalysis({
				data: { analysisId: params.analysisId },
			});
		} catch (error) {
			if (error instanceof Error && error.message === "Analysis not found") {
				throw notFound();
			}

			throw error;
		}
	},
	head: () => ({
		meta: [
			{ title: "Your profile review | Redline" },
			{
				name: "description",
				content:
					"Your profile score, goal alignment, SWOT and rewritten profile sections from Redline.",
			},
			{ name: "robots", content: "noindex" },
		],
	}),
	component: AnalysisResultsPage,
	notFoundComponent: AnalysisNotFound,
});

function getFirstName(name: string): string | null {
	const first = name.trim().split(/\s+/)[0];
	return first ? first : null;
}

function AnalysisResultsPage() {
	const data = Route.useLoaderData();
	const [previewOpen, setPreviewOpen] = useState(false);
	const { swot } = data.swotAnalysis;

	return (
		<div className="min-h-screen bg-background">
			<ResultsTopBar />

			<main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
				<AnalysisResultsHeader
					firstName={getFirstName(data.profile.name)}
					careerGoal={data.careerGoal}
					onPreviewClick={() => setPreviewOpen(true)}
				/>

				<div className="mb-8 grid gap-4 sm:gap-6 md:grid-cols-[minmax(0,18rem)_1fr]">
					<ProfileScoreGauge score={data.swotAnalysis.profileScore} />
					<GoalAlignmentCard goalAlignment={data.swotAnalysis.goalAlignment} />
				</div>

				<div className="mb-12 grid gap-4 sm:gap-6 md:grid-cols-2">
					<SwotCard variant="strengths" items={swot.strengths} />
					<SwotCard variant="weaknesses" items={swot.weaknesses} />
					<SwotCard variant="opportunities" items={swot.opportunities} />
					<SwotCard variant="threats" items={swot.threats} />
				</div>

				<div className="grid items-start gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<StrategicSuggestions
							suggestions={data.swotAnalysis.strategicSuggestions}
						/>
					</div>
					<QuickWinsPanel quickWins={data.swotAnalysis.quickWins} />
				</div>

				<section className="reveal mt-12 flex flex-col gap-5 rounded-xl border border-border bg-surface-2 p-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8">
					<p className="max-w-xl font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
						Not sure this is the right direction? Start over with a different
						goal and compare the two reviews.
					</p>
					<Link
						to="/"
						className="btn-primary inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold sm:w-auto"
					>
						Try another goal
						<ArrowRightIcon className="size-4" aria-hidden />
					</Link>
				</section>
			</main>

			{previewOpen ? (
				<OptimizedProfilePreviewModal
					profile={data.profile}
					recommendations={data.recommendations}
					onClose={() => setPreviewOpen(false)}
				/>
			) : null}
		</div>
	);
}

function AnalysisNotFound() {
	return (
		<div className="min-h-screen bg-background">
			<ResultsTopBar />
			<main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
				<section className="mx-auto max-w-xl rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
					<h1 className="font-display text-3xl font-semibold text-ink">
						This review isn't here
					</h1>
					<p className="mt-3 text-base leading-relaxed text-muted">
						Reviews open only in the browser that created them. If you cleared
						cookies or switched devices, run a new one. It takes about 30
						seconds.
					</p>
					<Link
						to="/"
						className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold sm:w-auto"
					>
						Start a new review
						<ArrowRightIcon className="size-4" aria-hidden />
					</Link>
				</section>
			</main>
		</div>
	);
}
