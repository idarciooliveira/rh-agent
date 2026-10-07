import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AnalysisResultsHeader } from "#/components/results/AnalysisResultsHeader";
import { GoalAlignmentCard } from "#/components/results/GoalAlignmentCard";
import { OptimizedProfilePreviewModal } from "#/components/results/OptimizedProfilePreviewModal";
import { ProfileScoreGauge } from "#/components/results/ProfileScoreGauge";
import { QuickWinsPanel } from "#/components/results/QuickWinsPanel";
import { StrategicSuggestions } from "#/components/results/StrategicSuggestions";
import { SwotCard } from "#/components/results/SwotCard";
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
		meta: [{ title: "Analysis Complete — LinkedIn SWOT Analyzer" }],
	}),
	component: AnalysisResultsPage,
	notFoundComponent: AnalysisNotFound,
});

function AnalysisResultsPage() {
	const data = Route.useLoaderData();
	const [previewOpen, setPreviewOpen] = useState(false);

	return (
		<div className="page-gradient mx-auto min-h-screen max-w-6xl px-6 py-12 sm:py-16">
			<AnalysisResultsHeader onPreviewClick={() => setPreviewOpen(true)} />

			<div className="mb-8 grid gap-6 md:grid-cols-[auto_1fr]">
				<ProfileScoreGauge score={data.swotAnalysis.profileScore} />
				<GoalAlignmentCard goalAlignment={data.swotAnalysis.goalAlignment} />
			</div>

			<div className="mb-8 grid gap-6 md:grid-cols-2">
				<SwotCard
					variant="strengths"
					items={data.swotAnalysis.swot.strengths}
				/>
				<SwotCard
					variant="weaknesses"
					items={data.swotAnalysis.swot.weaknesses}
				/>
			</div>

			<div className="mb-10 grid gap-6 md:grid-cols-2">
				<SwotCard
					variant="opportunities"
					items={data.swotAnalysis.swot.opportunities}
				/>
				<SwotCard variant="threats" items={data.swotAnalysis.swot.threats} />
			</div>

			<div className="grid gap-8 lg:grid-cols-3">
				<div className="lg:col-span-2">
					<StrategicSuggestions
						suggestions={data.swotAnalysis.strategicSuggestions}
					/>
				</div>
				<div>
					<QuickWinsPanel quickWins={data.swotAnalysis.quickWins} />
				</div>
			</div>

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
	const { analysisId } = Route.useParams();

	return (
		<div className="page-gradient mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
			<section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
				<h1 className="text-2xl font-semibold text-text">Analysis not found</h1>
				<p className="mt-3 text-text-muted">
					No analysis exists for ID{" "}
					<code className="rounded bg-surface px-1.5 py-0.5 text-sm text-text">
						{analysisId}
					</code>
					.
				</p>
				<Link
					to="/"
					className="btn-primary mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-medium text-white"
				>
					Analyze another profile
				</Link>
			</section>
		</div>
	);
}
