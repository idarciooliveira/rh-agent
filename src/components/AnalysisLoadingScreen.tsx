import { createPortal } from "react-dom";
import { useLanguage } from "#/lib/i18n";
import { PenLineIcon } from "#/lib/icons";

type AnalysisLoadingScreenProps = {
	statusMessage: string;
	progress: number;
};

const SKELETON_LINES = ["w-11/12", "w-4/5", "w-full", "w-3/5", "w-5/6"];

export function AnalysisLoadingScreen({
	statusMessage,
	progress,
}: AnalysisLoadingScreenProps) {
	const { copy } = useLanguage();
	const clampedProgress = Math.min(100, Math.max(0, progress));

	// Portal to <body> so animated (transformed) ancestors can't trap the fixed overlay.
	return createPortal(
		<output
			className="paper-grid fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto px-5 py-10"
			aria-live="polite"
		>
			<div className="flex w-full max-w-md flex-col items-center text-center">
				<p className="font-display text-2xl font-semibold text-ink">
					Red<span className="text-primary-ink">line</span>
				</p>

				<div className="relative mt-8 w-full overflow-hidden rounded-lg border border-border bg-surface p-5 text-left shadow-lift">
					<div className="flex items-center gap-3">
						<div className="size-12 shrink-0 rounded-full bg-surface-2" />
						<div className="flex-1 space-y-2">
							<div className="h-3 w-2/5 rounded-full bg-surface-2" />
							<div className="h-2.5 w-3/4 rounded-full bg-surface-2" />
						</div>
					</div>
					<div className="mt-6 space-y-3">
						{SKELETON_LINES.map((width) => (
							<div
								key={width}
								className={`h-2.5 rounded-full bg-surface-2 ${width}`}
							/>
						))}
					</div>
					<div className="mt-6 flex gap-2">
						<div className="h-6 w-16 rounded-full bg-strength-tint" />
						<div className="h-6 w-20 rounded-full bg-weakness-tint" />
						<div className="h-6 w-14 rounded-full bg-opportunity-tint" />
					</div>
					<div
						className="pen-scan pointer-events-none absolute inset-x-0 top-4 flex items-center"
						style={{ "--scan-distance": "190px" } as React.CSSProperties}
						aria-hidden
					>
						<div className="h-0.5 flex-1 bg-primary shadow-[0_0_12px_rgb(10_102_194/0.6)]" />
						<PenLineIcon className="mr-2 size-4 text-primary-ink" />
					</div>
				</div>

				<p className="mt-8 min-h-14 text-lg font-semibold text-balance text-ink sm:text-xl">
					{statusMessage}
				</p>

				<div className="mt-4 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
					<div
						className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
						style={{ width: `${clampedProgress}%` }}
					/>
				</div>

				<p className="mt-5 text-sm text-muted">
					{copy.form.loadingNotePre}
					<span className="font-mono">{copy.form.loadingNoteTime}</span>
					{copy.form.loadingNotePost}
				</p>
			</div>
		</output>,
		document.body,
	);
}
