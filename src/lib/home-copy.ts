/**
 * Landing page copy, Portuguese (default) and English.
 * `en` defines the shape; `pt` must match it. Consumed via useLanguage().
 */
const en = {
	header: {
		howItWorks: "How it works",
		example: "Example",
		cta: "Review my profile",
		languageLabel: "Language",
	},
	hero: {
		eyebrow: "Free LinkedIn profile review",
		titlePre: "Fix your profile for the job you ",
		titleHighlight: "actually want",
		subtitle:
			"Enter your LinkedIn username and the role you're after. In about 30 seconds you get a score, a SWOT built around that goal, and rewrites you can paste in.",
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
		submit: "Review my profile",
		trustFree: "Free",
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
			"Rewriting your headline. This is the fun part.",
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
		editTag: "Redline edit",
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
			{ value: "4×", label: "more likely to land a first interview" },
			{ value: "30s", label: "from username to results" },
			{ value: "5/hr", label: "free reviews, no signup" },
		],
	},
	problem: {
		eyebrow: "The problem",
		titlePre: "Your profile was written for the job you ",
		titleEm: "have",
		p1: "You've applied to 30 roles and heard back from two. You rewrote your headline three times and it still sounds like everyone else's. Every LinkedIn tip you find is the same list: add a photo, use keywords, be authentic.",
		p2: "None of it says which keywords, or for which job.",
		p3: "Recruiters search for the role they're filling. If your headline, About section and bullets describe your last job, you don't show up for the next one. You can't see the gap from the inside.",
	},
	howItWorks: {
		eyebrow: "How it works",
		title: "Username in, rewrites out.",
		steps: [
			{
				title: "Tell us who you are and where you're going.",
				body: "Your LinkedIn username, plus the role you want in a sentence or two.",
			},
			{
				title: "We read your public profile and grade it against that goal.",
				body: "Headline, About, experience, education and skills, all checked against what that role needs.",
			},
			{
				title: "You get the review and the rewrites.",
				body: "A score, a SWOT, a prioritized plan, and new text for each section, in a LinkedIn-style preview with copy buttons.",
			},
		],
	},
	valueStack: {
		eyebrow: "What you get",
		titlePre: "What you get in ",
		titleHighlight: "one review",
		subtitle:
			"Every item is written for the goal you typed. Change the goal and you get a different review.",
		diagnosisLabel: "The diagnosis",
		rewritesLabel: "The rewrites",
		diagnosis: [
			{
				title: "Know where you stand",
				body: "A profile score from 0 to 100, so you see the starting point before you change anything.",
			},
			{
				title: "See how far you are from the goal",
				body: "A goal alignment score out of 10 with a short explanation of what's missing.",
			},
			{
				title: "Know what to keep and what to fix",
				body: "A SWOT with up to 5 strengths, weaknesses, opportunities and threats, each with a reason.",
			},
			{
				title: "Know what to do first",
				body: 'Suggestions tagged high, medium or low priority, with a timeframe like "This week".',
			},
			{
				title: "Get something done in 10 minutes",
				body: "A short checklist of quick wins you can finish today.",
			},
		],
		rewrites: [
			{
				title: "A headline recruiters can find",
				body: "Rewritten around the keywords for your target role.",
			},
			{
				title: "An About section that tells the right story",
				body: "Connects what you've done to what you want next.",
			},
			{
				title: "Bullets that sound like the new job",
				body: "Your experience rewritten around outcomes that matter for the goal.",
			},
			{
				title: "Skills worth adding",
				body: "Skills your profile supports or the target role commonly needs.",
			},
			{
				title: "A first post to publish",
				body: "A draft LinkedIn post that signals your direction to your network.",
			},
		],
		banner:
			"Career coaches and resume writers charge for this kind of review. Here it costs nothing and takes about 30 seconds.",
		cta: "Review my profile",
	},
	example: {
		eyebrow: "Example. Ana is a fictional profile.",
		title: "What a review looks like",
		intro:
			'Ana Domingos is a senior accountant at a commercial bank. Her goal: "Move into a financial planning and analysis (FP&A) role at an oil and gas operator."',
		before: "Before",
		after: "After",
		beforeText: "Senior Accountant at Banco Kianda",
		afterText:
			"Senior accountant moving into FP&A for oil and gas | Built the cost forecast behind a $40M budget | IFRS, financial modeling, Power BI",
		explanation:
			"Same person, same experience. The rewrite pulls the forecast model and the faster close out of her experience section and puts them where an oil and gas finance recruiter looks first.",
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
		cta: "Run yours",
	},
	testimonials: {
		eyebrow: "From people who ran it",
		title: "What changed after the review",
		ratingLabel: "Rated 5 out of 5",
	},
	personas: {
		eyebrow: "Who it's for",
		titlePre: "Built for people with a ",
		titleEm: "next step",
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
				title: "Recent grads",
				body: 'Get a headline and About section that say more than "student at...".',
			},
			{
				title: "Senior professionals",
				body: "Tell a leadership story that matches director and VP searches.",
			},
		],
	},
	faq: {
		eyebrow: "FAQ",
		title: "Questions",
		items: [
			{
				q: "Is it really free?",
				a: "Yes. No trial, no card, no account. You can run 5 reviews an hour.",
			},
			{
				q: "What do you read, and what do you keep?",
				a: "Only your public LinkedIn profile: headline, About, experience, education and skills. We never log in as you and can't see messages, connections or anything private. An AI model processes the profile and your goal to write the review. We save the profile data and the review so the results page loads in your browser. There's no account, so nothing ties the review to your name or email.",
			},
			{
				q: "My profile is private. Will it work?",
				a: "No. We can only read what LinkedIn shows logged-out visitors. If we can't find your profile, open LinkedIn's public profile settings, make it visible, and try again.",
			},
			{
				q: "How accurate is it?",
				a: "It's an AI review, so treat it as a strong first draft, not a verdict. The model works from what's on your profile and is told not to invent employers or credentials. Still, read every line before you paste it, especially numbers and skills. If the review says you did something you didn't, delete it.",
			},
			{
				q: "Will the rewrites sound like me?",
				a: "Not exactly. They're written in a clear professional tone. Most people keep the structure and keywords and change a few words to sound like themselves.",
			},
			{
				q: "How long does it take?",
				a: "About 30 seconds from clicking the button to seeing your results.",
			},
			{
				q: "Does it change my LinkedIn profile?",
				a: "No. We never touch your account. You copy what you like and paste it in yourself.",
			},
			{
				q: "Can I try a different goal?",
				a: "Yes. Start over and type a new goal. Comparing two reviews is a quick way to see which direction your profile already supports.",
			},
		],
	},
	finalCta: {
		title: "See your profile the way the next recruiter will",
		body: "One username, one goal, about 30 seconds. Worst case, you spent half a minute and got a free second opinion.",
		cta: "Review my profile",
		footnote: "Free. No signup. Public profile only.",
	},
	footer: {
		tagline:
			"Redline reviews public LinkedIn profiles against your career goal. Not affiliated with or endorsed by LinkedIn.",
		photoCreditPre: "Example banner photo: ",
		photoCreditPost: ", cropped.",
	},
};

