import { createServerFn } from "@tanstack/react-start";

import { resolveAiMode } from "#/lib/ai/resolve-ai-mode";

export const getAiMode = createServerFn({ method: "GET" }).handler(async () => {
	return resolveAiMode();
});
