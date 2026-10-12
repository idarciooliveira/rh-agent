import { randomInt } from "node:crypto";

import { env } from "#/env";
import { type PaymentMethod, PHONE_METHODS } from "#/lib/pricing";

export type PaymentRequest = {
	method: PaymentMethod;
	amount: number;
	currency: string;
	phone: string | null;
};

export type PaymentResult =
	| { status: "paid"; reference: string }
	| { status: "declined"; reason: string };

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

/**
 * Stand-in for AppyPay (Multicaixa Express, reference), É-kwanza, Pix and a
 * card merchant of record. Every payment succeeds unless the phone number
 * ends in 000, which simulates a buyer rejecting the push on their phone.
 */
export async function chargeMockPayment(
	request: PaymentRequest,
): Promise<PaymentResult> {
	await delay(Math.min(env.AI_MOCK_DELAY_MS, 1200));

	if (PHONE_METHODS.includes(request.method)) {
		if (!request.phone) {
			return { status: "declined", reason: "Phone number is required" };
		}
		if (request.phone.endsWith("000")) {
			return {
				status: "declined",
				reason: "The payment was rejected on the phone. Try again.",
			};
		}
	}

	const prefix = request.method === "reference" ? "REF" : "MOCK";
	return {
		status: "paid",
		reference: `${prefix}-${randomInt(100_000_000, 999_999_999)}`,
	};
}
