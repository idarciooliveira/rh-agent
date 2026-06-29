import type { FullAnalysis } from "#/lib/analysis-schema";
import type { Profile } from "#/lib/profile-schema";

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
			profileScore: 72,
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
		},
	};
}
