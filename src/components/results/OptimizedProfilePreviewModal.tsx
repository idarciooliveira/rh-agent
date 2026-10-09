import { type ReactNode, useCallback, useEffect, useId, useState } from "react";
import type { Recommendations } from "#/lib/analysis-schema";
import {
	CheckIcon,
	CopyIcon,
	GlobeIcon,
	GraduationCapIcon,
	MessageSquareIcon,
	PenLineIcon,
	Repeat2Icon,
	SendIcon,
	ThumbsUpIcon,
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

function formatDateRange(start: string | null, end: string | null): string {
	return [start, end].filter(Boolean).join(" - ");
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
			className="btn-secondary inline-flex items-center gap-1.5 px-3 py-1 text-sm font-semibold"
		>
			{copied ? (
				<CheckIcon className="size-4" aria-hidden />
			) : (
				<CopyIcon className="size-4" aria-hidden />
			)}
			<span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
		</button>
	);
}

function OriginalToggle({
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
			className="rounded-full px-2 py-1 text-sm font-semibold text-muted transition-colors hover:bg-black/5 hover:text-ink"
		>
			{showOriginal ? "See edit" : "See original"}
		</button>
	);
}

/** Marks text Redline rewrote, in the spot where LinkedIn shows its edit pencil. */
function EditBadge({ showOriginal }: { showOriginal: boolean }) {
	return showOriginal ? (
		<span className="text-xs font-semibold tracking-wide text-muted uppercase">
			Original
		</span>
	) : (
		<span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-semibold text-primary-ink">
			<PenLineIcon className="size-3" aria-hidden />
			Redline edit
		</span>
	);
}

function EditControls({
	showOriginal,
	onToggle,
	copyLabel,
	copyText,
}: {
	showOriginal: boolean;
	onToggle: () => void;
	copyLabel: string;
	copyText: string;
}) {
	return (
		<div className="flex flex-wrap items-center gap-1.5">
			<EditBadge showOriginal={showOriginal} />
			{!showOriginal ? <CopyButton label={copyLabel} text={copyText} /> : null}
			<OriginalToggle showOriginal={showOriginal} onToggle={onToggle} />
		</div>
	);
}

/** White LinkedIn section card with the title on the left and controls on the right. */
function ProfileCard({
	title,
	actions,
	children,
}: {
	title: string;
	actions?: ReactNode;
	children: ReactNode;
}) {
	return (
		<section className="rounded-lg bg-surface p-4 shadow-card sm:p-6">
			<div className="mb-3 flex flex-wrap items-start justify-between gap-2">
				<h3 className="text-xl font-semibold text-ink">{title}</h3>
				{actions}
			</div>
			{children}
		</section>
	);
}

function EntityLogo({ children }: { children: ReactNode }) {
	return (
		<div className="flex size-12 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-xs font-semibold text-muted">
			{children}
		</div>
	);
}

function editedTextClass(showOriginal: boolean): string {
	return showOriginal
		? "text-muted"
		: "rounded-sm bg-accent/40 shadow-[inset_3px_0_0_var(--color-primary)] py-2 pr-2 pl-3 text-ink";
}

function IntroCard({
	profile,
	improvedHeadline,
	initials,
}: {
	profile: Profile;
	improvedHeadline: string;
	initials: string;
}) {
	const [showOriginal, setShowOriginal] = useState(false);
	const currentCompany = profile.experiences[0]?.company;
	const school = profile.education[0]?.school;

	return (
		<section className="overflow-hidden rounded-lg bg-surface shadow-card">
			<div className="li-banner aspect-[4/1] min-h-20 w-full" aria-hidden />
			<div className="px-4 pb-5 sm:px-6">
				<div className="relative -mt-12 mb-3 flex size-24 items-center justify-center rounded-full border-4 border-surface bg-[#6c8ea8] text-3xl font-semibold text-white sm:-mt-20 sm:size-36 sm:text-5xl">
					{initials}
				</div>

				<div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-8">
					<div className="min-w-0 flex-1">
						<p className="text-2xl leading-tight font-semibold text-ink">
							{profile.name}
						</p>
						<p
							className={`mt-1 text-base leading-snug transition-colors ${editedTextClass(showOriginal)}`}
						>
							{showOriginal
								? profile.headline || "No headline yet."
								: improvedHeadline}
						</p>
						<div className="mt-2">
							<EditControls
								showOriginal={showOriginal}
								onToggle={() => setShowOriginal((current) => !current)}
								copyLabel="headline"
								copyText={improvedHeadline}
							/>
						</div>
						{profile.location ? (
							<p className="mt-2 text-sm text-muted">
								{profile.location}
								<span aria-hidden> · </span>
								<span className="font-semibold text-primary">Contact info</span>
							</p>
						) : null}
					</div>

					{currentCompany || school ? (
						<ul className="space-y-2 text-sm font-semibold text-ink md:w-56 md:shrink-0">
							{currentCompany ? (
								<li className="flex items-center gap-2">
									<span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-[10px] font-semibold text-muted">
										{currentCompany.slice(0, 2).toUpperCase()}
									</span>
									<span className="line-clamp-2">{currentCompany}</span>
								</li>
							) : null}
							{school ? (
								<li className="flex items-center gap-2">
									<span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-surface-2 text-muted">
										<GraduationCapIcon className="size-4" aria-hidden />
									</span>
									<span className="line-clamp-2">{school}</span>
								</li>
							) : null}
						</ul>
					) : null}
				</div>

				<div className="mt-4 flex flex-wrap gap-2" aria-hidden>
					<span className="btn-primary px-4 py-1.5 text-sm font-semibold">
						Open to
					</span>
					<span className="btn-secondary px-4 py-1.5 text-sm font-semibold">
						Add profile section
					</span>
					<span className="rounded-full border border-border-strong px-4 py-1.5 text-sm font-semibold text-muted">
						More
					</span>
				</div>
			</div>
		</section>
	);
}

