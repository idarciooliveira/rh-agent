import { generateObject, NoObjectGeneratedError } from "ai";
import { z } from "zod";

import { AI_MODEL } from "#/lib/ai/model";

const MAX_ATTEMPTS = 2;

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
	// Gemma ignores the schema in tool mode and invents its own keys, so the
	// JSON Schema also goes into the prompt.
	const basePrompt = `Respond with a single JSON object that matches exactly this JSON Schema, using these exact key names and no others:\n${JSON.stringify(z.toJSONSchema(schema))}\n\n${prompt}`;

	let currentPrompt = basePrompt;

	for (let attempt = 1; ; attempt++) {
		try {
			const { object } = await generateObject({
				model: AI_MODEL,
				schema,
				schemaName,
				schemaDescription,
				mode: "json",
				prompt: currentPrompt,
			});

			return object;
		} catch (error) {
			if (
				attempt >= MAX_ATTEMPTS ||
				!NoObjectGeneratedError.isInstance(error) ||
				!error.text
			) {
				throw error;
			}

			// Show the model its own answer and what the schema rejected.
			currentPrompt = `${basePrompt}\n\nYour previous answer was rejected:\n${error.text}\n\nValidation errors:\n${error.cause instanceof Error ? error.cause.message : "response did not match schema"}\n\nReturn the full corrected JSON object.`;
		}
	}
}
