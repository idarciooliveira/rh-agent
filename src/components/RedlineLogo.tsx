import { Link } from "@tanstack/react-router";

type RedlineLogoProps = {
	className?: string;
};

/** Serif wordmark with the red editing rule under the "line". */
export function RedlineLogo({ className = "" }: RedlineLogoProps) {
	return (
		<Link
			to="/"
			className={`inline-flex items-baseline gap-2 font-display text-[1.6rem] leading-none text-ink ${className}`}
			aria-label="Redline home"
		>
			<span className="relative">
				Red
				<span className="relative italic">
					line
					<span
						className="absolute -bottom-1 -right-0.5 left-0 h-[2px] bg-pen"
						aria-hidden
					/>
				</span>
			</span>
		</Link>
	);
}
