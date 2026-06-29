import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { profileSnapshots } from "#/db/schema";
import { jsonError, jsonOk } from "#/lib/api-error";
import { profileSchema } from "#/lib/profile-schema";
import { getRequiredSessionId } from "#/server/session-utils";

const updateProfileSchema = z.object({
	snapshotId: z.string().min(1),
	profile: profileSchema,
});

function getSnapshotForSession(snapshotId: string, sessionId: string) {
	return db
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
}

export const Route = createFileRoute("/api/profile")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				try {
					const sessionId = getRequiredSessionId();

					const url = new URL(request.url);
					const snapshotId = url.searchParams.get("snapshotId");

					if (!snapshotId) {
						return jsonError("Missing snapshotId query parameter", 400);
					}

					const snapshot = getSnapshotForSession(snapshotId, sessionId);
					if (!snapshot) {
						return jsonError("Profile snapshot not found", 404);
					}

					const profile = snapshot.normalizedProfileJson
						? profileSchema.parse(JSON.parse(snapshot.normalizedProfileJson))
						: null;

					return jsonOk({
						snapshotId,
						profile,
						...(snapshot.rawPdfText ? { rawPdfText: snapshot.rawPdfText } : {}),
					});
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					return jsonError("Failed to load profile", 500);
				}
			},

			PUT: async ({ request }) => {
				try {
					const sessionId = getRequiredSessionId();

					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonError("Invalid JSON body", 400);
					}

					const parsed = updateProfileSchema.safeParse(body);
					if (!parsed.success) {
						return jsonError("Invalid profile data", 400);
					}

					const { snapshotId, profile } = parsed.data;

					const snapshot = getSnapshotForSession(snapshotId, sessionId);
					if (!snapshot) {
						return jsonError("Profile snapshot not found", 404);
					}

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

					return jsonError("Failed to update profile", 500);
				}
			},
		},
	},
});
