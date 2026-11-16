import { useLanguage } from "#/lib/i18n";

/** Product facts under the hero. No outcome claims we can't source. */
export function StatsBand() {
	const { copy } = useLanguage();

	return (
		<section className="border-y border-border bg-surface">
			<ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border lg:grid-cols-4">
				{copy.stats.items.map((stat) => (
					<li
						key={stat.value}
						className="reveal bg-surface px-4 py-8 sm:px-6 sm:py-10"
					>
						<p className="font-display text-4xl leading-none text-ink sm:text-5xl">
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
