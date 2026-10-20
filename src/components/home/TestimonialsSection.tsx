import { useLanguage } from "#/lib/i18n";
import { QuoteIcon, StarIcon, TrendingUpIcon } from "#/lib/icons";
import { TESTIMONIALS, type Testimonial } from "#/lib/testimonials";

function getInitials(name: string): string {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

/** Styled like a LinkedIn recommendation card. */
function TestimonialCard({
	testimonial,
	ratingLabel,
}: {
	testimonial: Testimonial;
	ratingLabel: string;
}) {
	const nameNode = testimonial.linkedinUrl ? (
		<a
			href={testimonial.linkedinUrl}
			target="_blank"
			rel="noopener noreferrer"
			className="hover:text-primary hover:underline"
		>
			{testimonial.name}
		</a>
	) : (
		testimonial.name
	);

	return (
		<li className="reveal flex flex-col rounded-2xl bg-surface p-6 shadow-card">
			<div className="mb-4 flex gap-0.5" role="img" aria-label={ratingLabel}>
				{[1, 2, 3, 4, 5].map((star) => (
					<StarIcon
						key={star}
						className="size-4 fill-[#f5a623] text-[#f5a623]"
						aria-hidden
					/>
				))}
			</div>
			<div className="flex gap-3">
				{testimonial.avatar ? (
					<img
						src={testimonial.avatar}
						alt=""
						width={48}
						height={48}
						loading="lazy"
						className="size-12 shrink-0 rounded-full object-cover"
					/>
				) : (
					<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#6c8ea8] text-sm font-semibold text-white">
						{getInitials(testimonial.name)}
					</div>
				)}
				<div className="min-w-0">
					<p className="font-semibold text-ink">{nameNode}</p>
					<p className="text-sm leading-snug text-muted">{testimonial.role}</p>
					<p className="text-xs text-muted">{testimonial.date}</p>
				</div>
			</div>
			<blockquote className="relative mt-4 flex-1 text-[15px] leading-relaxed text-ink">
				<QuoteIcon
					className="absolute -top-1 -left-1 size-5 text-accent"
					aria-hidden
				/>
				<p className="pl-5">{testimonial.quote}</p>
			</blockquote>
			{testimonial.result ? (
				<p className="mt-5 flex items-start gap-2.5 border-t border-border pt-4 text-sm leading-snug font-medium text-ink">
					<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-strength-tint">
						<TrendingUpIcon className="size-3.5 text-strength" aria-hidden />
					</span>
					<span className="pt-0.5">{testimonial.result}</span>
				</p>
			) : null}
		</li>
	);
}

export function TestimonialsSection() {
	const { lang, copy } = useLanguage();
	const testimonials = TESTIMONIALS[lang];

	if (testimonials.length === 0) {
		return null;
	}

	return (
		<section id="testimonials">
			<div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
				<div className="reveal mb-14 max-w-2xl">
					<p className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted">
						<span className="size-1.5 rounded-full bg-primary" aria-hidden />
						{copy.testimonials.eyebrow}
					</p>
					<h2 className="font-display text-4xl leading-[1.06] font-normal text-balance text-ink sm:text-5xl">
						{copy.testimonials.title}
					</h2>
				</div>
				<ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{testimonials.map((testimonial) => (
						<TestimonialCard
							key={`${testimonial.name}-${testimonial.date}`}
							testimonial={testimonial}
							ratingLabel={copy.testimonials.ratingLabel}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}
