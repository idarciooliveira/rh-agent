import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProfileReviewForm } from "#/components/ProfileReviewForm";
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
		meta: [{ title: "Review your profile — LinkedIn Coach Agent" }],
	}),
	component: ProfileReviewPage,
	notFoundComponent: ProfileNotFound,
});

function ProfileReviewPage() {
	const { snapshotId, profile } = Route.useLoaderData();

	return (
		<div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
			<header className="mb-10">
				<p className="text-sm font-medium uppercase tracking-wider text-sky-400">
					Phase 1 — Profile Ingestion
				</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
					Review your profile
				</h1>
				<p className="mt-4 text-lg leading-relaxed text-slate-300">
					Check the parsed fields below, fix anything that looks wrong, and save
					before continuing.
				</p>
			</header>

			<ProfileReviewForm snapshotId={snapshotId} initialProfile={profile} />
		</div>
	);
}

function ProfileNotFound() {
	const { snapshotId } = Route.useParams();

	return (
		<div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
			<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
				<h1 className="text-2xl font-semibold text-white">Profile not found</h1>
				<p className="mt-3 text-slate-300">
					No saved profile snapshot exists for ID{" "}
					<code className="text-slate-400">{snapshotId}</code>.
				</p>
				<Link
					to="/"
					className="mt-6 inline-flex rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
				>
					Upload a new PDF
				</Link>
			</section>
		</div>
	);
}
