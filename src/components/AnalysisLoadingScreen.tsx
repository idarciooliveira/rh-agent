import { Sparkles } from "lucide-react";

type AnalysisLoadingScreenProps = {
	statusMessage: string;
	progress: number;
};

export function AnalysisLoadingScreen({
	statusMessage,
	progress,
}: AnalysisLoadingScreenProps) {
	const clampedProgress = Math.min(100, Math.max(0, progress));

	return (
		<output
			className="page-gradient fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
			aria-live="polite"
		>
			<div className="flex w-full max-w-md flex-col items-center text-center">
				<div className="flex size-20 items-center justify-center rounded-full bg-card shadow-lg shadow-primary/10">
					<svg
						className="spinner-arc size-10"
						viewBox="0 0 40 40"
						fill="none"
						aria-hidden
					>
						<title>Loading</title>
						<circle
							cx="20"
							cy="20"
							r="16"
							stroke="var(--color-border)"
							strokeWidth="3"
						/>
						<circle
							cx="20"
							cy="20"
							r="16"
							stroke="var(--color-primary)"
							strokeWidth="3"
							strokeLinecap="round"
							strokeDasharray="50 100"
						/>
					</svg>
				</div>

				<p className="mt-8 text-xl font-semibold text-text">{statusMessage}</p>

				<div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
					<div
						className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
						style={{ width: `${clampedProgress}%` }}
					/>
				</div>

				<p className="mt-6 flex items-center gap-2 text-sm text-text-muted">
					<Sparkles className="size-4 shrink-0 text-primary" aria-hidden />
					AI is analysing your profile — this takes about 15–30 seconds
				</p>
			</div>
		</output>
	);
}
