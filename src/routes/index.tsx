import { createFileRoute } from "@tanstack/react-router";
import { HomeAnalysisForm } from "#/components/HomeAnalysisForm";
import { TargetIcon } from "#/lib/icons";
import { getAiMode } from "#/server/ai-mode";

export const Route = createFileRoute("/")({
	loader: async () => ({
		aiMode: await getAiMode(),
	}),
	component: Home,
});

function Home() {
	const { aiMode } = Route.useLoaderData();

	return (
		<div className="page-gradient flex min-h-screen items-center justify-center px-6 py-16">
			<div className="w-full max-w-xl rounded-3xl bg-card p-8 shadow-xl shadow-primary/5 sm:p-10">
				<header className="mb-8 text-center">
					<div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-xl bg-white shadow-md">
						<TargetIcon className="size-6 text-primary" aria-hidden />
					</div>
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
						<span className="text-text">LinkedIn </span>
						<span className="text-primary">SWOT Analyzer</span>
					</h1>
					<p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
						Upload your LinkedIn profile PDF and get an AI-powered strategic
						breakdown tailored to your career goals.
					</p>
				</header>

				<HomeAnalysisForm aiMode={aiMode} />
			</div>
		</div>
	);
}
