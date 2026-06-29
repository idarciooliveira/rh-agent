CREATE TABLE `analyses` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`career_goal` text NOT NULL,
	`profile_snapshot_id` text NOT NULL,
	`swot_json` text NOT NULL,
	`recommendations_json` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`profile_snapshot_id`) REFERENCES `profile_snapshots`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `profile_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`raw_pdf_text` text,
	`normalized_profile_json` text,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL
);
