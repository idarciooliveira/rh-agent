import type { Language } from "#/lib/i18n";
import type { Plan } from "#/lib/pricing";

type PlanCopy = {
	name: string;
	tagline: string;
	features: string[];
	badge?: string;
};

/** Plan names and feature lists, shared by the landing page and checkout. */
export const planCopy: Record<Language, Record<Plan, PlanCopy>> = {
	en: {
		report: {
			name: "Full review",
			tagline: "One profile, one goal.",
			features: [
				"Full SWOT and ranked action plan",
				"Rewritten headline, About and experience",
				"Recruiter keywords for your goal",
				"Portuguese and English versions",
				"CV export (PDF)",
			],
		},
		pack3: {
			name: "3-review pack",
			tagline: "Compare goals, re-check after edits.",
			badge: "Best value",
			features: [
				"Everything in the full review",
				"3 reviews to use any time",
				"Score progress between reviews",
			],
		},
		pass30: {
			name: "Job hunt pass",
			tagline: "30 days. No subscription.",
			badge: "Most popular",
			features: [
				"Unlimited reviews for 30 days",
				"Job post matching with fit score",
				"Tailored cover letter per job",
				"4-week LinkedIn post plan",
			],
		},
		human_review: {
			name: "HR consultant call",
			tagline: "30 minutes with a recruiter.",
			features: [
				"A local recruiter walks through your review",
				"Interview and salary questions answered",
				"Booked by WhatsApp within 48 hours",
			],
		},
	},
	pt: {
		report: {
			name: "Análise completa",
			tagline: "Um perfil, um objetivo.",
			features: [
				"SWOT completa e plano de ação",
				"Título, Sobre e experiência reescritos",
				"Palavras-chave que os recrutadores procuram",
				"Versões em português e inglês",
				"Exportar CV (PDF)",
			],
		},
		pack3: {
			name: "Pacote de 3",
			tagline: "Compare objetivos, reveja depois de editar.",
			badge: "Melhor preço",
			features: [
				"Tudo da análise completa",
				"3 análises para usar quando quiser",
				"Evolução da pontuação entre análises",
			],
		},
		pass30: {
			name: "Passe procura de emprego",
			tagline: "30 dias. Sem assinatura.",
			badge: "Mais escolhido",
			features: [
				"Análises ilimitadas durante 30 dias",
				"Comparação com anúncios de emprego",
				"Carta de apresentação para cada vaga",
				"Plano de publicações para 4 semanas",
			],
		},
		human_review: {
			name: "Sessão com consultor de RH",
			tagline: "30 minutos com um recrutador.",
			features: [
				"Um recrutador local explica a sua análise",
				"Perguntas sobre entrevista e salário",
				"Marcação por WhatsApp em 48 horas",
			],
		},
	},
};
