import { useLanguage } from "#/lib/i18n";
import {
	BriefcaseIcon,
	CrosshairIcon,
	GaugeIcon,
	ListChecksIcon,
	PenLineIcon,
	PlusIcon,
	TagIcon,
	ZapIcon,
} from "#/lib/icons";

const SCORE = 58;

const SWOT = [
	{ letter: "S", count: 3, className: "bg-strength" },
	{ letter: "W", count: 4, className: "bg-weakness" },
	{ letter: "O", count: 3, className: "bg-opportunity" },
	{ letter: "T", count: 2, className: "bg-threat" },
];

function Tile({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="rounded-lg border border-border bg-surface p-3.5">
			<p className="text-[11px] text-muted">{label}</p>
			{children}
		</div>
	);
}

/** Product shot of the results view, drawn in HTML so it stays sharp and translatable. */
export function HeroAppPreview() {
	const { copy } = useLanguage();
	const nav = [
		{ icon: GaugeIcon, label: copy.preview.profileScore, active: true },
		{ icon: CrosshairIcon, label: copy.preview.goalAlignment },
		{ icon: ListChecksIcon, label: "SWOT" },
		{ icon: PenLineIcon, label: copy.preview.about },
		{ icon: BriefcaseIcon, label: copy.preview.experience },
		{ icon: TagIcon, label: copy.preview.skillsTitle },
	];

	return (
		<figure className="relative">
			<figcaption className="sr-only">{copy.preview.figcaption}</figcaption>
			<div
				className="frame-glow pointer-events-none absolute inset-x-[10%] -top-10 h-56"
				aria-hidden
			/>
			<div
				className="ring-gradient relative overflow-hidden rounded-xl bg-[#0b0c0e] shadow-lift"
				aria-hidden
			>
				<div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
					<div className="flex gap-1.5">
						<span className="size-2.5 rounded-full bg-[#2a2b2f]" />
						<span className="size-2.5 rounded-full bg-[#2a2b2f]" />
						<span className="size-2.5 rounded-full bg-[#2a2b2f]" />
					</div>
					<p className="mx-auto rounded-md border border-border bg-surface px-3 py-0.5 font-mono text-[11px] text-muted">
						redline.app/review/ana-domingos
					</p>
					<span className="rounded-sm border border-border-strong px-1.5 py-0.5 font-mono text-[10px] text-muted uppercase">
						{copy.preview.exampleBadge}
					</span>
				</div>

				<div className="grid text-left md:grid-cols-[200px_minmax(0,1fr)]">
					<aside className="hidden border-r border-border p-3 md:block">
						<div className="mb-4 flex items-center gap-2 px-2 pt-1">
							<img
								src="/avatars/ana-domingos.jpg"
								alt=""
								className="size-6 rounded-full object-cover"
							/>
							<div className="min-w-0">
								<p className="truncate text-xs font-medium text-ink">
									Ana Domingos
								</p>
								<p className="truncate text-[10px] text-muted">
									{copy.preview.location}
								</p>
							</div>
						</div>
						<ul className="space-y-0.5">
							{nav.map((item) => (
								<li
									key={item.label}
									className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs ${
										item.active
											? "bg-surface-2 text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]"
											: "text-muted"
									}`}
								>
									<item.icon className="size-3.5" />
									<span className="truncate">{item.label}</span>
								</li>
							))}
						</ul>
					</aside>

					<div className="space-y-3 p-4 sm:p-5">
						<div className="grid grid-cols-3 gap-3">
							<Tile label={copy.preview.profileScore}>
								<p className="mt-1 font-mono text-2xl text-ink">
									{SCORE}
									<span className="text-sm text-muted">/100</span>
								</p>
								<div className="mt-2 h-1 rounded-full bg-surface-2">
									<div
										className="h-full rounded-full bg-primary shadow-[0_0_10px_rgb(110_118_255/0.8)]"
										style={{ width: `${SCORE}%` }}
									/>
								</div>
							</Tile>
							<Tile label={copy.preview.goalAlignment}>
								<p className="mt-1 font-mono text-2xl text-ink">
									5<span className="text-sm text-muted">/10</span>
								</p>
								<div className="mt-2 flex gap-0.5">
									{Array.from({ length: 10 }, (_, index) => (
										<span
											// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length meter
											key={index}
											className={`h-1 flex-1 rounded-full ${index < 5 ? "bg-primary" : "bg-surface-2"}`}
										/>
									))}
								</div>
							</Tile>
							<Tile label="SWOT">
								<div className="mt-2 flex items-end gap-2">
									{SWOT.map((item) => (
										<div
											key={item.letter}
											className="flex flex-1 flex-col items-center gap-1"
										>
											<span
												className={`w-full rounded-sm opacity-80 ${item.className}`}
												style={{ height: `${item.count * 9}px` }}
											/>
											<span className="font-mono text-[10px] text-muted">
												{item.letter}
												{item.count}
											</span>
										</div>
									))}
								</div>
							</Tile>
						</div>

						<div className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
							<div className="overflow-hidden rounded-lg border border-border bg-surface">
								<div className="flex items-center justify-between border-b border-border px-3.5 py-2">
									<p className="text-xs font-medium text-ink">
										{copy.preview.headline}
									</p>
									<span className="rounded-sm bg-accent px-1.5 py-0.5 font-mono text-[10px] text-primary-ink">
										{copy.preview.editTag}
									</span>
								</div>
								<div className="font-mono text-[11.5px] leading-relaxed">
									<p className="flex gap-3 bg-threat-tint/70 px-3.5 py-1.5 text-threat">
										<span className="select-none text-threat/60">−</span>
										<span>{copy.preview.oldHeadline}</span>
									</p>
									<p className="flex gap-3 bg-strength-tint/70 px-3.5 py-1.5 text-strength">
										<span className="select-none text-strength/60">+</span>
										<span>{copy.preview.newHeadline}</span>
									</p>
								</div>
								<div className="border-t border-border px-3.5 py-3">
									<p className="mb-1 text-xs font-medium text-ink">
										{copy.preview.about}
									</p>
									<p className="text-xs leading-relaxed text-muted">
										{copy.preview.aboutPre}
										<span className="rounded-sm bg-strength-tint px-0.5 text-strength">
											{copy.preview.aboutHighlight}
										</span>
										{copy.preview.aboutPost}
									</p>
								</div>
							</div>

							<div className="space-y-3">
								<div className="rounded-lg border border-border bg-surface p-3.5">
									<p className="flex items-center gap-1.5 text-xs font-medium text-ink">
										<ZapIcon className="size-3.5 text-weakness" />
										{copy.preview.quickWinLabel}
									</p>
									<p className="mt-1.5 text-xs leading-relaxed text-muted">
										{copy.preview.quickWinBody}
									</p>
								</div>
								<div className="rounded-lg border border-border bg-surface p-3.5">
									<p className="text-xs font-medium text-ink">
										{copy.preview.skillsTitle}
									</p>
									<ul className="mt-2 flex flex-wrap gap-1.5">
										{copy.preview.skills.map((skill) => (
											<li
												key={skill}
												className="inline-flex items-center gap-1 rounded-sm border border-border-strong bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-ink"
											>
												<PlusIcon className="size-2.5 text-strength" />
												{skill}
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</figure>
	);
}
