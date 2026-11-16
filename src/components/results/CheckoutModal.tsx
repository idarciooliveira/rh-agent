import { useRouter } from "@tanstack/react-router";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { readApiError } from "#/lib/api-client";
import { useLanguage } from "#/lib/i18n";
import {
	CheckCircle2Icon,
	CheckIcon,
	CreditCardIcon,
	LockIcon,
	ShieldCheckIcon,
	XIcon,
} from "#/lib/icons";
import { planCopy } from "#/lib/plan-copy";
import {
	formatPrice,
	PAYMENT_METHOD_LABELS,
	type PaymentMethod,
	PHONE_METHODS,
	PLANS,
	type Plan,
	priceFor,
	REGION_CONFIG,
	REGIONS,
	type Region,
} from "#/lib/pricing";
import { defaultRegion, readStoredRegion } from "#/lib/use-region";

type CheckoutModalProps = {
	analysisId: string;
	initialPlan: Plan;
	onClose: () => void;
};

type CheckoutResult = {
	reference: string;
	amount: number;
};

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CheckoutModal({
	analysisId,
	initialPlan,
	onClose,
}: CheckoutModalProps) {
	const router = useRouter();
	const { lang } = useLanguage();
	const titleId = useId();
	const [plan, setPlan] = useState<Plan>(initialPlan);
	// The modal only mounts after a click, so reading storage here is safe.
	const [initialRegion] = useState<Region>(
		() => readStoredRegion() ?? defaultRegion(lang),
	);
	const [region, setRegion] = useState<Region>(initialRegion);
	const [method, setMethod] = useState<PaymentMethod>(
		REGION_CONFIG[initialRegion].methods[0],
	);
	const dialogRef = useRef<HTMLDivElement>(null);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [pending, setPending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<CheckoutResult | null>(null);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape" && !pending) {
				onClose();
			}
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose, pending]);

	useEffect(() => {
		const dialog = dialogRef.current;
		const opener = document.activeElement;
		const focusables = () =>
			Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);

		focusables()[0]?.focus();

		const trapTab = (event: KeyboardEvent) => {
			if (event.key !== "Tab") {
				return;
			}
			const items = focusables();
			const first = items[0];
			const last = items[items.length - 1];
			if (!first || !last) {
				return;
			}
			const active = document.activeElement;
			if (!dialog?.contains(active)) {
				event.preventDefault();
				first.focus();
			} else if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};

		window.addEventListener("keydown", trapTab);
		return () => {
			window.removeEventListener("keydown", trapTab);
			if (opener instanceof HTMLElement && opener.isConnected) {
				opener.focus();
			}
		};
	}, []);

	const regionConfig = REGION_CONFIG[region];
	const total = regionConfig.prices[plan];
	const needsPhone = PHONE_METHODS.includes(method);

	const changeRegion = (next: Region) => {
		setRegion(next);
		setMethod(REGION_CONFIG[next].methods[0]);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setPending(true);
		setError(null);

		try {
			const response = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					analysisId,
					plan,
					region,
					method,
					email,
					phone: needsPhone ? phone : undefined,
				}),
			});

			if (!response.ok) {
				throw new Error(
					await readApiError(response, "Payment failed. You were not charged."),
				);
			}

			setResult((await response.json()) as CheckoutResult);
		} catch (checkoutError) {
			setError(
				checkoutError instanceof Error
					? checkoutError.message
					: "Payment failed. You were not charged.",
			);
		} finally {
			setPending(false);
		}
	};

	const finish = async () => {
		await router.invalidate();
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-end bg-black/60 sm:items-start sm:justify-center sm:overflow-y-auto sm:p-8">
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
				className="relative max-h-[95vh] w-full overflow-y-auto rounded-t-xl bg-surface shadow-lift sm:my-4 sm:max-h-none sm:max-w-2xl sm:rounded-xl"
			>
				<div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
					<div>
						<h2 id={titleId} className="font-display text-2xl text-ink">
							{result ? "Payment confirmed" : "Unlock your full review"}
						</h2>
						<p className="mt-0.5 text-sm text-muted">
							Two plans. One-off payment, no subscription, no account.
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						disabled={pending}
						className="-mr-2 shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-black/5 hover:text-ink"
						aria-label="Close"
					>
						<XIcon className="size-5" aria-hidden />
					</button>
				</div>

				{result ? (
					<CheckoutSuccess
						result={result}
						region={region}
						method={method}
						email={email}
						onContinue={() => void finish()}
					/>
				) : (
					<form
						onSubmit={(event) => void handleSubmit(event)}
						className="space-y-6 p-5 sm:p-6"
					>
						<fieldset>
							<legend className="mb-2 text-sm font-semibold text-ink">
								Choose a plan
							</legend>
							<div className="grid gap-3 sm:grid-cols-2">
								{PLANS.map((option) => {
									const copy = planCopy.en[option];
									const selected = plan === option;
									return (
										<label
											key={option}
											className={`relative flex cursor-pointer flex-col rounded-xl border p-4 transition-colors ${
												selected
													? "border-primary bg-accent/50 shadow-[inset_0_0_0_1px_var(--color-primary)]"
													: "border-border hover:border-border-strong"
											}`}
										>
											<input
												type="radio"
												name="plan"
												value={option}
												checked={selected}
												onChange={() => setPlan(option)}
												className="sr-only"
											/>
											{copy.badge ? (
												<span className="absolute -top-2.5 right-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white uppercase">
													{copy.badge}
												</span>
											) : null}
											<span className="text-sm font-semibold text-ink">
												{copy.name}
											</span>
											<span className="mt-2 flex items-baseline gap-1.5">
												<span className="font-display text-3xl leading-none text-ink">
													{priceFor(region, option)}
												</span>
												<span className="text-xs text-muted">
													{copy.period}
												</span>
											</span>
											<span className="mt-1 text-xs leading-snug text-muted">
												{copy.tagline}
											</span>
										</label>
									);
								})}
							</div>
							<ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
								{planCopy.en[plan].features.map((feature) => (
									<li
										key={feature}
										className="flex items-start gap-2 text-sm text-ink"
									>
										<CheckIcon
											className="mt-0.5 size-4 shrink-0 text-strength"
											aria-hidden
										/>
										{feature}
									</li>
								))}
							</ul>
						</fieldset>

						<div className="grid gap-4 sm:grid-cols-2">
							<label className="block">
								<span className="mb-1.5 block text-sm font-semibold text-ink">
									Country
								</span>
								<select
									value={region}
									onChange={(event) =>
										changeRegion(event.target.value as Region)
									}
									className="w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 text-sm text-ink"
								>
									{REGIONS.map((option) => (
										<option key={option} value={option}>
											{REGION_CONFIG[option].label} (
											{REGION_CONFIG[option].currency})
										</option>
									))}
								</select>
							</label>
							<label className="block">
								<span className="mb-1.5 block text-sm font-semibold text-ink">
									Email for your receipt
								</span>
								<input
									type="email"
									required
									value={email}
									onChange={(event) => setEmail(event.target.value)}
									placeholder="you@example.com"
									className="w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 text-sm text-ink"
								/>
							</label>
						</div>

						<fieldset>
							<legend className="mb-2 text-sm font-semibold text-ink">
								Pay with
							</legend>
							<div className="flex flex-wrap gap-2">
								{regionConfig.methods.map((option) => (
									<label
										key={option}
										className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
											method === option
												? "border-primary bg-accent/50 text-primary-ink"
												: "border-border text-ink hover:border-border-strong"
										}`}
									>
										<input
											type="radio"
											name="method"
											value={option}
											checked={method === option}
											onChange={() => setMethod(option)}
											className="sr-only"
										/>
										<CreditCardIcon className="size-4" aria-hidden />
										{PAYMENT_METHOD_LABELS[option]}
									</label>
								))}
							</div>
							{needsPhone ? (
								<label className="mt-3 block">
									<span className="mb-1.5 block text-sm font-semibold text-ink">
										Phone number
									</span>
									<input
										type="tel"
										required
										inputMode="tel"
										value={phone}
										onChange={(event) => setPhone(event.target.value)}
										placeholder={
											region === "AO" ? "923 456 789" : "912 345 678"
										}
										className="w-full rounded-md border border-border-strong bg-surface px-3 py-2.5 text-sm text-ink sm:w-64"
									/>
									<span className="mt-1 block text-xs text-muted">
										You'll get a payment request on your phone to approve.
									</span>
								</label>
							) : null}
						</fieldset>

						{error ? (
							<p
								role="alert"
								className="rounded-md border border-threat-border bg-threat-tint px-3 py-2 text-sm text-threat"
							>
								{error}
							</p>
						) : null}

						<div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
							<p className="text-sm text-muted">
								Total{" "}
								<span className="ml-1 font-display text-3xl text-ink">
									{formatPrice(region, total)}
								</span>
							</p>
							<button
								type="submit"
								disabled={pending}
								className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold disabled:opacity-60"
							>
								<LockIcon className="size-4" aria-hidden />
								{pending
									? "Waiting for payment…"
									: `Pay ${formatPrice(region, total)}`}
							</button>
						</div>
						<p className="flex items-center gap-1.5 text-xs text-muted">
							<ShieldCheckIcon className="size-3.5" aria-hidden />
							Test mode: no real money moves.
						</p>
					</form>
				)}
			</div>
		</div>
	);
}

function CheckoutSuccess({
	result,
	region,
	method,
	email,
	onContinue,
}: {
	result: CheckoutResult;
	region: Region;
	method: PaymentMethod;
	email: string;
	onContinue: () => void;
}) {
	return (
		<div className="space-y-4 p-5 sm:p-6">
			<div className="flex items-start gap-3 rounded-lg border border-strength-border bg-strength-tint p-4">
				<CheckCircle2Icon
					className="mt-0.5 size-5 shrink-0 text-strength"
					aria-hidden
				/>
				<div className="text-sm text-ink">
					<p className="font-semibold">
						{formatPrice(region, result.amount)} paid with{" "}
						{PAYMENT_METHOD_LABELS[method]}.
					</p>
					<p className="mt-1 text-muted">
						Receipt sent to {email}. Reference{" "}
						<span className="font-mono text-ink">{result.reference}</span>
					</p>
				</div>
			</div>
			<button
				type="button"
				onClick={onContinue}
				className="btn-primary w-full px-6 py-3 text-sm font-semibold"
			>
				See my full review
			</button>
		</div>
	);
}
