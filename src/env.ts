import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().default("./data/app.db"),
		AI_GATEWAY_API_KEY: z.string().optional(),
		MAX_PDF_SIZE_MB: z.coerce.number().default(5),
		SESSION_COOKIE_NAME: z.string().default("linkedin_coach_session"),
		SERVER_URL: z.string().url().optional(),
	},

	clientPrefix: "VITE_",

	client: {
		VITE_APP_TITLE: z.string().min(1).optional(),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		AI_GATEWAY_API_KEY: process.env.AI_GATEWAY_API_KEY,
		MAX_PDF_SIZE_MB: process.env.MAX_PDF_SIZE_MB,
		SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
		SERVER_URL: process.env.SERVER_URL,
		VITE_APP_TITLE: import.meta.env.VITE_APP_TITLE,
	},

	emptyStringAsUndefined: true,
});
