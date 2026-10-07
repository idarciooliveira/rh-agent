import { describe, expect, it } from "vitest";

import fixture from "#/lib/ai/fixtures/apify-linkedin-profile.json";
import { mapApifyProfile } from "#/lib/apify/map-linkedin-profile";

describe("mapApifyProfile", () => {
	const profile = mapApifyProfile(fixture);

	it("maps the basics", () => {
		expect(profile.name).toBe(`${fixture.firstName} ${fixture.lastName}`);
		expect(profile.headline).toBe(fixture.headline);
		expect(profile.location).toBe(fixture.location.linkedinText);
	});

	it("maps experience, with Present for current roles", () => {
		expect(profile.experiences).toHaveLength(fixture.experience.length);
		expect(profile.experiences[0]).toMatchObject({
			title: fixture.experience[0]?.position,
			company: fixture.experience[0]?.companyName,
			endDate: "Present",
		});
	});

	it("maps education, skills and certifications", () => {
		expect(profile.education[0]?.field).toBe(
			fixture.education[0]?.fieldOfStudy,
		);
		expect(profile.skills).toEqual(fixture.skills.map((skill) => skill.name));
		expect(profile.certifications[0]).toMatchObject({
			name: fixture.certifications[0]?.title,
			issuer: fixture.certifications[0]?.issuedBy,
		});
	});

	it("tolerates a sparse profile", () => {
		expect(mapApifyProfile({ firstName: "Ana" })).toMatchObject({
			name: "Ana",
			headline: "",
			location: null,
			experiences: [],
			skills: [],
		});
	});
});
