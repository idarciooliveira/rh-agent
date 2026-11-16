import { Link } from "@tanstack/react-router";

const MARK_PATHS = [
	"M128 128h128v128H128zM256 128h128v256H256zM128 256h64v128h-64z",
	"M256 128v128h128v-128H256zm-128 0v128h64v-64h64v-64h-128z",
];

const WORDMARK_PATH =
	"M218.5 153.7L178.4 153.7L178.4 240L136 240L136 16L237.1 16Q257.7 16 272.4 24.5Q287.2 33 295.2 48.6Q303.2 64.1 303.2 85.3L303.2 85.3Q303.2 108.1 292.8 125Q282.4 141.8 261.5 148.9L261.5 148.9L307.4 240L260.2 240L218.5 153.7M178.4 52.9L178.4 118.1L233 118.1Q241.3 118.1 247.1 115Q252.9 112 256.1 106.3Q259.3 100.7 259.3 92.7L259.3 92.7L259.3 77.9Q259.3 69.6 256.1 64.1Q252.9 58.7 247.1 55.8Q241.3 52.9 233 52.9L233 52.9L178.4 52.9M527.2 240L484.9 240L484.9 145.3L391.5 145.3L391.5 240L349.1 240L349.1 16L391.5 16L391.5 108.1L484.9 108.1L484.9 16L527.2 16L527.2 240M688 16L762.5 240L718.5 240L700.5 182.9L621 182.9L603.3 240L560.3 240L635.4 16L688 16M631.2 146.6L690.3 146.6L672 90.1L661.4 54.5L659.8 54.5L649.2 90.1L631.2 146.6M888 206L888 240L786.2 240L786.2 206L815.7 206L815.7 50L786.2 50L786.2 16L888 16L888 50L858.1 50L858.1 206L888 206";

/** The RHAI mark on its own, for favicons-in-UI and small badges. */
export function RhaiMark({ className = "size-8" }: { className?: string }) {
	return (
		<span
			className={`flex shrink-0 items-center justify-center rounded-[22%] bg-primary ${className}`}
		>
			<svg
				viewBox="128 128 256 256"
				className="size-1/2 text-white"
				fill="currentColor"
				aria-hidden
				suppressHydrationWarning
			>
				<title>RHAI</title>
				{MARK_PATHS.map((d) => (
					<path key={d} d={d} />
				))}
			</svg>
		</span>
	);
}

type RhaiLogoProps = {
	className?: string;
	/** "dark" for light backgrounds, "light" for dark ones. */
	tone?: "dark" | "light";
};

export function RhaiLogo({ className = "", tone = "dark" }: RhaiLogoProps) {
	return (
		<Link
			to="/"
			className={`inline-flex items-center gap-2.5 ${className}`}
			aria-label="RHAI home"
		>
			<RhaiMark className="size-8" />
			<svg
				viewBox="136 16 752 224"
				className={`h-[15px] w-auto ${tone === "light" ? "text-white" : "text-primary"}`}
				fill="currentColor"
				aria-hidden
				suppressHydrationWarning
			>
				<title>RHAI</title>
				<path d={WORDMARK_PATH} />
			</svg>
		</Link>
	);
}
