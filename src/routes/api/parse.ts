import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { profileSnapshots } from "#/db/schema";
import { mockParseProfileFromText } from "#/lib/ai/mock-parse-profile";
import { parseProfileFromText } from "#/lib/ai/parse-profile";
import { resolveAiMode } from "#/lib/ai/resolve-ai-mode";
import { jsonError, jsonOk } from "#/lib/api-error";
import { getRequiredSessionId } from "#/server/session-utils";

const parseRequestSchema = z.object({
	snapshotId: z.string().min(1),
});

export const Route = createFileRoute("/api/parse")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const sessionId = getRequiredSessionId();
					const aiMode = resolveAiMode();

					if (aiMode === "unavailable") {
						return jsonError(
							"AI parsing is unavailable: set AI_GATEWAY_API_KEY in your environment to enable profile parsing.",
							503,
						);
					}

					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonError("Invalid JSON body", 400);
					}

					const parsed = parseRequestSchema.safeParse(body);
					if (!parsed.success) {
						return jsonError("Request body must include snapshotId", 400);
					}

					const { snapshotId } = parsed.data;

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

					if (!snapshot.rawPdfText) {
						return jsonError(
							"Snapshot has no extracted PDF text to parse",
							422,
						);
					}

					const profile =
						aiMode === "mock"
							? await mockParseProfileFromText(snapshot.rawPdfText)
							: await parseProfileFromText(snapshot.rawPdfText);

					const now = new Date();

					db.update(profileSnapshots)
						.set({
							normalizedProfileJson: JSON.stringify(profile),
							updatedAt: now,
						})
						.where(eq(profileSnapshots.id, snapshotId))
						.run();

					return jsonOk({ snapshotId, profile });
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					if (error instanceof Error) {
						return jsonError(`Failed to parse profile: ${error.message}`, 500);
					}

					return jsonError("Failed to parse profile", 500);
				}
			},
		},
	},
});
