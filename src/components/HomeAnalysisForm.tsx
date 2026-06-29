import { useNavigate } from "@tanstack/react-router";
import {
	type FormEvent,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { AnalysisLoadingScreen } from "#/components/AnalysisLoadingScreen";
import { PdfUploadDropzone } from "#/components/PdfUploadDropzone";
import { readApiError } from "#/lib/api-client";
import { AlertCircleIcon } from "#/lib/icons";

const MAX_PDF_SIZE_BYTES = 5 * 1024 * 1024;

const PIPELINE_MESSAGES = [
	"Uploading your profile…",
	"Reading your profile…",
	"Identifying key strengths…",
	"Mapping opportunities…",
	"Analyzing weaknesses and threats…",
	"Generating recommendations…",
	"Preparing strategic analysis…",
] as const;

type FormPhase = "idle" | "loading" | "error";

type UploadResponse = {
	snapshotId: string;
};

type ParseResponse = {
	snapshotId: string;
};

type AnalyzeResponse = {
	analysisId: string;
};

type HomeAnalysisFormProps = {
	aiMode: string;
};

function isPdf(file: File): boolean {
	return (
		file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
	);
}

export function HomeAnalysisForm({ aiMode }: HomeAnalysisFormProps) {
	const navigate = useNavigate();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [careerGoal, setCareerGoal] = useState("");
	const [phase, setPhase] = useState<FormPhase>("idle");
	const [error, setError] = useState<string | null>(null);
	const [fileError, setFileError] = useState<string | null>(null);
	const [statusMessage, setStatusMessage] = useState(PIPELINE_MESSAGES[0]);
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
			messageIndexRef.current =
				(messageIndexRef.current + 1) % PIPELINE_MESSAGES.length;
			setStatusMessage(
				PIPELINE_MESSAGES[messageIndexRef.current] ?? PIPELINE_MESSAGES[0],
			);
		}, 2800);

		return () => {
			window.clearInterval(intervalId);
		};
	}, [phase]);

	const runPipeline = useCallback(
		async (file: File, goal: string) => {
			setPhase("loading");
			setError(null);
			setStatusMessage(PIPELINE_MESSAGES[0]);
			setProgress(10);
			messageIndexRef.current = 0;

			try {
				const formData = new FormData();
				formData.append("file", file);

				const uploadResponse = await fetch("/api/upload", {
					method: "POST",
					body: formData,
				});

				if (!uploadResponse.ok) {
					const message = await readApiError(
						uploadResponse,
						"Upload failed. Please try again.",
					);
					throw new Error(message);
				}

				const uploadData = (await uploadResponse.json()) as UploadResponse;
				setProgress(30);
				setStatusMessage("Reading your profile…");

				const parseResponse = await fetch("/api/parse", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ snapshotId: uploadData.snapshotId }),
				});

				if (!parseResponse.ok) {
					const message = await readApiError(
						parseResponse,
						"Could not parse your PDF. Make sure it is a LinkedIn profile export.",
					);
					throw new Error(message);
				}

				(await parseResponse.json()) as ParseResponse;
				setProgress(55);
				setStatusMessage("Analyzing strengths and weaknesses…");

				const analyzeResponse = await fetch("/api/analyze", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						snapshotId: uploadData.snapshotId,
						careerGoal: goal,
					}),
				});

				if (!analyzeResponse.ok) {
					const message = await readApiError(
						analyzeResponse,
						"Analysis failed. Please try again.",
					);
					throw new Error(message);
				}

				const analyzeData = (await analyzeResponse.json()) as AnalyzeResponse;
				setProgress(100);
				setStatusMessage("Preparing strategic analysis…");

				void navigate({
					to: "/results/$analysisId",
					params: { analysisId: analyzeData.analysisId },
				});
			} catch (pipelineError) {
				setPhase("error");
				setError(
					pipelineError instanceof Error
						? pipelineError.message
						: "Something went wrong. Please try again.",
				);
			}
		},
		[navigate],
	);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFileError(null);
		setError(null);

		if (!selectedFile) {
			setFileError("Please upload your LinkedIn profile PDF.");
			return;
		}

		if (!isPdf(selectedFile)) {
			setFileError(
				"Only PDF files are accepted. Export your profile from LinkedIn as a PDF.",
			);
			return;
		}

		if (selectedFile.size > MAX_PDF_SIZE_BYTES) {
			setFileError("File is too large. Maximum size is 5 MB.");
			return;
		}

		const trimmedGoal = careerGoal.trim();
		if (trimmedGoal.length < 10) {
			setError("Please enter a career goal of at least 10 characters.");
			return;
		}

		if (trimmedGoal.length > 500) {
			setError("Career goal must be 500 characters or fewer.");
			return;
		}

		void runPipeline(selectedFile, trimmedGoal);
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
		<form className="space-y-6" onSubmit={handleSubmit}>
			{aiMode === "mock" ? (
				<div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
					AI mock mode — responses are simulated. No real API calls are made.
				</div>
			) : null}

			<div>
				<label
					htmlFor="pdf-upload-input"
					className="mb-2 block text-sm font-semibold text-text"
				>
					LinkedIn Profile PDF <span className="text-primary">*</span>
				</label>
				<PdfUploadDropzone
					file={selectedFile}
					onFileChange={(file) => {
						setSelectedFile(file);
						setFileError(null);
					}}
					disabled={false}
					error={fileError}
				/>
			</div>

			<div>
				<label
					htmlFor="career-goal"
					className="mb-2 block text-sm font-semibold text-text"
				>
					Target Career Goal <span className="text-primary">*</span>
				</label>
				<textarea
					id="career-goal"
					value={careerGoal}
					onChange={(event) => {
						setCareerGoal(event.target.value);
						setError(null);
					}}
					rows={4}
					maxLength={500}
					placeholder="E.g., I want to transition from Software Engineering to DevOps / SRE roles at a cloud-native company..."
					className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
				/>
			</div>

			{phase === "error" && error ? (
				<div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
					<AlertCircleIcon
						className="mt-0.5 size-4 shrink-0 text-red-500"
						aria-hidden
					/>
					<p className="text-sm text-red-700">{error}</p>
				</div>
			) : null}

			<button
				type="submit"
				className="btn-primary flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary/25 transition-opacity hover:opacity-95"
			>
				Generate Strategic Analysis
				<span aria-hidden>→</span>
			</button>
		</form>
	);
}
