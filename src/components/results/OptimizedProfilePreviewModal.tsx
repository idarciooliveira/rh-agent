import { type ReactNode, useCallback, useEffect, useId, useState } from "react";
import type { Recommendations } from "#/lib/analysis-schema";
import {
	CheckIcon,
	ChevronDownIcon,
	CopyIcon,
	GraduationCapIcon,
	PenLineIcon,
	PlusIcon,
	XIcon,
} from "#/lib/icons";
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
			aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
			className="inline-flex items-center gap-1.5 rounded-sm border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
		>
			{copied ? (
				<CheckIcon className="size-3.5 text-strength" aria-hidden />
			) : (
				<CopyIcon className="size-3.5" aria-hidden />
			)}
			<span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
		</button>
	);
}

function RedlineEditBadge() {
	return (
		<span className="inline-flex items-center gap-1 rounded-sm border border-ink/15 bg-accent/60 px-2 py-0.5 text-xs font-semibold text-ink">
			<PenLineIcon className="size-3" aria-hidden />
			Redline edit
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
			aria-pressed={showOriginal}
			className="inline-flex items-center gap-1 py-1.5 text-sm font-medium text-primary-ink hover:underline"
		>
			{showOriginal ? "See edit" : "See original"}
			<ChevronDownIcon
				className={`size-3.5 transition-transform ${showOriginal ? "rotate-180" : ""}`}
				aria-hidden
			/>
		</button>
	);
}

function SectionLabel({ children }: { children: ReactNode }) {
	return (
		<h3 className="mb-3 font-display text-lg font-semibold text-ink">
			{children}
		</h3>
	);
}

const improvedBoxClass =
	"rounded-md border border-accent bg-accent/25 p-4 text-[15px] leading-relaxed text-ink";
