CREATE TABLE `job_matches` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`analysis_id` text NOT NULL,
	`job_post` text NOT NULL,
	`result_json` text NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`analysis_id`) REFERENCES `analyses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `purchases` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`analysis_id` text,
	`plan` text NOT NULL,
	`region` text NOT NULL,
	`currency` text NOT NULL,
	`amount` integer NOT NULL,
	`payment_method` text NOT NULL,
	`payment_reference` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`human_review` integer DEFAULT false NOT NULL,
	`credits_remaining` integer DEFAULT 0 NOT NULL,
	`expires_at` integer,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`analysis_id`) REFERENCES `analyses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `analyses` ADD `unlocked_at` integer;