import type { LucideIcon, LucideProps } from "lucide-react";
import { createElement } from "react";

export function safeIcon(Icon: LucideIcon): LucideIcon {
	const Wrapped = (props: LucideProps) =>
		createElement(Icon, { suppressHydrationWarning: true, ...props });

	Wrapped.displayName = Icon.displayName ?? Icon.name;

	return Wrapped as LucideIcon;
}
