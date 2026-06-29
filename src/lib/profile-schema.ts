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
