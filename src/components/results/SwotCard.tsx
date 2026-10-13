import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Blurred, LockedPill } from "#/components/results/Locked";
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
	/** Shows the first title only; the rest is server-redacted placeholder text. */
	locked?: boolean;
};

const variantConfig: Record<
	SwotVariant,
	{
		title: string;
		descriptor: string;
		letter: string;
		icon: LucideIcon;
		textClass: string;
		dotClass: string;
	}
> = {
	strengths: {
		title: "Strengths",
		descriptor: "What already works for this goal. Keep it.",
		letter: "S",
		icon: TrendingUpIcon,
		textClass: "text-strength",
		dotClass: "bg-strength",
	},
	weaknesses: {
		title: "Weaknesses",
		descriptor: "What's missing or holding you back.",
		letter: "W",
		icon: TrendingDownIcon,
		textClass: "text-weakness",
		dotClass: "bg-weakness",
	},
	opportunities: {
		title: "Opportunities",
		descriptor: "Openings you can use with what you already have.",
		letter: "O",
		icon: LightbulbIcon,
		textClass: "text-opportunity",
		dotClass: "bg-opportunity",
	},
	threats: {
		title: "Threats",
		descriptor:
			"What competing candidates or recruiters might hold against you.",
		letter: "T",
		icon: AlertTriangleIcon,
		textClass: "text-threat",
		dotClass: "bg-threat",
	},
};

export function SwotCard({ variant, items, locked = false }: SwotCardProps) {
	const config = variantConfig[variant];
	const Icon = config.icon;

	return (
		<section className="bg-surface p-6 sm:p-8">
			<div className="flex items-start gap-5 border-b border-border pb-5">
				<span
					className={`font-display text-6xl leading-[0.8] italic ${config.textClass}`}
					aria-hidden
				>
					{config.letter}
				</span>
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h2 className="kicker text-ink">
							{config.title}
							<span className="ml-2 text-muted">
								{String(items.length).padStart(2, "0")}
							</span>
						</h2>
						<Icon className={`size-3.5 ${config.textClass}`} aria-hidden />
						{locked ? <LockedPill /> : null}
					</div>
					<p className="mt-2 font-display text-lg leading-snug text-ink italic">
						{config.descriptor}
					</p>
				</div>
			</div>
			<ul className="space-y-5 pt-5">
				{items.map((item, index) => (
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: locked items share the same placeholder text
						key={`${index}-${item.title}`}
						className="animate-rise flex gap-3"
						style={{ "--i": index } as CSSProperties}
					>
						<span
							className={`mt-2 size-1.5 shrink-0 rounded-full ${config.dotClass}`}
							aria-hidden
						/>
						<div className="min-w-0">
							<p className="text-[15px] font-semibold text-ink">
								{locked && index > 0 ? (
									<Blurred>{item.title}</Blurred>
								) : (
									item.title
								)}
							</p>
							<p className="mt-1 text-sm leading-relaxed text-muted">
								{locked ? <Blurred>{item.detail}</Blurred> : item.detail}
							</p>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
