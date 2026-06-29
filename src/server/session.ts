import { randomUUID } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { db } from "#/db";
import { sessions } from "#/db/schema";

export const SESSION_COOKIE_NAME =
	process.env.SESSION_COOKIE_NAME ?? "linkedin_coach_session";

export const ensureSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const cookieName = SESSION_COOKIE_NAME;
		const existingCookie = getCookie(cookieName);

		if (existingCookie) {
			const existing = db
				.select()
				.from(sessions)
				.where(eq(sessions.id, existingCookie))
				.limit(1)
				.get();

			if (existing) {
				return { sessionId: existingCookie };
			}
		}

		const sessionId = randomUUID();

		db.insert(sessions).values({ id: sessionId }).run();

		setCookie(cookieName, sessionId, {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 365,
		});

		return { sessionId };
	},
);
