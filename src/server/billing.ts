import { and, desc, eq, gt, sql } from "drizzle-orm";

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

/** Only 3-review packs sold before the two-plan pricing carry credits. */
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

/** The shared db handle or a transaction opened from it. */
export type DbClient = Pick<typeof db, "update">;

export async function unlockAnalysis(
	analysisId: string,
	client: DbClient = db,
): Promise<void> {
	await client
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

	// The decrement is conditional and shares a transaction with the unlock, so
	// two requests can't spend one credit twice and a failed unlock keeps it.
	return db.transaction(async (tx) => {
		const spent = await tx
			.update(purchases)
			.set({ creditsRemaining: sql`${purchases.creditsRemaining} - 1` })
			.where(and(eq(purchases.id, pack.id), gt(purchases.creditsRemaining, 0)))
			.run();
		if (spent.rowsAffected === 0) {
			return false;
		}

		await unlockAnalysis(analysisId, tx);
		return true;
	});
}

export async function hasActivePass(sessionId: string): Promise<boolean> {
	return Boolean(await getActivePass(sessionId));
}
