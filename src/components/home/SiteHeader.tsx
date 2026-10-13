import { RedlineLogo } from "#/components/RedlineLogo";
import { type Language, useLanguage } from "#/lib/i18n";

const LANGUAGES: Language[] = ["pt", "en"];

function LanguageToggle() {
	const { lang, setLang, copy } = useLanguage();

	return (
		<fieldset className="flex items-center rounded-md border border-border-strong bg-surface p-0.5">
			<legend className="sr-only">{copy.header.languageLabel}</legend>
			{LANGUAGES.map((language) => (
				<button
					key={language}
					type="button"
					onClick={() => setLang(language)}
					aria-pressed={lang === language}
					className={`rounded-sm px-2 py-0.5 font-mono text-[11px] font-medium uppercase transition-colors ${
						lang === language
							? "bg-surface-2 text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]"
							: "text-muted hover:text-ink"
					}`}
				>
					{language}
				</button>
			))}
		</fieldset>
	);
}

export function SiteHeader() {
	const { copy } = useLanguage();
	const links = [
		{ href: "#how-it-works", label: copy.header.howItWorks },
		{ href: "#example", label: copy.header.example },
		{ href: "#pricing", label: copy.header.pricing },
	];

	return (
		<header className="sticky top-0 z-40 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
			<div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
				<div className="flex items-center gap-10">
					<RedlineLogo />
					<nav className="hidden items-center gap-7 md:flex">
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-[13px] text-muted transition-colors hover:text-ink"
							>
								{link.label}
							</a>
						))}
					</nav>
				</div>
				<div className="flex items-center gap-3">
					<LanguageToggle />
					<a
						href="#review"
						className="btn-primary px-3 py-1.5 text-[13px] font-medium"
					>
						{copy.header.cta}
					</a>
				</div>
			</div>
		</header>
	);
}
