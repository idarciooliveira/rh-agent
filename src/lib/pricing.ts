import { z } from "zod";

export const REGIONS = ["AO", "BR", "PT", "INTL"] as const;
export type Region = (typeof REGIONS)[number];

export const PLANS = ["report", "pass30"] as const;
export type Plan = (typeof PLANS)[number];

export const PAYMENT_METHODS = [
	"multicaixa_express",
	"ekwanza",
	"reference",
	"pix",
	"mbway",
	"card",
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const regionSchema = z.enum(REGIONS);
export const planSchema = z.enum(PLANS);
export const paymentMethodSchema = z.enum(PAYMENT_METHODS);

type RegionConfig = {
	label: string;
	currency: string;
	locale: string;
	methods: PaymentMethod[];
	/** Whole currency units. Kwanza has no cents in practice. */
	prices: Record<Plan, number>;
};

/**
 * Two paid plans: one full review, or a 30-day pass. Angola is priced for an
 * impulse Multicaixa Express payment; the rest sit just under the
 * English-language competitors. The pass costs about two reviews, so anyone
 * planning a second review is better off with it.
 */
export const REGION_CONFIG: Record<Region, RegionConfig> = {
	AO: {
		label: "Angola",
		currency: "AOA",
		locale: "pt-AO",
		methods: ["multicaixa_express", "ekwanza", "reference"],
		prices: { report: 2900, pass30: 6900 },
	},
	BR: {
		label: "Brasil",
		currency: "BRL",
		locale: "pt-BR",
		methods: ["pix", "card"],
		prices: { report: 29, pass30: 59 },
	},
	PT: {
		label: "Portugal",
		currency: "EUR",
		locale: "pt-PT",
		methods: ["mbway", "card"],
		prices: { report: 9, pass30: 19 },
	},
	INTL: {
		label: "International",
		currency: "USD",
		locale: "en-US",
		methods: ["card"],
		prices: { report: 9, pass30: 19 },
	},
};

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
	multicaixa_express: "Multicaixa Express",
	ekwanza: "É-kwanza",
	reference: "Pagamento por referência",
	pix: "Pix",
	mbway: "MB WAY",
	card: "Card",
};

/** Methods that need the buyer's phone number to push the payment request. */
export const PHONE_METHODS: PaymentMethod[] = [
	"multicaixa_express",
	"ekwanza",
	"mbway",
];

export const PASS_DAYS = 30;

export function formatPrice(region: Region, amount: number): string {
	const { currency, locale } = REGION_CONFIG[region];
	if (currency === "AOA") {
		// de-DE groups thousands with dots, which is how Angola writes kwanza.
		return `${new Intl.NumberFormat("de-DE").format(amount)} Kz`;
	}
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function priceFor(region: Region, plan: Plan): string {
	return formatPrice(region, REGION_CONFIG[region].prices[plan]);
}

/** Free tier: what a locked review still shows. */
export const FREE_QUICK_WINS = 2;
export const FREE_ITEMS_PER_LOCKED_QUADRANT = 1;
