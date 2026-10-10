CREATE TABLE `leads` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`analysis_id` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`analysis_id`) REFERENCES `analyses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `analyses` ADD `unlocked_at` integer;