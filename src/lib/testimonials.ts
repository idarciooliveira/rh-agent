import type { Language } from "#/lib/i18n";

export type Testimonial = {
	name: string;
	/** Their LinkedIn headline or role, as they'd want it shown. */
	role: string;
	/** Path under /public, e.g. "/avatars/jane-doe.jpg". Falls back to initials. */
	avatar?: string;
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
 * The avatars are randomuser.me stock portraits, not the people named here.
 * Replace these with real quotes and photos from real users, with their
 * permission, before promoting the site — invented testimonials erode trust and can
 * break advertising rules (FTC and equivalent).
 */
export const TESTIMONIALS: Record<Language, Testimonial[]> = {
	pt: [
		{
			name: "Nzola Kitumba",
			role: "Analista de Crédito Sénior · Banca · Luanda",
			avatar: "/avatars/nzola-kitumba.jpg",
			quote:
				"O meu título dizia só «Analista de Crédito», igual a centenas de pessoas na banca. Troquei-o pela sugestão do Redline e na mesma semana recebi 3 mensagens de recrutadores.",
			result: "3 mensagens de recrutadores na primeira semana",
			date: "Setembro 2026",
		},
		{
			name: "Mário Fernandes",
			role: "Técnico de HSE offshore a caminho de Coordenador",
			avatar: "/avatars/mario-fernandes.jpg",
			quote:
				"Tinha 6 anos em plataformas e o perfil não mostrava nenhum número. A análise puxou as auditorias e as zero ocorrências para o topo. Reescrevi tudo numa tarde.",
			result: "Entrevista numa operadora 12 dias depois",
			date: "Setembro 2026",
		},
		{
			name: "Luísa Cambinda",
			role: "Recém-licenciada em Contabilidade e Auditoria",
			avatar: "/avatars/luisa-cambinda.jpg",
			quote:
				"Sem experiência, eu não sabia o que escrever no perfil. As vitórias rápidas deram-me uma lista concreta para um fim de semana, e o estágio passou a contar.",
			result: "Pontuação subiu de 41 para 78",
			date: "Outubro 2026",
		},
		{
			name: "Pedro Vasconcelos",
			role: "Especialista de Formação em RH, antes professor",
			avatar: "/avatars/pedro-vasconcelos.jpg",
			quote:
				"Usei o objetivo «sair do ensino para formação em recursos humanos». O plano mostrou como contar a minha história sem apagar 8 anos de carreira.",
			result: "2 entrevistas em 3 semanas",
			date: "Outubro 2026",
		},
	],
	en: [
		{
			name: "Nzola Kitumba",
			role: "Senior Credit Analyst · Banking · Luanda",
			avatar: "/avatars/nzola-kitumba.jpg",
			quote:
				'My headline just said "Credit Analyst", like hundreds of people in banking. I swapped in Redline\'s rewrite and got 3 recruiter messages that same week.',
			result: "3 recruiter messages in the first week",
			date: "September 2026",
		},
		{
			name: "Mário Fernandes",
			role: "Offshore HSE Technician moving into Coordinator",
			avatar: "/avatars/mario-fernandes.jpg",
			quote:
				"Six years on rigs and not one number on my profile. The review pulled the audits and zero-incident record to the top. I rewrote everything in an afternoon.",
			result: "Interview with an operator 12 days later",
			date: "September 2026",
		},
		{
			name: "Luísa Cambinda",
			role: "Recent Accounting and Audit graduate",
			avatar: "/avatars/luisa-cambinda.jpg",
			quote:
				"With no experience, I had no idea what to write on my profile. The quick wins gave me a concrete list for one weekend, and my internship finally counted.",
			result: "Score went from 41 to 78",
			date: "October 2026",
		},
		{
			name: "Pedro Vasconcelos",
			role: "HR Training Specialist, formerly a teacher",
			avatar: "/avatars/pedro-vasconcelos.jpg",
			quote:
				'I used the goal "move from teaching into HR training". The plan showed me how to tell my story without erasing 8 years of work.',
			result: "2 interviews in 3 weeks",
			date: "October 2026",
		},
	],
};
