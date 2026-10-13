import { Link } from "@tanstack/react-router";

type RedlineLogoProps = {
	className?: string;
};

/** Square mark with a single red rule, plus the wordmark. */
export function RedlineLogo({ className = "" }: RedlineLogoProps) {
	return (
		<Link
			to="/"
			className={`inline-flex items-center gap-2.5 font-display text-[17px] font-semibold text-ink ${className}`}
			aria-label="Redline home"
		>
			<span className="relative flex size-7 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-gradient-to-b from-[#26272c] to-[#141518] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]">
				<span className="h-[2px] w-4 -rotate-12 rounded-full bg-pen shadow-[0_0_8px_rgb(255_91_79/0.8)]" />
			</span>
			Redline
		</Link>
	);
}
