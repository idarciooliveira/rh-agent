import { useRouter } from "@tanstack/react-router";
import { useId, useState } from "react";
import { readApiError } from "#/lib/api-client";
import { LockIcon } from "#/lib/icons";

type UnlockFormProps = {
	analysisId: string;
	/** Button text, e.g. "Unlock my 7 rewrites". */
	submitLabel: string;
	className?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email capture that unlocks the rewrites for one analysis. On success it
 * reloads the route so the loader returns the full recommendations.
 */
export function UnlockForm({
	analysisId,
	submitLabel,
	className,
}: UnlockFormProps) {
	const router = useRouter();
	const inputId = useId();
	const [email, setEmail] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [pending, setPending] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const trimmed = email.trim();
		if (!EMAIL_PATTERN.test(trimmed)) {
			setError("Enter a valid email address, like ana@example.com.");
			return;
		}

		setPending(true);
		setError(null);
		try {
			const response = await fetch("/api/unlock", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ analysisId, email: trimmed }),
			});
			if (!response.ok) {
				setError(
					await readApiError(
						response,
						"We couldn't unlock the review. Try again in a few seconds.",
					),
				);
				return;
			}
			await router.invalidate();
		} catch {
			setError("We couldn't unlock the review. Try again in a few seconds.");
		} finally {
			setPending(false);
		}
	}

	return (
		<form onSubmit={handleSubmit} noValidate className={className}>
			<label htmlFor={inputId} className="text-sm font-semibold text-ink">
				Your email
			</label>
			<div className="mt-2 flex flex-col gap-2 sm:flex-row">
				<input
					id={inputId}
					type="email"
					inputMode="email"
					autoComplete="email"
					required
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					placeholder="ana@example.com"
					aria-invalid={error ? true : undefined}
					aria-describedby={error ? `${inputId}-error` : `${inputId}-help`}
					className="min-w-0 flex-1 rounded-md border border-border-strong bg-surface px-3 py-2.5 text-base text-ink placeholder:text-muted focus:border-primary"
				/>
				<button
					type="submit"
					disabled={pending}
					className="btn-primary inline-flex shrink-0 items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold disabled:opacity-60"
				>
					<LockIcon className="size-4" aria-hidden />
					{pending ? "Unlocking…" : submitLabel}
				</button>
			</div>
			{error ? (
				<p
					id={`${inputId}-error`}
					role="alert"
					className="mt-2 text-sm text-threat"
				>
					{error}
				</p>
			) : (
				<p id={`${inputId}-help`} className="mt-2 text-xs text-muted">
					We send the full report and a re-scan link. No password, no spam.
				</p>
			)}
		</form>
	);
}
