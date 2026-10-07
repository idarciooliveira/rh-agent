import { z } from "zod";

import { type Profile, profileSchema } from "#/lib/profile-schema";

const text = z.string().nullish();
const dateSchema = z.object({ text }).nullish();

/** Only the fields we read from the harvestapi/linkedin-profile-scraper item. */
export const apifyProfileSchema = z.object({
	firstName: text,
	lastName: text,
	headline: text,
	about: text,
	location: z.object({ linkedinText: text }).nullish(),
	topSkills: z.array(z.string()).nullish(),
	skills: z.array(z.object({ name: z.string() })).nullish(),
	experience: z
		.array(
			z.object({
				position: text,
				companyName: text,
				location: text,
				description: text,
				startDate: dateSchema,
				endDate: dateSchema,
			}),
		)
		.nullish(),
	education: z
		.array(
			z.object({
				schoolName: text,
				degree: text,
				fieldOfStudy: text,
				startDate: dateSchema,
				endDate: dateSchema,
			}),
		)
		.nullish(),
	certifications: z
		.array(z.object({ title: text, issuedBy: text, issuedAt: text }))
		.nullish(),
});

function orNull(value: string | null | undefined): string | null {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
}

export function mapApifyProfile(raw: unknown): Profile {
	const item = apifyProfileSchema.parse(raw);

	const skills = item.skills?.length
		? item.skills.map((skill) => skill.name)
		: (item.topSkills ?? []);

	return profileSchema.parse({
		name: [item.firstName, item.lastName].filter(Boolean).join(" ").trim(),
		headline: item.headline?.trim() ?? "",
		location: orNull(item.location?.linkedinText),
		about: item.about?.trim() ?? "",
		experiences: (item.experience ?? []).map((entry) => ({
			title: entry.position ?? "",
			company: entry.companyName ?? "",
			location: orNull(entry.location),
			startDate: orNull(entry.startDate?.text),
			endDate: orNull(entry.endDate?.text),
			description: orNull(entry.description),
		})),
		education: (item.education ?? []).map((entry) => ({
			school: entry.schoolName ?? "",
			degree: orNull(entry.degree),
			field: orNull(entry.fieldOfStudy),
			startDate: orNull(entry.startDate?.text),
			endDate: orNull(entry.endDate?.text),
		})),
		skills,
		certifications: (item.certifications ?? []).map((entry) => ({
			name: entry.title ?? "",
			issuer: orNull(entry.issuedBy),
			date: orNull(entry.issuedAt),
		})),
	});
}
