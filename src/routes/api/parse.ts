import { createFileRoute } from "@tanstack/react-router";
import { gateway, generateObject } from "ai";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { profileSnapshots } from "#/db/schema";
import { env } from "#/env";
import { jsonError, jsonOk } from "#/lib/api-error";
import { profileSchema } from "#/lib/profile-schema";
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

					if (!env.AI_GATEWAY_API_KEY) {
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

					const { object: profile } = await generateObject({
						model: gateway("anthropic/claude-sonnet-4.5"),
						schema: profileSchema,
						prompt: `You are parsing a LinkedIn profile exported as PDF text into structured JSON.

Extract and normalize the following fields:
- name: full name
- headline: professional headline
- location: geographic location (optional)
- about: the About/Summary section
- experiences: work history with title, company, location, startDate, endDate (use "Present" for current roles), and description
- education: schools with degree, field, and dates
- skills: list of skill names
- certifications: optional list with name, issuer, and date

Rules:
- Preserve factual content; do not invent information not present in the text
- Use empty arrays when a section has no entries
- Dates should match the source text format when possible

LinkedIn PDF text:
${snapshot.rawPdfText}`,
					});

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
