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
			<span className="flex size-8 items-center justify-center rounded-sm bg-primary">
				<PenLineIcon className="size-4 text-white" aria-hidden />
			</span>
			<span>
				Red<span className="text-primary">line</span>
			</span>
		</Link>
	);
}
