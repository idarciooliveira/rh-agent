import type { Language } from "#/lib/i18n";
import type { Plan } from "#/lib/pricing";

type PlanCopy = {
	name: string;
	tagline: string;
	period: string;
	features: string[];
	badge?: string;
};

/** Plan names and feature lists, shared by the landing page and checkout. */
export const planCopy: Record<Language, Record<Plan, PlanCopy>> = {
	en: {
		report: {
			name: "Full review",
			tagline: "One profile, one goal, every fix.",
			period: "one-off",
			features: [
				"The complete SWOT, with a reason for every point",
				"An action plan ranked by impact",
				"New headline, About and experience, ready to paste",
				"Recruiter keywords for your target role",
				"Portuguese and English versions",
				"CV export to PDF",
			],
		},
		pass30: {
			name: "Career pass",
			tagline: "30 days of reviews and job tools.",
			period: "30 days",
			badge: "Best value",
			features: [
				"Everything in the full review, on every review",
				"Unlimited reviews for 30 days",
				"Score progress after each round of edits",
				"Job ad matching with a fit score",
				"A tailored cover letter for each job",
				"A 4-week LinkedIn post plan",
			],
		},
	},
	pt: {
		report: {
			name: "Análise completa",
			tagline: "Um perfil, um objetivo, todas as correções.",
			period: "pagamento único",
			features: [
				"A SWOT completa, com o motivo de cada ponto",
				"Plano de ação ordenado por impacto",
				"Título, Sobre e experiência novos, prontos a colar",
				"Palavras-chave que os recrutadores procuram",
				"Versões em português e inglês",
				"Exportar CV em PDF",
			],
		},
		pass30: {
			name: "Passe Carreira",
			tagline: "30 dias de análises e ferramentas de candidatura.",
			period: "30 dias",
			badge: "Melhor valor",
			features: [
				"Tudo da análise completa, em todas as análises",
				"Análises ilimitadas durante 30 dias",
				"Evolução da pontuação depois de cada ronda de edições",
				"Comparação com anúncios de emprego e grau de adequação",
				"Carta de apresentação para cada vaga",
				"Plano de publicações no LinkedIn para 4 semanas",
			],
		},
	},
};
