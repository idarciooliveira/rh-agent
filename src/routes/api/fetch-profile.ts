import { randomUUID } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { db } from "#/db";
import { profileSnapshots } from "#/db/schema";
import { env } from "#/env";
import { resolveAiMode } from "#/lib/ai/resolve-ai-mode";
import { jsonError, jsonOk } from "#/lib/api-error";
import { fetchLinkedInProfile } from "#/lib/apify/fetch-linkedin-profile";
import { LinkedInFetchError } from "#/lib/apify/linkedin-error";
import { mapApifyProfile } from "#/lib/apify/map-linkedin-profile";
import { mockFetchLinkedInProfile } from "#/lib/apify/mock-fetch-linkedin-profile";
import { linkedInUsernameSchema } from "#/lib/linkedin-username";
import { isRateLimited } from "#/lib/rate-limit";
import { getRequiredSessionId } from "#/server/session-utils";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

const fetchProfileRequestSchema = z.object({
	username: linkedInUsernameSchema,
});

export const Route = createFileRoute("/api/fetch-profile")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const sessionId = getRequiredSessionId();
					const aiMode = resolveAiMode();

					if (aiMode === "unavailable") {
						return jsonError(
							"AI analysis is unavailable: set AI_GATEWAY_API_KEY in your environment.",
							503,
						);
					}

					if (aiMode === "live" && !env.APIFY_TOKEN) {
						return jsonError(
							"Profile fetching is unavailable: set APIFY_TOKEN in your environment.",
							503,
						);
					}

					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonError("Invalid JSON body", 400);
					}

					const parsed = fetchProfileRequestSchema.safeParse(body);
					if (!parsed.success) {
						return jsonError(
							parsed.error.issues[0]?.message ??
								"Request body must include username",
							400,
						);
					}

					const { username } = parsed.data;

					const ip = request.headers
						.get("x-forwarded-for")
						?.split(",")[0]
						?.trim();
					if (
						isRateLimited(`session:${sessionId}`, RATE_LIMIT, RATE_WINDOW_MS) ||
						(ip && isRateLimited(`ip:${ip}`, RATE_LIMIT * 4, RATE_WINDOW_MS))
					) {
						return jsonError(
							"Too many profile lookups. Please try again in an hour.",
							429,
						);
					}

					let profile: ReturnType<typeof mapApifyProfile>;
					let rawSourceJson: string | null = null;

					if (aiMode === "mock") {
						profile = await mockFetchLinkedInProfile(username);
					} else {
						const raw = await fetchLinkedInProfile(username);
						profile = mapApifyProfile(raw);
						rawSourceJson = JSON.stringify(raw);
					}

					const snapshotId = randomUUID();

					db.insert(profileSnapshots)
						.values({
							id: snapshotId,
							sessionId,
							linkedinUsername: username,
							rawSourceJson,
							normalizedProfileJson: JSON.stringify(profile),
						})
						.run();

					return jsonOk({ snapshotId, profile });
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					if (error instanceof LinkedInFetchError) {
						return jsonError(error.message, error.status);
					}

					if (error instanceof z.ZodError) {
						return jsonError(
							"This LinkedIn profile came back in an unexpected format.",
							502,
						);
					}

					console.error("fetch-profile failed", error);
					return jsonError("Failed to fetch LinkedIn profile", 500);
				}
			},
		},
	},
});
