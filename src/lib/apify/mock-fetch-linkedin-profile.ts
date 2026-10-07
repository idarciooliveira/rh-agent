import { env } from "#/env";
import { sampleProfile } from "#/lib/ai/fixtures/sample-profile";
import type { Profile } from "#/lib/profile-schema";

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function nameFromUsername(username: string): string {
	const words = username.split(/[-_]+/).filter((word) => /[a-z]/i.test(word));
	if (words.length === 0) {
		return sampleProfile.name;
	}
	return words.map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
}

export async function mockFetchLinkedInProfile(
	username: string,
): Promise<Profile> {
	await delay(env.AI_MOCK_DELAY_MS);
	return { ...sampleProfile, name: nameFromUsername(username) };
}
