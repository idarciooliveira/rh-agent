import type { FullAnalysis } from "#/lib/analysis-schema";
import type { Profile } from "#/lib/profile-schema";

/** Varies the mock score by goal so re-scans show progress in mock mode. */
function mockProfileScore(careerGoal: string): number {
	let hash = 0;
	for (const char of careerGoal) {
		hash = (hash * 31 + char.charCodeAt(0)) % 997;
	}
	return 52 + (hash % 35);
}

export function buildSampleAnalysis(
	profile: Profile,
	careerGoal: string,
): FullAnalysis {
	const goalLower = careerGoal.toLowerCase();
	const isDevOps =
		goalLower.includes("devops") ||
		goalLower.includes("sre") ||
		goalLower.includes("cloud");

	return {
		swotAnalysis: {
			profileScore: mockProfileScore(careerGoal),
			goalAlignment: {
				score: 7,
				maxScore: 10,
				summary: isDevOps
					? `Your profile already signals strong backend engineering plus CI/CD and AWS basics. To convert this into DevOps opportunities, you need clearer DevOps positioning in your headline, about section, and experience bullets — emphasizing reliability, observability, infrastructure ownership, and automation outcomes aligned with: "${careerGoal}".`
					: `Your profile shows relevant experience for your goal: "${careerGoal}". Strengthening keyword alignment in your headline and experience descriptions would improve recruiter discoverability and goal fit.`,
			},
			swot: {
				strengths: [
					{
						title:
							"Solid production engineering experience with end-to-end delivery mindset",
						detail: `${profile.name}'s experience at ${profile.experiences[0]?.company ?? "current roles"} demonstrates shipping production systems with accountability for quality and delivery.`,
					},
					{
						title:
							"Backend/API expertise that translates well into platform and service reliability work",
						detail:
							"Strong API and backend foundations provide a credible base for DevOps/SRE positioning when reframed around reliability and automation outcomes.",
					},
					{
						title: "Existing CI/CD and cloud exposure",
						detail:
							"Profile mentions CI/CD workflows and cloud tooling — useful anchors for a DevOps narrative when made explicit in headline and bullets.",
					},
				],
				weaknesses: [
					{
						title:
							"DevOps toolchain is not explicitly listed (containers, Kubernetes, Terraform…)",
						detail:
							"Recruiters filtering for DevOps keywords may miss your profile if container orchestration and IaC tools are not visible in skills and experience.",
					},
					{
						title:
							"Limited quantified impact (availability, deployment frequency, lead time…)",
						detail:
							"Experience bullets describe responsibilities but lack metrics that DevOps hiring managers expect (uptime, MTTR, deploy cadence, cost savings).",
					},
				],
				opportunities: [
					{
						title:
							"Reposition experience as DevOps/SRE outcomes (reliability, observability, release automation, incident response)",
						detail: `Rewrite bullets at ${profile.experiences[0]?.company ?? "recent roles"} to emphasize monitoring, pipelines, and operational ownership tied to "${careerGoal}".`,
					},
					{
						title:
							"Add a visible DevOps portfolio (IaC repo, pipeline examples, runbooks, postmortem write-up)",
						detail:
							"A public portfolio with infrastructure and automation artifacts signals hands-on DevOps credibility beyond resume keywords.",
					},
					{
						title: "Strengthen keyword coverage for recruiter searches",
						detail:
							"Add Docker, Kubernetes, Terraform, Jenkins, and observability terms where honestly supported by your work.",
					},
					{
						title:
							"Leverage observability fundamentals into an observability-first DevOps narrative",
						detail:
							"Any monitoring, logging, or APM experience can be expanded into a reliability engineering story.",
					},
					{
						title:
							"Target AWS specialization via practical projects and/or associate-level certification",
						detail:
							"Deepen AWS service coverage (ECS/EKS, CloudFormation/Terraform) to match DevOps role requirements.",
					},
				],
				threats: [
					{
						title:
							"Competing DevOps candidates may show deeper hands-on tooling and infrastructure ownership",
						detail:
							"Profiles with explicit Kubernetes, Terraform, and on-call experience may rank higher in recruiter searches.",
					},
					{
						title:
							"Recruiters may categorize you primarily as backend engineer due to strong API emphasis",
						detail: `Current headline "${profile.headline}" may anchor backend identity unless reframed for platform/reliability work.`,
					},
					{
						title:
							"Broad headline may reduce relevance scores in DevOps keyword searches",
						detail:
							"Multi-theme headlines dilute DevOps keyword density compared to focused SRE/DevOps positioning.",
					},
					{
						title:
							"Short tenure at current role can trigger limited DevOps scope assumptions unless clarified",
						detail:
							"Recent role changes require explicit DevOps-relevant accomplishments to avoid scope skepticism.",
					},
				],
			},
			strategicSuggestions: [
				{
					priority: "high",
					text: "Rewrite the headline to explicitly target DevOps/SRE roles — lead with AWS, CI/CD, IaC, and observability keywords aligned to your goal.",
					category: "Headline",
					timeframe: "This week",
				},
				{
					priority: "high",
					text: "Reframe the About section as a DevOps/cloud engineering narrative — transition story, reliability focus, and toolchain highlights.",
					category: "Summary",
					timeframe: "This week",
				},
				{
					priority: "high",
					text: "Rewrite top experience bullets with DevOps outcomes: deployment automation, monitoring, incident response, and infrastructure improvements with metrics where possible.",
					category: "Experience",
					timeframe: "Within a month",
				},
			],
			quickWins: [
				"Update the headline to include DevOps, AWS, and CI/CD keywords.",
				"Reorder your top 3 skills to: CI/CD, AWS, DevOps (or closest matches from your skill list).",
				"Add your personal site or GitHub link to the About section if not already visible.",
				"Add Docker and Kubernetes to skills if you have any exposure, even from side projects.",
				"Pin or draft a LinkedIn post about a recent deployment or reliability improvement.",
			],
		},
		recommendations: {
			headline: {
				improved: `DevOps / Cloud Engineer (AWS) | CI/CD, Infrastructure as Code (CloudFormation), Observability (Logs/Metrics/Traces) | Backend-to-Platform | Reliability & Automation`,
			},
			about: {
				improved: `Software Engineer transitioning into DevOps/Cloud Engineering with 6+ years building and shipping production systems. I specialize in turning backend delivery experience into platform outcomes: automated CI/CD pipelines, AWS infrastructure (EC2, IAM, CloudFormation), and observability practices that improve deployment confidence and incident response.

At ${profile.experiences[0]?.company ?? "my current company"}, I work on backend services while actively improving release automation, monitoring, and operational reliability — aligning my profile toward ${careerGoal}. I am focused on deepening hands-on DevOps tooling (containers, Kubernetes, Terraform) and building a public portfolio of infrastructure and pipeline work.`,
			},
			experiences: profile.experiences.map((exp, index) => ({
				index,
				improvedDescription: [
					`Owned backend service delivery while improving CI/CD workflows and deployment reliability for ${exp.company}.`,
					`Implemented monitoring and logging practices to reduce time-to-detect issues and support faster incident response.`,
					`Collaborated on AWS infrastructure changes (EC2, IAM) and automation scripts to streamline environment provisioning.`,
					`Documented runbooks and deployment procedures to improve team operational readiness.`,
				],
			})),
			skills: {
				suggested: [
					"Amazon Web Services (AWS)",
					"Infrastructure as Code (IaC)",
					"AWS CloudFormation",
					"Docker",
					"Kubernetes",
					"Observability (Logging, Metrics, Tracing)",
					"New Relic",
					"Linux",
					"Bash Scripting",
				],
			},
			suggestedActivityPost: `Over the past few months I've been intentionally shifting from pure backend engineering toward DevOps at ${profile.experiences[0]?.company ?? "work"} — focusing on observability, infrastructure as code on AWS, and CI/CD pipelines that make deployments less stressful.

If you're on a similar backend-to-platform path (or hiring for DevOps/SRE), I'd love to exchange notes on what actually moves the needle: pipeline design, monitoring, or certification vs. project proof.

#DevOps #AWS #CICD #Observability #CareerGrowth`,
			alternateLanguage: {
				language: "pt",
				headline:
					"Engenheiro DevOps / Cloud (AWS) | CI/CD, Infraestrutura como Código, Observabilidade | De backend para plataforma",
				about: `Engenheiro de software em transição para DevOps/Cloud, com mais de 6 anos a construir e pôr sistemas em produção. Transformo experiência de backend em resultados de plataforma: pipelines de CI/CD automatizados, infraestrutura AWS (EC2, IAM, CloudFormation) e práticas de observabilidade que dão mais confiança aos deploys.

Na ${profile.experiences[0]?.company ?? "empresa atual"} trabalho em serviços de backend e melhoro a automação de releases, a monitorização e a fiabilidade operacional, com foco em ${careerGoal}.`,
			},
			recruiterKeywords: isDevOps
				? [
						"DevOps",
						"AWS",
						"CI/CD",
						"Kubernetes",
						"Docker",
						"Terraform",
						"Linux",
						"Observability",
						"SRE",
						"Infrastructure as Code",
					]
				: [
						"Stakeholder management",
						"Excel",
						"Reporting",
						"Project management",
						"Power BI",
						"Budgeting",
						"English",
						"Leadership",
					],
			contentPlan: [
				{
					week: 1,
					topic: "Why you are moving toward this role",
					hook: "Six years in, I realised the part of my job I liked most wasn't in my job title.",
				},
				{
					week: 2,
					topic: "A concrete result from your current job",
					hook: "We cut deploy time from 40 minutes to 6. Here's the boring change that did it.",
				},
				{
					week: 3,
					topic: "Something you learned this month",
					hook: "I spent a weekend breaking a Kubernetes cluster on purpose. Three things I learned.",
				},
				{
					week: 4,
					topic: "Ask your network for introductions",
					hook: "I'm looking for my next role in DevOps. If your team is hiring, I'd like to hear about it.",
				},
			],
		},
	};
}
