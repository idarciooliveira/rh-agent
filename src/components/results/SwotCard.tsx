import {
	AlertTriangle,
	Lightbulb,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import type { SwotItem } from "#/lib/analysis-schema";

type SwotVariant = "strengths" | "weaknesses" | "opportunities" | "threats";

type SwotCardProps = {
	variant: SwotVariant;
	items: SwotItem[];
};

const variantConfig: Record<
	SwotVariant,
	{
		title: string;
		icon: typeof TrendingUp;
		borderColor: string;
		titleColor: string;
		iconColor: string;
	}
> = {
	strengths: {
		title: "Strengths",
		icon: TrendingUp,
		borderColor: "border-t-green-500",
		titleColor: "text-green-600",
		iconColor: "text-green-500",
	},
	weaknesses: {
		title: "Weaknesses",
		icon: TrendingDown,
		borderColor: "border-t-red-500",
		titleColor: "text-red-600",
		iconColor: "text-red-500",
	},
	opportunities: {
		title: "Opportunities",
		icon: Lightbulb,
		borderColor: "border-t-blue-500",
		titleColor: "text-blue-600",
		iconColor: "text-blue-500",
	},
	threats: {
		title: "Threats",
		icon: AlertTriangle,
		borderColor: "border-t-orange-500",
		titleColor: "text-orange-600",
		iconColor: "text-orange-500",
	},
};

export function SwotCard({ variant, items }: SwotCardProps) {
	const config = variantConfig[variant];
	const Icon = config.icon;

	return (
		<div
			className={`rounded-2xl border border-border border-t-4 ${config.borderColor} bg-card p-6 shadow-sm`}
		>
			<div className="mb-5 flex items-center gap-2">
				<Icon className={`size-5 ${config.iconColor}`} aria-hidden />
				<h2 className={`text-lg font-bold ${config.titleColor}`}>
					{config.title}
				</h2>
			</div>
			<ul className="space-y-5">
				{items.map((item) => (
					<li key={item.title}>
						<p className="text-sm font-semibold text-text">{item.title}</p>
						<p className="mt-1 text-sm leading-relaxed text-text-muted">
							{item.detail}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
}
