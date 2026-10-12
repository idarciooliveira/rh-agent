import { z } from "zod";

export const REGIONS = ["AO", "BR", "PT", "INTL"] as const;
export type Region = (typeof REGIONS)[number];

export const PLANS = ["report", "pack3", "pass30", "human_review"] as const;
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
 * Regional price points. Angola is priced for an impulse Multicaixa Express
 * payment; the rest sit just under the English-language competitors.
 */
export const REGION_CONFIG: Record<Region, RegionConfig> = {
	AO: {
		label: "Angola",
		currency: "AOA",
		locale: "pt-AO",
		methods: ["multicaixa_express", "ekwanza", "reference"],
		prices: { report: 2900, pack3: 6900, pass30: 9900, human_review: 19900 },
	},
	BR: {
		label: "Brasil",
		currency: "BRL",
		locale: "pt-BR",
		methods: ["pix", "card"],
		prices: { report: 29, pack3: 59, pass30: 79, human_review: 149 },
	},
	PT: {
		label: "Portugal",
		currency: "EUR",
		locale: "pt-PT",
		methods: ["mbway", "card"],
		prices: { report: 9, pack3: 19, pass30: 29, human_review: 49 },
	},
	INTL: {
		label: "International",
		currency: "USD",
		locale: "en-US",
		methods: ["card"],
		prices: { report: 9, pack3: 19, pass30: 29, human_review: 49 },
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
export const PACK_SIZE = 3;

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
