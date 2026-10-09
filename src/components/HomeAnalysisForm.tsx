import { useNavigate } from "@tanstack/react-router";
import {
	type FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { AnalysisLoadingScreen } from "#/components/AnalysisLoadingScreen";
import { readApiError } from "#/lib/api-client";
import { useLanguage } from "#/lib/i18n";
import { AlertCircleIcon, ArrowRightIcon } from "#/lib/icons";
import { parseLinkedInUsername } from "#/lib/linkedin-username";

const GOAL_MAX_LENGTH = 500;

type FormPhase = "idle" | "loading" | "error";

type FetchProfileResponse = {
	snapshotId: string;
};

type AnalyzeResponse = {
	analysisId: string;
};

type HomeAnalysisFormProps = {
	aiMode: string;
};

export function HomeAnalysisForm({ aiMode }: HomeAnalysisFormProps) {
	const navigate = useNavigate();
	const { copy } = useLanguage();
	const pipelineMessages = copy.form.pipeline;
	const [username, setUsername] = useState("");
	const [careerGoal, setCareerGoal] = useState("");
	const [phase, setPhase] = useState<FormPhase>("idle");
	const [error, setError] = useState<string | null>(null);
	const [usernameError, setUsernameError] = useState<string | null>(null);
	const [goalError, setGoalError] = useState<string | null>(null);
	const [statusMessage, setStatusMessage] = useState<string>(
		pipelineMessages[0],
	);
	const [progress, setProgress] = useState(0);
	const messageIndexRef = useRef(0);

	useEffect(() => {
		if (phase !== "loading") {
			return;
		}

		const intervalId = window.setInterval(() => {
			setProgress((current) => (current >= 95 ? current : current + 1));
		}, 400);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [phase]);

	useEffect(() => {
		if (phase !== "loading") {
			return;
		}

		const intervalId = window.setInterval(() => {
			messageIndexRef.current = Math.min(
				messageIndexRef.current + 1,
				pipelineMessages.length - 1,
			);
			setStatusMessage(
				pipelineMessages[messageIndexRef.current] ?? pipelineMessages[0],
			);
		}, 4000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [phase, pipelineMessages]);

	const runPipeline = useCallback(
		async (linkedinUsername: string, goal: string) => {
			setPhase("loading");
			setError(null);
			setStatusMessage(pipelineMessages[0]);
			setProgress(10);
			messageIndexRef.current = 0;

			try {
				const profileResponse = await fetch("/api/fetch-profile", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: linkedinUsername }),
				});

				if (!profileResponse.ok) {
					const message = await readApiError(
						profileResponse,
						copy.form.profileNotFound,
					);
					throw new Error(message);
				}

				const profileData =
					(await profileResponse.json()) as FetchProfileResponse;
				setProgress(55);
				messageIndexRef.current = 3;
				setStatusMessage(pipelineMessages[3]);

				const analyzeResponse = await fetch("/api/analyze", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						snapshotId: profileData.snapshotId,
						careerGoal: goal,
					}),
				});

				if (!analyzeResponse.ok) {
					const message = await readApiError(
						analyzeResponse,
						copy.form.analyzeFailed,
					);
					throw new Error(message);
				}

				const analyzeData = (await analyzeResponse.json()) as AnalyzeResponse;
				setProgress(100);
				setStatusMessage(pipelineMessages[pipelineMessages.length - 1]);

				void navigate({
					to: "/results/$analysisId",
					params: { analysisId: analyzeData.analysisId },
				});
			} catch (pipelineError) {
				setPhase("error");
				setError(
					pipelineError instanceof Error
						? pipelineError.message
						: copy.form.genericError,
				);
			}
		},
		[navigate, copy, pipelineMessages],
	);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setUsernameError(null);
		setGoalError(null);
		setError(null);

		const linkedinUsername = parseLinkedInUsername(username);
		if (!linkedinUsername) {
			setUsernameError(copy.form.usernameError);
			return;
		}

		const trimmedGoal = careerGoal.trim();
		if (trimmedGoal.length < 10) {
			setGoalError(copy.form.goalTooShort);
			return;
		}

		if (trimmedGoal.length > 500) {
			setGoalError(copy.form.goalTooLong);
			return;
		}

		void runPipeline(linkedinUsername, trimmedGoal);
	};

	if (phase === "loading") {
		return (
			<AnalysisLoadingScreen
				statusMessage={statusMessage}
				progress={progress}
			/>
		);
	}

	return (
		<form className="space-y-5" onSubmit={handleSubmit} noValidate>
			{aiMode === "mock" ? (
				<div className="rounded-md border border-weakness-border bg-weakness-tint px-4 py-2.5 text-sm text-weakness">
					{copy.form.mockBanner}
				</div>
			) : null}

			<div>
				<label
					htmlFor="linkedin-username"
					className="mb-2 block text-sm font-semibold text-ink"
				>
					{copy.form.usernameLabel}
				</label>
				<div
					className={`flex items-center rounded-md border bg-surface transition-colors focus-within:border-primary ${usernameError ? "border-threat" : "border-border-strong hover:border-muted"}`}
				>
					<span className="select-none pl-4 font-mono text-sm text-muted">
						linkedin.com/in/
					</span>
					<input
						id="linkedin-username"
						type="text"
						value={username}
						onChange={(event) => {
							setUsername(event.target.value);
							setUsernameError(null);
						}}
						autoComplete="off"
						autoCapitalize="none"
						spellCheck={false}
						placeholder="janedoe"
						aria-invalid={usernameError ? true : undefined}
						aria-describedby="linkedin-username-help"
						className="min-w-0 flex-1 bg-transparent py-3.5 pr-4 pl-0.5 text-base text-ink placeholder:text-muted/60 focus:outline-none focus-visible:outline-none"
					/>
				</div>
				<p
					id="linkedin-username-help"
					className={`mt-2 text-sm ${usernameError ? "text-threat" : "text-muted"}`}
				>
					{usernameError ?? copy.form.usernameHelp}
				</p>
			</div>

			<div>
				<div className="mb-2 flex items-baseline justify-between gap-3">
					<label
						htmlFor="career-goal"
						className="block text-sm font-semibold text-ink"
					>
						{copy.form.goalLabel}
					</label>
					<span className="font-mono text-xs text-muted" aria-hidden>
						{careerGoal.length}/{GOAL_MAX_LENGTH}
					</span>
				</div>
				<textarea
					id="career-goal"
					value={careerGoal}
					onChange={(event) => {
						setCareerGoal(event.target.value);
						setGoalError(null);
						setError(null);
					}}
					rows={3}
					maxLength={GOAL_MAX_LENGTH}
					placeholder={copy.form.goalPlaceholder}
					aria-invalid={goalError ? true : undefined}
					aria-describedby="career-goal-help"
					className={`w-full resize-none rounded-md border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/60 transition-colors focus:border-primary focus:outline-none focus-visible:outline-none ${goalError ? "border-threat" : "border-border-strong hover:border-muted"}`}
				/>
				<p
					id="career-goal-help"
					className={`mt-1.5 text-sm ${goalError ? "text-threat" : "text-muted"}`}
				>
					{goalError ?? copy.form.goalHelp}
				</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{copy.form.goalExamples.map((example) => (
						<button
							key={example}
							type="button"
							onClick={() => {
								setCareerGoal(example);
								setGoalError(null);
							}}
							className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-left text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary"
						>
							{example}
						</button>
					))}
				</div>
			</div>

			{phase === "error" && error ? (
				<div
					role="alert"
					className="flex items-start gap-3 rounded-md border border-threat-border bg-threat-tint p-4"
				>
					<AlertCircleIcon
						className="mt-0.5 size-4 shrink-0 text-threat"
						aria-hidden
					/>
					<p className="text-sm text-threat">{error}</p>
				</div>
			) : null}

			<div>
				<button
					type="submit"
					className="btn-primary flex w-full items-center justify-center gap-2 rounded-md px-6 py-4 text-base font-semibold"
				>
					{copy.form.submit}
					<ArrowRightIcon className="size-4" aria-hidden />
				</button>
				<p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted">
					<span>{copy.form.trustFree}</span>
					<span aria-hidden className="text-border-strong">
						/
					</span>
					<span>{copy.form.trustNoSignup}</span>
					<span aria-hidden className="text-border-strong">
						/
					</span>
					<span className="font-mono text-xs">{copy.form.trustTime}</span>
				</p>
			</div>
		</form>
	);
}
