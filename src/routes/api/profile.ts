import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";

import { db } from "#/db";
import { profileSnapshots } from "#/db/schema";
import { jsonError, jsonOk } from "#/lib/api-error";
import { parseStoredProfile } from "#/lib/profile-schema";
import { getRequiredSessionId } from "#/server/session-utils";

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
						? parseStoredProfile(snapshot.normalizedProfileJson)
						: null;

					return jsonOk({
						snapshotId,
						profile,
					});
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					return jsonError("Failed to load profile", 500);
				}
			},
		},
	},
});
