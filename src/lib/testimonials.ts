import type { Language } from "#/lib/i18n";

export type Testimonial = {
	name: string;
	/** Their LinkedIn headline or role, as they'd want it shown. */
	role: string;
	quote: string;
	/** Optional concrete result, e.g. "3 recruiter messages in the first week". */
	result?: string;
	/** Month the feedback was given, e.g. "October 2026". */
	date: string;
	/** Public LinkedIn URL, so visitors can check the person is real. */
	linkedinUrl?: string;
};

/**
 * SAMPLE entries so the section renders while we collect real feedback.
 * Replace these with real quotes from real users, with their permission,
 * before promoting the site — invented testimonials erode trust and can
 * break advertising rules (FTC and equivalent).
 */
export const TESTIMONIALS: Record<Language, Testimonial[]> = {
	pt: [
		{
			name: "Nzola Kitumba",
			role: "Gestora de Produto · Luanda",
			quote:
				"O meu título era igual ao de milhares de pessoas. Troquei-o pela sugestão do Redline e na mesma semana recebi 3 mensagens de recrutadores.",
			result: "3 mensagens de recrutadores na primeira semana",
			date: "Setembro 2026",
		},
		{
			name: "Mário Fernandes",
			role: "Engenheiro Backend a caminho de DevOps",
			quote:
				"A análise apontou exatamente onde a minha experiência já provava competências de DevOps. Reescrevi a secção Sobre em 20 minutos.",
			result: "Primeira entrevista 12 dias depois",
			date: "Setembro 2026",
		},
		{
			name: "Luísa Cambinda",
			role: "Recém-licenciada em Gestão",
			quote:
				"Sem experiência, eu não sabia o que escrever no perfil. As vitórias rápidas deram-me uma lista concreta para um fim de semana.",
			result: "Pontuação subiu de 41 para 78",
			date: "Outubro 2026",
		},
		{
			name: "Pedro Vasconcelos",
			role: "Designer Instrucional, antes professor",
			quote:
				"Usei o objetivo «sair do ensino para design instrucional». O plano mostrou como contar a minha história sem apagar 8 anos de carreira.",
			result: "2 entrevistas em 3 semanas",
			date: "Outubro 2026",
		},
	],
	en: [
		{
			name: "Nzola Kitumba",
			role: "Product Manager · Luanda",
			quote:
				"My headline sounded like thousands of others. I swapped in Redline's rewrite and got 3 recruiter messages that same week.",
			result: "3 recruiter messages in the first week",
			date: "September 2026",
		},
		{
			name: "Mário Fernandes",
			role: "Backend Engineer moving into DevOps",
			quote:
				"The review pointed out exactly where my experience already proved DevOps skills. I rewrote my About section in 20 minutes.",
			result: "First interview 12 days later",
			date: "September 2026",
		},
		{
			name: "Luísa Cambinda",
			role: "Recent Management graduate",
			quote:
				"With no experience, I had no idea what to write on my profile. The quick wins gave me a concrete list for one weekend.",
			result: "Score went from 41 to 78",
			date: "October 2026",
		},
		{
			name: "Pedro Vasconcelos",
			role: "Instructional Designer, formerly a teacher",
			quote:
				'I used the goal "move from teaching into instructional design". The plan showed me how to tell my story without erasing 8 years of work.',
			result: "2 interviews in 3 weeks",
			date: "October 2026",
		},
	],
};
