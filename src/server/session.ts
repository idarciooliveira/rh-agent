import { randomUUID } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { db } from "#/db";
import { sessions } from "#/db/schema";
import { env } from "#/env";

export const SESSION_COOKIE_NAME = env.SESSION_COOKIE_NAME;

export const ensureSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const existingCookie = getCookie(SESSION_COOKIE_NAME);

		if (existingCookie) {
			const existing = db
				.select()
				.from(sessions)
				.where(eq(sessions.id, existingCookie))
				.limit(1);

			if (existing.length > 0) {
				return { sessionId: existingCookie };
			}
		}

		const sessionId = randomUUID();

		db.insert(sessions).values({ id: sessionId });

		setCookie(SESSION_COOKIE_NAME, sessionId, {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 365,
		});

		return { sessionId };
	},
);
