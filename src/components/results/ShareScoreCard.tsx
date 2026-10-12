import { useEffect, useState } from "react";
import { DownloadIcon, Share2Icon } from "#/lib/icons";

type ShareScoreCardProps = {
	score: number;
	previousScore: number | null;
	firstName: string | null;
};

function shareText(score: number, previousScore: number | null): string {
	const progress =
		previousScore !== null && previousScore < score
			? `went from ${previousScore} to ${score}`
			: `scored ${score}/100`;
	return `My LinkedIn profile ${progress} on Redline. Check yours in 30 seconds:`;
}

/** Draws the card on a canvas so people can post it as an image. */
function downloadCard(
	score: number,
	previousScore: number | null,
	firstName: string | null,
) {
	const canvas = document.createElement("canvas");
	canvas.width = 1200;
	canvas.height = 630;
	const ctx = canvas.getContext("2d");
	if (!ctx) {
		return;
	}

	ctx.fillStyle = "#1b1f23";
	ctx.fillRect(0, 0, 1200, 630);
	ctx.fillStyle = "#0a66c2";
	ctx.fillRect(0, 0, 18, 630);

	ctx.fillStyle = "#b0b7bf";
	ctx.font = "600 34px system-ui, sans-serif";
	ctx.fillText(
		firstName ? `${firstName}'s LinkedIn score` : "LinkedIn profile score",
		90,
		140,
	);

	ctx.fillStyle = "#ffffff";
	ctx.font = "700 220px system-ui, sans-serif";
	ctx.fillText(String(score), 80, 380);
	const scoreWidth = ctx.measureText(String(score)).width;
	ctx.fillStyle = "#b0b7bf";
	ctx.font = "500 64px system-ui, sans-serif";
	ctx.fillText("/100", 100 + scoreWidth, 380);

	if (previousScore !== null && previousScore !== score) {
		const delta = score - previousScore;
		ctx.fillStyle = delta > 0 ? "#5fd08f" : "#f09a80";
		ctx.font = "600 44px system-ui, sans-serif";
		ctx.fillText(
			`${previousScore} → ${score}  (${delta > 0 ? "+" : ""}${delta})`,
			90,
			470,
		);
	}

	ctx.fillStyle = "#ffffff";
	ctx.font = "700 48px system-ui, sans-serif";
	ctx.fillText("Red", 90, 570);
	const redWidth = ctx.measureText("Red").width;
	ctx.fillStyle = "#4c9be8";
	ctx.fillText("line", 90 + redWidth, 570);

	const link = document.createElement("a");
	link.download = "redline-score.png";
	link.href = canvas.toDataURL("image/png");
	link.click();
}

export function ShareScoreCard({
	score,
	previousScore,
	firstName,
}: ShareScoreCardProps) {
	const rounded = Math.round(score);
	const text = shareText(rounded, previousScore);
	// Set after mount so server and client render the same links.
	const [origin, setOrigin] = useState("");
	useEffect(() => setOrigin(window.location.origin), []);
	const [copied, setCopied] = useState(false);
	const message = `${text} ${origin}`;
	const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
	// share-offsite only accepts a URL, so it would share the landing page and
	// drop the score. The post composer takes the text, and we copy it too in
	// case LinkedIn opens the composer empty.
	const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(message)}`;
	const copyMessage = () => {
		navigator.clipboard
			?.writeText(message)
			.then(() => setCopied(true))
			.catch(() => undefined);
	};

	return (
		<section className="rounded-lg border border-border bg-surface p-5 shadow-card sm:p-6">
			<div className="flex items-center gap-2">
				<Share2Icon className="size-5 text-primary-ink" aria-hidden />
				<h2 className="font-display text-xl font-semibold text-ink">
					Share your score
				</h2>
			</div>
			<div className="mt-4 rounded-lg bg-night p-5 text-background">
				<p className="text-sm text-night-muted">
					{firstName ? `${firstName}'s LinkedIn score` : "LinkedIn score"}
				</p>
				<p className="mt-1 font-mono text-5xl font-medium">
					{rounded}
					<span className="text-xl text-night-muted">/100</span>
				</p>
				{previousScore !== null && previousScore !== rounded ? (
					<p className="mt-1 font-mono text-sm text-accent">
						{previousScore} → {rounded}
					</p>
				) : null}
				<p className="mt-3 font-display text-lg font-semibold">
					Red<span className="text-[#4c9be8]">line</span>
				</p>
			</div>
			<div className="mt-4 flex flex-wrap gap-2">
				<a
					href={whatsappUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
				>
					WhatsApp
				</a>
				<a
					href={linkedinUrl}
					target="_blank"
					rel="noopener noreferrer"
					onClick={copyMessage}
					className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
				>
					LinkedIn
				</a>
				<button
					type="button"
					onClick={() => downloadCard(rounded, previousScore, firstName)}
					className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold"
				>
					<DownloadIcon className="size-4" aria-hidden />
					Image
				</button>
			</div>
			{copied ? (
				<output className="mt-3 block text-sm text-muted">
					Post text copied. Paste it if LinkedIn opens an empty post.
				</output>
			) : null}
		</section>
	);
}
