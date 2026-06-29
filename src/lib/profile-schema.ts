import { z } from "zod";

export const experienceEntrySchema = z.object({
	title: z.string(),
	company: z.string(),
	location: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(), // use "Present" for current roles
	description: z.string().optional(),
});

export const educationEntrySchema = z.object({
	school: z.string(),
	degree: z.string().optional(),
	field: z.string().optional(),
	startDate: z.string().optional(),
	endDate: z.string().optional(),
});

export const certificationEntrySchema = z.object({
	name: z.string(),
	issuer: z.string().optional(),
	date: z.string().optional(),
});

export const profileSchema = z.object({
	name: z.string(),
	headline: z.string(),
	location: z.string().optional(),
	about: z.string(),
	experiences: z.array(experienceEntrySchema),
	education: z.array(educationEntrySchema),
	skills: z.array(z.string()),
	certifications: z.array(certificationEntrySchema).optional(),
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
});

export const emptyEducation = (): EducationEntry => ({
	school: "",
});

export const emptyCertification = (): CertificationEntry => ({
	name: "",
});
