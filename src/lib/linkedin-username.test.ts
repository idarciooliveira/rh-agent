import { describe, expect, it } from "vitest";

import { parseLinkedInUsername } from "#/lib/linkedin-username";

describe("parseLinkedInUsername", () => {
	it.each([
		["idarciooliveira", "idarciooliveira"],
		["  IdarcioOliveira ", "idarciooliveira"],
		["@janedoe", "janedoe"],
		["linkedin.com/in/janedoe/", "janedoe"],
		["https://www.linkedin.com/in/jane-doe-123?utm=x", "jane-doe-123"],
		["https://pt.linkedin.com/in/jos%C3%A9-silva", "josé-silva"],
	])("parses %s", (input, expected) => {
		expect(parseLinkedInUsername(input)).toBe(expected);
	});

	it.each([
		"",
		"  ",
		"ab",
		"jane doe",
		"https://example.com/in/janedoe",
		"linkedin.com/company/acme",
	])("rejects %j", (input) => {
		expect(parseLinkedInUsername(input)).toBeNull();
	});
});
