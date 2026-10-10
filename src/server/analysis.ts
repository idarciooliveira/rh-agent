import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { analyses, profileSnapshots } from "#/db/schema";
import {
	type Recommendations,
	recommendationsSchema,
	swotAnalysisSchema,
} from "#/lib/analysis-schema";
import { parseStoredProfile } from "#/lib/profile-schema";
import { getRequiredSessionId } from "#/server/session-utils";

const analysisIdSchema = z.object({
	analysisId: z.string().min(1),
});

function loadAnalysisForSession(analysisId: string, sessionId: string) {
	return db
		.select()
		.from(analyses)
		.where(and(eq(analyses.id, analysisId), eq(analyses.sessionId, sessionId)))
		.limit(1)
		.get();
}

/** Headline, About, each rewritten role, the skills list and the post draft. */
function countRewrites(recommendations: Recommendations): number {
	const skills = recommendations.skills.suggested.length > 0 ? 1 : 0;
	const post = recommendations.suggestedActivityPost.trim() ? 1 : 0;
	return 2 + recommendations.experiences.length + skills + post;
}

export const getAnalysis = createServerFn({ method: "GET" })
	.validator(analysisIdSchema)
	.handler(async ({ data }) => {
		const sessionId = getRequiredSessionId();
		const analysis = loadAnalysisForSession(data.analysisId, sessionId);

		if (!analysis) {
			throw new Error("Analysis not found");
		}

		const snapshot = db
			.select()
			.from(profileSnapshots)
			.where(eq(profileSnapshots.id, analysis.profileSnapshotId))
			.limit(1)
			.get();

		if (!snapshot?.normalizedProfileJson) {
			throw new Error("Profile snapshot not found");
		}

		const profile = parseStoredProfile(snapshot.normalizedProfileJson);
		const swotAnalysis = swotAnalysisSchema.parse(
			JSON.parse(analysis.swotJson),
		);
		const recommendations = recommendationsSchema.parse(
			JSON.parse(analysis.recommendationsJson),
		);

		const unlocked = analysis.unlockedAt !== null;

		// Rewrites stay on the server until the visitor leaves an email. The
		// teaser gives the locked panel one real rewrite and an honest count.
		return {
			analysisId: data.analysisId,
			careerGoal: analysis.careerGoal,
			profile,
			swotAnalysis,
			unlocked,
			recommendations: unlocked ? recommendations : null,
			teaser: {
				headline: recommendations.headline.improved,
				rewriteCount: countRewrites(recommendations),
			},
		};
	});
