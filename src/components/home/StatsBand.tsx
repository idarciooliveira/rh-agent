import { useLanguage } from "#/lib/i18n";
import { TimerIcon, TrendingUpIcon, ZapIcon } from "#/lib/icons";

const STAT_ICONS = [TrendingUpIcon, TimerIcon, ZapIcon];

/** Slim proof strip under the hero: one outcome claim plus two product facts. */
export function StatsBand() {
	const { copy } = useLanguage();

	return (
		<section className="border-y border-border bg-surface">
			<ul className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3 sm:gap-8 sm:px-6 sm:py-10">
				{copy.stats.items.map((stat, index) => {
					const Icon = STAT_ICONS[index % STAT_ICONS.length];
					return (
						<li key={stat.value} className="reveal flex items-center gap-4">
							<span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent">
								<Icon className="size-5 text-primary" aria-hidden />
							</span>
							<div>
								<p className="font-display text-2xl leading-none font-semibold text-ink sm:text-3xl">
									{stat.value}
								</p>
								<p className="mt-1.5 text-sm leading-snug text-muted">
									{stat.label}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
