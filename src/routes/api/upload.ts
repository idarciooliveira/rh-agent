import { randomUUID } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";

import { db } from "#/db";
import { profileSnapshots } from "#/db/schema";
import { env } from "#/env";
import { jsonError, jsonOk } from "#/lib/api-error";
import { extractPdfText } from "#/lib/pdf";
import { getRequiredSessionId } from "#/server/session-utils";

const MAX_BYTES = env.MAX_PDF_SIZE_MB * 1024 * 1024;

export const Route = createFileRoute("/api/upload")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const sessionId = getRequiredSessionId();

					const formData = await request.formData();
					const file = formData.get("file");

					if (!(file instanceof File)) {
						return jsonError(
							'Missing "file" field in multipart form data',
							400,
						);
					}

					if (file.type !== "application/pdf") {
						return jsonError("Only application/pdf files are accepted", 400);
					}

					if (file.size > MAX_BYTES) {
						return jsonError(
							`PDF exceeds maximum size of ${env.MAX_PDF_SIZE_MB} MB`,
							413,
						);
					}

					const buffer = await file.arrayBuffer();
					const { text, totalPages } = await extractPdfText(buffer);

					const snapshotId = randomUUID();

					db.insert(profileSnapshots)
						.values({
							id: snapshotId,
							sessionId,
							rawPdfText: text,
						})
						.run();

					return jsonOk({
						snapshotId,
						totalPages,
						textLength: text.length,
					});
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					if (error instanceof Error) {
						return jsonError(error.message, 422);
					}

					return jsonError("Failed to process PDF upload", 500);
				}
			},
		},
	},
});
