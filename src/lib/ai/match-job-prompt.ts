import type { Profile } from "#/lib/profile-schema";

/**
 * Wraps the untrusted job post and profile in tags. Every "<" inside them is
 * escaped, so text like "</job_post>" can't close a section early.
 */
export function buildMatchJobPrompt(profile: Profile, jobPost: string): string {
	const safeJobPost = jobPost.replaceAll("<", "&lt;");
	// \u003c keeps the JSON valid and parses back to "<".
	const safeProfile = JSON.stringify(profile, null, 2).replaceAll(
		"<",
		"\\u003c",
	);

	return `<job_post>
${safeJobPost}
</job_post>

<profile_json>
${safeProfile}
</profile_json>`;
}
