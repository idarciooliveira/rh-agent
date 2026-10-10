import { useEffect, useState } from "react";

type ShareScoreCardProps = {
	score: number;
	careerGoal: string;
};

/**
 * Shown after unlock. The origin is read on mount so the server render and
 * the first client render match.
 */
export function ShareScoreCard({ score, careerGoal }: ShareScoreCardProps) {
	const [origin, setOrigin] = useState("");

	useEffect(() => {
		setOrigin(window.location.origin);
	}, []);

	const shareText = `My LinkedIn scored ${score}/100 on Redline for "${careerGoal}". Check yours: ${origin}`;
	const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
	const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(origin)}`;

	return (
		<div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
			<section className="rounded-lg bg-night p-6 text-surface shadow-card sm:p-8">
				<p className="font-display text-5xl leading-none font-extrabold">
					{score}/100
				</p>
				<p className="mt-3 text-sm break-words text-night-muted">
					Goal: "{careerGoal}"
				</p>
				<p className="mt-4 text-base">
					Share your score and see if friends beat it.
				</p>
				<div className="mt-6 flex flex-col gap-3 sm:flex-row">
					<a
						href={whatsappHref}
						target="_blank"
						rel="noreferrer"
						className="inline-flex flex-1 items-center justify-center rounded-md bg-surface px-5 py-3 text-sm font-semibold text-night transition-colors hover:bg-night-muted"
					>
						Share on WhatsApp
					</a>
					<a
						href={linkedinHref}
						target="_blank"
						rel="noreferrer"
						className="inline-flex flex-1 items-center justify-center rounded-md bg-surface px-5 py-3 text-sm font-semibold text-night transition-colors hover:bg-night-muted"
					>
						Share on LinkedIn
					</a>
				</div>
			</section>

			<section className="flex flex-col rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
				<div className="flex items-start justify-between gap-3">
					<h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
						Next: match your profile to a real job ad
					</h2>
					<span className="shrink-0 rounded-full border border-border-strong bg-surface-2 px-2.5 py-1 font-mono text-xs tracking-[0.1em] text-muted uppercase">
						Coming soon
					</span>
				</div>
				<p className="mt-3 text-base leading-relaxed text-muted">
					Paste a job post and get the exact words you're missing, plus an
					ATS-ready CV.
				</p>
			</section>
		</div>
	);
}
