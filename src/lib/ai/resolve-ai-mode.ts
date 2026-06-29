import { env } from "#/env";

export type AiMode = "mock" | "live" | "unavailable";

export function resolveAiMode(): AiMode {
	if (env.AI_MOCK_MODE) {
		if (process.env.NODE_ENV === "production") {
			return "unavailable";
		}

		return "mock";
	}

	if (env.AI_GATEWAY_API_KEY) {
		return "live";
	}

	return "unavailable";
}

export function getAiModeForClient(): AiMode {
	return resolveAiMode();
}
