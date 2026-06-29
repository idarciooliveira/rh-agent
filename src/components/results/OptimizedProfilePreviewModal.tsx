import { Check, ChevronDown, Copy, Sparkles, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { Recommendations } from "#/lib/analysis-schema";
import type { Profile } from "#/lib/profile-schema";

type OptimizedProfilePreviewModalProps = {
	profile: Profile;
	recommendations: Recommendations;
	onClose: () => void;
};

function getInitials(name: string): string {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

function CopyButton({ label, text }: { label: string; text: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [text]);

	return (
		<button
			type="button"
			onClick={() => void handleCopy()}
			className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text transition-colors hover:bg-surface"
		>
			{copied ? (
				<Check className="size-3.5 text-green-600" aria-hidden />
			) : (
				<Copy className="size-3.5" aria-hidden />
			)}
			{copied ? "Copied!" : label}
		</button>
	);
}

function AiImprovedBadge() {
	return (
		<span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
			<Sparkles className="size-3" aria-hidden />
			AI improved
		</span>
	);
}

function ToggleOriginal({
	showOriginal,
	onToggle,
}: {
	showOriginal: boolean;
	onToggle: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onToggle}
			className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
		>
			{showOriginal ? "See improved" : "See original"}
			<ChevronDown
				className={`size-3.5 transition-transform ${showOriginal ? "rotate-180" : ""}`}
				aria-hidden
			/>
		</button>
	);
}

function ImprovedTextBlock({
	improved,
	original,
	copyLabel,
}: {
	improved: string;
	original: string;
	copyLabel: string;
}) {
	const [showOriginal, setShowOriginal] = useState(false);
	const displayText = showOriginal ? original : improved;

	return (
		<div>
			<div className="mb-2 flex flex-wrap items-center gap-2">
				<AiImprovedBadge />
				{!showOriginal ? (
					<CopyButton label={copyLabel} text={improved} />
				) : null}
				<ToggleOriginal
					showOriginal={showOriginal}
					onToggle={() => setShowOriginal((current) => !current)}
				/>
			</div>
			<div
				className={`rounded-lg p-4 text-sm leading-relaxed text-text ${showOriginal ? "bg-gray-50" : "bg-amber-50"}`}
			>
				{displayText}
			</div>
		</div>
	);
}

function ExperienceEntry({
	exp,
	improvedBullets,
}: {
	exp: Profile["experiences"][number];
	improvedBullets: string[];
}) {
	const [showOriginal, setShowOriginal] = useState(false);
	const originalDesc = exp.description ?? "No description provided.";

	return (
		<div className="border-b border-border pb-6 last:border-0">
			<div className="flex items-start justify-between gap-3">
				<div className="flex gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-text-muted">
						{exp.company.slice(0, 2).toUpperCase()}
					</div>
					<div>
						<p className="font-semibold text-text">{exp.title}</p>
						<p className="text-sm text-text-muted">{exp.company}</p>
						<p className="text-xs text-text-muted">
							{[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
						</p>
					</div>
				</div>
				{improvedBullets.length > 0 ? <AiImprovedBadge /> : null}
			</div>

			{improvedBullets.length > 0 ? (
				<div className="mt-3">
					<div
						className={`rounded-lg p-4 ${showOriginal ? "bg-gray-50" : "bg-amber-50"}`}
					>
						{showOriginal ? (
							<p className="text-sm leading-relaxed text-text">
								{originalDesc}
							</p>
						) : (
							<ul className="list-disc space-y-1 pl-4 text-sm leading-relaxed text-text">
								{improvedBullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
						)}
					</div>
					<div className="mt-2 flex flex-wrap items-center gap-2">
						{!showOriginal ? (
							<CopyButton
								label="Copy description"
								text={improvedBullets.map((b) => `• ${b}`).join("\n")}
							/>
						) : null}
						<ToggleOriginal
							showOriginal={showOriginal}
							onToggle={() => setShowOriginal((current) => !current)}
						/>
					</div>
				</div>
			) : (
				<p className="mt-3 text-sm text-text-muted">{originalDesc}</p>
			)}
		</div>
	);
}

export function OptimizedProfilePreviewModal({
	profile,
	recommendations,
	onClose,
}: OptimizedProfilePreviewModalProps) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	const experienceRecMap = new Map(
		recommendations.experiences.map((rec) => [rec.index, rec]),
	);

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 sm:p-8">
			<div className="relative my-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
				<div className="flex items-center justify-between rounded-t-2xl bg-teal-600 px-5 py-3 text-sm font-medium text-white">
					<span>
						✨ This is your optimized profile preview — changes are highlighted
					</span>
					<button
						type="button"
						onClick={onClose}
						className="rounded p-1 hover:bg-teal-700"
						aria-label="Close preview"
					>
						<X className="size-4" aria-hidden />
					</button>
				</div>

				<div className="p-0">
					<div className="relative h-28 bg-gradient-to-r from-blue-600 to-purple-600" />
					<div className="relative px-6 pb-6">
						<div className="-mt-12 mb-4 flex size-20 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-2xl font-bold text-white">
							{getInitials(profile.name)}
						</div>

						<h2 className="flex items-center gap-2 text-xl font-bold text-text">
							{profile.name}
							<span className="text-primary" aria-hidden>
								✓
							</span>
						</h2>

						<div className="mt-4">
							<ImprovedTextBlock
								improved={recommendations.headline.improved}
								original={profile.headline}
								copyLabel="Copy improved headline"
							/>
						</div>

						{profile.location ? (
							<p className="mt-4 text-sm text-text-muted">{profile.location}</p>
						) : null}

						{profile.experiences[0] ? (
							<p className="mt-1 text-sm text-text-muted">
								{profile.experiences[0].company}
							</p>
						) : null}

						{profile.education[0] ? (
							<p className="mt-1 text-sm text-text-muted">
								{profile.education[0].school}
							</p>
						) : null}

						<section className="mt-8">
							<h3 className="mb-4 text-base font-bold text-text">About</h3>
							<ImprovedTextBlock
								improved={recommendations.about.improved}
								original={profile.about}
								copyLabel="Copy improved about"
							/>
						</section>

						<section className="mt-8">
							<h3 className="mb-4 text-base font-bold text-text">Experience</h3>
							<div className="space-y-6">
								{profile.experiences.map((exp, index) => {
									const rec = experienceRecMap.get(index);
									const improvedBullets = rec?.improvedDescription ?? [];

									return (
										<ExperienceEntry
											key={`${exp.company}-${exp.title}-${exp.startDate ?? "start"}`}
											exp={exp}
											improvedBullets={improvedBullets}
										/>
									);
								})}
							</div>
						</section>

						<section className="mt-8">
							<h3 className="mb-4 text-base font-bold text-text">Education</h3>
							<div className="space-y-4">
								{profile.education.map((edu) => (
									<div key={edu.school} className="flex gap-3">
										<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-primary">
											🎓
										</div>
										<div>
											<p className="font-semibold text-text">{edu.school}</p>
											<p className="text-sm text-text-muted">
												{[edu.degree, edu.field].filter(Boolean).join(", ")}
											</p>
											<p className="text-xs text-text-muted">
												{[edu.startDate, edu.endDate]
													.filter(Boolean)
													.join(" – ")}
											</p>
										</div>
									</div>
								))}
							</div>
						</section>

						<section className="mt-8">
							<h3 className="mb-4 text-base font-bold text-text">Skills</h3>
							<div className="flex flex-wrap gap-2">
								{profile.skills.map((skill) => (
									<span
										key={skill}
										className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-text"
									>
										{skill}
									</span>
								))}
								{recommendations.skills.suggested.map((skill) => (
									<span
										key={skill}
										className="inline-flex items-center gap-1 rounded-full border border-green-300 bg-green-50 px-3 py-1 text-xs font-medium text-green-700"
									>
										<Sparkles className="size-3" aria-hidden />
										{skill}
									</span>
								))}
							</div>
							{recommendations.skills.suggested.length > 0 ? (
								<p className="mt-3 text-xs text-text-muted">
									Green skills are AI-suggested additions for your career goal.
								</p>
							) : null}
						</section>

						<section className="mt-8">
							<h3 className="mb-4 text-base font-bold text-text">
								Suggested Activity Post
							</h3>
							<div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
								<div className="mb-3 flex items-center gap-2">
									<div className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
										{getInitials(profile.name)}
									</div>
									<div>
										<p className="text-sm font-semibold text-text">
											{profile.name}
										</p>
										<p className="text-xs text-text-muted">
											Post · Suggested for your goal
										</p>
									</div>
								</div>
								<p className="whitespace-pre-line text-sm leading-relaxed text-text">
									{recommendations.suggestedActivityPost}
								</p>
								<div className="mt-3">
									<CopyButton
										label="Copy post"
										text={recommendations.suggestedActivityPost}
									/>
								</div>
							</div>
							<p className="mt-2 text-xs text-text-muted">
								Publishing content like this regularly signals your expertise to
								your target audience.
							</p>
						</section>
					</div>
				</div>

				<div className="border-t border-border p-4">
					<button
						type="button"
						onClick={onClose}
						className="w-full rounded-full border border-border bg-white py-3 text-sm font-medium text-text transition-colors hover:bg-surface"
					>
						Close Preview
					</button>
				</div>
			</div>
		</div>
	);
}
