import type { Language } from "#/lib/i18n";
import type { Plan } from "#/lib/pricing";

type PlanCopy = {
	name: string;
	tagline: string;
	bestFor: string;
	period: string;
	features: string[];
	badge?: string;
};

/** Plan names and feature lists, shared by the landing page and checkout. */
export const planCopy: Record<Language, Record<Plan, PlanCopy>> = {
	en: {
		report: {
			name: "Profile Makeover",
			tagline: "Every fix for one goal. We write it, you paste it.",
			bestFor:
				"Best if you have one target role and want your profile ready today.",
			period: "one-off",
			features: [
				"Your complete SWOT, with the reason behind every point",
				"A step-by-step plan, ranked by impact",
				"New headline, About and experience, ready to paste",
				"The keywords recruiters search for your role",
				"Portuguese and English versions",
				"Your CV as a PDF, built from the new profile",
			],
		},
		pass30: {
			name: "Job Search Pass",
			tagline: "30 days of makeovers and application tools.",
			bestFor: "Best if you're applying this month. Two makeovers cost more.",
			period: "30 days",
			badge: "Best value",
			features: [
				"Unlimited Profile Makeovers for 30 days",
				"Re-score after every edit and watch the number move",
				"Paste any job ad, get your fit score and missing keywords",
				"A cover letter written for each job you apply to",
				"A 4-week LinkedIn post plan so recruiters see you're active",
				"Try a second goal and compare, at no extra cost",
			],
		},
	},
	pt: {
		report: {
			name: "Renovação do Perfil",
			tagline:
				"Todas as correções para um objetivo. Nós escrevemos, você cola.",
			bestFor: "Ideal se tem um cargo em vista e quer o perfil pronto hoje.",
			period: "pagamento único",
			features: [
				"A SWOT completa, com o motivo de cada ponto",
				"Plano passo a passo, ordenado por impacto",
				"Título, Sobre e experiência novos, prontos a colar",
				"As palavras-chave que os recrutadores pesquisam para o seu cargo",
				"Versões em português e inglês",
				"O seu CV em PDF, feito a partir do perfil novo",
			],
		},
		pass30: {
			name: "Passe Emprego",
			tagline: "30 dias de renovações e ferramentas de candidatura.",
			bestFor:
				"Ideal se se está a candidatar este mês. Duas renovações custam mais.",
			period: "30 dias",
			badge: "Melhor valor",
			features: [
				"Renovações do Perfil ilimitadas durante 30 dias",
				"Nova pontuação depois de cada edição, para ver o número subir",
				"Cole qualquer anúncio e veja a adequação e as palavras em falta",
				"Uma carta de apresentação escrita para cada vaga",
				"Plano de publicações para 4 semanas, para os recrutadores o verem ativo",
				"Experimente um segundo objetivo e compare, sem custo extra",
			],
		},
	},
};
