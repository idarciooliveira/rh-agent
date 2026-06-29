import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { analyses, profileSnapshots } from "#/db/schema";
import { analyzeProfile } from "#/lib/ai/analyze-profile";
import { formatAiError } from "#/lib/ai/format-ai-error";
import { mockAnalyzeProfile } from "#/lib/ai/mock-analyze-profile";
import { resolveAiMode } from "#/lib/ai/resolve-ai-mode";
import { jsonError, jsonOk } from "#/lib/api-error";
import { parseStoredProfile } from "#/lib/profile-schema";
import { getRequiredSessionId } from "#/server/session-utils";

const analyzeRequestSchema = z.object({
	snapshotId: z.string().min(1),
	careerGoal: z.string().trim().min(10).max(500),
});

export const Route = createFileRoute("/api/analyze")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const sessionId = getRequiredSessionId();
					const aiMode = resolveAiMode();

					if (aiMode === "unavailable") {
						return jsonError(
							"AI analysis is unavailable: set AI_GATEWAY_API_KEY in your environment to enable analysis.",
							503,
						);
					}

					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonError("Invalid JSON body", 400);
					}

					const parsed = analyzeRequestSchema.safeParse(body);
					if (!parsed.success) {
						return jsonError(
							"Request body must include snapshotId and careerGoal (10-500 chars)",
							400,
						);
					}

					const { snapshotId, careerGoal } = parsed.data;

					const snapshot = db
						.select()
						.from(profileSnapshots)
						.where(
							and(
								eq(profileSnapshots.id, snapshotId),
								eq(profileSnapshots.sessionId, sessionId),
							),
						)
						.limit(1)
						.get();

					if (!snapshot) {
						return jsonError("Profile snapshot not found", 404);
					}

					if (!snapshot.normalizedProfileJson) {
						return jsonError(
							"Profile has not been parsed yet. Run parse first.",
							422,
						);
					}

					const profile = parseStoredProfile(snapshot.normalizedProfileJson);

					const fullAnalysis =
						aiMode === "mock"
							? await mockAnalyzeProfile(profile, careerGoal)
							: await analyzeProfile(profile, careerGoal);

					const analysisId = crypto.randomUUID();

					db.insert(analyses)
						.values({
							id: analysisId,
							sessionId,
							careerGoal,
							profileSnapshotId: snapshotId,
							swotJson: JSON.stringify(fullAnalysis.swotAnalysis),
							recommendationsJson: JSON.stringify(fullAnalysis.recommendations),
							createdAt: new Date(),
						})
						.run();

					return jsonOk({ analysisId });
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					if (error instanceof Error) {
						return jsonError(
							`Failed to analyze profile: ${formatAiError(error)}`,
							500,
						);
					}

					return jsonError("Failed to analyze profile", 500);
				}
			},
		},
	},
});
