import { CheckIcon, PlusIcon, ScanSearchIcon } from "#/lib/icons";
import { profileToText, splitKeywordsByPresence } from "#/lib/paywall";
import type { Profile } from "#/lib/profile-schema";

type RecruiterKeywordsProps = {
	keywords: string[];
	profile: Profile;
};

export function RecruiterKeywords({
	keywords,
	profile,
}: RecruiterKeywordsProps) {
	const { present, missing } = splitKeywordsByPresence(
		keywords,
		profileToText(profile),
	);

	return (
		<section className="rounded-lg border border-border bg-surface p-5 shadow-card sm:p-6">
			<div className="flex items-center gap-2">
				<ScanSearchIcon className="size-5 text-primary-ink" aria-hidden />
				<h2 className="font-display text-2xl font-semibold text-ink">
					Recruiter keywords
				</h2>
			</div>
			<p className="mt-1 text-sm leading-relaxed text-muted">
				Terms recruiters search for this goal. Your profile has{" "}
				<span className="font-semibold text-ink">
					{present.length} of {keywords.length}
				</span>
				.
			</p>
			<ul className="mt-4 flex flex-wrap gap-2">
				{missing.map((keyword) => (
					<li
						key={keyword}
						className="inline-flex items-center gap-1 rounded-full border border-threat-border bg-threat-tint px-3 py-1 text-sm font-medium text-threat"
					>
						<PlusIcon className="size-3.5" aria-hidden />
						{keyword}
						<span className="sr-only"> (missing)</span>
					</li>
				))}
				{present.map((keyword) => (
					<li
						key={keyword}
						className="inline-flex items-center gap-1 rounded-full border border-strength-border bg-strength-tint px-3 py-1 text-sm font-medium text-strength"
					>
						<CheckIcon className="size-3.5" aria-hidden />
						{keyword}
						<span className="sr-only"> (on your profile)</span>
					</li>
				))}
			</ul>
		</section>
	);
}
