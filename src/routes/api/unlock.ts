import { randomUUID } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { analyses, leads } from "#/db/schema";
import { jsonError, jsonOk } from "#/lib/api-error";
import { consumeRateLimit } from "#/lib/rate-limit";
import { getRequiredSessionId } from "#/server/session-utils";

const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const unlockRequestSchema = z.object({
	analysisId: z.string().min(1),
	email: z.string().trim().toLowerCase().email().max(254),
});

/** Saves the visitor's email and unlocks the rewrites for one analysis. */
export const Route = createFileRoute("/api/unlock")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const sessionId = getRequiredSessionId();

					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonError("Invalid JSON body", 400);
					}

					const parsed = unlockRequestSchema.safeParse(body);
					if (!parsed.success) {
						return jsonError("Enter a valid email address", 400);
					}

					if (
						consumeRateLimit(
							[{ key: `unlock:${sessionId}`, limit: RATE_LIMIT }],
							RATE_WINDOW_MS,
						)
					) {
						return jsonError("Too many attempts. Try again in an hour.", 429);
					}

					const { analysisId, email } = parsed.data;

					const analysis = db
						.select({ id: analyses.id, unlockedAt: analyses.unlockedAt })
						.from(analyses)
						.where(
							and(
								eq(analyses.id, analysisId),
								eq(analyses.sessionId, sessionId),
							),
						)
						.limit(1)
						.get();

					if (!analysis) {
						return jsonError("Analysis not found", 404);
					}

					const now = new Date();
					db.transaction((tx) => {
						tx.insert(leads)
							.values({
								id: randomUUID(),
								sessionId,
								analysisId,
								email,
								createdAt: now,
							})
							.run();

						if (!analysis.unlockedAt) {
							tx.update(analyses)
								.set({ unlockedAt: now })
								.where(eq(analyses.id, analysisId))
								.run();
						}
					});

					return jsonOk({ unlocked: true });
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					return jsonError("Failed to unlock the review", 500);
				}
			},
		},
	},
});