export type HomeCopy = typeof en;

const pt: HomeCopy = {
	header: {
		howItWorks: "Como funciona",
		example: "Exemplo",
		cta: "Analisar o meu perfil",
		languageLabel: "Idioma",
	},
	hero: {
		eyebrow: "Análise gratuita de perfil do LinkedIn",
		titlePre: "Corrija o seu perfil para o emprego que ",
		titleHighlight: "realmente quer",
		subtitle:
			"Introduza o seu nome de utilizador do LinkedIn e o cargo que procura. Em cerca de 30 segundos recebe uma pontuação, uma análise SWOT feita para esse objetivo e textos prontos a copiar.",
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
		submit: "Analisar o meu perfil",
		trustFree: "Grátis",
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
			"A reescrever o seu título. Esta é a parte divertida.",
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
		editTag: "Edição Redline",
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
		quickWinLabel: "Vitória rápida, 10 min.",
		quickWinBody: "Ponha o modelo de previsão no topo da experiência.",
		skillsTitle: "Competências a adicionar",
		skills: ["Modelação financeira", "Análise de CAPEX/OPEX", "Orçamentação"],
	},
	stats: {
		items: [
			{
				value: "4×",
				label: "mais hipóteses de conseguir uma primeira entrevista",
			},
			{ value: "30s", label: "do nome de utilizador aos resultados" },
			{ value: "5/h", label: "análises grátis, sem registo" },
		],
	},
	problem: {
		eyebrow: "O problema",
		titlePre: "O seu perfil foi escrito para o emprego que ",
		titleEm: "tem",
		p1: "Candidatou-se a 30 vagas e teve resposta de duas. Reescreveu o título três vezes e continua igual ao de toda a gente. Todas as dicas de LinkedIn que encontra são a mesma lista: ponha uma foto, use palavras-chave, seja autêntico.",
		p2: "Nenhuma diz quais palavras-chave, nem para que emprego.",
		p3: "Os recrutadores pesquisam pelo cargo que querem preencher. Se o seu título, a secção Sobre e os seus pontos descrevem o emprego anterior, não aparece para o próximo. Do interior, essa lacuna não se vê.",
	},
	howItWorks: {
		eyebrow: "Como funciona",
		title: "Entra o nome de utilizador, saem textos novos.",
		steps: [
			{
				title: "Diga-nos quem é e para onde quer ir.",
				body: "O seu nome de utilizador do LinkedIn e o cargo que quer, numa frase ou duas.",
			},
			{
				title: "Lemos o seu perfil público e avaliamo-lo face a esse objetivo.",
				body: "Título, Sobre, experiência, formação e competências, tudo comparado com o que esse cargo pede.",
			},
			{
				title: "Recebe a análise e os textos novos.",
				body: "Uma pontuação, uma SWOT, um plano por prioridades e texto novo para cada secção, numa pré-visualização estilo LinkedIn com botões de copiar.",
			},
		],
	},
	valueStack: {
		eyebrow: "O que recebe",
		titlePre: "O que recebe numa ",
		titleHighlight: "única análise",
		subtitle:
			"Cada item é escrito para o objetivo que indicou. Mude o objetivo e recebe uma análise diferente.",
		diagnosisLabel: "O diagnóstico",
		rewritesLabel: "Os textos novos",
		diagnosis: [
			{
				title: "Saiba onde está",
				body: "Uma pontuação de 0 a 100, para ver o ponto de partida antes de mudar o que quer que seja.",
			},
			{
				title: "Veja a distância até ao objetivo",
				body: "Uma pontuação de alinhamento até 10, com uma explicação curta do que falta.",
			},
			{
				title: "Saiba o que manter e o que corrigir",
				body: "Uma SWOT com até 5 pontos fortes, pontos fracos, oportunidades e ameaças, cada um com um motivo.",
			},
			{
				title: "Saiba o que fazer primeiro",
				body: "Sugestões marcadas como prioridade alta, média ou baixa, com um prazo como «Esta semana».",
			},
			{
				title: "Faça algo em 10 minutos",
				body: "Uma lista curta de vitórias rápidas que consegue terminar hoje.",
			},
		],
		rewrites: [
			{
				title: "Um título que os recrutadores encontram",
				body: "Reescrito com as palavras-chave do cargo que quer.",
			},
			{
				title: "Uma secção Sobre com a história certa",
				body: "Liga o que já fez ao que quer fazer a seguir.",
			},
			{
				title: "Pontos que soam ao emprego novo",
				body: "A sua experiência reescrita à volta de resultados que interessam ao objetivo.",
			},
			{
				title: "Competências que vale a pena adicionar",
				body: "Competências que o seu perfil comprova ou que o cargo costuma pedir.",
			},
			{
				title: "Um primeiro post para publicar",
				body: "Um rascunho de post para o LinkedIn que mostra à sua rede para onde vai.",
			},
		],
		banner:
			"Coaches de carreira e redatores de CV cobram por este tipo de análise. Aqui não custa nada e demora cerca de 30 segundos.",
		cta: "Analisar o meu perfil",
	},
	example: {
		eyebrow: "Exemplo. A Ana é um perfil fictício.",
		title: "Como é uma análise",
		intro:
			"A Ana Domingos é contabilista sénior num banco comercial. O objetivo dela: «Passar para uma função de planeamento e análise financeira (FP&A) numa operadora de petróleo e gás.»",
		before: "Antes",
		after: "Depois",
		beforeText: "Contabilista Sénior no Banco Kianda",
		afterText:
			"Contabilista sénior a caminho de FP&A em petróleo e gás | Criei a previsão de custos de um orçamento de 40 M USD | IFRS, modelação financeira, Power BI",
		explanation:
			"A mesma pessoa, a mesma experiência. A nova versão tira o modelo de previsão e o fecho mais rápido da secção de experiência e coloca-os onde um recrutador de finanças do setor petrolífero olha primeiro.",
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
				label: "Vitória rápida",
				text: "Pôr o modelo de previsão em primeiro lugar, com o valor do orçamento e quem o usa.",
			},
		],
		cta: "Analisar o meu perfil",
	},
	testimonials: {
		eyebrow: "De quem já experimentou",
		title: "O que mudou depois da análise",
		ratingLabel: "Avaliação de 5 em 5",
	},
	personas: {
		eyebrow: "Para quem é",
		titlePre: "Feito para quem tem um ",
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
	faq: {
		eyebrow: "FAQ",
		title: "Perguntas",
		items: [
			{
				q: "É mesmo grátis?",
				a: "Sim. Sem período experimental, sem cartão, sem conta. Pode fazer 5 análises por hora.",
			},
			{
				q: "O que leem e o que guardam?",
				a: "Apenas o seu perfil público do LinkedIn: título, Sobre, experiência, formação e competências. Nunca entramos na sua conta e não vemos mensagens, ligações nem nada privado. Um modelo de IA processa o perfil e o seu objetivo para escrever a análise. Guardamos os dados do perfil e a análise para a página de resultados carregar no seu navegador. Não há conta, por isso nada liga a análise ao seu nome ou e-mail.",
			},
			{
				q: "O meu perfil é privado. Funciona?",
				a: "Não. Só conseguimos ler o que o LinkedIn mostra a visitantes sem sessão iniciada. Se não encontrarmos o seu perfil, abra as definições de perfil público do LinkedIn, torne-o visível e tente novamente.",
			},
			{
				q: "Qual é a precisão?",
				a: "É uma análise de IA, por isso trate-a como um bom primeiro rascunho, não como um veredito. O modelo trabalha com o que está no perfil e tem instruções para não inventar empregadores nem credenciais. Ainda assim, leia cada linha antes de a colar, sobretudo números e competências. Se a análise disser que fez algo que não fez, apague.",
			},
			{
				q: "Os textos novos vão soar a mim?",
				a: "Não exatamente. São escritos num tom profissional e claro. A maioria das pessoas mantém a estrutura e as palavras-chave e muda algumas palavras para soar a si.",
			},
			{
				q: "Quanto tempo demora?",
				a: "Cerca de 30 segundos entre clicar no botão e ver os resultados.",
			},
			{
				q: "Isto muda o meu perfil do LinkedIn?",
				a: "Não. Nunca mexemos na sua conta. Copia o que quiser e cola você mesmo.",
			},
			{
				q: "Posso tentar outro objetivo?",
				a: "Pode. Recomece e escreva um objetivo novo. Comparar duas análises é uma forma rápida de ver que direção o seu perfil já suporta.",
			},
		],
	},
	finalCta: {
		title: "Veja o seu perfil como o próximo recrutador o vai ver",
		body: "Um nome de utilizador, um objetivo, cerca de 30 segundos. No pior dos casos, perdeu meio minuto e ganhou uma segunda opinião grátis.",
		cta: "Analisar o meu perfil",
		footnote: "Grátis. Sem registo. Apenas perfis públicos.",
	},
	footer: {
		tagline:
			"O Redline analisa perfis públicos do LinkedIn face ao seu objetivo de carreira. Não é afiliado nem apoiado pelo LinkedIn.",
		photoCreditPre: "Foto do banner de exemplo: ",
		photoCreditPost: ", recortada.",
	},
};

export const homeCopy = { en, pt } as const;
