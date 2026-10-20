import {
	createFileRoute,
	Link,
	notFound,
	redirect,
} from "@tanstack/react-router";
import { useState } from "react";
import { RhaiLogo } from "#/components/RhaiLogo";
import { ArrowLeftIcon, PrinterIcon } from "#/lib/icons";
import { getCvData } from "#/server/analysis";

export const Route = createFileRoute("/cv/$analysisId")({
	loader: async ({ params }) => {
		try {
			return await getCvData({ data: { analysisId: params.analysisId } });
		} catch (error) {
			if (error instanceof Error && error.message === "Analysis locked") {
				throw redirect({
					to: "/results/$analysisId",
					params: { analysisId: params.analysisId },
				});
			}
			if (error instanceof Error && error.message === "Analysis not found") {
				throw notFound();
			}
			throw error;
		}
	},
	head: () => ({
		meta: [{ title: "CV | RHAI" }, { name: "robots", content: "noindex" }],
	}),
	component: CvPage,
});

type CvLanguage = "pt" | "en";

const HEADINGS: Record<
	CvLanguage,
	{
		profile: string;
		experience: string;
		education: string;
		skills: string;
		certifications: string;
		present: string;
	}
> = {
	pt: {
		profile: "Perfil",
		experience: "Experiência profissional",
		education: "Formação",
		skills: "Competências",
		certifications: "Certificações",
		present: "Presente",
	},
	en: {
		profile: "Profile",
		experience: "Experience",
		education: "Education",
		skills: "Skills",
		certifications: "Certifications",
		present: "Present",
	},
};

function CvPage() {
	const { analysisId, profile, recommendations } = Route.useLoaderData();
	const alternate = recommendations.alternateLanguage;
	const primaryLanguage: CvLanguage =
		recommendations.primaryLanguage ??
		(alternate?.language === "pt" ? "en" : "pt");
	const [language, setLanguage] = useState<CvLanguage>(primaryLanguage);
	const useAlternate = alternate && language === alternate.language;
	const headline = useAlternate
		? alternate.headline
		: recommendations.headline.improved;
	const about = useAlternate ? alternate.about : recommendations.about.improved;
	const headings = HEADINGS[language];
	const bulletsByIndex = new Map(
		recommendations.experiences.map((rec) => [
			rec.index,
			rec.improvedDescription,
		]),
	);
	const skills = [
		...new Set([...profile.skills, ...recommendations.skills.suggested]),
	];

	return (
		<div className="min-h-screen bg-background print:bg-white">
			<div className="border-b border-border bg-background print:hidden">
				<div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-4 sm:px-6">
					<RhaiLogo />
					<div className="flex items-center gap-2">
						{alternate ? (
							<fieldset className="flex items-center rounded-full border border-border bg-surface p-0.5">
								<legend className="sr-only">CV language</legend>
								{(["pt", "en"] as const).map((code) => (
									<button
										key={code}
										type="button"
										onClick={() => setLanguage(code)}
										aria-pressed={language === code}
										className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold uppercase ${
											language === code
												? "bg-primary text-primary-foreground"
												: "text-muted hover:text-ink"
										}`}
									>
										{code}
									</button>
								))}
							</fieldset>
						) : null}
						<button
							type="button"
							onClick={() => window.print()}
							className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
						>
							<PrinterIcon className="size-4" aria-hidden />
							Save as PDF
						</button>
					</div>
				</div>
			</div>

			<main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 print:max-w-none print:p-0">
				<Link
					to="/results/$analysisId"
					params={{ analysisId }}
					className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink print:hidden"
				>
					<ArrowLeftIcon className="size-4" aria-hidden />
					Back to review
				</Link>

				<article className="rounded-lg bg-white p-8 text-[#191919] shadow-card sm:p-12 print:rounded-none print:p-0 print:shadow-none">
					<header className="border-b-2 border-primary pb-5">
						<h1 className="font-display text-4xl font-semibold">
							{profile.name}
						</h1>
						<p className="mt-2 text-base leading-snug">{headline}</p>
						{profile.location ? (
							<p className="mt-1 text-sm text-muted">{profile.location}</p>
						) : null}
					</header>

					<CvSection title={headings.profile}>
						<p className="text-sm leading-relaxed whitespace-pre-line">
							{about}
						</p>
					</CvSection>

					{profile.experiences.length > 0 ? (
						<CvSection title={headings.experience}>
							<ul className="space-y-5">
								{profile.experiences.map((exp, index) => {
									const bullets = bulletsByIndex.get(index);
									const end =
										exp.endDate === "Present" ? headings.present : exp.endDate;
									return (
										<li
											key={`${exp.company}-${exp.title}-${exp.startDate ?? index}`}
											className="break-inside-avoid"
										>
											<div className="flex flex-wrap items-baseline justify-between gap-x-4">
												<p className="font-semibold">
													{exp.title}, {exp.company}
												</p>
												<p className="text-sm text-muted">
													{[exp.startDate, end].filter(Boolean).join(" - ")}
												</p>
											</div>
											{bullets?.length ? (
												<ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm leading-relaxed">
													{bullets.map((bullet) => (
														<li key={bullet}>{bullet}</li>
													))}
												</ul>
											) : exp.description ? (
												<p className="mt-1.5 text-sm leading-relaxed whitespace-pre-line">
													{exp.description}
												</p>
											) : null}
										</li>
									);
								})}
							</ul>
						</CvSection>
					) : null}

					{profile.education.length > 0 ? (
						<CvSection title={headings.education}>
							<ul className="space-y-2">
								{profile.education.map((edu) => (
									<li
										key={`${edu.school}-${edu.degree ?? ""}`}
										className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm"
									>
										<span>
											<span className="font-semibold">{edu.school}</span>
											{edu.degree || edu.field
												? `, ${[edu.degree, edu.field].filter(Boolean).join(", ")}`
												: ""}
										</span>
										<span className="text-muted">
											{[edu.startDate, edu.endDate].filter(Boolean).join(" - ")}
										</span>
									</li>
								))}
							</ul>
						</CvSection>
					) : null}

					{profile.certifications.length > 0 ? (
						<CvSection title={headings.certifications}>
							<ul className="space-y-1 text-sm">
								{profile.certifications.map((cert) => (
									<li key={cert.name}>
										<span className="font-semibold">{cert.name}</span>
										{cert.issuer ? `, ${cert.issuer}` : ""}
										{cert.date ? ` (${cert.date})` : ""}
									</li>
								))}
							</ul>
						</CvSection>
					) : null}

					{skills.length > 0 ? (
						<CvSection title={headings.skills}>
							<p className="text-sm leading-relaxed">{skills.join(" · ")}</p>
						</CvSection>
					) : null}
				</article>
			</main>
		</div>
	);
}

function CvSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="mt-6">
			<h2 className="mb-2 font-mono text-xs font-semibold tracking-[0.14em] text-primary uppercase">
				{title}
			</h2>
			{children}
		</section>
	);
}
