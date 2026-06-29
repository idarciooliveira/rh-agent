import { env } from "#/env";
import { buildSampleAnalysis } from "#/lib/ai/fixtures/sample-analysis";
import type { FullAnalysis } from "#/lib/analysis-schema";
import type { Profile } from "#/lib/profile-schema";

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export async function mockAnalyzeProfile(
	profile: Profile,
	careerGoal: string,
): Promise<FullAnalysis> {
	await delay(env.AI_MOCK_DELAY_MS);
	return buildSampleAnalysis(profile, careerGoal);
}
