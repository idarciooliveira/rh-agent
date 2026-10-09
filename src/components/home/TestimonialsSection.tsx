import { useLanguage } from "#/lib/i18n";
import { QuoteIcon } from "#/lib/icons";
import { TESTIMONIALS, type Testimonial } from "#/lib/testimonials";

function getInitials(name: string): string {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

/** Styled like a LinkedIn recommendation card. */
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
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
		<li className="reveal flex flex-col rounded-lg bg-surface p-5 shadow-card">
			<div className="flex gap-3">
				<div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#6c8ea8] text-sm font-semibold text-white">
					{getInitials(testimonial.name)}
				</div>
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
				<p className="mt-4 rounded-sm bg-strength-tint px-3 py-2 text-sm font-semibold text-strength">
					{testimonial.result}
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
		<section
			id="testimonials"
			className="border-y border-border bg-surface-2/60"
		>
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
				<div className="reveal mb-12 max-w-2xl">
					<p className="mb-4 font-mono text-xs font-medium tracking-[0.14em] text-primary-ink uppercase">
						{copy.testimonials.eyebrow}
					</p>
					<h2 className="font-display text-4xl leading-[1.05] font-semibold text-balance text-ink sm:text-5xl">
						{copy.testimonials.title}
					</h2>
				</div>
				<ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
					{testimonials.map((testimonial) => (
						<TestimonialCard
							key={`${testimonial.name}-${testimonial.date}`}
							testimonial={testimonial}
						/>
					))}
				</ul>
			</div>
		</section>
	);
}
