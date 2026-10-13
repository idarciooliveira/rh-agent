import { createFileRoute } from "@tanstack/react-router";
import { HomeAnalysisForm } from "#/components/HomeAnalysisForm";
import { HeroPeopleVisual } from "#/components/home/HeroPeopleVisual";
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

const TRUST_AVATARS = [
	"/avatars/luisa-cambinda.jpg",
	"/avatars/mario-fernandes.jpg",
	"/avatars/nzola-kitumba.jpg",
	"/avatars/pedro-vasconcelos.jpg",
];

function Home() {
	const { aiMode } = Route.useLoaderData();
	const { copy } = useLanguage();

	return (
		<div className="min-h-screen overflow-x-clip">
			<SiteHeader />

			<main>
				<section className="paper-grid relative">
					<div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-start gap-16 px-4 pt-12 pb-20 sm:px-8 sm:pt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20 lg:pb-28">
						<div>
							<p
								className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-sm font-semibold text-primary"
								style={{ "--i": 0 } as React.CSSProperties}
							>
								<span className="size-2 rounded-full bg-open" aria-hidden />
								{copy.hero.eyebrow}
							</p>
							<h1
								className="animate-rise font-display text-[2.75rem] leading-[1.04] font-bold text-balance text-ink sm:text-6xl lg:text-[4.1rem]"
								style={{ "--i": 1 } as React.CSSProperties}
							>
								{copy.hero.titlePre}
								<span className="highlight highlight-animate">
									{copy.hero.titleHighlight}
								</span>
							</h1>
							<p
								className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-muted"
								style={{ "--i": 2 } as React.CSSProperties}
							>
								{copy.hero.subtitle}
							</p>

							<div
								id="review"
								className="animate-rise mt-9 rounded-3xl border border-border bg-surface p-6 shadow-lift sm:p-8"
								style={{ "--i": 3 } as React.CSSProperties}
							>
								<HomeAnalysisForm aiMode={aiMode} />
							</div>

							<div
								className="animate-rise mt-8 flex items-center gap-4"
								style={{ "--i": 4 } as React.CSSProperties}
							>
								<div className="flex -space-x-2.5" aria-hidden>
									{TRUST_AVATARS.map((src) => (
										<img
											key={src}
											src={src}
											alt=""
											className="size-10 rounded-full border-2 border-background object-cover"
										/>
									))}
								</div>
								<p className="text-sm leading-snug text-muted">
									<span className="font-bold text-ink">
										{copy.stats.items[0]?.value}
									</span>{" "}
									{copy.stats.items[0]?.label}
								</p>
							</div>
						</div>

						<div
							className="animate-rise"
							style={{ "--i": 5 } as React.CSSProperties}
						>
							<HeroPeopleVisual />
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