const originalBoxClass =
	"rounded-md border border-border bg-surface-2 p-4 text-[15px] leading-relaxed text-muted";

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

	return (
		<div>
			<div className="mb-2 flex flex-wrap items-center gap-2">
				{showOriginal ? (
					<span className="text-xs font-semibold uppercase tracking-wide text-muted">
						Original
					</span>
				) : (
					<RedlineEditBadge />
				)}
				{!showOriginal ? (
					<CopyButton label={copyLabel} text={improved} />
				) : null}
				<ToggleOriginal
					showOriginal={showOriginal}
					onToggle={() => setShowOriginal((current) => !current)}
				/>
			</div>
			<div
				className={`whitespace-pre-line ${showOriginal ? originalBoxClass : improvedBoxClass}`}
			>
				{showOriginal ? original || "Nothing here yet." : improved}
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
		<div className="border-b border-border pb-6 last:border-0 last:pb-0">
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-surface-2 font-mono text-xs font-medium text-muted">
						{exp.company.slice(0, 2).toUpperCase()}
					</div>
					<div className="min-w-0">
						<p className="font-semibold text-ink">{exp.title}</p>
						<p className="text-sm text-muted">{exp.company}</p>
						<p className="font-mono text-xs text-muted">
							{[exp.startDate, exp.endDate].filter(Boolean).join(" – ")}
						</p>
					</div>
				</div>
				{improvedBullets.length > 0 && !showOriginal ? (
					<span className="shrink-0">
						<RedlineEditBadge />
					</span>
				) : null}
			</div>

			{improvedBullets.length > 0 ? (
				<div className="mt-3">
					<div className={showOriginal ? originalBoxClass : improvedBoxClass}>
						{showOriginal ? (
							<p className="whitespace-pre-line">{originalDesc}</p>
						) : (
							<ul className="list-disc space-y-1 pl-4">
								{improvedBullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
						)}
					</div>
					<div className="mt-2 flex flex-wrap items-center gap-2">
						{!showOriginal ? (
							<CopyButton
								label={`${exp.title} description`}
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
				<p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted">
					{originalDesc}
				</p>
			)}
		</div>
	);
}

export function OptimizedProfilePreviewModal({
	profile,
	recommendations,
	onClose,
}: OptimizedProfilePreviewModalProps) {
	const titleId = useId();
	const descriptionId = useId();

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
	const initials = getInitials(profile.name);

	return (
		<div className="fixed inset-0 z-50 flex items-end bg-ink/60 pt-4 sm:items-start sm:justify-center sm:overflow-y-auto sm:p-8">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				className="relative flex h-full w-full flex-col overflow-hidden rounded-t-xl bg-surface shadow-lift sm:my-4 sm:h-auto sm:max-w-2xl sm:rounded-xl"
			>
				<div className="flex shrink-0 items-start justify-between gap-3 border-b border-border bg-background px-5 py-4">
					<div className="min-w-0">
						<h2
							id={titleId}
							className="flex items-center gap-2 font-display text-xl font-semibold text-ink"
						>
							<PenLineIcon className="size-5 text-primary-ink" aria-hidden />
							Your rewritten profile
						</h2>
						<p
							id={descriptionId}
							className="mt-1 text-sm leading-relaxed text-muted"
						>
							Copy each section into LinkedIn. Read it first and change anything
							that isn't true or doesn't sound like you.
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="-mr-1 shrink-0 rounded-sm p-2 text-muted transition-colors hover:bg-surface-2 hover:text-ink"
						aria-label="Close"
					>
						<XIcon className="size-5" aria-hidden />
					</button>
				</div>

				<div className="min-h-0 flex-1 overflow-y-auto sm:overflow-visible">
					<div
						className="paper-grid relative h-24 border-b border-border sm:h-28"
						aria-hidden
					>
						<div className="absolute inset-x-0 bottom-0 h-1.5 bg-primary" />
					</div>
					<div className="relative px-5 pb-6 sm:px-6">
						<div className="-mt-10 mb-4 flex size-20 items-center justify-center rounded-full border-4 border-surface bg-ink font-display text-2xl font-semibold text-background">
							{initials}
						</div>

						<p className="font-display text-2xl font-semibold text-ink">
							{profile.name}
						</p>
						{profile.location ? (
							<p className="mt-1 text-sm text-muted">{profile.location}</p>
						) : null}
						{profile.experiences[0] || profile.education[0] ? (
							<p className="mt-1 text-sm text-muted">
								{[profile.experiences[0]?.company, profile.education[0]?.school]
									.filter(Boolean)
									.join(" · ")}
							</p>
						) : null}

						<section className="mt-6">
							<SectionLabel>Headline</SectionLabel>
							<ImprovedTextBlock
								improved={recommendations.headline.improved}
								original={profile.headline}
								copyLabel="headline"
							/>
						</section>

						<section className="mt-8">
							<SectionLabel>About</SectionLabel>
							<ImprovedTextBlock
								improved={recommendations.about.improved}
								original={profile.about}
								copyLabel="About section"
							/>
						</section>

						<section className="mt-8">
							<SectionLabel>Experience</SectionLabel>
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

						{profile.education.length > 0 ? (
							<section className="mt-8">
								<SectionLabel>Education</SectionLabel>
								<div className="space-y-4">
									{profile.education.map((edu) => (
										<div key={edu.school} className="flex gap-3">
											<div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-muted">
												<GraduationCapIcon className="size-5" aria-hidden />
											</div>
											<div className="min-w-0">
												<p className="font-semibold text-ink">{edu.school}</p>
												<p className="text-sm text-muted">
													{[edu.degree, edu.field].filter(Boolean).join(", ")}
												</p>
												<p className="font-mono text-xs text-muted">
													{[edu.startDate, edu.endDate]
														.filter(Boolean)
														.join(" – ")}
												</p>
											</div>
										</div>
									))}
								</div>
							</section>
						) : null}

						<section className="mt-8">
							<SectionLabel>Skills to add</SectionLabel>
							{recommendations.skills.suggested.length > 0 ? (
								<div className="flex flex-wrap gap-2">
									{recommendations.skills.suggested.map((skill) => (
										<span
											key={skill}
											className="inline-flex items-center gap-1 rounded-sm border border-strength-border bg-strength-tint px-2.5 py-1 text-sm font-medium text-strength"
										>
											<PlusIcon className="size-3.5" aria-hidden />
											{skill}
										</span>
									))}
								</div>
							) : (
								<p className="text-sm text-muted">
									No new skills to add for this goal.
								</p>
							)}
							{profile.skills.length > 0 ? (
								<>
									<p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
										Already on your profile
									</p>
									<div className="flex flex-wrap gap-2">
										{profile.skills.map((skill) => (
											<span
												key={skill}
												className="rounded-sm border border-border bg-surface-2 px-2.5 py-1 text-sm text-muted"
											>
												{skill}
											</span>
										))}
									</div>
								</>
							) : null}
						</section>

						<section className="mt-8">
							<SectionLabel>Post to publish</SectionLabel>
							<div className="rounded-lg border border-border bg-background p-4">
								<div className="mb-3 flex items-center gap-2">
									<div className="flex size-8 items-center justify-center rounded-full bg-ink text-xs font-semibold text-background">
										{initials}
									</div>
									<div className="min-w-0">
										<p className="text-sm font-semibold text-ink">
											{profile.name}
										</p>
										<p className="text-xs text-muted">Draft post</p>
									</div>
								</div>
								<p className="whitespace-pre-line text-[15px] leading-relaxed text-ink">
									{recommendations.suggestedActivityPost}
								</p>
								<div className="mt-3">
									<CopyButton
										label="post"
										text={recommendations.suggestedActivityPost}
									/>
								</div>
							</div>
						</section>
					</div>
				</div>

				<div className="shrink-0 border-t border-border bg-surface p-4">
					<button
						type="button"
						onClick={onClose}
						className="w-full rounded-md border border-border-strong bg-surface py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-2"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
