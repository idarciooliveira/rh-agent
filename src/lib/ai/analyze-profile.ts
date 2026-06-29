import { generateStructuredObject } from "#/lib/ai/generate-structured";
import { type FullAnalysis, fullAnalysisSchema } from "#/lib/analysis-schema";
import type { Profile } from "#/lib/profile-schema";

const ANALYZE_PROMPT_PREFIX = `You are an expert LinkedIn career coach. Analyze the user's LinkedIn profile against their stated career goal.

Produce a comprehensive strategic analysis including:
1. profileScore (0-100): overall profile quality for the target goal
2. goalAlignment: score out of 10, maxScore always 10, with a summary paragraph
3. swot: strengths, weaknesses, opportunities, threats (2-5 items each with title + detail)
4. strategicSuggestions: 3-5 high-impact recommendations with priority (high/medium/low), category (Headline/Summary/Experience/Skills), and timeframe
5. quickWins: 4-6 short actionable items the user can do immediately
6. recommendations: improved headline, about, experience bullet points (as arrays), suggested skills to add, and a suggested LinkedIn activity post

Rules:
- Base analysis on actual profile content — do not invent employers or credentials
- Recommendations should be concrete rewrites, not vague advice
- Experience improvedDescription should be action-oriented bullet points reframed toward the career goal
- suggested skills should only include skills reasonably inferable or commonly needed for the goal
- Keep tone professional and encouraging

Career goal:
`;

export async function analyzeProfile(
	profile: Profile,
	careerGoal: string,
): Promise<FullAnalysis> {
	return generateStructuredObject({
		schema: fullAnalysisSchema,
		schemaName: "LinkedInCareerAnalysis",
		schemaDescription:
			"SWOT analysis, profile score, and LinkedIn rewrite recommendations for a career goal",
		prompt: `${ANALYZE_PROMPT_PREFIX}${careerGoal}

Profile JSON:
${JSON.stringify(profile, null, 2)}`,
	});
}
