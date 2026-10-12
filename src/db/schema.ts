import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
	id: text("id").primaryKey(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
});

export const profileSnapshots = sqliteTable("profile_snapshots", {
	id: text("id").primaryKey(),
	sessionId: text("session_id")
		.notNull()
		.references(() => sessions.id),
	rawPdfText: text("raw_pdf_text"),
	linkedinUsername: text("linkedin_username"),
	rawSourceJson: text("raw_source_json"),
	normalizedProfileJson: text("normalized_profile_json"),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
});

export const analyses = sqliteTable("analyses", {
	id: text("id").primaryKey(),
	sessionId: text("session_id")
		.notNull()
		.references(() => sessions.id),
	careerGoal: text("career_goal").notNull(),
	profileSnapshotId: text("profile_snapshot_id")
		.notNull()
		.references(() => profileSnapshots.id),
	swotJson: text("swot_json").notNull(),
	recommendationsJson: text("recommendations_json").notNull(),
	unlockedAt: integer("unlocked_at", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
});

/** Mock checkout records. Swap the provider, keep the table. */
export const purchases = sqliteTable("purchases", {
	id: text("id").primaryKey(),
	sessionId: text("session_id")
		.notNull()
		.references(() => sessions.id),
	analysisId: text("analysis_id").references(() => analyses.id),
	plan: text("plan").notNull(),
	region: text("region").notNull(),
	currency: text("currency").notNull(),
	amount: integer("amount").notNull(),
	paymentMethod: text("payment_method").notNull(),
	paymentReference: text("payment_reference").notNull(),
	email: text("email").notNull(),
	phone: text("phone"),
	humanReview: integer("human_review", { mode: "boolean" })
		.notNull()
		.default(false),
	creditsRemaining: integer("credits_remaining").notNull().default(0),
	expiresAt: integer("expires_at", { mode: "timestamp" }),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
});

export const jobMatches = sqliteTable("job_matches", {
	id: text("id").primaryKey(),
	sessionId: text("session_id")
		.notNull()
		.references(() => sessions.id),
	analysisId: text("analysis_id")
		.notNull()
		.references(() => analyses.id),
	jobPost: text("job_post").notNull(),
	resultJson: text("result_json").notNull(),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
});
