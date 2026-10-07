import { env } from "#/env";
import { LinkedInFetchError } from "#/lib/apify/linkedin-error";

const APIFY_BASE_URL = "https://api.apify.com/v2";
const PROFILE_MODE = "Profile details no email ($4 per 1k)";
const FETCH_TIMEOUT_MS = 90_000;

type ApifyItem = {
	error?: string | null;
	status?: number | null;
	[key: string]: unknown;
};

/** Returns the raw actor item for a public LinkedIn username. */
export async function fetchLinkedInProfile(
	username: string,
): Promise<Record<string, unknown>> {
	if (!env.APIFY_TOKEN) {
		throw new LinkedInFetchError("APIFY_TOKEN is not set", 503);
	}

	const actorId = env.APIFY_LINKEDIN_ACTOR_ID.replace("/", "~");
	const url = `${APIFY_BASE_URL}/acts/${actorId}/run-sync-get-dataset-items?maxTotalChargeUsd=${env.APIFY_MAX_COST_USD}`;

	let response: Response;
	try {
		response = await fetch(url, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${env.APIFY_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				profileScraperMode: PROFILE_MODE,
				publicIdentifiers: [username],
			}),
			signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
		});
	} catch (error) {
		if (error instanceof Error && error.name === "TimeoutError") {
			throw new LinkedInFetchError(
				"Fetching your LinkedIn profile took too long. Please try again.",
				504,
			);
		}
		throw new LinkedInFetchError(
			"Could not reach the profile service. Please try again.",
			502,
		);
	}

	if (!response.ok) {
		console.error(`Apify request failed with status ${response.status}`);
		throw new LinkedInFetchError(
			"The profile service rejected the request. Please try again later.",
			502,
		);
	}

	const items = (await response.json()) as ApifyItem[];
	const item = items[0];

	if (!item) {
		throw new LinkedInFetchError(
			"No profile data came back. Check the username and that the profile is public.",
			404,
		);
	}

	if (item.error) {
		if (item.status === 404) {
			throw new LinkedInFetchError(
				`No LinkedIn profile found for "${username}". Check the username and that the profile is public.`,
				404,
			);
		}
		throw new LinkedInFetchError(
			`Could not read this LinkedIn profile: ${item.error}`,
			422,
		);
	}

	return item;
}
