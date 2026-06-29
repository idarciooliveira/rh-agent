import { AlertCircle, CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import { type ReactNode, useId, useState } from "react";
import { readApiError } from "#/lib/api-client";
import {
	type Certification,
	type Education,
	type Experience,
	emptyCertification,
	emptyEducation,
	emptyExperience,
	type Profile,
} from "#/lib/profile-schema";

type ProfileReviewFormProps = {
	snapshotId: string;
	initialProfile: Profile;
};

type SaveState = "idle" | "saving" | "success" | "error";

const inputClassName =
	"w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400";

const labelClassName = "mb-1.5 block text-sm font-medium text-slate-300";

function FieldGroup({
	label,
	htmlFor,
	children,
}: {
	label: string;
	htmlFor?: string;
	children: ReactNode;
}) {
	return (
		<div>
			{htmlFor ? (
				<label htmlFor={htmlFor} className={labelClassName}>
					{label}
				</label>
			) : (
				<p className={labelClassName}>{label}</p>
			)}
			{children}
		</div>
	);
}

function createEntryKeys(length: number) {
	return Array.from({ length }, () => crypto.randomUUID());
}

function ExperienceFields({
	experience,
	index,
	onChange,
	onRemove,
}: {
	experience: Experience;
	index: number;
	onChange: (index: number, value: Experience) => void;
	onRemove: (index: number) => void;
}) {
	const fieldId = useId();

	return (
		<div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h3 className="text-sm font-semibold text-white">
					Experience {index + 1}
				</h3>
				<button
					type="button"
					onClick={() => onRemove(index)}
					className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
				>
					<Trash2 className="size-4" aria-hidden />
					Remove
				</button>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<FieldGroup label="Title" htmlFor={`${fieldId}-title`}>
					<input
						id={`${fieldId}-title`}
						className={inputClassName}
						value={experience.title}
						onChange={(event) =>
							onChange(index, { ...experience, title: event.target.value })
						}
					/>
				</FieldGroup>
				<FieldGroup label="Company" htmlFor={`${fieldId}-company`}>
					<input
						id={`${fieldId}-company`}
						className={inputClassName}
						value={experience.company}
						onChange={(event) =>
							onChange(index, { ...experience, company: event.target.value })
						}
					/>
				</FieldGroup>
				<FieldGroup label="Location" htmlFor={`${fieldId}-location`}>
					<input
						id={`${fieldId}-location`}
						className={inputClassName}
						value={experience.location ?? ""}
						onChange={(event) =>
							onChange(index, { ...experience, location: event.target.value })
						}
					/>
				</FieldGroup>
				<div className="grid grid-cols-2 gap-3">
					<FieldGroup label="Start" htmlFor={`${fieldId}-start`}>
						<input
							id={`${fieldId}-start`}
							className={inputClassName}
							placeholder="Jan 2020"
							value={experience.startDate ?? ""}
							onChange={(event) =>
								onChange(index, {
									...experience,
									startDate: event.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup label="End" htmlFor={`${fieldId}-end`}>
						<input
							id={`${fieldId}-end`}
							className={inputClassName}
							placeholder="Present"
							value={experience.endDate ?? ""}
							onChange={(event) =>
								onChange(index, { ...experience, endDate: event.target.value })
							}
						/>
					</FieldGroup>
				</div>
			</div>

			<div className="mt-4">
				<FieldGroup label="Description" htmlFor={`${fieldId}-description`}>
					<textarea
						id={`${fieldId}-description`}
						className={`${inputClassName} min-h-24 resize-y`}
						value={experience.description ?? ""}
						onChange={(event) =>
							onChange(index, {
								...experience,
								description: event.target.value,
							})
						}
					/>
				</FieldGroup>
			</div>
		</div>
	);
}

function EducationFields({
	education,
	index,
	onChange,
	onRemove,
}: {
	education: Education;
	index: number;
	onChange: (index: number, value: Education) => void;
	onRemove: (index: number) => void;
}) {
	return (
		<div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h3 className="text-sm font-semibold text-white">
					Education {index + 1}
				</h3>
				<button
					type="button"
					onClick={() => onRemove(index)}
					className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
				>
					<Trash2 className="size-4" aria-hidden />
					Remove
				</button>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<FieldGroup label="School">
					<input
						className={inputClassName}
						value={education.school}
						onChange={(event) =>
							onChange(index, { ...education, school: event.target.value })
						}
					/>
				</FieldGroup>
				<FieldGroup label="Degree">
					<input
						className={inputClassName}
						value={education.degree ?? ""}
						onChange={(event) =>
							onChange(index, { ...education, degree: event.target.value })
						}
					/>
				</FieldGroup>
				<FieldGroup label="Field of study">
					<input
						className={inputClassName}
						value={education.field ?? ""}
						onChange={(event) =>
							onChange(index, { ...education, field: event.target.value })
						}
					/>
				</FieldGroup>
				<div className="grid grid-cols-2 gap-3">
					<FieldGroup label="Start">
						<input
							className={inputClassName}
							value={education.startDate ?? ""}
							onChange={(event) =>
								onChange(index, {
									...education,
									startDate: event.target.value,
								})
							}
						/>
					</FieldGroup>
					<FieldGroup label="End">
						<input
							className={inputClassName}
							value={education.endDate ?? ""}
							onChange={(event) =>
								onChange(index, { ...education, endDate: event.target.value })
							}
						/>
					</FieldGroup>
				</div>
			</div>
		</div>
	);
}

function CertificationFields({
	certification,
	index,
	onChange,
	onRemove,
}: {
	certification: Certification;
	index: number;
	onChange: (index: number, value: Certification) => void;
	onRemove: (index: number) => void;
}) {
	return (
		<div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
			<div className="mb-4 flex items-center justify-between gap-3">
				<h3 className="text-sm font-semibold text-white">
					Certification {index + 1}
				</h3>
				<button
					type="button"
					onClick={() => onRemove(index)}
					className="inline-flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
				>
					<Trash2 className="size-4" aria-hidden />
					Remove
				</button>
			</div>

			<div className="grid gap-4 sm:grid-cols-3">
				<FieldGroup label="Name">
					<input
						className={inputClassName}
						value={certification.name}
						onChange={(event) =>
							onChange(index, { ...certification, name: event.target.value })
						}
					/>
				</FieldGroup>
				<FieldGroup label="Issuer">
					<input
						className={inputClassName}
						value={certification.issuer ?? ""}
						onChange={(event) =>
							onChange(index, { ...certification, issuer: event.target.value })
						}
					/>
				</FieldGroup>
				<FieldGroup label="Date">
					<input
						className={inputClassName}
						value={certification.date ?? ""}
						onChange={(event) =>
							onChange(index, { ...certification, date: event.target.value })
						}
					/>
				</FieldGroup>
			</div>
		</div>
	);
}

export function ProfileReviewForm({
	snapshotId,
	initialProfile,
}: ProfileReviewFormProps) {
	const [profile, setProfile] = useState<Profile>(initialProfile);
	const [skillsInput, setSkillsInput] = useState(
		initialProfile.skills.join(", "),
	);
	const [experienceKeys, setExperienceKeys] = useState(() =>
		createEntryKeys(initialProfile.experiences.length),
	);
	const [educationKeys, setEducationKeys] = useState(() =>
		createEntryKeys(initialProfile.education.length),
	);
	const [certificationKeys, setCertificationKeys] = useState(() =>
		createEntryKeys(initialProfile.certifications?.length ?? 0),
	);
	const [saveState, setSaveState] = useState<SaveState>("idle");
	const [saveError, setSaveError] = useState<string | null>(null);
	const basicInfoId = useId();
	const skillsFieldId = useId();

	const updateProfile = (updates: Partial<Profile>) => {
		setProfile((current) => ({ ...current, ...updates }));
		setSaveState("idle");
	};

	const handleSkillsBlur = () => {
		const skills = skillsInput
			.split(",")
			.map((skill) => skill.trim())
			.filter(Boolean);
		updateProfile({ skills });
	};

	const handleSave = async () => {
		const skills = skillsInput
			.split(",")
			.map((skill) => skill.trim())
			.filter(Boolean);
		const payload = { ...profile, skills };

		setSaveState("saving");
		setSaveError(null);

		try {
			const response = await fetch(`/api/profile?snapshotId=${snapshotId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ snapshotId, profile: payload }),
			});

			if (!response.ok) {
				const message = await readApiError(response, "Failed to save profile.");
				throw new Error(message);
			}

			setProfile(payload);
			setSaveState("success");
		} catch (error) {
			setSaveState("error");
			setSaveError(
				error instanceof Error ? error.message : "Failed to save profile.",
			);
		}
	};

	const certifications = profile.certifications ?? [];

	return (
		<form
			className="space-y-8"
			onSubmit={(event) => {
				event.preventDefault();
				void handleSave();
			}}
		>
			<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
				<h2 className="text-lg font-semibold text-white">Basic info</h2>
				<div className="mt-6 grid gap-4 sm:grid-cols-2">
					<FieldGroup label="Name" htmlFor={`${basicInfoId}-name`}>
						<input
							id={`${basicInfoId}-name`}
							className={inputClassName}
							value={profile.name}
							onChange={(event) => updateProfile({ name: event.target.value })}
						/>
					</FieldGroup>
					<FieldGroup label="Location" htmlFor={`${basicInfoId}-location`}>
						<input
							id={`${basicInfoId}-location`}
							className={inputClassName}
							value={profile.location ?? ""}
							onChange={(event) =>
								updateProfile({ location: event.target.value })
							}
						/>
					</FieldGroup>
				</div>
				<div className="mt-4">
					<FieldGroup label="Headline" htmlFor={`${basicInfoId}-headline`}>
						<input
							id={`${basicInfoId}-headline`}
							className={inputClassName}
							value={profile.headline}
							onChange={(event) =>
								updateProfile({ headline: event.target.value })
							}
						/>
					</FieldGroup>
				</div>
				<div className="mt-4">
					<FieldGroup label="About" htmlFor={`${basicInfoId}-about`}>
						<textarea
							id={`${basicInfoId}-about`}
							className={`${inputClassName} min-h-32 resize-y`}
							value={profile.about}
							onChange={(event) => updateProfile({ about: event.target.value })}
						/>
					</FieldGroup>
				</div>
			</section>

			<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
				<div className="flex items-center justify-between gap-4">
					<h2 className="text-lg font-semibold text-white">Experience</h2>
					<button
						type="button"
						onClick={() => {
							setExperienceKeys((keys) => [...keys, crypto.randomUUID()]);
							updateProfile({
								experiences: [...profile.experiences, emptyExperience()],
							});
						}}
						className="inline-flex items-center gap-1 text-sm font-medium text-sky-400 hover:text-sky-300"
					>
						<Plus className="size-4" aria-hidden />
						Add experience
					</button>
				</div>
				<div className="mt-6 space-y-4">
					{profile.experiences.length === 0 ? (
						<p className="text-sm text-slate-400">No experience entries yet.</p>
					) : (
						profile.experiences.map((experience, index) => (
							<ExperienceFields
								key={experienceKeys[index]}
								experience={experience}
								index={index}
								onChange={(entryIndex, value) => {
									const experiences = [...profile.experiences];
									experiences[entryIndex] = value;
									updateProfile({ experiences });
								}}
								onRemove={(entryIndex) => {
									setExperienceKeys((keys) =>
										keys.filter(
											(_, currentIndex) => currentIndex !== entryIndex,
										),
									);
									updateProfile({
										experiences: profile.experiences.filter(
											(_, currentIndex) => currentIndex !== entryIndex,
										),
									});
								}}
							/>
						))
					)}
				</div>
			</section>

			<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
				<div className="flex items-center justify-between gap-4">
					<h2 className="text-lg font-semibold text-white">Education</h2>
					<button
						type="button"
						onClick={() => {
							setEducationKeys((keys) => [...keys, crypto.randomUUID()]);
							updateProfile({
								education: [...profile.education, emptyEducation()],
							});
						}}
						className="inline-flex items-center gap-1 text-sm font-medium text-sky-400 hover:text-sky-300"
					>
						<Plus className="size-4" aria-hidden />
						Add education
					</button>
				</div>
				<div className="mt-6 space-y-4">
					{profile.education.length === 0 ? (
						<p className="text-sm text-slate-400">No education entries yet.</p>
					) : (
						profile.education.map((education, index) => (
							<EducationFields
								key={educationKeys[index]}
								education={education}
								index={index}
								onChange={(entryIndex, value) => {
									const nextEducation = [...profile.education];
									nextEducation[entryIndex] = value;
									updateProfile({ education: nextEducation });
								}}
								onRemove={(entryIndex) => {
									setEducationKeys((keys) =>
										keys.filter(
											(_, currentIndex) => currentIndex !== entryIndex,
										),
									);
									updateProfile({
										education: profile.education.filter(
											(_, currentIndex) => currentIndex !== entryIndex,
										),
									});
								}}
							/>
						))
					)}
				</div>
			</section>

			<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
				<h2 className="text-lg font-semibold text-white">Skills</h2>
				<p className="mt-1 text-sm text-slate-400">
					Enter skills separated by commas.
				</p>
				<div className="mt-4">
					<FieldGroup label="Skills" htmlFor={skillsFieldId}>
						<input
							id={skillsFieldId}
							className={inputClassName}
							value={skillsInput}
							onChange={(event) => setSkillsInput(event.target.value)}
							onBlur={handleSkillsBlur}
							placeholder="Product Management, Agile, SQL"
						/>
					</FieldGroup>
				</div>
			</section>

			<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h2 className="text-lg font-semibold text-white">Certifications</h2>
						<p className="mt-1 text-sm text-slate-400">Optional</p>
					</div>
					<button
						type="button"
						onClick={() => {
							setCertificationKeys((keys) => [...keys, crypto.randomUUID()]);
							updateProfile({
								certifications: [...certifications, emptyCertification()],
							});
						}}
						className="inline-flex items-center gap-1 text-sm font-medium text-sky-400 hover:text-sky-300"
					>
						<Plus className="size-4" aria-hidden />
						Add certification
					</button>
				</div>
				<div className="mt-6 space-y-4">
					{certifications.length === 0 ? (
						<p className="text-sm text-slate-400">No certifications added.</p>
					) : (
						certifications.map((certification, index) => (
							<CertificationFields
								key={certificationKeys[index]}
								certification={certification}
								index={index}
								onChange={(entryIndex, value) => {
									const nextCertifications = [...certifications];
									nextCertifications[entryIndex] = value;
									updateProfile({ certifications: nextCertifications });
								}}
								onRemove={(entryIndex) => {
									setCertificationKeys((keys) =>
										keys.filter(
											(_, currentIndex) => currentIndex !== entryIndex,
										),
									);
									updateProfile({
										certifications: certifications.filter(
											(_, currentIndex) => currentIndex !== entryIndex,
										),
									});
								}}
							/>
						))
					)}
				</div>
			</section>

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="space-y-2">
					<button
						type="submit"
						disabled={saveState === "saving"}
						className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{saveState === "saving" ? (
							<Loader2 className="size-4 animate-spin" aria-hidden />
						) : null}
						Save profile
					</button>

					{saveState === "success" ? (
						<p className="flex items-center gap-2 text-sm text-emerald-400">
							<CheckCircle2 className="size-4" aria-hidden />
							Profile saved successfully.
						</p>
					) : null}

					{saveState === "error" && saveError ? (
						<p className="flex items-center gap-2 text-sm text-red-400">
							<AlertCircle className="size-4" aria-hidden />
							{saveError}
						</p>
					) : null}
				</div>

				<button
					type="button"
					disabled
					title="Coming in Phase 2"
					className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-500"
				>
					Continue to career goal — Coming in Phase 2
				</button>
			</div>
		</form>
	);
}
