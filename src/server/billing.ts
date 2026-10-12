import { and, desc, eq, gt } from "drizzle-orm";

import { db } from "#/db";
import { analyses, purchases } from "#/db/schema";

export type Access = {
	unlocked: boolean;
	passExpiresAt: Date | null;
	creditsRemaining: number;
};

async function getActivePass(sessionId: string) {
	return db
		.select()
		.from(purchases)
		.where(
			and(
				eq(purchases.sessionId, sessionId),
				eq(purchases.plan, "pass30"),
				gt(purchases.expiresAt, new Date()),
			),
		)
		.orderBy(desc(purchases.expiresAt))
		.limit(1)
		.get();
}

async function getPackWithCredits(sessionId: string) {
	return db
		.select()
		.from(purchases)
		.where(
			and(
				eq(purchases.sessionId, sessionId),
				gt(purchases.creditsRemaining, 0),
			),
		)
		.orderBy(purchases.createdAt)
		.limit(1)
		.get();
}

export async function getAccess(
	sessionId: string,
	analysis: { unlockedAt: Date | null },
): Promise<Access> {
	const [pass, pack] = await Promise.all([
		getActivePass(sessionId),
		getPackWithCredits(sessionId),
	]);

	return {
		unlocked: Boolean(analysis.unlockedAt || pass),
		passExpiresAt: pass?.expiresAt ?? null,
		creditsRemaining: pack?.creditsRemaining ?? 0,
	};
}

export async function unlockAnalysis(analysisId: string): Promise<void> {
	await db
		.update(analyses)
		.set({ unlockedAt: new Date() })
		.where(eq(analyses.id, analysisId))
		.run();
}

/**
 * New reviews unlock on their own while a pass is active, or by spending a
 * pack credit. Returns whether the analysis ended up unlocked.
 */
export async function autoUnlockNewAnalysis(
	sessionId: string,
	analysisId: string,
): Promise<boolean> {
	if (await getActivePass(sessionId)) {
		await unlockAnalysis(analysisId);
		return true;
	}

	const pack = await getPackWithCredits(sessionId);
	if (!pack) {
		return false;
	}

	await db
		.update(purchases)
		.set({ creditsRemaining: pack.creditsRemaining - 1 })
		.where(eq(purchases.id, pack.id))
		.run();
	await unlockAnalysis(analysisId);
	return true;
}

export async function hasActivePass(sessionId: string): Promise<boolean> {
	return Boolean(await getActivePass(sessionId));
}
