import type { SwotAnalysis } from "#/lib/analysis-schema";
import { FREE_ITEMS_PER_LOCKED_QUADRANT, FREE_QUICK_WINS } from "#/lib/pricing";
import type { Profile } from "#/lib/profile-schema";

/** Stands in for hidden text so the blurred UI has something to blur. */
export const LOCKED_PLACEHOLDER =
	"Unlock the full review to read this point and what to do about it.";

/**
 * Strips paid content before it leaves the server. Strengths, scores and the
 * first quick wins stay; everything else keeps its count but loses its text.
 */
export function redactSwotAnalysis(analysis: SwotAnalysis): SwotAnalysis {
	const lockQuadrant = (items: SwotAnalysis["swot"]["strengths"]) =>
		items.map((item, index) =>
			index < FREE_ITEMS_PER_LOCKED_QUADRANT
				? { title: item.title, detail: LOCKED_PLACEHOLDER }
				: { title: LOCKED_PLACEHOLDER, detail: LOCKED_PLACEHOLDER },
		);

	return {
		...analysis,
		swot: {
			strengths: analysis.swot.strengths,
			weaknesses: lockQuadrant(analysis.swot.weaknesses),
			opportunities: lockQuadrant(analysis.swot.opportunities),
			threats: lockQuadrant(analysis.swot.threats),
		},
		strategicSuggestions: analysis.strategicSuggestions.map((suggestion) => ({
			...suggestion,
			text: LOCKED_PLACEHOLDER,
		})),
		quickWins: analysis.quickWins.map((win, index) =>
			index < FREE_QUICK_WINS ? win : LOCKED_PLACEHOLDER,
		),
	};
}

/**
 * Every text value in the profile joined together, without object keys. Keyword
 * matching runs on this so "Skills" can't match the `skills` property name.
 */
export function profileToText(profile: Profile): string {
	const values: string[] = [];
	const collect = (value: unknown) => {
		if (typeof value === "string") {
			values.push(value);
		} else if (Array.isArray(value)) {
			value.forEach(collect);
		} else if (value !== null && typeof value === "object") {
			Object.values(value).forEach(collect);
		}
	};
	collect(profile);
	return values.join("\n");
}

/** Matches recruiter keywords against everything the profile already says. */
export function splitKeywordsByPresence(
	keywords: string[],
	profileText: string,
): { present: string[]; missing: string[] } {
	const haystack = profileText.toLowerCase();
	const present: string[] = [];
	const missing: string[] = [];
	for (const keyword of keywords) {
		(haystack.includes(keyword.toLowerCase()) ? present : missing).push(
			keyword,
		);
	}
	return { present, missing };
}
