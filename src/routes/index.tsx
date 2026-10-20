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
import { CheckIcon } from "#/lib/icons";
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
					<div
						className="hairline-grid pointer-events-none absolute inset-0"
						aria-hidden
					/>
					<div className="relative mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-start gap-12 px-4 pt-12 pb-20 sm:px-6 sm:pt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16 lg:pt-20 lg:pb-28">
						<div>
							<p
								className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-muted shadow-card"
								style={{ "--i": 0 } as React.CSSProperties}
							>
								<span
									className="size-1.5 rounded-full bg-primary"
									aria-hidden
								/>
								{copy.hero.eyebrow}
							</p>
							<h1
								className="animate-rise font-display text-[2.6rem] leading-[1.04] font-normal text-balance text-ink sm:text-6xl lg:text-[4.1rem]"
								style={{ "--i": 1 } as React.CSSProperties}
							>
								{copy.hero.titlePre}
								<em className="text-primary">{copy.hero.titleEm}</em>
							</h1>
							<p
								className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
								style={{ "--i": 2 } as React.CSSProperties}
							>
								{copy.hero.subtitle}
							</p>

							<div
								id="review"
								className="animate-rise mt-9 scroll-mt-24 rounded-2xl bg-surface p-5 shadow-lift sm:p-7"
								style={{ "--i": 3 } as React.CSSProperties}
							>
								<HomeAnalysisForm aiMode={aiMode} />
							</div>

							<ul
								className="animate-rise mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
								style={{ "--i": 4 } as React.CSSProperties}
							>
								{copy.hero.trust.map((item) => (
									<li key={item} className="inline-flex items-center gap-1.5">
										<CheckIcon className="size-4 text-primary" aria-hidden />
										{item}
									</li>
								))}
							</ul>
						</div>

						<div
							className="animate-rise lg:sticky lg:top-28 lg:mt-16"
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
				<PricingSection />
				<TeamsSection />
				<FaqSection />
				<FinalCtaSection />
			</main>

			<SiteFooter />
		</div>
	);
}
