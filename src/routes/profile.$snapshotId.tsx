import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { useEffect, useState } from "react";
import { ProfileReviewForm } from "#/components/ProfileReviewForm";
import { getCareerGoal } from "#/lib/career-goal-storage";
import { getProfileSnapshot } from "#/server/profile";

export const Route = createFileRoute("/profile/$snapshotId")({
	loader: async ({ params }) => {
		try {
			return await getProfileSnapshot({
				data: { snapshotId: params.snapshotId },
			});
		} catch (error) {
			if (
				error instanceof Error &&
				error.message === "Profile snapshot not found"
			) {
				throw notFound();
			}

			throw error;
		}
	},
	head: () => ({
		meta: [{ title: "Review your profile — LinkedIn SWOT Analyzer" }],
	}),
	component: ProfileReviewPage,
	notFoundComponent: ProfileNotFound,
});

function ProfileReviewPage() {
	const { snapshotId, profile } = Route.useLoaderData();
	const [careerGoal, setCareerGoal] = useState<string | null>(null);

	useEffect(() => {
		setCareerGoal(getCareerGoal(snapshotId));
	}, [snapshotId]);

	return (
		<div className="page-gradient mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
			<header className="mb-10">
				<p className="text-sm font-medium uppercase tracking-wider text-primary">
					Profile review
				</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight text-text">
					Review your profile
				</h1>
				<p className="mt-4 text-lg leading-relaxed text-text-muted">
					Check the parsed fields below, fix anything that looks wrong, and save
					before continuing.
				</p>
			</header>

			{careerGoal ? (
				<div className="mb-8 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5">
					<Target className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
					<div>
						<p className="text-sm font-semibold text-text">Career goal saved</p>
						<p className="mt-1 text-sm leading-relaxed text-text-muted">
							{careerGoal}
						</p>
						<p className="mt-2 text-xs text-text-muted">
							SWOT analysis coming in Phase 2 — your goal is ready when you
							continue.
						</p>
					</div>
				</div>
			) : null}

			<ProfileReviewForm snapshotId={snapshotId} initialProfile={profile} />
		</div>
	);
}

function ProfileNotFound() {
	const { snapshotId } = Route.useParams();

	return (
		<div className="page-gradient mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
			<section className="rounded-2xl border border-border bg-card p-8 shadow-sm">
				<h1 className="text-2xl font-semibold text-text">Profile not found</h1>
				<p className="mt-3 text-text-muted">
					No saved profile snapshot exists for ID{" "}
					<code className="rounded bg-surface px-1.5 py-0.5 text-sm text-text">
						{snapshotId}
					</code>
					.
				</p>
				<Link
					to="/"
					className="btn-primary mt-6 inline-flex rounded-full px-5 py-2.5 text-sm font-medium text-white"
				>
					Upload a new PDF
				</Link>
			</section>
		</div>
	);
}
