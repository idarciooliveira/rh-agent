import { CheckIcon, LockIcon } from "#/lib/icons";
import {
	PAYMENT_METHOD_LABELS,
	type Plan,
	priceFor,
	REGION_CONFIG,
} from "#/lib/pricing";
import { useRegion } from "#/lib/use-region";

type UnlockBannerProps = {
	hiddenCounts: {
		swotItems: number;
		suggestions: number;
		quickWins: number;
		experienceRewrites: number;
	};
	onUnlock: (plan: Plan) => void;
};

export function UnlockBanner({ hiddenCounts, onUnlock }: UnlockBannerProps) {
	const [region] = useRegion();
	const items = [
		`${hiddenCounts.swotItems} more SWOT findings`,
		`Your ${hiddenCounts.suggestions}-step plan, ranked by impact`,
		`${hiddenCounts.quickWins} more quick wins`,
		`New headline, About and ${hiddenCounts.experienceRewrites} rewritten roles`,
		"Recruiter keywords and a Portuguese/English version",
		"CV export as PDF",
	];

	return (
		<section className="reveal mb-8 overflow-hidden rounded-xl bg-night text-background shadow-lift">
			<div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
				<div>
					<p className="inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">
						<LockIcon className="size-3.5" aria-hidden />
						Your full review is ready
					</p>
					<h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-background">
						You've seen the score. The fixes are one step away.
					</h2>
					<ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
						{items.map((item) => (
							<li
								key={item}
								className="flex items-start gap-2 text-sm text-night-muted"
							>
								<CheckIcon
									className="mt-0.5 size-4 shrink-0 text-accent"
									aria-hidden
								/>
								{item}
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-2 md:w-60">
					<button
						type="button"
						onClick={() => onUnlock("report")}
						className="inline-flex items-center justify-center gap-2 rounded-full bg-background px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent"
					>
						Unlock for {priceFor(region, "report")}
					</button>
					<button
						type="button"
						onClick={() => onUnlock("pass30")}
						className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-white/10"
					>
						30-day pass, {priceFor(region, "pass30")}
					</button>
					<p className="text-center text-xs text-night-muted">
						{REGION_CONFIG[region].methods
							.map((method) => PAYMENT_METHOD_LABELS[method])
							.join(", ")}
					</p>
				</div>
			</div>
		</section>
	);
}
