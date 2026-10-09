import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import type { SwotItem } from "#/lib/analysis-schema";
import {
	AlertTriangleIcon,
	LightbulbIcon,
	TrendingDownIcon,
	TrendingUpIcon,
} from "#/lib/icons";

type SwotVariant = "strengths" | "weaknesses" | "opportunities" | "threats";

type SwotCardProps = {
	variant: SwotVariant;
	items: SwotItem[];
};

const variantConfig: Record<
	SwotVariant,
	{
		title: string;
		descriptor: string;
		letter: string;
		icon: LucideIcon;
		headerClass: string;
		textClass: string;
		dotClass: string;
	}
> = {
	strengths: {
		title: "Strengths",
		descriptor: "What already works for this goal. Keep it.",
		letter: "S",
		icon: TrendingUpIcon,
		headerClass: "bg-strength-tint border-strength-border",
		textClass: "text-strength",
		dotClass: "bg-strength",
	},
	weaknesses: {
		title: "Weaknesses",
		descriptor: "What's missing or holding you back.",
		letter: "W",
		icon: TrendingDownIcon,
		headerClass: "bg-weakness-tint border-weakness-border",
		textClass: "text-weakness",
		dotClass: "bg-weakness",
	},
	opportunities: {
		title: "Opportunities",
		descriptor: "Openings you can use with what you already have.",
		letter: "O",
		icon: LightbulbIcon,
		headerClass: "bg-opportunity-tint border-opportunity-border",
		textClass: "text-opportunity",
		dotClass: "bg-opportunity",
	},
	threats: {
		title: "Threats",
		descriptor:
			"What competing candidates or recruiters might hold against you.",
		letter: "T",
		icon: AlertTriangleIcon,
		headerClass: "bg-threat-tint border-threat-border",
		textClass: "text-threat",
		dotClass: "bg-threat",
	},
};

export function SwotCard({ variant, items }: SwotCardProps) {
	const config = variantConfig[variant];
	const Icon = config.icon;

	return (
		<section className="overflow-hidden rounded-lg border border-border bg-surface shadow-card">
			<div
				className={`relative overflow-hidden border-b px-5 py-4 sm:px-6 ${config.headerClass}`}
			>
				<span
					className={`pointer-events-none absolute -top-4 right-3 select-none font-display text-8xl font-semibold leading-none opacity-15 ${config.textClass}`}
					aria-hidden
				>
					{config.letter}
				</span>
				<div className="relative flex items-center gap-2">
					<Icon className={`size-5 ${config.textClass}`} aria-hidden />
					<h2
						className={`font-display text-xl font-semibold ${config.textClass}`}
					>
						{config.title}
					</h2>
				</div>
				<p className="relative mt-1 pr-10 text-sm leading-relaxed text-ink/80">
					{config.descriptor}
				</p>
			</div>
			<ul className="space-y-4 px-5 py-5 sm:px-6">
				{items.map((item, index) => (
					<li
						key={item.title}
						className="animate-rise flex gap-3"
						style={{ "--i": index } as CSSProperties}
					>
						<span
							className={`mt-2 size-1.5 shrink-0 rounded-full ${config.dotClass}`}
							aria-hidden
						/>
						<div className="min-w-0">
							<p className="text-[15px] font-semibold text-ink">{item.title}</p>
							<p className="mt-1 text-sm leading-relaxed text-muted">
								{item.detail}
							</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
