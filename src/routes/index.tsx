import { createFileRoute } from "@tanstack/react-router";
import { HomeAnalysisForm } from "#/components/HomeAnalysisForm";
import { HeroPreviewCard } from "#/components/home/HeroPreviewCard";
import {
	ExampleSection,
	FaqSection,
	FinalCtaSection,
	HowItWorksSection,
	PersonasSection,
	ProblemSection,
	SiteFooter,
	ValueStackSection,
} from "#/components/home/LandingSections";
import { SiteHeader } from "#/components/home/SiteHeader";
import { StatsBand } from "#/components/home/StatsBand";
import { TestimonialsSection } from "#/components/home/TestimonialsSection";
import { useLanguage } from "#/lib/i18n";
import { getAiMode } from "#/server/ai-mode";

export const Route = createFileRoute("/")({
	loader: async () => ({
		aiMode: await getAiMode(),
	}),
	component: Home,
});

function Home() {
	const { aiMode } = Route.useLoaderData();
	const { copy } = useLanguage();

	return (
		<div className="min-h-screen overflow-x-clip">
			<SiteHeader />

			<main>
				<section className="paper-grid relative">
					<div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-start gap-12 px-4 pt-10 pb-20 sm:px-6 sm:pt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16 lg:pt-16 lg:pb-24">
						<div>
							<p
								className="animate-rise mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs font-medium tracking-wide text-muted uppercase"
								style={{ "--i": 0 } as React.CSSProperties}
							>
								<span
									className="size-1.5 rounded-full bg-primary"
									aria-hidden
								/>
								{copy.hero.eyebrow}
							</p>
							<h1
								className="animate-rise font-display text-[2.5rem] leading-[1.02] font-semibold text-balance text-ink sm:text-6xl lg:text-[3.9rem]"
								style={{ "--i": 1 } as React.CSSProperties}
							>
								{copy.hero.titlePre}
								<span className="highlight highlight-animate italic">
									{copy.hero.titleHighlight}
								</span>
							</h1>
							<p
								className="animate-rise mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
								style={{ "--i": 2 } as React.CSSProperties}
							>
								{copy.hero.subtitle}
							</p>

							<div
								id="review"
								className="animate-rise mt-8 rounded-xl border border-border bg-surface p-5 shadow-card sm:p-7"
								style={{ "--i": 3 } as React.CSSProperties}
							>
								<HomeAnalysisForm aiMode={aiMode} />
							</div>
						</div>

						<div
							className="animate-rise lg:sticky lg:top-28 lg:mt-14"
							style={{ "--i": 4 } as React.CSSProperties}
						>
							<HeroPreviewCard />
						</div>
					</div>
				</section>

				<StatsBand />
				<ProblemSection />
				<HowItWorksSection />
				<ValueStackSection />
				<ExampleSection />
				<TestimonialsSection />
				<PersonasSection />
				<FaqSection />
				<FinalCtaSection />
			</main>

			<SiteFooter />
		</div>
	);
}
