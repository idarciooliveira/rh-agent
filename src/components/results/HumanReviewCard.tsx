import { useLanguage } from "#/lib/i18n";
import { UsersIcon } from "#/lib/icons";
import { priceFor } from "#/lib/pricing";

export function HumanReviewCard({ onBook }: { onBook: () => void }) {
	const { lang } = useLanguage();

	return (
		<section className="rounded-lg border border-border bg-surface-2 p-5 sm:p-6">
			<div className="flex items-center gap-2">
				<UsersIcon className="size-5 text-primary-ink" aria-hidden />
				<h2 className="font-display text-xl font-semibold text-ink">
					Talk it through with a recruiter
				</h2>
			</div>
			<p className="mt-2 text-sm leading-relaxed text-muted">
				A local HR consultant reads your review and spends 30 minutes with you
				on the changes, interviews and salary. Booked by WhatsApp.
			</p>
			<button
				type="button"
				onClick={onBook}
				className="btn-secondary mt-4 px-4 py-2 text-sm font-semibold"
			>
				Book a call, {priceFor(lang === "pt" ? "AO" : "INTL", "human_review")}
			</button>
		</section>
	);
}
