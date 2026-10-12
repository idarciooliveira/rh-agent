import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, lt } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { analyses, profileSnapshots } from "#/db/schema";
import {
	recommendationsSchema,
	swotAnalysisSchema,
} from "#/lib/analysis-schema";
import { redactSwotAnalysis } from "#/lib/paywall";
import { parseStoredProfile } from "#/lib/profile-schema";
import { getAccess } from "#/server/billing";
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

/** Score from the last review of the same LinkedIn profile, for progress. */
async function loadPreviousScore(
	sessionId: string,
	linkedinUsername: string | null,
	before: Date,
): Promise<number | null> {
	if (!linkedinUsername) {
		return null;
	}

	const previous = await db
		.select({ swotJson: analyses.swotJson })
		.from(analyses)
		.innerJoin(
			profileSnapshots,
			eq(profileSnapshots.id, analyses.profileSnapshotId),
		)
		.where(
			and(
				eq(analyses.sessionId, sessionId),
				eq(profileSnapshots.linkedinUsername, linkedinUsername),
				lt(analyses.createdAt, before),
			),
		)
		.orderBy(desc(analyses.createdAt))
		.limit(1)
		.get();

	if (!previous) {
		return null;
	}

	return swotAnalysisSchema.parse(JSON.parse(previous.swotJson)).profileScore;
}

async function loadAnalysisView(analysisId: string) {
	const sessionId = await getRequiredSessionId();
	const analysis = await loadAnalysisForSession(analysisId, sessionId);

	if (!analysis) {
		throw new Error("Analysis not found");
	}

	const snapshot = await db
		.select()
		.from(profileSnapshots)
		.where(eq(profileSnapshots.id, analysis.profileSnapshotId))
		.limit(1)
		.get();

	if (!snapshot?.normalizedProfileJson) {
		throw new Error("Profile snapshot not found");
	}

	const profile = parseStoredProfile(snapshot.normalizedProfileJson);
	const swotAnalysis = swotAnalysisSchema.parse(JSON.parse(analysis.swotJson));
	const [access, previousScore] = await Promise.all([
		getAccess(sessionId, analysis),
		loadPreviousScore(sessionId, snapshot.linkedinUsername, analysis.createdAt),
	]);

	const fullRecommendations = recommendationsSchema.parse(
		JSON.parse(analysis.recommendationsJson),
	);
	// Paid text never reaches a locked client, blurred or not.
	const recommendations = access.unlocked ? fullRecommendations : null;

	return {
		analysisId,
		careerGoal: analysis.careerGoal,
		profile,
		swotAnalysis: access.unlocked
			? swotAnalysis
			: redactSwotAnalysis(swotAnalysis),
		recommendations,
		previousScore,
		access: {
			unlocked: access.unlocked,
			passExpiresAt: access.passExpiresAt?.toISOString() ?? null,
			creditsRemaining: access.creditsRemaining,
			experienceRewrites: fullRecommendations.experiences.length,
		},
	};
}

export const getAnalysis = createServerFn({ method: "GET" })
	.validator(analysisIdSchema)
	.handler(({ data }) => loadAnalysisView(data.analysisId));

export const getCvData = createServerFn({ method: "GET" })
	.validator(analysisIdSchema)
	.handler(async ({ data }) => {
		const result = await loadAnalysisView(data.analysisId);
		if (!result.recommendations) {
			throw new Error("Analysis locked");
		}
		return {
			analysisId: result.analysisId,
			profile: result.profile,
			recommendations: result.recommendations,
		};
	});
