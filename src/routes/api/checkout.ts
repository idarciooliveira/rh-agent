import { randomUUID } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { analyses, purchases } from "#/db/schema";
import { jsonError, jsonOk } from "#/lib/api-error";
import { chargeMockPayment } from "#/lib/payments/mock-provider";
import {
	PACK_SIZE,
	PASS_DAYS,
	paymentMethodSchema,
	planSchema,
	REGION_CONFIG,
	regionSchema,
} from "#/lib/pricing";
import { unlockAnalysis } from "#/server/billing";
import { getRequiredSessionId } from "#/server/session-utils";

const checkoutRequestSchema = z.object({
	analysisId: z.string().min(1).optional(),
	plan: planSchema,
	region: regionSchema,
	method: paymentMethodSchema,
	email: z.email(),
	phone: z
		.string()
		.trim()
		.regex(/^\+?[0-9 ]{9,15}$/)
		.optional(),
	humanReview: z.boolean().default(false),
});

export const Route = createFileRoute("/api/checkout")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const sessionId = await getRequiredSessionId();

					let body: unknown;
					try {
						body = await request.json();
					} catch {
						return jsonError("Invalid JSON body", 400);
					}

					const parsed = checkoutRequestSchema.safeParse(body);
					if (!parsed.success) {
						return jsonError(
							"Check your email, phone number and payment method",
							400,
						);
					}

					const { analysisId, plan, region, method, email, phone } =
						parsed.data;
					const regionConfig = REGION_CONFIG[region];

					if (!regionConfig.methods.includes(method)) {
						return jsonError(
							`That payment method isn't available in ${regionConfig.label}`,
							400,
						);
					}

					const unlocksAnalysis = plan !== "human_review";
					if (unlocksAnalysis && !analysisId) {
						return jsonError("analysisId is required for this plan", 400);
					}

					if (analysisId) {
						const owned = await db
							.select({ id: analyses.id })
							.from(analyses)
							.where(
								and(
									eq(analyses.id, analysisId),
									eq(analyses.sessionId, sessionId),
								),
							)
							.limit(1)
							.get();
						if (!owned) {
							return jsonError("Analysis not found", 404);
						}
					}

					const humanReview =
						plan === "human_review" || parsed.data.humanReview;
					const amount =
						regionConfig.prices[plan] +
						(humanReview && plan !== "human_review"
							? regionConfig.prices.human_review
							: 0);

					const payment = await chargeMockPayment({
						method,
						amount,
						currency: regionConfig.currency,
						phone: phone ?? null,
					});

					if (payment.status === "declined") {
						return jsonError(payment.reason, 402);
					}

					const purchaseId = randomUUID();
					try {
						await db.transaction(async (tx) => {
							await tx
								.insert(purchases)
								.values({
									id: purchaseId,
									sessionId,
									analysisId: analysisId ?? null,
									plan,
									region,
									currency: regionConfig.currency,
									amount,
									paymentMethod: method,
									paymentReference: payment.reference,
									email,
									phone: phone ?? null,
									humanReview,
									creditsRemaining: plan === "pack3" ? PACK_SIZE - 1 : 0,
									expiresAt:
										plan === "pass30"
											? new Date(Date.now() + PASS_DAYS * 24 * 60 * 60 * 1000)
											: null,
								})
								.run();

							if (unlocksAnalysis && analysisId) {
								await unlockAnalysis(analysisId, tx);
							}
						});
					} catch (error) {
						// The mock provider moves no money. A real one needs a refund or
						// void here, so keep the reference for reconciliation.
						console.error(
							`checkout: payment ${payment.reference} was not recorded`,
							error,
						);
						throw error;
					}

					return jsonOk({
						purchaseId,
						reference: payment.reference,
						amount,
						currency: regionConfig.currency,
					});
				} catch (error) {
					if (error instanceof Response) {
						return error;
					}

					return jsonError("Checkout failed. You were not charged.", 500);
				}
			},
		},
	},
});
