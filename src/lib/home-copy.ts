/**
 * Landing page copy, Portuguese (default) and English.
 * `en` defines the shape; `pt` must match it. Consumed via useLanguage().
 */
const en = {
	header: {
		howItWorks: "How it works",
		example: "Sample review",
		pricing: "Pricing",
		faq: "FAQ",
		cta: "Get my free score",
		languageLabel: "Language",
	},
	hero: {
		eyebrow: "AI career review for LinkedIn",
		titlePre: "Your LinkedIn, reviewed for the job you ",
		titleEm: "want next",
		subtitle:
			"RHAI reads your public profile the way a recruiter does, scores it against the role you're aiming for and rewrites the sections holding you back. Results in about 30 seconds.",
		trust: [
			"Public profile only",
			"We never log in to your account",
			"Portuguese and English",
		],
	},
	form: {
		mockBanner:
			"AI mock mode. Responses are simulated and no real API calls are made.",
		usernameLabel: "Your LinkedIn username or profile URL",
		usernameHelp:
			"It's the part after /in/ in your profile link. Your profile has to be public.",
		usernameError:
			"That doesn't look like a LinkedIn username. It's the part after /in/ in your profile link, like janedoe.",
		goalLabel: "What job do you want next?",
		goalPlaceholder:
			"Senior financial analyst at an oil and gas operator in Luanda",
		goalHelp:
			'Be specific. "Move from bank accounting into FP&A in oil and gas" beats "a better job".',
		goalTooShort: "Add a bit more. Give us a role, an industry or a level.",
		goalTooLong: "Keep your goal under 500 characters.",
		goalExamples: [
			"Move from bank accounting into FP&A in oil and gas",
			"HSE coordinator at an offshore operator",
			"First audit role after graduating",
			"Branch manager at a commercial bank",
		],
		submit: "Get my free score",
		trustFree: "Free score",
		trustNoSignup: "No signup",
		trustTime: "~30 seconds",
		profileNotFound:
			"We couldn't find that profile. Check the username and make sure your profile is public.",
		analyzeFailed:
			"Something broke on our end. Your profile is fine, the review didn't finish. Try again in a few seconds.",
		genericError: "Something broke on our end. Try again in a few seconds.",
		pipeline: [
			"Finding your public profile…",
			"Reading your headline and About section…",
			"Going through your experience, one role at a time…",
			"Checking it against the job you want…",
			"Sorting strengths from gaps…",
			"Rewriting your headline…",
			"Almost there. Putting the plan in order…",
		],
		loadingNotePre: "This takes about ",
		loadingNoteTime: "15–30s",
		loadingNotePost: ". Keep this tab open.",
	},
	preview: {
		figcaption:
			"Example review of a fictional profile, Ana Domingos, aiming for a financial analyst role in oil and gas.",
		exampleBadge: "Example",
		oldHeadline: "Senior Accountant at Banco Kianda",
		newHeadline:
			"Senior accountant moving into FP&A for oil and gas | Built the cost forecast behind a $40M budget",
		location: "Luanda, Angola",
		contactInfo: "Contact info",
		openTo: "Open to",
		addSection: "Add section",
		about: "About",
		editTag: "RHAI edit",
		aboutPre: "I turn month-end numbers into decisions. At Banco Kianda I ",
		aboutHighlight: "cut the monthly close from 9 days to 5",
		aboutPost:
			" and built the cost forecast the board now uses for the annual budget.",
		experience: "Experience",
		role: "Senior Accountant",
		companyDate: "Banco Kianda · 2020 - Present",
		experienceBullet:
			"• Built the cost forecast model behind a $40M annual budget",
		profileScore: "Profile score",
		goalAlignment: "Goal alignment",
		swotFound: "found",
		quickWinLabel: "Quick win, 10 min.",
		quickWinBody: "Move the forecast model to the top of your experience.",
		skillsTitle: "Skills to add",
		skills: ["Financial modeling", "CAPEX/OPEX analysis", "Budgeting"],
	},
	stats: {
		items: [
			{ value: "30s", label: "from username to a full review" },
			{ value: "0–100", label: "profile score, with the reason behind it" },
			{ value: "4", label: "sections rewritten for your target role" },
			{ value: "Free", label: "to see your score. No signup, no card" },
		],
	},
	problem: {
		eyebrow: "Why good profiles get skipped",
		titlePre: "Most profiles are written for the job people ",
		titleEm: "already have",
		p1: "Recruiters search LinkedIn for the role they're filling: the title, the skills, the industry. If your headline and experience describe your current job, you don't show up for the next one.",
		p2: "Generic advice says “add keywords”. It never says which ones, or for which role.",
		p3: "RHAI starts from the job you want and works backwards: what a recruiter for that role looks for, what your profile already proves, and what's missing.",
	},
	howItWorks: {
		eyebrow: "How it works",
		title: "Three steps. About thirty seconds.",
		steps: [
			{
				title: "Share your profile and your goal",
				body: "Your LinkedIn username and the role you want, in a sentence or two. No account, no upload.",
			},
			{
				title: "We review it like a recruiter would",
				body: "Headline, About, experience, education and skills, each checked against what that role asks for.",
			},
			{
				title: "Get the diagnosis and the rewrites",
				body: "A score, a SWOT, a ranked plan and new text for each section, in a LinkedIn-style preview with copy buttons.",
			},
		],
	},
	valueStack: {
		eyebrow: "What you get",
		title: "A complete career review, not a checklist",
		subtitle:
			"Every line is written for the goal you set. Change the goal and the review changes with it.",
		diagnosisLabel: "The diagnosis",
		rewritesLabel: "The rewrites",
		diagnosis: [
			{
				title: "Profile score",
				body: "A score from 0 to 100, so you know your starting point before you change anything.",
			},
			{
				title: "Goal alignment",
				body: "How close your profile is to the target role, out of 10, and what's missing.",
			},
			{
				title: "SWOT analysis",
				body: "Up to five strengths, weaknesses, opportunities and threats, each with a reason.",
			},
			{
				title: "Ranked action plan",
				body: 'Every suggestion tagged by priority, with a timeframe like "This week".',
			},
			{
				title: "Quick wins",
				body: "A short checklist you can finish in ten minutes today.",
			},
		],
		rewrites: [
			{
				title: "Headline",
				body: "Rebuilt around the words recruiters search for your target role.",
			},
			{
				title: "About section",
				body: "Connects what you've done to what you want to do next.",
			},
			{
				title: "Experience",
				body: "Your roles rewritten around outcomes that matter for the goal.",
			},
			{
				title: "Skills and keywords",
				body: "Skills your profile supports and terms the role commonly needs.",
			},
			{
				title: "A first post",
				body: "A draft LinkedIn post that tells your network where you're heading.",
			},
		],
		banner:
			"Career coaches charge by the hour for this kind of review. With RHAI the score is free and the full review is a single payment.",
		cta: "Get my free score",
	},
	example: {
		eyebrow: "Sample review · fictional profile",
		title: "Same experience. A profile that reads like the next job.",
		intro:
			'Ana Domingos is a senior accountant at a commercial bank. Her goal: "Move into a financial planning and analysis (FP&A) role at an oil and gas operator."',
		before: "Before",
		after: "After",
		beforeText: "Senior Accountant at Banco Kianda",
		afterText:
			"Senior accountant moving into FP&A for oil and gas | Built the cost forecast behind a $40M budget | IFRS, financial modeling, Power BI",
		explanation:
			"Nothing invented. The rewrite pulls the forecast model and the faster close out of her experience section and puts them where an oil and gas finance recruiter looks first.",
		cards: [
			{
				label: "Goal alignment",
				text: "5/10. Solid accounting record, but nothing on the profile says forecasting, budgeting or energy yet.",
			},
			{
				label: "Weakness",
				text: "Her bullets describe bookkeeping tasks, not the decisions her numbers drove or the money they moved.",
			},
			{
				label: "Quick win",
				text: "Put the forecast model first, with the budget size and who uses it.",
			},
		],
		cta: "Run my review",
	},
	testimonials: {
		eyebrow: "Early users",
		title: "What changed after the review",
		ratingLabel: "Rated 5 out of 5",
	},
	personas: {
		eyebrow: "Who it's for",
		titlePre: "For professionals with a ",
		titleEm: "next move",
		titlePost: " in mind",
		items: [
			{
				title: "Job seekers",
				body: "Line up your profile with the roles you're applying to, before the recruiter looks.",
			},
			{
				title: "Career changers",
				body: "Turn experience from your old field into proof for the new one.",
			},
			{
				title: "Recent graduates",
				body: 'Get a headline and About section that say more than "student at...".',
			},
			{
				title: "Senior professionals",
				body: "Tell a leadership story that matches director and VP searches.",
			},
		],
	},
	pricing: {
		eyebrow: "Pricing",
		titlePre: "Start free. ",
		titleEm: "Pay only for the fixes.",
		subtitle:
			"Every review shows your score, goal alignment, strengths and two quick wins at no cost. Unlock the rest with one of two plans.",
		regionLabel: "Prices for",
		free: {
			name: "Always free",
			tagline: "Included with every review.",
			features: [
				"Profile score out of 100",
				"Goal alignment out of 10",
				"Your strengths and 2 quick wins",
				"A shareable score card",
			],
		},
		cta: "Start with a free review",
		note: "You choose a plan after you see your free score.",
		guarantee: "One-off payments. No subscription, no account.",
	},
	teams: {
		eyebrow: "For universities and employers",
		title: "Bring RHAI to your graduates or your team.",
		items: [
			{
				title: "Universities and institutes",
				body: "A yearly licence for your final-year students, plus a career week workshop. Track the class's average score before and after.",
			},
			{
				title: "Banks, telecoms and oil services",
				body: "LinkedIn audits for sales teams, relationship managers and leadership, with a team dashboard and per-seat pricing.",
			},
			{
				title: "Recruiters and outplacement",
				body: "Offer RHAI under your brand and give every candidate a review before their profile goes to a client.",
			},
		],
		cta: "Talk to us",
		email: "equipas@redline.ao",
	},
	faq: {
		eyebrow: "FAQ",
		title: "Questions, answered",
		items: [
			{
				q: "What's free and what do I pay for?",
				a: "The score, goal alignment, your strengths and two quick wins are free on every review, no card needed. The full review unlocks the rest of the SWOT, the ranked plan, the rewrites, recruiter keywords and the CV export for one profile and one goal. The Career pass does the same for every review you run in 30 days and adds job ad matching, cover letters and a post plan.",
			},
			{
				q: "Which plan should I pick?",
				a: "If you want one review for one goal, take the full review. If you plan to edit your profile and check the score again, compare two goals, or apply to several jobs this month, the Career pass costs about the same as two reviews and covers all of it.",
			},
			{
				q: "What do you read, and what do you keep?",
				a: "Only your public LinkedIn profile: headline, About, experience, education and skills. We never log in as you and can't see messages, connections or anything private. An AI model processes the profile and your goal to write the review. We save the profile data and the review so the results page loads in your browser. There's no account. A free review isn't tied to your name or email. If you pay, the review is linked to the email you give at checkout.",
			},
			{
				q: "My profile is private. Will it work?",
				a: "No. We can only read what LinkedIn shows logged-out visitors. If we can't find your profile, open LinkedIn's public profile settings, make it visible, and try again.",
			},
			{
				q: "How accurate is it?",
				a: "It's an AI review, so treat it as a strong first draft, not a verdict. The model works from what's on your profile and is told not to invent employers or credentials. Still, read every line before you paste it, especially numbers and skills.",
			},
			{
				q: "Will the rewrites sound like me?",
				a: "They're written in a clear, professional tone. Most people keep the structure and keywords and change a few words to sound like themselves.",
			},
			{
				q: "Does it change my LinkedIn profile?",
				a: "No. We never touch your account. You copy what you like and paste it in yourself.",
			},
		],
	},
	finalCta: {
		title: "See your profile the way the next recruiter will.",
		body: "One username, one goal, about 30 seconds. The score is on us.",
		cta: "Get my free score",
		footnote: "Free score. No signup. Public profile only.",
	},
	footer: {
		tagline:
			"RHAI reviews public LinkedIn profiles against your career goal. Not affiliated with or endorsed by LinkedIn.",
		product: "Product",
		contact: "Contact",
		rights: "All rights reserved.",
		photoCreditPre: "Example banner photo: ",
		photoCreditPost: ", cropped.",
	},
};

