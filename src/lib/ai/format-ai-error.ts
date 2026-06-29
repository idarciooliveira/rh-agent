export function formatAiError(error: unknown): string {
	if (!(error instanceof Error)) {
		return "Unknown AI error";
	}

	const message = error.message;

	if (message.includes("rate-limited") || message.includes("RateLimit")) {
		return "AI rate limit reached. Wait a moment and retry, or add credits to your Vercel AI Gateway account.";
	}

	if (message === "Bad Request") {
		return "AI request rejected by the model provider. Check your AI_GATEWAY_API_KEY and model access.";
	}

	return message;
}
