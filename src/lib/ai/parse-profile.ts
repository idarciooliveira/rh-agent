import { gateway, generateObject } from "ai";

import type { Profile } from "#/lib/profile-schema";
import { profileSchema } from "#/lib/profile-schema";

const PARSE_PROMPT_PREFIX = `You are parsing a LinkedIn profile exported as PDF text into structured JSON.

Extract and normalize the following fields:
- name: full name
- headline: professional headline
- location: geographic location (optional)
- about: the About/Summary section
- experiences: work history with title, company, location, startDate, endDate (use "Present" for current roles), and description
- education: schools with degree, field, and dates
- skills: list of skill names
- certifications: optional list with name, issuer, and date

Rules:
- Preserve factual content; do not invent information not present in the text
- Use empty arrays when a section has no entries
- Dates should match the source text format when possible

LinkedIn PDF text:
`;

export async function parseProfileFromText(
	rawPdfText: string,
): Promise<Profile> {
	const { object: profile } = await generateObject({
		model: gateway("anthropic/claude-sonnet-4.5"),
		schema: profileSchema,
		prompt: `${PARSE_PROMPT_PREFIX}${rawPdfText}`,
	});

	return profile;
}
