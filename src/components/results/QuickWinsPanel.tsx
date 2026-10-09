import { CheckCircle2Icon, ZapIcon } from "#/lib/icons";

type QuickWinsPanelProps = {
	quickWins: string[];
};

export function QuickWinsPanel({ quickWins }: QuickWinsPanelProps) {
	return (
		<section className="rounded-xl bg-night p-5 text-background shadow-lift sm:p-6 lg:sticky lg:top-6">
			<div className="mb-5">
				<div className="flex items-center gap-2">
					<ZapIcon className="size-5 text-accent" aria-hidden />
					<h2 className="font-display text-2xl font-semibold text-background">
						Quick wins
					</h2>
				</div>
				<p className="mt-1 text-sm leading-relaxed text-night-muted">
					Small fixes you can make today.
				</p>
			</div>
			<ul className="divide-y divide-white/10">
				{quickWins.map((win) => (
					<li key={win} className="flex items-start gap-3 py-3 first:pt-0">
						<CheckCircle2Icon
							className="mt-0.5 size-5 shrink-0 text-accent"
							aria-hidden
						/>
						<p className="text-[15px] leading-relaxed text-background">{win}</p>
					</li>
				))}
			</ul>
		</section>
	);
}
