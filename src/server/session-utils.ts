import { getCookie } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { db } from "#/db";
import { sessions } from "#/db/schema";
import { jsonError } from "#/lib/api-error";

import { SESSION_COOKIE_NAME } from "./session";

export function getRequiredSessionId(): string {
	const sessionId = getCookie(SESSION_COOKIE_NAME);

	if (!sessionId) {
		throw jsonError("Unauthorized: session cookie missing", 401);
	}

	const existing = db
		.select()
		.from(sessions)
		.where(eq(sessions.id, sessionId))
		.limit(1)
		.get();

	if (!existing) {
		throw jsonError("Unauthorized: invalid session", 401);
	}

	return sessionId;
}
