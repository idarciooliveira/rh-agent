import { Link } from "@tanstack/react-router";
import { PenLineIcon } from "#/lib/icons";

type RedlineLogoProps = {
	className?: string;
};

export function RedlineLogo({ className = "" }: RedlineLogoProps) {
	return (
		<Link
			to="/"
			className={`inline-flex items-center gap-2 font-display text-xl font-semibold text-ink ${className}`}
			aria-label="Redline home"
		>
			<span className="flex size-8 items-center justify-center rounded-sm border-[1.5px] border-ink bg-primary shadow-[2px_2px_0_var(--color-ink)]">
				<PenLineIcon className="size-4 text-ink" aria-hidden />
			</span>
			<span>
				Red<span className="text-primary-ink">line</span>
			</span>
		</Link>
	);
}
