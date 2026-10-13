import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
	AnalysisResultsHeader,
	ResultsTopBar,
} from "#/components/results/AnalysisResultsHeader";
import { CheckoutModal } from "#/components/results/CheckoutModal";
import { GoalAlignmentCard } from "#/components/results/GoalAlignmentCard";
import { HumanReviewCard } from "#/components/results/HumanReviewCard";
import { JobHuntToolkit } from "#/components/results/JobHuntToolkit";
import { LockedOverlay } from "#/components/results/Locked";
import { OptimizedProfilePreviewModal } from "#/components/results/OptimizedProfilePreviewModal";
import { ProfileScoreGauge } from "#/components/results/ProfileScoreGauge";
import { QuickWinsPanel } from "#/components/results/QuickWinsPanel";
import { RecruiterKeywords } from "#/components/results/RecruiterKeywords";
import { ShareScoreCard } from "#/components/results/ShareScoreCard";
import { StrategicSuggestions } from "#/components/results/StrategicSuggestions";
import { SwotCard } from "#/components/results/SwotCard";
import { UnlockBanner } from "#/components/results/UnlockBanner";
import { ArrowRightIcon } from "#/lib/icons";
import {
	FREE_ITEMS_PER_LOCKED_QUADRANT,
	FREE_QUICK_WINS,
	type Plan,
} from "#/lib/pricing";
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
	const [checkoutPlan, setCheckoutPlan] = useState<Plan | null>(null);
	const { swot } = data.swotAnalysis;
	const { access, recommendations } = data;
	const locked = !recommendations;
	const hasPass = Boolean(access.passExpiresAt);
	const firstName = getFirstName(data.profile.name);
	const openCheckout = (plan: Plan = "report") => setCheckoutPlan(plan);

	const lockedQuadrants = [swot.weaknesses, swot.opportunities, swot.threats];
	const hiddenCounts = {
		swotItems: lockedQuadrants.reduce(
			(sum, items) =>
				sum + Math.max(0, items.length - FREE_ITEMS_PER_LOCKED_QUADRANT),
			0,
		),
		suggestions: data.swotAnalysis.strategicSuggestions.length,
		quickWins: Math.max(
			0,
			data.swotAnalysis.quickWins.length - FREE_QUICK_WINS,
		),
		experienceRewrites: access.experienceRewrites,
	};

	return (
		<div className="min-h-screen bg-background">
			<ResultsTopBar />

			<main className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
				<AnalysisResultsHeader
					analysisId={data.analysisId}
					firstName={firstName}
					careerGoal={data.careerGoal}
					locked={locked}
					onPreviewClick={() =>
						locked ? openCheckout() : setPreviewOpen(true)
					}
				/>

				{access.passExpiresAt ? (
					<p className="mb-6 rounded-md border border-strength-border bg-strength-tint px-4 py-2.5 text-sm text-strength">
						Job hunt pass active until{" "}
						{new Date(access.passExpiresAt).toLocaleDateString("en-GB", {
							day: "numeric",
							month: "long",
						})}
						. Every new review unlocks on its own.
					</p>
				) : access.creditsRemaining > 0 ? (
					<p className="mb-6 rounded-md border border-strength-border bg-strength-tint px-4 py-2.5 text-sm text-strength">
						{access.creditsRemaining} review
						{access.creditsRemaining === 1 ? "" : "s"} left in your pack. The
						next review you run unlocks on its own.
					</p>
				) : null}

				<div className="lg:grid lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16">
					<ReportContents />
					<div className="min-w-0">
						<ReportSection id="summary" n={1} title="Summary">
							<div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
								<ProfileScoreGauge
									score={data.swotAnalysis.profileScore}
									previousScore={data.previousScore}
								/>
								<GoalAlignmentCard
									goalAlignment={data.swotAnalysis.goalAlignment}
								/>
							</div>
						</ReportSection>

						{locked ? (
							<UnlockBanner
								hiddenCounts={hiddenCounts}
								onUnlock={openCheckout}
							/>
						) : null}

						<ReportSection
							id="swot"
							n={2}
							title="Strengths, weaknesses, opportunities, threats"
						>
							<div className="grid gap-px border border-ink bg-ink md:grid-cols-2">
								<SwotCard variant="strengths" items={swot.strengths} />
								<SwotCard
									variant="weaknesses"
									items={swot.weaknesses}
									locked={locked}
								/>
								<SwotCard
									variant="opportunities"
									items={swot.opportunities}
									locked={locked}
								/>
								<SwotCard
									variant="threats"
									items={swot.threats}
									locked={locked}
								/>
							</div>
						</ReportSection>

						<ReportSection id="plan" n={3} title="Plan and quick wins">
							<div className="grid items-start gap-8 lg:grid-cols-3">
								<div className="lg:col-span-2">
									{locked ? (
										<LockedOverlay
											label="Unlock your ranked plan"
											onUnlock={() => openCheckout()}
										>
											<StrategicSuggestions
												suggestions={data.swotAnalysis.strategicSuggestions}
											/>
										</LockedOverlay>
									) : (
										<StrategicSuggestions
											suggestions={data.swotAnalysis.strategicSuggestions}
										/>
									)}
								</div>
								<QuickWinsPanel
									quickWins={data.swotAnalysis.quickWins}
									locked={locked}
									onUnlock={() => openCheckout()}
								/>
							</div>
						</ReportSection>

						<ReportSection id="keywords" n={4} title="Keywords and sharing">
							<div className="grid items-start gap-6 lg:grid-cols-3">
								<div className="lg:col-span-2">
									{recommendations?.recruiterKeywords?.length ? (
										<RecruiterKeywords
											keywords={recommendations.recruiterKeywords}
											profile={data.profile}
										/>
									) : (
										<HumanReviewCard
											onBook={() => openCheckout("human_review")}
										/>
									)}
								</div>
								<ShareScoreCard
									score={data.swotAnalysis.profileScore}
									previousScore={data.previousScore}
									firstName={firstName}
								/>
							</div>
						</ReportSection>

						<JobHuntToolkit
							analysisId={data.analysisId}
							hasPass={hasPass}
							contentPlan={recommendations?.contentPlan}
							onGetPass={() => openCheckout("pass30")}
						/>

						{recommendations?.recruiterKeywords?.length ? (
							<div className="mt-6">
								<HumanReviewCard onBook={() => openCheckout("human_review")} />
							</div>
						) : null}

						<section className="reveal mt-16 flex flex-col gap-5 border-y-2 border-ink py-8 sm:flex-row sm:items-center sm:justify-between">
							<p className="max-w-xl font-display text-2xl leading-snug text-ink sm:text-3xl">
								Made your edits? Run a new review to see your score move, or try
								a different goal and compare.
							</p>
							<Link
								to="/"
								className="btn-primary inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold sm:w-auto"
							>
								Run another review
								<ArrowRightIcon className="size-4" aria-hidden />
							</Link>
						</section>
					</div>
				</div>
			</main>

			{previewOpen && recommendations ? (
				<OptimizedProfilePreviewModal
					profile={data.profile}
					recommendations={recommendations}
					onClose={() => setPreviewOpen(false)}
				/>
			) : null}

			{checkoutPlan ? (
				<CheckoutModal
					analysisId={data.analysisId}
					initialPlan={checkoutPlan}
					onClose={() => setCheckoutPlan(null)}
				/>
			) : null}
		</div>
	);
}

