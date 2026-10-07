import { z } from "zod";

const USERNAME_PATTERN = /^[a-z0-9À-ɏ%_-]{3,100}$/i;

/**
 * Accepts "janedoe", "linkedin.com/in/janedoe/" or a full profile URL and
 * returns the bare public identifier, or null if it doesn't look like one.
 */
export function parseLinkedInUsername(input: string): string | null {
	let value = input.trim();
	if (!value) {
		return null;
	}

	const urlMatch = value.match(/linkedin\.com\/in\/([^/?#\s]+)/i);
	if (urlMatch?.[1]) {
		value = urlMatch[1];
	} else if (/[/\s]/.test(value)) {
		return null;
	}

	value = value.replace(/^@/, "");

	try {
		value = decodeURIComponent(value);
	} catch {
		return null;
	}

	return USERNAME_PATTERN.test(value) ? value.toLowerCase() : null;
}

export const linkedInUsernameSchema = z.string().transform((value, ctx) => {
	const username = parseLinkedInUsername(value);
	if (!username) {
		ctx.addIssue({
			code: "custom",
			message:
				"Enter your LinkedIn username or profile URL, like linkedin.com/in/janedoe",
		});
		return z.NEVER;
	}
	return username;
});
