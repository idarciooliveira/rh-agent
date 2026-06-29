import { generateStructuredObject } from "#/lib/ai/generate-structured";
import type { Profile } from "#/lib/profile-schema";
import { profileSchema } from "#/lib/profile-schema";

const PARSE_PROMPT_PREFIX = `You are parsing a LinkedIn profile exported as PDF text into structured JSON.

Extract and normalize the following fields:
- name: full name
- headline: professional headline
- location: geographic location (null if absent)
- about: the About/Summary section
- experiences: work history with title, company, location, startDate, endDate (use "Present" for current roles), and description
- education: schools with degree, field, and dates
- skills: list of skill names
- certifications: list with name, issuer, and date (empty array if none)

Rules:
- Preserve factual content; do not invent information not present in the text
- Use null for missing optional string fields; use empty arrays when a section has no entries
- Dates should match the source text format when possible

LinkedIn PDF text:
`;

export async function parseProfileFromText(
	rawPdfText: string,
): Promise<Profile> {
	return generateStructuredObject({
		schema: profileSchema,
		schemaName: "LinkedInProfile",
		schemaDescription:
			"Structured LinkedIn profile extracted from exported PDF text",
		prompt: `${PARSE_PROMPT_PREFIX}${rawPdfText}`,
	});
}
