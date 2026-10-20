import { CheckIcon, LockIcon } from "#/lib/icons";
import { planCopy } from "#/lib/plan-copy";
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
		`New headline, About and ${hiddenCounts.experienceRewrites} rewritten ${hiddenCounts.experienceRewrites === 1 ? "role" : "roles"}`,
		"Recruiter keywords and a Portuguese/English version",
		"CV export as PDF",
	];
	const { report, pass30: pass } = planCopy.en;

	return (
		<section className="reveal relative mb-8 overflow-hidden rounded-2xl bg-night text-white shadow-lift">
			<div
				className="pointer-events-none absolute -top-32 -right-24 h-80 w-[36rem] rounded-full bg-primary/30 blur-[100px]"
				aria-hidden
			/>
			<div className="relative grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
				<div>
					<p className="inline-flex items-center gap-1.5 text-sm font-medium text-night-muted">
						<LockIcon className="size-3.5" aria-hidden />
						Your full review is ready
					</p>
					<h2 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">
						You've seen the score. We've already written the fixes.
					</h2>
					<ul className="mt-5 grid gap-2 sm:grid-cols-2">
						{items.map((item) => (
							<li
								key={item}
								className="flex items-start gap-2 text-sm text-night-muted"
							>
								<CheckIcon
									className="mt-0.5 size-4 shrink-0 text-[#70b5f9]"
									aria-hidden
								/>
								{item}
							</li>
						))}
					</ul>
				</div>
				<div className="flex flex-col gap-2 md:w-64">
					<button
						type="button"
						onClick={() => onUnlock("report")}
						className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
					>
						{report.name}, {priceFor(region, "report")}
					</button>
					<button
						type="button"
						onClick={() => onUnlock("pass30")}
						className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
					>
						{pass.name}, {priceFor(region, "pass30")} / 30 days
					</button>
					<p className="mt-1 text-center text-xs text-night-muted">
						{REGION_CONFIG[region].methods
							.map((method) => PAYMENT_METHOD_LABELS[method])
							.join(" · ")}
					</p>
				</div>
			</div>
		</section>
	);
}
