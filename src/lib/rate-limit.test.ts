import { describe, expect, it } from "vitest";

import { consumeRateLimit } from "#/lib/rate-limit";

describe("consumeRateLimit", () => {
	it("allows hits up to the limit, then blocks", () => {
		const rules = [{ key: "test:limit", limit: 2 }];

		expect(consumeRateLimit(rules, 60_000)).toBe(false);
		expect(consumeRateLimit(rules, 60_000)).toBe(false);
		expect(consumeRateLimit(rules, 60_000)).toBe(true);
	});

	it("does not record a session hit when another rule rejects the request", () => {
		const rules = [
			{ key: "test:session", limit: 5 },
			{ key: "test:ip-full", limit: 1 },
		];
		expect(consumeRateLimit([{ key: "test:ip-full", limit: 1 }], 60_000)).toBe(
			false,
		);

		expect(consumeRateLimit(rules, 60_000)).toBe(true);
		expect(consumeRateLimit([{ key: "test:session", limit: 1 }], 60_000)).toBe(
			false,
		);
	});
});