export type HomeCopy = typeof en;

const pt: HomeCopy = {
	header: {
		howItWorks: "Como funciona",
		example: "Exemplo",
		pricing: "Preços",
		faq: "Perguntas",
		cta: "Ver a minha pontuação",
		languageLabel: "Idioma",
	},
	hero: {
		eyebrow: "Análise de carreira com IA para o LinkedIn",
		titlePre: "O seu LinkedIn, revisto para o emprego que ",
		titleEm: "quer a seguir",
		subtitle:
			"O RHAI lê o seu perfil público como um recrutador, avalia-o face ao cargo que procura e reescreve as secções que o estão a travar. Resultados em cerca de 30 segundos.",
		trust: [
			"Apenas perfis públicos",
			"Nunca entramos na sua conta",
			"Português e inglês",
		],
	},
	form: {
		mockBanner:
			"Modo de simulação. As respostas são simuladas e não são feitas chamadas reais à API.",
		usernameLabel: "O seu nome de utilizador ou URL do perfil do LinkedIn",
		usernameHelp:
			"É a parte depois de /in/ no link do seu perfil. O perfil tem de ser público.",
		usernameError:
			"Isto não parece um nome de utilizador do LinkedIn. É a parte depois de /in/ no link do perfil, como janedoe.",
		goalLabel: "Qual é o próximo emprego que quer?",
		goalPlaceholder:
			"Analista financeiro sénior numa operadora de petróleo e gás em Luanda",
		goalHelp:
			"Seja específico. «Passar da contabilidade num banco para FP&A em petróleo e gás» vale mais do que «um emprego melhor».",
		goalTooShort: "Diga um pouco mais. Indique um cargo, uma área ou um nível.",
		goalTooLong: "Mantenha o objetivo abaixo de 500 caracteres.",
		goalExamples: [
			"Passar da contabilidade num banco para FP&A em petróleo e gás",
			"Coordenador de HSE numa operadora offshore",
			"Primeiro emprego em auditoria depois do curso",
			"Gerente de agência num banco comercial",
		],
		submit: "Ver a minha pontuação grátis",
		trustFree: "Pontuação grátis",
		trustNoSignup: "Sem registo",
		trustTime: "~30 segundos",
		profileNotFound:
			"Não encontrámos esse perfil. Confirme o nome de utilizador e verifique se o perfil é público.",
		analyzeFailed:
			"Algo falhou do nosso lado. O seu perfil está bem, a análise é que não terminou. Tente novamente dentro de alguns segundos.",
		genericError:
			"Algo falhou do nosso lado. Tente novamente dentro de alguns segundos.",
		pipeline: [
			"A procurar o seu perfil público…",
			"A ler o seu título e a secção Sobre…",
			"A analisar a sua experiência, cargo a cargo…",
			"A comparar com o emprego que quer…",
			"A separar pontos fortes de lacunas…",
			"A reescrever o seu título…",
			"Quase pronto. A organizar o plano…",
		],
		loadingNotePre: "Demora cerca de ",
		loadingNoteTime: "15–30s",
		loadingNotePost: ". Não feche este separador.",
	},
	preview: {
		figcaption:
			"Exemplo de análise de um perfil fictício, Ana Domingos, com o objetivo de ser analista financeira em petróleo e gás.",
		exampleBadge: "Exemplo",
		oldHeadline: "Contabilista Sénior no Banco Kianda",
		newHeadline:
			"Contabilista sénior a caminho de FP&A em petróleo e gás | Criei a previsão de custos de um orçamento de 40 M USD",
		location: "Luanda, Angola",
		contactInfo: "Informações de contacto",
		openTo: "Disponível",
		addSection: "Adicionar secção",
		about: "Sobre",
		editTag: "Edição RHAI",
		aboutPre: "Transformo os números do fecho em decisões. No Banco Kianda ",
		aboutHighlight: "reduzi o fecho mensal de 9 para 5 dias",
		aboutPost:
			" e criei a previsão de custos que a administração usa no orçamento anual.",
		experience: "Experiência",
		role: "Contabilista Sénior",
		companyDate: "Banco Kianda · 2020 - Presente",
		experienceBullet:
			"• Criei o modelo de previsão de custos de um orçamento anual de 40 M USD",
		profileScore: "Pontuação do perfil",
		goalAlignment: "Alinhamento com o objetivo",
		swotFound: "encontrados",
		quickWinLabel: "Melhoria rápida, 10 min.",
		quickWinBody: "Ponha o modelo de previsão no topo da experiência.",
		skillsTitle: "Competências a adicionar",
		skills: ["Modelação financeira", "Análise de CAPEX/OPEX", "Orçamentação"],
	},
	stats: {
		items: [
			{ value: "30s", label: "do nome de utilizador à análise completa" },
			{
				value: "0–100",
				label: "pontuação do perfil, com o motivo de cada nota",
			},
			{ value: "4", label: "secções reescritas para o cargo que quer" },
			{ value: "0 Kz", label: "para ver a pontuação. Sem registo, sem cartão" },
		],
	},
	problem: {
		eyebrow: "Porque é que bons perfis passam despercebidos",
		titlePre: "A maioria dos perfis foi escrita para o emprego que ",
		titleEm: "já tem",
		p1: "Os recrutadores pesquisam no LinkedIn pelo cargo que querem preencher: o título, as competências, o setor. Se o seu título e a sua experiência descrevem o emprego atual, não aparece para o próximo.",
		p2: "Os conselhos genéricos dizem «use palavras-chave». Nunca dizem quais, nem para que cargo.",
		p3: "O RHAI parte do emprego que quer e trabalha ao contrário: o que um recrutador desse cargo procura, o que o seu perfil já comprova e o que falta.",
	},
	howItWorks: {
		eyebrow: "Como funciona",
		title: "Três passos. Cerca de trinta segundos.",
		steps: [
			{
				title: "Partilhe o perfil e o objetivo",
				body: "O seu nome de utilizador do LinkedIn e o cargo que quer, numa frase ou duas. Sem conta, sem ficheiros.",
			},
			{
				title: "Analisamos como um recrutador",
				body: "Título, Sobre, experiência, formação e competências, tudo comparado com o que esse cargo pede.",
			},
			{
				title: "Receba o diagnóstico e os textos novos",
				body: "Uma pontuação, uma SWOT, um plano por prioridades e texto novo para cada secção, numa pré-visualização estilo LinkedIn com botões de copiar.",
			},
		],
	},
	valueStack: {
		eyebrow: "O que recebe",
		title: "Uma análise de carreira completa, não uma lista de dicas",
		subtitle:
			"Cada linha é escrita para o objetivo que indicou. Mude o objetivo e a análise muda com ele.",
		diagnosisLabel: "O diagnóstico",
		rewritesLabel: "Os textos novos",
		diagnosis: [
			{
				title: "Pontuação do perfil",
				body: "Uma nota de 0 a 100, para saber o ponto de partida antes de mudar o que quer que seja.",
			},
			{
				title: "Alinhamento com o objetivo",
				body: "A distância entre o seu perfil e o cargo que quer, de 0 a 10, e o que falta.",
			},
			{
				title: "Análise SWOT",
				body: "Até cinco pontos fortes, pontos fracos, oportunidades e ameaças, cada um com um motivo.",
			},
			{
				title: "Plano de ação por prioridades",
				body: "Cada sugestão marcada por prioridade, com um prazo como «Esta semana».",
			},
			{
				title: "Melhorias rápidas",
				body: "Uma lista curta que consegue terminar hoje em dez minutos.",
			},
		],
		rewrites: [
			{
				title: "Título",
				body: "Reconstruído com as palavras que os recrutadores pesquisam para esse cargo.",
			},
			{
				title: "Secção Sobre",
				body: "Liga o que já fez ao que quer fazer a seguir.",
			},
			{
				title: "Experiência",
				body: "Os seus cargos reescritos à volta de resultados que interessam ao objetivo.",
			},
			{
				title: "Competências e palavras-chave",
				body: "Competências que o perfil comprova e termos que o cargo costuma pedir.",
			},
			{
				title: "Um primeiro post",
				body: "Um rascunho de post que mostra à sua rede para onde vai.",
			},
		],
		banner:
			"Um coach de carreira cobra à hora por este tipo de análise. Com o RHAI a pontuação é grátis e a análise completa é um pagamento único.",
		cta: "Ver a minha pontuação grátis",
	},
	example: {
		eyebrow: "Exemplo de análise · perfil fictício",
		title: "A mesma experiência. Um perfil que já soa ao próximo emprego.",
		intro:
			"A Ana Domingos é contabilista sénior num banco comercial. O objetivo dela: «Passar para uma função de planeamento e análise financeira (FP&A) numa operadora de petróleo e gás.»",
		before: "Antes",
		after: "Depois",
		beforeText: "Contabilista Sénior no Banco Kianda",
		afterText:
			"Contabilista sénior a caminho de FP&A em petróleo e gás | Criei a previsão de custos de um orçamento de 40 M USD | IFRS, modelação financeira, Power BI",
		explanation:
			"Nada inventado. A nova versão tira o modelo de previsão e o fecho mais rápido da secção de experiência e coloca-os onde um recrutador de finanças do setor petrolífero olha primeiro.",
		cards: [
			{
				label: "Alinhamento com o objetivo",
				text: "5/10. Bom percurso em contabilidade, mas nada no perfil fala ainda de previsão, orçamento ou energia.",
			},
			{
				label: "Ponto fraco",
				text: "Os pontos descrevem tarefas de contabilidade, não as decisões que os números dela apoiaram nem o dinheiro que movimentaram.",
			},
			{
				label: "Melhoria rápida",
				text: "Pôr o modelo de previsão em primeiro lugar, com o valor do orçamento e quem o usa.",
			},
		],
		cta: "Analisar o meu perfil",
	},
	testimonials: {
		eyebrow: "Primeiros utilizadores",
		title: "O que mudou depois da análise",
		ratingLabel: "Avaliação de 5 em 5",
	},
	personas: {
		eyebrow: "Para quem é",
		titlePre: "Para profissionais com o ",
		titleEm: "próximo passo",
		titlePost: " em mente",
		items: [
			{
				title: "Quem procura emprego",
				body: "Alinhe o perfil com as vagas a que se candidata, antes de o recrutador olhar.",
			},
			{
				title: "Quem muda de carreira",
				body: "Transforme a experiência da área antiga em prova para a nova.",
			},
			{
				title: "Recém-licenciados",
				body: "Tenha um título e uma secção Sobre que dizem mais do que «estudante em...».",
			},
			{
				title: "Profissionais sénior",
				body: "Conte uma história de liderança à altura das pesquisas de diretores e VPs.",
			},
		],
	},
	pricing: {
		eyebrow: "Preços",
		titlePre: "Comece grátis. ",
		titleEm: "Pague só pelas correções.",
		subtitle:
			"Cada análise mostra grátis a pontuação, o alinhamento com o objetivo, os pontos fortes e duas melhorias rápidas. Desbloqueie o resto com um de dois planos.",
		regionLabel: "Preços para",
		free: {
			name: "Sempre grátis",
			tagline: "Incluído em todas as análises.",
			features: [
				"Pontuação do perfil de 0 a 100",
				"Alinhamento com o objetivo de 0 a 10",
				"Pontos fortes e 2 melhorias rápidas",
				"Cartão de pontuação para partilhar",
			],
		},
		cta: "Começar com uma análise grátis",
		note: "Escolhe o plano depois de ver a sua pontuação grátis.",
		guarantee: "Pagamentos únicos. Sem subscrição, sem conta.",
	},
	teams: {
		eyebrow: "Para universidades e empresas",
		title: "Leve o RHAI aos seus finalistas ou à sua equipa.",
		items: [
			{
				title: "Universidades e institutos",
				body: "Licença anual para os finalistas e um workshop na semana da carreira. Acompanhe a pontuação média da turma antes e depois.",
			},
			{
				title: "Bancos, telecomunicações e serviços petrolíferos",
				body: "Auditoria de LinkedIn para equipas comerciais, gestores de clientes e direção, com painel de equipa e preço por lugar.",
			},
			{
				title: "Recrutadoras e outplacement",
				body: "Ofereça o RHAI com a sua marca e dê a cada candidato uma análise antes de o perfil seguir para o cliente.",
			},
		],
		cta: "Fale connosco",
		email: "equipas@redline.ao",
	},
	faq: {
		eyebrow: "Perguntas",
		title: "Perguntas frequentes",
		items: [
			{
				q: "O que é grátis e o que pago?",
				a: "A pontuação, o alinhamento com o objetivo, os pontos fortes e duas melhorias rápidas são grátis em todas as análises, sem cartão. A análise completa desbloqueia o resto da SWOT, o plano, os textos reescritos, as palavras-chave e o CV para um perfil e um objetivo. O Passe Carreira faz o mesmo em todas as análises durante 30 dias e junta comparação com anúncios de emprego, cartas de apresentação e um plano de publicações.",
			},
			{
				q: "Que plano devo escolher?",
				a: "Se quer uma análise para um objetivo, escolha a análise completa. Se vai editar o perfil e voltar a medir a pontuação, comparar dois objetivos ou candidatar-se a várias vagas este mês, o Passe Carreira custa cerca de duas análises e cobre tudo isso.",
			},
			{
				q: "O que leem e o que guardam?",
				a: "Apenas o seu perfil público do LinkedIn: título, Sobre, experiência, formação e competências. Nunca entramos na sua conta e não vemos mensagens, ligações nem nada privado. Um modelo de IA processa o perfil e o seu objetivo para escrever a análise. Guardamos os dados do perfil e a análise para a página de resultados carregar no seu navegador. Não há conta. Uma análise grátis não fica ligada ao seu nome nem ao seu e-mail. Se pagar, a análise fica ligada ao e-mail que indicar no pagamento.",
			},
			{
				q: "O meu perfil é privado. Funciona?",
				a: "Não. Só conseguimos ler o que o LinkedIn mostra a visitantes sem sessão iniciada. Se não encontrarmos o seu perfil, abra as definições de perfil público do LinkedIn, torne-o visível e tente novamente.",
			},
			{
				q: "Qual é a precisão?",
				a: "É uma análise de IA, por isso trate-a como um bom primeiro rascunho, não como um veredito. O modelo trabalha com o que está no perfil e tem instruções para não inventar empregadores nem credenciais. Ainda assim, leia cada linha antes de a colar, sobretudo números e competências.",
			},
			{
				q: "Os textos novos vão soar a mim?",
				a: "São escritos num tom claro e profissional. A maioria das pessoas mantém a estrutura e as palavras-chave e muda algumas palavras para soar a si.",
			},
			{
				q: "Isto muda o meu perfil do LinkedIn?",
				a: "Não. Nunca mexemos na sua conta. Copia o que quiser e cola você mesmo.",
			},
		],
	},
	finalCta: {
		title: "Veja o seu perfil como o próximo recrutador o vai ver.",
		body: "Um nome de utilizador, um objetivo, cerca de 30 segundos. A pontuação é por nossa conta.",
		cta: "Ver a minha pontuação grátis",
		footnote: "Pontuação grátis. Sem registo. Apenas perfis públicos.",
	},
	footer: {
		tagline:
			"O RHAI analisa perfis públicos do LinkedIn face ao seu objetivo de carreira. Não é afiliado nem apoiado pelo LinkedIn.",
		product: "Produto",
		contact: "Contacto",
		rights: "Todos os direitos reservados.",
		photoCreditPre: "Foto do banner de exemplo: ",
		photoCreditPost: ", recortada.",
	},
};

export const homeCopy = { en, pt } as const;