const CONTENTS = [
	{ id: "summary", label: "Summary" },
	{ id: "swot", label: "SWOT" },
	{ id: "plan", label: "Plan and quick wins" },
	{ id: "keywords", label: "Keywords and sharing" },
	{ id: "toolkit", label: "Job hunt toolkit" },
];

/** Sticky table of contents, like the front page of an audit report. */
function ReportContents() {
	return (
		<nav aria-label="Report contents" className="hidden lg:block">
			<div className="sticky top-8 border-t-2 border-ink pt-4">
				<p className="kicker text-ink">Contents</p>
				<ol className="mt-4 space-y-3">
					{CONTENTS.map((item, index) => (
						<li key={item.id}>
							<a
								href={`#${item.id}`}
								className="group flex gap-3 text-sm text-muted transition-colors hover:text-ink"
							>
								<span className="font-mono text-xs text-pen">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="group-hover:underline group-hover:decoration-pen group-hover:underline-offset-4">
									{item.label}
								</span>
							</a>
						</li>
					))}
				</ol>
			</div>
		</nav>
	);
}

function ReportSection({
	id,
	n,
	title,
	children,
}: {
	id: string;
	n: number;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="mb-16 scroll-mt-8">
			<h2 className="mb-8 flex items-baseline gap-4 font-display text-3xl text-ink sm:text-4xl">
				<span className="font-mono text-sm text-pen">
					{String(n).padStart(2, "0")}
				</span>
				{title}
			</h2>
			{children}
		</section>
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
