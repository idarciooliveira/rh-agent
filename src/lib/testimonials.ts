export type Testimonial = {
	name: string;
	/** Their LinkedIn headline or role, as they'd want it shown. */
	role: string;
	quote: string;
	/** Optional concrete result, e.g. "3 recruiter messages in the first week". */
	result?: string;
	/** Month the feedback was given, e.g. "October 2026". */
	date: string;
	/** Public LinkedIn URL, so visitors can check the person is real. */
	linkedinUrl?: string;
};

/**
 * Real feedback from people who used Redline, quoted with their permission.
 * The homepage section stays hidden until this list has entries.
 * Don't add invented quotes: fake testimonials break FTC rules and user trust.
 */
export const TESTIMONIALS: Testimonial[] = [];
