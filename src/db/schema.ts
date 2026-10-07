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
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.$defaultFn(() => new Date()),
});
