import { createFileRoute } from "@tanstack/react-router";
import { HomeAnalysisForm } from "#/components/HomeAnalysisForm";
import { HeroPreviewCard } from "#/components/home/HeroPreviewCard";
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
				<section className="paper-grid relative border-b border-border">
					<div className="mx-auto max-w-7xl px-4 pt-8 sm:px-8 sm:pt-12">
						<div
							className="animate-rise flex items-center justify-between gap-4 border-b border-ink pb-3"
							style={{ "--i": 0 } as React.CSSProperties}
						>
							<p className="kicker text-ink">{copy.hero.eyebrow}</p>
							<p className="kicker hidden sm:block">
								{copy.form.trustNoSignup} · {copy.form.trustTime}
							</p>
						</div>
						<h1
							className="animate-rise mt-8 max-w-6xl font-display text-[2.9rem] leading-[0.98] text-balance text-ink sm:mt-12 sm:text-7xl lg:text-[6.4rem]"
							style={{ "--i": 1 } as React.CSSProperties}
						>
							{copy.hero.titlePre}
							<em className="text-pen">{copy.hero.titleHighlight}</em>.
						</h1>

						<div className="grid grid-cols-[minmax(0,1fr)] gap-12 pt-10 pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-0 lg:pb-24">
							<div className="lg:col-span-5 lg:pr-12">
								<p
									className="animate-rise max-w-md text-lg leading-relaxed text-muted sm:text-xl"
									style={{ "--i": 2 } as React.CSSProperties}
								>
									{copy.hero.subtitle}
								</p>

								<div
									id="review"
									className="animate-rise mt-10 border-t-2 border-ink pt-6"
									style={{ "--i": 3 } as React.CSSProperties}
								>
									<HomeAnalysisForm aiMode={aiMode} />
								</div>
							</div>

							<div
								className="animate-rise lg:col-span-7 lg:border-l lg:border-border lg:pl-12"
								style={{ "--i": 4 } as React.CSSProperties}
							>
								<p className="kicker mb-4 flex items-center gap-3">
									<span className="text-pen">Fig. 1</span>
									<span className="h-px flex-1 bg-border" aria-hidden />
									{copy.preview.exampleBadge}
								</p>
								<HeroPreviewCard />
							</div>
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
