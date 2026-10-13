import type { ReactNode } from "react";
import { LockIcon } from "#/lib/icons";

/** Placeholder text the server already swapped in, blurred so it reads as hidden. */
export function Blurred({ children }: { children: ReactNode }) {
	return (
		<span className="pointer-events-none select-none blur-[5px]" aria-hidden>
			{children}
		</span>
	);
}

export function LockedPill({ label = "Locked" }: { label?: string }) {
	return (
		<span className="inline-flex items-center gap-1 rounded-full bg-night px-2 py-0.5 text-xs font-semibold text-ink">
			<LockIcon className="size-3" aria-hidden />
			{label}
		</span>
	);
}

/** Blurs a block and floats an unlock button over it. */
export function LockedOverlay({
	children,
	label,
	onUnlock,
}: {
	children: ReactNode;
	label: string;
	onUnlock: () => void;
}) {
	return (
		<div className="relative">
			<div className="pointer-events-none select-none blur-[5px]" aria-hidden>
				{children}
			</div>
			<div className="absolute inset-0 flex items-center justify-center p-4">
				<button
					type="button"
					onClick={onUnlock}
					className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold shadow-lift"
				>
					<LockIcon className="size-4" aria-hidden />
					{label}
				</button>
			</div>
		</div>
	);
}
