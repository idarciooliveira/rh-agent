import { CheckCircle2Icon, ZapIcon } from "#/lib/icons";

type QuickWinsPanelProps = {
	quickWins: string[];
};

export function QuickWinsPanel({ quickWins }: QuickWinsPanelProps) {
	return (
		<div className="rounded-2xl bg-amber-50/80 p-5">
			<div className="mb-5 flex items-center gap-2">
				<ZapIcon className="size-5 text-orange-500" aria-hidden />
				<h2 className="text-lg font-bold text-text">Quick Wins</h2>
			</div>
			<div className="space-y-3">
				{quickWins.map((win) => (
					<div
						key={win}
						className="flex items-start gap-3 rounded-xl border border-amber-100 bg-white p-4 shadow-sm"
					>
						<CheckCircle2Icon
							className="mt-0.5 size-5 shrink-0 text-orange-500"
							aria-hidden
						/>
						<p className="text-sm leading-relaxed text-text">{win}</p>
					</div>
				))}
			</div>
		</div>
	);
}
