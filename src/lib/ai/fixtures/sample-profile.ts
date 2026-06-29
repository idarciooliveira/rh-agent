import type { Profile } from "#/lib/profile-schema";

export const sampleProfile: Profile = {
	name: "Jane Smith",
	headline: "Product Manager at TechCo",
	location: "London, UK",
	about: "Product leader with 8 years experience in B2B SaaS.",
	experiences: [
		{
			title: "Product Manager",
			company: "TechCo",
			location: "London",
			startDate: "Jan 2019",
			endDate: "Present",
			description: "Leading B2B SaaS roadmap.",
		},
	],
	education: [
		{
			school: "University of London",
			degree: "MBA",
			field: "Business",
			startDate: "2015",
			endDate: "2017",
		},
	],
	skills: ["Product Strategy", "Agile", "SQL"],
	certifications: [
		{ name: "Certified Scrum Product Owner", issuer: "Scrum Alliance" },
	],
};
