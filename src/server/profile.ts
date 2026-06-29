import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { profileSnapshots } from "#/db/schema";
import { profileSchema } from "#/lib/profile-schema";

import { getRequiredSessionId } from "./session-utils";

const snapshotIdSchema = z.object({
	snapshotId: z.string().min(1),
});

function loadSnapshotForSession(snapshotId: string, sessionId: string) {
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

export const getProfileSnapshot = createServerFn({ method: "GET" })
	.validator(snapshotIdSchema)
	.handler(async ({ data }) => {
		const sessionId = getRequiredSessionId();
		const snapshot = loadSnapshotForSession(data.snapshotId, sessionId);

		if (!snapshot) {
			throw new Error("Profile snapshot not found");
		}

		if (!snapshot.normalizedProfileJson) {
			throw new Error("Profile has not been parsed yet.");
		}

		const profile = profileSchema.parse(
			JSON.parse(snapshot.normalizedProfileJson),
		);

		return {
			snapshotId: data.snapshotId,
			profile,
		};
	});
