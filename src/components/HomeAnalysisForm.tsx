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
import { AlertCircleIcon, ArrowRightIcon } from "#/lib/icons";
import { parseLinkedInUsername } from "#/lib/linkedin-username";

const PIPELINE_MESSAGES = [
	"Finding your public profile…",
	"Reading your headline and About section…",
	"Going through your experience, one role at a time…",
	"Checking it against the job you want…",
	"Sorting strengths from gaps…",
	"Rewriting your headline. This is the fun part.",
	"Almost there. Putting the plan in order…",
] as const;

const GOAL_EXAMPLES = [
	"Move from backend engineering into DevOps",
	"First data analyst role after graduating",
	"Engineering manager at a Series B startup",
	"Switch from teaching into instructional design",
] as const;

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
	const [username, setUsername] = useState("");
	const [careerGoal, setCareerGoal] = useState("");
	const [phase, setPhase] = useState<FormPhase>("idle");
	const [error, setError] = useState<string | null>(null);
	const [usernameError, setUsernameError] = useState<string | null>(null);
	const [goalError, setGoalError] = useState<string | null>(null);
	const [statusMessage, setStatusMessage] = useState<string>(
		PIPELINE_MESSAGES[0],
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
				PIPELINE_MESSAGES.length - 1,
			);
			setStatusMessage(
				PIPELINE_MESSAGES[messageIndexRef.current] ?? PIPELINE_MESSAGES[0],
			);
		}, 4000);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [phase]);

	const runPipeline = useCallback(
		async (linkedinUsername: string, goal: string) => {
			setPhase("loading");
			setError(null);
			setStatusMessage(PIPELINE_MESSAGES[0]);
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
						"We couldn't find that profile. Check the username and make sure your profile is public.",
					);
					throw new Error(message);
				}

				const profileData =
					(await profileResponse.json()) as FetchProfileResponse;
				setProgress(55);
				messageIndexRef.current = 3;
				setStatusMessage(PIPELINE_MESSAGES[3]);

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
						"Something broke on our end. Your profile is fine, the review didn't finish. Try again in a few seconds.",
					);
					throw new Error(message);
				}

				const analyzeData = (await analyzeResponse.json()) as AnalyzeResponse;
				setProgress(100);
				setStatusMessage(PIPELINE_MESSAGES[PIPELINE_MESSAGES.length - 1]);

				void navigate({
					to: "/results/$analysisId",
					params: { analysisId: analyzeData.analysisId },
				});
			} catch (pipelineError) {
				setPhase("error");
				setError(
					pipelineError instanceof Error
						? pipelineError.message
						: "Something broke on our end. Try again in a few seconds.",
				);
			}
		},
		[navigate],
	);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setUsernameError(null);
		setGoalError(null);
		setError(null);

		const linkedinUsername = parseLinkedInUsername(username);
		if (!linkedinUsername) {
			setUsernameError(
				"That doesn't look like a LinkedIn username. It's the part after /in/ in your profile link, like janedoe.",
			);
			return;
		}

		const trimmedGoal = careerGoal.trim();
		if (trimmedGoal.length < 10) {
			setGoalError("Add a bit more. Give us a role, an industry or a level.");
			return;
		}

		if (trimmedGoal.length > 500) {
			setGoalError("Keep your goal under 500 characters.");
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
					AI mock mode. Responses are simulated and no real API calls are made.
				</div>
			) : null}

			<div>
				<label
					htmlFor="linkedin-username"
					className="mb-2 block text-sm font-semibold text-ink"
				>
					Your LinkedIn username or profile URL
				</label>
				<div
					className={`group flex items-center rounded-md border bg-surface transition-colors focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15 ${usernameError ? "border-threat" : "border-border-strong"}`}
				>
					<span className="select-none pl-4 font-mono text-sm text-muted transition-colors group-focus-within:text-primary-ink">
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
						className="min-w-0 flex-1 bg-transparent py-3.5 pr-4 pl-0.5 text-base text-ink placeholder:text-muted/60 focus:outline-none"
					/>
				</div>
				<p
					id="linkedin-username-help"
					className={`mt-2 text-sm ${usernameError ? "text-threat" : "text-muted"}`}
				>
					{usernameError ??
						"It's the part after /in/ in your profile link. Your profile has to be public."}
				</p>
			</div>

			<div>
				<div className="mb-2 flex items-baseline justify-between gap-3">
					<label
						htmlFor="career-goal"
						className="block text-sm font-semibold text-ink"
					>
						What job do you want next?
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
					placeholder="Senior product manager at a B2B SaaS company, ideally remote"
					aria-invalid={goalError ? true : undefined}
					aria-describedby="career-goal-help"
					className={`w-full resize-none rounded-md border bg-surface px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 ${goalError ? "border-threat" : "border-border-strong"}`}
				/>
				<p
					id="career-goal-help"
					className={`mt-1.5 text-sm ${goalError ? "text-threat" : "text-muted"}`}
				>
					{goalError ??
						'Be specific. "Move from backend engineering into DevOps" beats "a better job".'}
				</p>
				<div className="mt-3 flex flex-wrap gap-2">
					{GOAL_EXAMPLES.map((example) => (
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
					Review my profile
					<ArrowRightIcon className="size-4" aria-hidden />
				</button>
				<p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-muted">
					<span>Free</span>
					<span aria-hidden className="text-border-strong">
						/
					</span>
					<span>No signup</span>
					<span aria-hidden className="text-border-strong">
						/
					</span>
					<span className="font-mono text-xs">~30 seconds</span>
				</p>
			</div>
		</form>
	);
}
