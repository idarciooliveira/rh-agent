import { createFileRoute } from "@tanstack/react-router";
import { HomeAnalysisForm } from "#/components/HomeAnalysisForm";
import { HeroAppPreview } from "#/components/home/HeroAppPreview";
import {
	ExampleSection,
	FaqSection,
	FinalCtaSection,
	HowItWorksSection,
	PersonasSection,
	PricingSection,
	ProblemSection,
	SiteFooter,
	TeamsSection,
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
				<section className="relative overflow-hidden">
					<div className="paper-grid absolute inset-0" aria-hidden />
					<div className="relative mx-auto max-w-6xl px-4 pt-16 pb-24 text-center sm:px-6 sm:pt-24 lg:pb-32">
						<p
							className="animate-rise inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/80 py-1 pr-3 pl-1 text-xs text-muted backdrop-blur"
							style={{ "--i": 0 } as React.CSSProperties}
						>
							<span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-medium text-primary-ink uppercase">
								{copy.form.trustNoSignup}
							</span>
							{copy.hero.eyebrow}
						</p>
						<h1
							className="animate-rise text-gradient mx-auto mt-7 max-w-4xl font-display text-[2.75rem] leading-[1.02] font-semibold text-balance sm:text-6xl lg:text-[4.75rem]"
							style={{ "--i": 1 } as React.CSSProperties}
						>
							{copy.hero.titlePre}
							<span className="highlight">{copy.hero.titleHighlight}</span>
						</h1>
						<p
							className="animate-rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted"
							style={{ "--i": 2 } as React.CSSProperties}
						>
							{copy.hero.subtitle}
						</p>

						<div
							id="review"
							className="animate-rise ring-gradient mx-auto mt-10 max-w-2xl rounded-xl bg-surface/90 p-5 text-left shadow-lift backdrop-blur sm:p-6"
							style={{ "--i": 3 } as React.CSSProperties}
						>
							<HomeAnalysisForm aiMode={aiMode} />
						</div>

						<div
							className="animate-rise mt-20 sm:mt-24"
							style={{ "--i": 4 } as React.CSSProperties}
						>
							<HeroAppPreview />
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
				<PricingSection />
				<TeamsSection />
				<FaqSection />
				<FinalCtaSection />
			</main>

			<SiteFooter />
		</div>
	);
}
