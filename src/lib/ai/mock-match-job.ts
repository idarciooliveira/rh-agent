import { env } from "#/env";
import type { JobMatch } from "#/lib/analysis-schema";
import { splitKeywordsByPresence } from "#/lib/paywall";
import type { Profile } from "#/lib/profile-schema";

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

/** Common skills the mock looks for in a job post. Live mode uses the model. */
const KNOWN_SKILLS = [
	"Excel",
	"Power BI",
	"SAP",
	"IFRS",
	"Budgeting",
	"Forecasting",
	"CAPEX",
	"Financial modeling",
	"English",
	"Leadership",
	"Stakeholder management",
	"Project management",
	"Product strategy",
	"Roadmapping",
	"Agile",
	"Scrum",
	"SQL",
	"Python",
	"AWS",
	"Docker",
	"Kubernetes",
	"Terraform",
	"CI/CD",
	"Linux",
	"Sales",
	"Negotiation",
	"HSE",
	"Audit",
];

function extractKeywords(jobPost: string): string[] {
	const haystack = jobPost.toLowerCase();
	return KNOWN_SKILLS.filter((skill) => haystack.includes(skill.toLowerCase()));
}

export async function mockMatchJob(
	profile: Profile,
	jobPost: string,
): Promise<JobMatch> {
	await delay(env.AI_MOCK_DELAY_MS);

	const profileText = JSON.stringify(profile);
	const { present, missing } = splitKeywordsByPresence(
		extractKeywords(jobPost),
		profileText,
	);
	const total = present.length + missing.length;
	const fitScore =
		total === 0 ? 50 : Math.round(35 + (present.length / total) * 60);
	const role = jobPost.split("\n")[0]?.slice(0, 80).trim() || "this role";
	const company = profile.experiences[0]?.company ?? "my current company";

	return {
		fitScore,
		summary: `Your profile covers ${present.length} of the ${total} key skills in this post. The biggest gap is ${missing.slice(0, 2).join(" and ") || "how you describe your results"}, which the recruiter will look for first.`,
		matchedKeywords: present,
		missingKeywords: missing,
		tailoredHeadline:
			`${profile.headline.split("|")[0]?.trim() ?? profile.headline} | ${present.slice(0, 3).join(", ")} | Targeting ${role}`.slice(
				0,
				220,
			),
		tailoredBullets: [
			`Delivered production work at ${company} that maps to ${present[0] ?? "the core of this role"}.`,
			`Worked across teams to ship on time, the same way this role needs ${present[1] ?? "collaboration"}.`,
			`Learning ${missing[0] ?? "the remaining tools"} through hands-on projects to close the gap for this role.`,
		],
		coverLetter: `Dear hiring team,

I'm applying for ${role}. At ${company} I've worked with ${present.slice(0, 3).join(", ") || "the tools you list"}, and I'd bring that experience to your team from the first week.

I'm also building up ${missing.slice(0, 2).join(" and ") || "the remaining skills in your post"}, and I'm happy to talk through how.

Thank you for your time,
${profile.name}`,
	};
}
