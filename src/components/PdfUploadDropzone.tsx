import { AlertCircle, CheckCircle2, FileUp, Loader2 } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { readApiError } from "#/lib/api-client";

const MAX_PDF_SIZE_BYTES = 5 * 1024 * 1024;

type UploadState = "idle" | "uploading" | "parsing" | "error" | "success";

type PdfUploadDropzoneProps = {
	onUploadComplete: (snapshotId: string) => void;
};

type UploadResponse = {
	snapshotId: string;
};

type ParseResponse = {
	snapshotId: string;
};

function isPdf(file: File): boolean {
	return (
		file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
	);
}

export function PdfUploadDropzone({
	onUploadComplete,
}: PdfUploadDropzoneProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [state, setState] = useState<UploadState>("idle");
	const [error, setError] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [dragActive, setDragActive] = useState(false);

	const resetError = useCallback(() => {
		setError(null);
		setState("idle");
	}, []);

	const processFile = useCallback(
		async (file: File) => {
			if (!isPdf(file)) {
				setState("error");
				setError(
					"Only PDF files are accepted. Export your profile from LinkedIn as a PDF.",
				);
				return;
			}

			if (file.size > MAX_PDF_SIZE_BYTES) {
				setState("error");
				setError("File is too large. Maximum size is 5 MB.");
				return;
			}

			setFileName(file.name);
			setError(null);
			setState("uploading");

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
				setState("parsing");

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

				const parseData = (await parseResponse.json()) as ParseResponse;
				setState("success");
				onUploadComplete(parseData.snapshotId);
			} catch (uploadError) {
				setState("error");
				setError(
					uploadError instanceof Error
						? uploadError.message
						: "Something went wrong. Please try again.",
				);
			}
		},
		[onUploadComplete],
	);

	const handleFiles = useCallback(
		(files: FileList | null) => {
			const file = files?.[0];
			if (!file) {
				return;
			}
			void processFile(file);
		},
		[processFile],
	);

	const progressLabel =
		state === "uploading"
			? "Uploading PDF…"
			: state === "parsing"
				? "Parsing profile…"
				: null;

	const progressValue =
		state === "uploading" ? 45 : state === "parsing" ? 85 : 0;

	const isBusy = state === "uploading" || state === "parsing";

	return (
		<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
			<h2 className="text-xl font-semibold text-white">
				Upload your profile PDF
			</h2>
			<p className="mt-2 text-sm text-slate-400">
				Drag and drop your LinkedIn export, or choose a file from your computer.
			</p>

			<label
				htmlFor="pdf-upload-input"
				className={`mt-6 block cursor-pointer rounded-xl border-2 border-dashed p-8 transition-colors ${
					dragActive
						? "border-sky-400 bg-sky-400/5"
						: "border-slate-700 bg-slate-950/40"
				} ${isBusy ? "pointer-events-none opacity-80" : ""}`}
				onDragEnter={(event) => {
					event.preventDefault();
					setDragActive(true);
				}}
				onDragOver={(event) => {
					event.preventDefault();
					setDragActive(true);
				}}
				onDragLeave={(event) => {
					event.preventDefault();
					setDragActive(false);
				}}
				onDrop={(event) => {
					event.preventDefault();
					setDragActive(false);
					handleFiles(event.dataTransfer.files);
				}}
			>
				<div className="flex flex-col items-center text-center">
					{state === "success" ? (
						<CheckCircle2 className="size-10 text-emerald-400" aria-hidden />
					) : isBusy ? (
						<Loader2
							className="size-10 animate-spin text-sky-400"
							aria-hidden
						/>
					) : (
						<FileUp className="size-10 text-sky-400" aria-hidden />
					)}

					<p className="mt-4 text-slate-300">
						{state === "success"
							? "Profile parsed successfully. Redirecting…"
							: isBusy
								? progressLabel
								: "Drop your PDF here"}
					</p>

					{fileName ? (
						<p className="mt-2 text-sm text-slate-400">{fileName}</p>
					) : null}

					{!isBusy && state !== "success" ? (
						<span className="mt-6 inline-flex rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-white">
							Choose PDF file
						</span>
					) : null}
				</div>
			</label>

			<input
				ref={inputRef}
				id="pdf-upload-input"
				type="file"
				accept="application/pdf,.pdf"
				className="hidden"
				onChange={(event) => {
					handleFiles(event.target.files);
					event.target.value = "";
				}}
			/>

			{isBusy ? (
				<div className="mt-4">
					<div className="h-2 overflow-hidden rounded-full bg-slate-800">
						<div
							className="h-full rounded-full bg-sky-400 transition-all duration-500"
							style={{ width: `${progressValue}%` }}
						/>
					</div>
					<p className="mt-2 text-xs text-slate-500">{progressLabel}</p>
				</div>
			) : null}

			{state === "error" && error ? (
				<div className="mt-4 flex items-start gap-3 rounded-xl border border-red-900/60 bg-red-950/30 p-4">
					<AlertCircle
						className="mt-0.5 size-4 shrink-0 text-red-400"
						aria-hidden
					/>
					<div className="min-w-0 flex-1">
						<p className="text-sm text-red-200">{error}</p>
						<button
							type="button"
							onClick={resetError}
							className="mt-2 text-sm font-medium text-sky-400 hover:text-sky-300"
						>
							Try again
						</button>
					</div>
				</div>
			) : null}
		</section>
	);
}
