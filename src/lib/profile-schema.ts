import { z } from "zod";

export const experienceEntrySchema = z.object({
	title: z.string(),
	company: z.string(),
	location: z.string().nullable(),
	startDate: z.string().nullable(),
	endDate: z.string().nullable(), // use "Present" for current roles
	description: z.string().nullable(),
});

export const educationEntrySchema = z.object({
	school: z.string(),
	degree: z.string().nullable(),
	field: z.string().nullable(),
	startDate: z.string().nullable(),
	endDate: z.string().nullable(),
});

export const certificationEntrySchema = z.object({
	name: z.string(),
	issuer: z.string().nullable(),
	date: z.string().nullable(),
});

export const profileSchema = z.object({
	name: z.string(),
	headline: z.string(),
	location: z.string().nullable(),
	about: z.string(),
	experiences: z.array(experienceEntrySchema),
	education: z.array(educationEntrySchema),
	skills: z.array(z.string()),
	certifications: z.array(certificationEntrySchema),
});

function toNullableString(value: unknown): string | null {
	if (value === undefined || value === null) {
		return null;
	}

	return String(value);
}

function normalizeExperienceEntry(raw: unknown): unknown {
	if (typeof raw !== "object" || raw === null) {
		return raw;
	}

	const entry = raw as Record<string, unknown>;

	return {
		title: entry.title ?? "",
		company: entry.company ?? "",
		location: toNullableString(entry.location),
		startDate: toNullableString(entry.startDate),
		endDate: toNullableString(entry.endDate),
		description: toNullableString(entry.description),
	};
}

function normalizeEducationEntry(raw: unknown): unknown {
	if (typeof raw !== "object" || raw === null) {
		return raw;
	}

	const entry = raw as Record<string, unknown>;

	return {
		school: entry.school ?? "",
		degree: toNullableString(entry.degree),
		field: toNullableString(entry.field),
		startDate: toNullableString(entry.startDate),
		endDate: toNullableString(entry.endDate),
	};
}

function normalizeCertificationEntry(raw: unknown): unknown {
	if (typeof raw !== "object" || raw === null) {
		return raw;
	}

	const entry = raw as Record<string, unknown>;

	return {
		name: entry.name ?? "",
		issuer: toNullableString(entry.issuer),
		date: toNullableString(entry.date),
	};
}

/** Backfill keys missing from profiles saved before nullable-field migration. */
export function normalizeStoredProfile(raw: unknown): unknown {
	if (typeof raw !== "object" || raw === null) {
		return raw;
	}

	const profile = raw as Record<string, unknown>;

	return {
		...profile,
		location: toNullableString(profile.location),
		experiences: Array.isArray(profile.experiences)
			? profile.experiences.map(normalizeExperienceEntry)
			: profile.experiences,
		education: Array.isArray(profile.education)
			? profile.education.map(normalizeEducationEntry)
			: profile.education,
		skills: profile.skills ?? [],
		certifications: Array.isArray(profile.certifications)
			? profile.certifications.map(normalizeCertificationEntry)
			: [],
	};
}

export function parseStoredProfile(json: string | unknown): Profile {
	const raw = typeof json === "string" ? JSON.parse(json) : json;
	return profileSchema.parse(normalizeStoredProfile(raw));
}

export type Profile = z.infer<typeof profileSchema>;
export type ExperienceEntry = z.infer<typeof experienceEntrySchema>;
export type EducationEntry = z.infer<typeof educationEntrySchema>;
export type CertificationEntry = z.infer<typeof certificationEntrySchema>;

export type Experience = ExperienceEntry;
export type Education = EducationEntry;
export type Certification = CertificationEntry;

export const emptyExperience = (): ExperienceEntry => ({
	title: "",
	company: "",
	location: null,
	startDate: null,
	endDate: null,
	description: null,
});

export const emptyEducation = (): EducationEntry => ({
	school: "",
	degree: null,
	field: null,
	startDate: null,
	endDate: null,
});

export const emptyCertification = (): CertificationEntry => ({
	name: "",
	issuer: null,
	date: null,
});
