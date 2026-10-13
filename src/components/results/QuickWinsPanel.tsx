import { Blurred } from "#/components/results/Locked";
import { CheckCircle2Icon, LockIcon, ZapIcon } from "#/lib/icons";
import { FREE_QUICK_WINS } from "#/lib/pricing";

type QuickWinsPanelProps = {
	quickWins: string[];
	locked?: boolean;
	onUnlock?: () => void;
};

export function QuickWinsPanel({
	quickWins,
	locked = false,
	onUnlock,
}: QuickWinsPanelProps) {
	return (
		<section className="rounded-xl border border-border-strong bg-night p-5 text-ink shadow-lift sm:p-6 lg:sticky lg:top-6">
			<div className="mb-5">
				<div className="flex items-center gap-2">
					<ZapIcon className="size-5 text-primary-ink" aria-hidden />
					<h2 className="font-display text-2xl font-semibold text-ink">
						Quick wins
					</h2>
				</div>
				<p className="mt-1 text-sm leading-relaxed text-night-muted">
					Small fixes you can make today.
				</p>
			</div>
			<ul className="divide-y divide-white/10">
				{quickWins.map((win, index) => (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: locked items share the same placeholder text
						key={`${index}-${win}`}
						className="flex items-start gap-3 py-3 first:pt-0"
					>
						<CheckCircle2Icon
							className="mt-0.5 size-5 shrink-0 text-primary-ink"
							aria-hidden
						/>
						<p className="text-[15px] leading-relaxed text-ink">
							{locked && index >= FREE_QUICK_WINS ? (
								<Blurred>{win}</Blurred>
							) : (
								win
							)}
						</p>
					</li>
				))}
			</ul>
			{locked && quickWins.length > FREE_QUICK_WINS ? (
				<button
					type="button"
					onClick={onUnlock}
					className="mt-3 inline-flex w-full items-center justify-center gap-2 btn-primary rounded-full px-4 py-2.5 text-sm font-semibold"
				>
					<LockIcon className="size-4" aria-hidden />
					Unlock {quickWins.length - FREE_QUICK_WINS} more quick wins
				</button>
			) : null}
		</section>
	);
}
