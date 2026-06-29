import { useCallback, useRef, useState } from "react";
import { CloudUploadIcon } from "#/lib/icons";

type PdfUploadDropzoneProps = {
	file: File | null;
	onFileChange: (file: File | null) => void;
	disabled?: boolean;
	error?: string | null;
};

export function PdfUploadDropzone({
	file,
	onFileChange,
	disabled = false,
	error,
}: PdfUploadDropzoneProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [dragActive, setDragActive] = useState(false);

	const handleFiles = useCallback(
		(files: FileList | null) => {
			const nextFile = files?.[0] ?? null;
			onFileChange(nextFile);
		},
		[onFileChange],
	);

	return (
		<div>
			<label
				htmlFor="pdf-upload-input"
				className={`block cursor-pointer rounded-xl border-2 border-dashed p-8 transition-colors ${
					disabled ? "pointer-events-none opacity-60" : ""
				} ${
					dragActive
						? "border-primary bg-surface"
						: error
							? "border-red-300 bg-red-50/50"
							: "border-border bg-white hover:border-primary/50 hover:bg-surface/50"
				}`}
				onDragEnter={(event) => {
					event.preventDefault();
					if (!disabled) {
						setDragActive(true);
					}
				}}
				onDragOver={(event) => {
					event.preventDefault();
					if (!disabled) {
						setDragActive(true);
					}
				}}
				onDragLeave={(event) => {
					event.preventDefault();
					setDragActive(false);
				}}
				onDrop={(event) => {
					event.preventDefault();
					setDragActive(false);
					if (!disabled) {
						handleFiles(event.dataTransfer.files);
					}
				}}
			>
				<div className="flex flex-col items-center text-center">
					<CloudUploadIcon className="size-10 text-primary/70" aria-hidden />

					<p className="mt-4 text-sm text-text">
						Drop your PDF here, or{" "}
						<span className="font-medium text-primary">browse</span>
					</p>

					{file ? (
						<p className="mt-2 text-sm font-medium text-text-muted">
							{file.name}
						</p>
					) : null}

					<p className="mt-4 text-xs text-text-muted">
						Export from LinkedIn → Me → View Profile → More → Save to PDF
					</p>
				</div>
			</label>

			<input
				ref={inputRef}
				id="pdf-upload-input"
				type="file"
				accept="application/pdf,.pdf"
				className="hidden"
				disabled={disabled}
				onChange={(event) => {
					handleFiles(event.target.files);
					event.target.value = "";
				}}
			/>

			{error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
		</div>
	);
}
