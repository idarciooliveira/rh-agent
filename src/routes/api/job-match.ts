import { randomUUID } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { analyses, jobMatches, profileSnapshots } from "#/db/schema";
import { formatAiError } from "#/lib/ai/format-ai-error";
import { matchJob } from "#/lib/ai/match-job";
import { mockMatchJob } from "#/lib/ai/mock-match-job";
import { resolveAiMode } from "#/lib/ai/resolve-ai-mode";
import { jsonError, jsonOk } from "#/lib/api-error";
import { parseStoredProfile } from "#/lib/profile-schema";
import { hasActivePass } from "#/server/billing";
import { getRequiredSessionId } from "#/server/session-utils";

const jobMatchRequestSchema = z.object({
	analysisId: z.string().min(1),
	jobPost: z.string().trim().min(80).max(8000),
});

export const Route = createFileRoute("/api/job-match")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const sessionId = await getRequiredSessionId();
					const aiMode = resolveAiMode();

					if (aiMode === "unavailable") {
						return jsonError(
							"AI analysis is unavailable: set AI_GATEWAY_API_KEY in your environment.",
							503,
						);
					}

					if (!(await hasActivePass(sessionId))) {
						return jsonError("Job matching needs the job hunt pass", 402);
					}

					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonError("Invalid JSON body", 400);
					}

					const parsed = jobMatchRequestSchema.safeParse(body);
					if (!parsed.success) {
						return jsonError(
							"Paste the full job post (at least 80 characters)",
							400,
						);
					}

					const { analysisId, jobPost } = parsed.data;

					const row = await db
						.select({ profileJson: profileSnapshots.normalizedProfileJson })
						.from(analyses)
						.innerJoin(
							profileSnapshots,
							eq(profileSnapshots.id, analyses.profileSnapshotId),
						)
						.where(
							and(
								eq(analyses.id, analysisId),
								eq(analyses.sessionId, sessionId),
							),
						)
						.limit(1)
						.get();

					if (!row?.profileJson) {
						return jsonError("Analysis not found", 404);
					}

					const profile = parseStoredProfile(row.profileJson);
					const match =
						aiMode === "mock"
							? await mockMatchJob(profile, jobPost)
							: await matchJob(profile, jobPost);

					await db
						.insert(jobMatches)
						.values({
							id: randomUUID(),
							sessionId,
							analysisId,
							jobPost,
							resultJson: JSON.stringify(match),
						})
						.run();

					return jsonOk({ match });
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					if (error instanceof Error) {
						return jsonError(
							`Failed to match job: ${formatAiError(error)}`,
							500,
						);
					}

					return jsonError("Failed to match job", 500);
				}
			},
		},
	},
});
