import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "#/lib/icons";

type RedlineRevealProps = {
	currentHeadline: string;
	newHeadline: string;
};

const REVEAL_DURATION_MS = 900;
const REVEAL_DELAY_MS = 300;
const COPIED_RESET_MS = 2000;

/**
 * The headline as a red-pen edit: the old line struck through, the new one
 * wiped in from the left. Free for everyone, so the copy button lives here too.
 */
export function RedlineReveal({
	currentHeadline,
	newHeadline,
}: RedlineRevealProps) {
	const newHeadlineRef = useRef<HTMLParagraphElement>(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const element = newHeadlineRef.current;
		if (!element || typeof element.animate !== "function") {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		// Web Animations API instead of a new keyframe block: the wipe is a
		// one-off, and the shared stylesheet has no clip-path keyframe to reuse.
		const animation = element.animate(
			[{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }],
			{
				duration: REVEAL_DURATION_MS,
				delay: REVEAL_DELAY_MS,
				easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
				fill: "backwards",
			},
		);

		return () => {
			animation.cancel();
		};
	}, []);

	useEffect(() => {
		if (!copied) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setCopied(false);
		}, COPIED_RESET_MS);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [copied]);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(newHeadline);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	};

	return (
		<section className="mb-8 rounded-lg border border-border bg-surface p-6 shadow-card sm:p-8">
			<p className="font-mono text-xs font-medium tracking-[0.14em] text-pen uppercase">
				Your headline, marked up
			</p>
			<p className="mt-4 text-base leading-relaxed break-words text-muted line-through decoration-pen decoration-2">
				{currentHeadline}
			</p>
			<p
				ref={newHeadlineRef}
				className="mt-3 font-display text-2xl leading-snug font-bold break-words text-primary sm:text-3xl"
			>
				{newHeadline}
			</p>
			<div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm text-muted">
					Copy it now. It's yours either way.
				</p>
				<button
					type="button"
					onClick={() => void handleCopy()}
					className="btn-secondary inline-flex shrink-0 items-center justify-center gap-2 px-4 py-2 text-sm font-semibold"
				>
					{copied ? (
						<CheckIcon className="size-4" aria-hidden />
					) : (
						<CopyIcon className="size-4" aria-hidden />
					)}
					<span aria-live="polite">{copied ? "Copied" : "Copy headline"}</span>
				</button>
			</div>
		</section>
	);
}
