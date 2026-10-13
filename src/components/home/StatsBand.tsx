import { useLanguage } from "#/lib/i18n";

/** Slim proof strip under the hero: one outcome claim plus two product facts. */
export function StatsBand() {
	const { copy } = useLanguage();

	return (
		<section className="border-b border-border bg-surface">
			<ul className="mx-auto grid max-w-7xl px-4 sm:grid-cols-3 sm:px-8">
				{copy.stats.items.map((stat) => (
					<li
						key={stat.value}
						className="reveal border-border py-8 not-last:border-b sm:px-8 sm:py-12 sm:not-last:border-r sm:not-last:border-b-0 sm:first:pl-0"
					>
						<p className="font-display text-6xl leading-none text-ink sm:text-7xl">
							{stat.value}
						</p>
						<p className="mt-3 max-w-[16rem] text-sm leading-snug text-muted">
							{stat.label}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}
