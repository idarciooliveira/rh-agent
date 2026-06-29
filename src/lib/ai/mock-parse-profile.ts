import { env } from "#/env";
import { sampleProfile } from "#/lib/ai/fixtures/sample-profile";
import type { Profile } from "#/lib/profile-schema";

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function normalizePdfText(text: string): string {
	return text.replace(/\s+/g, " ").trim();
}

function extractName(text: string): string | undefined {
	for (const line of text.split("\n")) {
		const trimmed = line.trim();
		if (trimmed.length > 0 && trimmed.length <= 80) {
			return trimmed;
		}
	}

	const normalized = normalizePdfText(text);
	const nameMatch = normalized.match(/^([A-Z][a-z]+\s+[A-Z][a-z]+)\b/);
	return nameMatch?.[1];
}

function extractHeadline(text: string): string | undefined {
	for (const line of text.split("\n")) {
		const trimmed = line.trim();
		if (trimmed.includes(" at ") && trimmed.length <= 120) {
			return trimmed;
		}
	}

	const normalized = normalizePdfText(text);
	const headlineMatch = normalized.match(
		/\b([A-Za-z][A-Za-z\s/-]{2,40} at [A-Za-z0-9][A-Za-z0-9\s&.,'-]{1,40})\b/,
	);
	return headlineMatch?.[1];
}

function extractAboutSection(text: string): string | undefined {
	const multilineMatch = text.match(
		/About\s*\n([\s\S]*?)(?:\n\n|\nExperience|\nEducation|\nSkills|$)/i,
	);
	if (multilineMatch?.[1]) {
		const about = multilineMatch[1].replace(/\s+/g, " ").trim();
		return about.length > 0 ? about.slice(0, 500) : undefined;
	}

	const inlineMatch = normalizePdfText(text).match(
		/\bAbout\b\s+(.+?)(?:\s+Experience\b|\s+Education\b|\s+Skills\b|$)/i,
	);
	if (inlineMatch?.[1]) {
		const about = inlineMatch[1].trim();
		return about.length > 0 ? about.slice(0, 500) : undefined;
	}

	return undefined;
}

function buildMockProfile(rawPdfText: string): Profile {
	const name = extractName(rawPdfText) ?? sampleProfile.name;
	const headline = extractHeadline(rawPdfText) ?? sampleProfile.headline;
	const about = extractAboutSection(rawPdfText) ?? sampleProfile.about;

	return {
		...sampleProfile,
		name,
		headline,
		about,
	};
}

export async function mockParseProfileFromText(
	rawPdfText: string,
): Promise<Profile> {
	await delay(env.AI_MOCK_DELAY_MS);
	return buildMockProfile(rawPdfText);
}
