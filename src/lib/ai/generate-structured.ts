import { generateObject } from "ai";
import type { z } from "zod";

import { AI_MODEL } from "#/lib/ai/model";

type GenerateStructuredObjectOptions<T extends z.ZodType> = {
	schema: T;
	prompt: string;
	schemaName: string;
	schemaDescription: string;
};

export async function generateStructuredObject<T extends z.ZodType>({
	schema,
	prompt,
	schemaName,
	schemaDescription,
}: GenerateStructuredObjectOptions<T>): Promise<z.infer<T>> {
	const { object } = await generateObject({
		model: AI_MODEL,
		schema,
		schemaName,
		schemaDescription,
		mode: "tool",
		prompt,
	});

	return object;
}