function AboutCard({
	improved,
	original,
}: {
	improved: string;
	original: string;
}) {
	const [showOriginal, setShowOriginal] = useState(false);

	return (
		<ProfileCard
			title="About"
			actions={
				<EditControls
					showOriginal={showOriginal}
					onToggle={() => setShowOriginal((current) => !current)}
					copyLabel="About section"
					copyText={improved}
				/>
			}
		>
			<p
				className={`text-sm leading-relaxed whitespace-pre-line ${editedTextClass(showOriginal)}`}
			>
				{showOriginal ? original || "Nothing here yet." : improved}
			</p>
		</ProfileCard>
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
	const hasEdit = improvedBullets.length > 0;
	const dates = formatDateRange(exp.startDate, exp.endDate);

	return (
		<li className="flex gap-3 border-b border-border py-4 first:pt-0 last:border-0 last:pb-0">
			<EntityLogo>{exp.company.slice(0, 2).toUpperCase()}</EntityLogo>
			<div className="min-w-0 flex-1">
				<p className="font-semibold text-ink">{exp.title}</p>
				<p className="text-sm text-ink">{exp.company}</p>
				{dates ? <p className="text-sm text-muted">{dates}</p> : null}
				{exp.location ? (
					<p className="text-sm text-muted">{exp.location}</p>
				) : null}

				{hasEdit ? (
					<div className="mt-2">
						<div
							className={`text-sm leading-relaxed ${editedTextClass(showOriginal)}`}
						>
							{showOriginal ? (
								<p className="whitespace-pre-line">{originalDesc}</p>
							) : (
								<ul className="space-y-1">
									{improvedBullets.map((bullet) => (
										<li key={bullet} className="flex gap-2">
											<span aria-hidden>•</span>
											<span>{bullet}</span>
										</li>
									))}
								</ul>
							)}
						</div>
						<div className="mt-2">
							<EditControls
								showOriginal={showOriginal}
								onToggle={() => setShowOriginal((current) => !current)}
								copyLabel={`${exp.title} description`}
								copyText={improvedBullets.map((b) => `• ${b}`).join("\n")}
							/>
						</div>
					</div>
				) : exp.description ? (
					<p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-ink">
						{exp.description}
					</p>
				) : null}
			</div>
		</li>
	);
}

function ActivityCard({
	name,
	headline,
	initials,
	post,
}: {
	name: string;
	headline: string;
	initials: string;
	post: string;
}) {
	return (
		<ProfileCard
			title="Activity"
			actions={
				<div className="flex items-center gap-1.5">
					<EditBadge showOriginal={false} />
					<CopyButton label="post" text={post} />
				</div>
			}
		>
			<article className="rounded-lg border border-border">
				<div className="flex gap-2 p-3">
					<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#6c8ea8] text-sm font-semibold text-white">
						{initials}
					</div>
					<div className="min-w-0">
						<p className="text-sm font-semibold text-ink">{name}</p>
						<p className="truncate text-xs text-muted">{headline}</p>
						<p className="flex items-center gap-1 text-xs text-muted">
							Draft
							<span aria-hidden>·</span>
							<GlobeIcon className="size-3" aria-hidden />
						</p>
					</div>
				</div>
				<p className="px-3 pb-3 text-sm leading-relaxed whitespace-pre-line text-ink">
					{post}
				</p>
				<div
					className="grid grid-cols-4 border-t border-border px-1 py-1 text-xs font-semibold text-muted sm:text-sm"
					aria-hidden
				>
					{[
						{ icon: ThumbsUpIcon, label: "Like" },
						{ icon: MessageSquareIcon, label: "Comment" },
						{ icon: Repeat2Icon, label: "Repost" },
						{ icon: SendIcon, label: "Send" },
					].map(({ icon: Icon, label }) => (
						<span
							key={label}
							className="flex items-center justify-center gap-1.5 rounded-sm py-2.5"
						>
							<Icon className="size-4" />
							<span className="hidden sm:inline">{label}</span>
						</span>
					))}
				</div>
			</article>
		</ProfileCard>
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
	const suggestedSkills = recommendations.skills.suggested;

	return (
		<div className="fixed inset-0 z-50 flex items-end bg-black/60 pt-4 sm:items-start sm:justify-center sm:overflow-y-auto sm:p-8">
			<div
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				aria-describedby={descriptionId}
				className="relative flex h-full w-full flex-col overflow-hidden rounded-t-xl bg-background shadow-lift sm:my-4 sm:h-auto sm:max-w-3xl sm:rounded-xl"
			>
				<div className="flex shrink-0 items-start justify-between gap-3 border-b border-border bg-surface px-4 py-3 sm:px-6">
					<div className="min-w-0">
						<h2 id={titleId} className="text-lg font-semibold text-ink">
							Your profile, rewritten
						</h2>
						<p id={descriptionId} className="mt-0.5 text-sm text-muted">
							This is how it reads on LinkedIn. Copy each edit, check it's true,
							and paste it in.
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="-mr-2 shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-black/5 hover:text-ink"
						aria-label="Close"
					>
						<XIcon className="size-5" aria-hidden />
					</button>
				</div>

				<div className="min-h-0 flex-1 overflow-y-auto sm:overflow-visible">
					<div className="space-y-2 p-2 sm:space-y-3 sm:p-4">
						<IntroCard
							profile={profile}
							improvedHeadline={recommendations.headline.improved}
							initials={initials}
						/>

						<AboutCard
							improved={recommendations.about.improved}
							original={profile.about}
						/>

						<ActivityCard
							name={profile.name}
							headline={recommendations.headline.improved}
							initials={initials}
							post={recommendations.suggestedActivityPost}
						/>

						{profile.experiences.length > 0 ? (
							<ProfileCard title="Experience">
								<ul>
									{profile.experiences.map((exp, index) => (
										<ExperienceEntry
											key={`${exp.company}-${exp.title}-${exp.startDate ?? "start"}`}
											exp={exp}
											improvedBullets={
												experienceRecMap.get(index)?.improvedDescription ?? []
											}
										/>
									))}
								</ul>
							</ProfileCard>
						) : null}

						{profile.education.length > 0 ? (
							<ProfileCard title="Education">
								<ul>
									{profile.education.map((edu) => {
										const dates = formatDateRange(edu.startDate, edu.endDate);
										return (
											<li
												key={edu.school}
												className="flex gap-3 border-b border-border py-4 first:pt-0 last:border-0 last:pb-0"
											>
												<EntityLogo>
													<GraduationCapIcon className="size-5" aria-hidden />
												</EntityLogo>
												<div className="min-w-0">
													<p className="font-semibold text-ink">{edu.school}</p>
													<p className="text-sm text-ink">
														{[edu.degree, edu.field].filter(Boolean).join(", ")}
													</p>
													{dates ? (
														<p className="text-sm text-muted">{dates}</p>
													) : null}
												</div>
											</li>
										);
									})}
								</ul>
							</ProfileCard>
						) : null}

						<ProfileCard
							title="Skills"
							actions={
								suggestedSkills.length > 0 ? (
									<div className="flex items-center gap-1.5">
										<EditBadge showOriginal={false} />
										<CopyButton
											label="new skills"
											text={suggestedSkills.join(", ")}
										/>
									</div>
								) : null
							}
						>
							{suggestedSkills.length === 0 && profile.skills.length === 0 ? (
								<p className="text-sm text-muted">No skills listed yet.</p>
							) : (
								<ul>
									{suggestedSkills.map((skill) => (
										<li
											key={`new-${skill}`}
											className="flex items-center justify-between gap-3 border-b border-border py-3 first:pt-0"
										>
											<span className="font-semibold text-ink">{skill}</span>
											<span className="shrink-0 rounded-full bg-strength-tint px-2 py-0.5 text-xs font-semibold text-strength">
												Add this
											</span>
										</li>
									))}
									{profile.skills.map((skill) => (
										<li
											key={skill}
											className="border-b border-border py-3 font-semibold text-ink first:pt-0 last:border-0 last:pb-0"
										>
											{skill}
										</li>
									))}
								</ul>
							)}
						</ProfileCard>
					</div>
				</div>

				<div className="shrink-0 border-t border-border bg-surface p-3 sm:px-6">
					<button
						type="button"
						onClick={onClose}
						className="btn-secondary w-full py-2.5 text-sm font-semibold"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
