type RateLimitRule = {
	key: string;
	limit: number;
};

const hits = new Map<string, number[]>();
let lastSweep = 0;

/** Drops keys whose hits have all expired. Runs at most once per window. */
function sweepExpired(now: number, windowMs: number): void {
	if (now - lastSweep < windowMs) {
		return;
	}
	lastSweep = now;

	for (const [key, times] of hits) {
		const recent = times.filter((time) => now - time < windowMs);
		if (recent.length === 0) {
			hits.delete(key);
		} else {
			hits.set(key, recent);
		}
	}
}

/**
 * In-memory sliding window. Checks every rule before recording anything, so a
 * rejected request neither uses up quota nor adds new keys. Resets on restart,
 * which is fine for one instance.
 */
export function consumeRateLimit(
	rules: RateLimitRule[],
	windowMs: number,
): boolean {
	const now = Date.now();
	sweepExpired(now, windowMs);

	const recentByRule = rules.map((rule) => ({
		...rule,
		recent: (hits.get(rule.key) ?? []).filter((time) => now - time < windowMs),
	}));

	if (recentByRule.some(({ limit, recent }) => recent.length >= limit)) {
		return true;
	}

	for (const { key, recent } of recentByRule) {
		hits.set(key, [...recent, now]);
	}
	return false;
}
