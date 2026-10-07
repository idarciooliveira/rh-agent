export class LinkedInFetchError extends Error {
	status: number;

	constructor(message: string, status: number) {
		super(message);
		this.name = "LinkedInFetchError";
		this.status = status;
	}
}
