export async function readApiError(
	response: Response,
	fallback: string,
): Promise<string> {
	try {
		const data: unknown = await response.json();
		if (
			data &&
			typeof data === "object" &&
			"error" in data &&
			typeof data.error === "string"
		) {
			return data.error;
		}
	} catch {
		// Response body was not JSON.
	}

	return fallback;
}
