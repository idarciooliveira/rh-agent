import { describe, expect, it } from "vitest";
import { buildSampleAnalysis } from "#/lib/ai/fixtures/sample-analysis";
import { sampleProfile } from "#/lib/ai/fixtures/sample-profile";
import {
	LOCKED_PLACEHOLDER,
	redactSwotAnalysis,
	splitKeywordsByPresence,
} from "#/lib/paywall";
import { formatPrice } from "#/lib/pricing";

describe("redactSwotAnalysis", () => {
	const { swotAnalysis } = buildSampleAnalysis(
		sampleProfile,
		"DevOps engineer at a cloud company",
	);
	const redacted = redactSwotAnalysis(swotAnalysis);

	it("keeps scores, strengths and the first two quick wins", () => {
		expect(redacted.profileScore).toBe(swotAnalysis.profileScore);
		expect(redacted.swot.strengths).toEqual(swotAnalysis.swot.strengths);
		expect(redacted.quickWins.slice(0, 2)).toEqual(
			swotAnalysis.quickWins.slice(0, 2),
		);
	});

	it("removes every paid string", () => {
		const paidText = [
			...swotAnalysis.swot.weaknesses.slice(1).map((item) => item.title),
			...swotAnalysis.swot.threats.map((item) => item.detail),
			...swotAnalysis.strategicSuggestions.map((item) => item.text),
			...swotAnalysis.quickWins.slice(2),
		];
		const serialized = JSON.stringify(redacted);
		for (const text of paidText) {
			expect(serialized).not.toContain(text);
		}
		expect(redacted.quickWins[2]).toBe(LOCKED_PLACEHOLDER);
		expect(redacted.swot.weaknesses).toHaveLength(
			swotAnalysis.swot.weaknesses.length,
		);
	});
});

describe("splitKeywordsByPresence", () => {
	it("is case-insensitive", () => {
		expect(
			splitKeywordsByPresence(["AWS", "Terraform"], "Built pipelines on aws"),
		).toEqual({ present: ["AWS"], missing: ["Terraform"] });
	});
});

describe("formatPrice", () => {
	it("formats kwanza with dot separators", () => {
		expect(formatPrice("AO", 2900)).toBe("2.900 Kz");
	});
});
