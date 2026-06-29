import { ChevronDown, Monitor } from "lucide-react";
import { useState } from "react";

const STEPS = [
	"Go to your Profile on LinkedIn desktop",
	"Click More → Save to PDF",
	"Upload the downloaded file below",
] as const;

export function LinkedInExportGuide() {
	const [open, setOpen] = useState(true);

	return (
		<section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
			<button
				type="button"
				onClick={() => setOpen((value) => !value)}
				className="flex w-full items-center justify-between gap-4 text-left"
				aria-expanded={open}
			>
				<div>
					<h2 className="text-xl font-semibold text-white">
						How to export your LinkedIn profile
					</h2>
					<p className="mt-1 text-sm text-slate-400">
						Follow these steps on LinkedIn desktop, then upload the PDF here.
					</p>
				</div>
				<ChevronDown
					className={`size-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
					aria-hidden
				/>
			</button>

			{open ? (
				<div className="mt-6 space-y-4">
					<ol className="space-y-3">
						{STEPS.map((step, index) => (
							<li key={step} className="flex gap-3 text-slate-300">
								<span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sky-400/10 text-sm font-semibold text-sky-400">
									{index + 1}
								</span>
								<span className="pt-0.5 leading-relaxed">{step}</span>
							</li>
						))}
					</ol>

					<div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
						<Monitor
							className="mt-0.5 size-4 shrink-0 text-sky-400"
							aria-hidden
						/>
						<p className="text-sm leading-relaxed text-slate-400">
							LinkedIn only supports PDF export on desktop. Mobile and tablet
							browsers cannot generate the export file you need.
						</p>
					</div>
				</div>
			) : null}
		</section>
	);
}
