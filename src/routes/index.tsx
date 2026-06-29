import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-16">
			<header className="mb-12">
				<p className="text-sm font-medium uppercase tracking-wider text-sky-400">
					Phase 0 — Foundation
				</p>
				<h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
					LinkedIn Coach Agent
				</h1>
				<p className="mt-4 text-lg leading-relaxed text-slate-300">
					Upload your LinkedIn profile PDF, set a career goal, and get a SWOT
					analysis with actionable profile recommendations powered by AI.
				</p>
			</header>

			<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
				<h2 className="text-xl font-semibold text-white">Coming in Phase 1</h2>
				<ul className="mt-4 space-y-2 text-slate-300">
					<li>• PDF upload with LinkedIn export instructions</li>
					<li>• Profile parsing and review</li>
					<li>• Career goal input</li>
				</ul>
				<p className="mt-6 text-sm text-slate-400">
					Your anonymous session is ready. Profile upload will be enabled in the
					next phase.
				</p>
			</section>

			<footer className="mt-auto pt-12 text-sm text-slate-500">
				See <code className="text-slate-400">docs/PRD.md</code> and{" "}
				<code className="text-slate-400">docs/ROADMAP.md</code> for the full
				plan.
			</footer>
		</div>
	);
}
