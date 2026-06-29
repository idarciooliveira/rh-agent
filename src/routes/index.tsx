import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LinkedInExportGuide } from "#/components/LinkedInExportGuide";
import { PdfUploadDropzone } from "#/components/PdfUploadDropzone";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
			<header className="mb-12">
				<p className="text-sm font-medium uppercase tracking-wider text-sky-400">
					Phase 1 — Profile Ingestion
				</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
					LinkedIn Coach Agent
				</h1>
				<p className="mt-4 text-lg leading-relaxed text-slate-300">
					Upload your LinkedIn profile PDF, set a career goal, and get a SWOT
					analysis with actionable profile recommendations powered by AI.
				</p>
			</header>

			<div className="space-y-8">
				<LinkedInExportGuide />
				<PdfUploadDropzone
					onUploadComplete={(snapshotId) => {
						void navigate({
							to: "/profile/$snapshotId",
							params: { snapshotId },
						});
					}}
				/>
			</div>

			<footer className="mt-auto pt-12 text-sm text-slate-500">
				See <code className="text-slate-400">docs/PRD.md</code> and{" "}
				<code className="text-slate-400">docs/ROADMAP.md</code> for the full
				plan.
			</footer>
		</div>
	);
}
