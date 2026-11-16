import { type FormEvent, useState } from "react";
import { LockedOverlay } from "#/components/results/Locked";
import { CopyButton } from "#/components/results/OptimizedProfilePreviewModal";
import type { JobMatch, Recommendations } from "#/lib/analysis-schema";
import { readApiError } from "#/lib/api-client";
import { BriefcaseIcon, CheckIcon, PenLineIcon, PlusIcon } from "#/lib/icons";

type JobHuntToolkitProps = {
	analysisId: string;
	hasPass: boolean;
	contentPlan: Recommendations["contentPlan"];
	onGetPass: () => void;
};

const JOB_POST_MIN = 80;

export function JobHuntToolkit({
	analysisId,
	hasPass,
	contentPlan,
	onGetPass,
}: JobHuntToolkitProps) {
	return (
		<section className="mt-12 sm:mt-16">
			<div className="mb-5">
				<p className="font-mono text-xs font-medium tracking-[0.14em] text-primary-ink uppercase">
					Job Search Pass
				</p>
				<h2 className="mt-1 font-display text-3xl text-ink">
					Tailor your profile to each job
				</h2>
				<p className="mt-1 text-sm text-muted">
					Paste a job ad and get a fit score, the keywords you're missing and a
					cover letter for it.
				</p>
			</div>
			<div className="grid items-start gap-6 lg:grid-cols-[3fr_2fr]">
				{hasPass ? (
					<JobMatchForm analysisId={analysisId} />
				) : (
					<LockedOverlay label="Get the Job Search Pass" onUnlock={onGetPass}>
						<JobMatchPreview />
					</LockedOverlay>
				)}
				{hasPass && contentPlan?.length ? (
					<ContentPlan plan={contentPlan} />
				) : (
					<LockedOverlay label="Unlock your post plan" onUnlock={onGetPass}>
						<ContentPlan plan={PLACEHOLDER_PLAN} />
					</LockedOverlay>
				)}
			</div>
		</section>
	);
}

const PLACEHOLDER_PLAN = [1, 2, 3, 4].map((week) => ({
	week,
	topic: "A post idea written for your goal",
	hook: "An opening line that makes recruiters stop scrolling.",
}));

function JobMatchPreview() {
	return (
		<div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
			<p className="font-mono text-4xl text-ink">78/100</p>
			<p className="mt-2 text-sm text-muted">
				Your profile covers 9 of 12 key terms in this post.
			</p>
			<div className="mt-3 flex flex-wrap gap-2">
				{["Power BI", "IFRS", "SAP", "Budgeting", "English"].map((keyword) => (
					<span
						key={keyword}
						className="rounded-full bg-surface-2 px-3 py-1 text-sm"
					>
						{keyword}
					</span>
				))}
			</div>
			<p className="mt-4 h-24 rounded-md bg-surface-2" />
		</div>
	);
}

function JobMatchForm({ analysisId }: { analysisId: string }) {
	const [jobPost, setJobPost] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [match, setMatch] = useState<JobMatch | null>(null);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setPending(true);
		setError(null);
		try {
			const response = await fetch("/api/job-match", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ analysisId, jobPost }),
			});
			if (!response.ok) {
				throw new Error(
					await readApiError(response, "Matching failed. Try again."),
				);
			}
			setMatch(((await response.json()) as { match: JobMatch }).match);
		} catch (matchError) {
			setError(
				matchError instanceof Error ? matchError.message : "Matching failed.",
			);
		} finally {
			setPending(false);
		}
	};

	return (
		<div className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6">
			<form onSubmit={(event) => void handleSubmit(event)}>
				<label className="block">
					<span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink">
						<BriefcaseIcon className="size-4" aria-hidden />
						Job post
					</span>
					<textarea
						value={jobPost}
						onChange={(event) => setJobPost(event.target.value)}
						rows={6}
						placeholder="Paste the full job ad: title, requirements and responsibilities."
						className="w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 text-sm text-ink"
					/>
				</label>
				<div className="mt-3 flex items-center justify-between gap-3">
					<span className="font-mono text-xs text-muted">
						{jobPost.trim().length < JOB_POST_MIN
							? `${JOB_POST_MIN - jobPost.trim().length} more characters`
							: "Ready"}
					</span>
					<button
						type="submit"
						disabled={pending || jobPost.trim().length < JOB_POST_MIN}
						className="btn-primary px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
					>
						{pending ? "Matching…" : "Match this job"}
					</button>
				</div>
				{error ? (
					<p role="alert" className="mt-3 text-sm text-threat">
						{error}
					</p>
				) : null}
			</form>

			{match ? <JobMatchResult match={match} /> : null}
		</div>
	);
}

function JobMatchResult({ match }: { match: JobMatch }) {
	return (
		<div className="mt-6 space-y-5 border-t border-border pt-5">
			<div className="flex items-baseline gap-3">
				<p className="font-mono text-4xl font-medium text-ink">
					{Math.round(match.fitScore)}
					<span className="text-lg text-muted">/100</span>
				</p>
				<p className="text-sm font-semibold text-ink">fit for this job</p>
			</div>
			<p className="text-[15px] leading-relaxed text-ink">{match.summary}</p>
			<ul className="flex flex-wrap gap-2">
				{match.missingKeywords.map((keyword) => (
					<li
						key={`missing-${keyword}`}
						className="inline-flex items-center gap-1 rounded-full border border-threat-border bg-threat-tint px-3 py-1 text-sm text-threat"
					>
						<PlusIcon className="size-3.5" aria-hidden />
						{keyword}
					</li>
				))}
				{match.matchedKeywords.map((keyword) => (
					<li
						key={`matched-${keyword}`}
						className="inline-flex items-center gap-1 rounded-full border border-strength-border bg-strength-tint px-3 py-1 text-sm text-strength"
					>
						<CheckIcon className="size-3.5" aria-hidden />
						{keyword}
					</li>
				))}
			</ul>
			<TailoredBlock
				label="Headline for this job"
				text={match.tailoredHeadline}
			/>
			<TailoredBlock
				label="Experience bullets"
				text={match.tailoredBullets.map((bullet) => `• ${bullet}`).join("\n")}
			/>
			<TailoredBlock label="Cover letter" text={match.coverLetter} />
		</div>
	);
}

function TailoredBlock({ label, text }: { label: string; text: string }) {
	return (
		<div>
			<div className="mb-1.5 flex items-center justify-between gap-2">
				<p className="text-sm font-semibold text-ink">{label}</p>
				<CopyButton label={label.toLowerCase()} text={text} />
			</div>
			<p className="rounded-md bg-surface-2 p-3 text-sm leading-relaxed whitespace-pre-line text-ink">
				{text}
			</p>
		</div>
	);
}

function ContentPlan({
	plan,
}: {
	plan: NonNullable<Recommendations["contentPlan"]>;
}) {
	return (
		<div className="rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6">
			<div className="flex items-center gap-2">
				<PenLineIcon className="size-5 text-primary-ink" aria-hidden />
				<h3 className="font-display text-xl text-ink">4-week post plan</h3>
			</div>
			<ol className="mt-4 space-y-4">
				{plan.map((post) => (
					<li key={post.week} className="flex gap-3">
						<span className="font-mono text-sm font-medium text-primary-ink">
							W{post.week}
						</span>
						<div className="min-w-0">
							<p className="text-[15px] font-semibold text-ink">{post.topic}</p>
							<p className="mt-0.5 text-sm italic leading-relaxed text-muted">
								"{post.hook}"
							</p>
						</div>
					</li>
				))}
			</ol>
		</div>
	);
}
