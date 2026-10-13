import { RedlineLogo } from "#/components/RedlineLogo";
import { type Language, useLanguage } from "#/lib/i18n";

const LANGUAGES: Language[] = ["pt", "en"];

function LanguageToggle() {
	const { lang, setLang, copy } = useLanguage();

	return (
		<fieldset className="flex items-center gap-2">
			<legend className="sr-only">{copy.header.languageLabel}</legend>
			{LANGUAGES.map((language, index) => (
				<span key={language} className="flex items-center gap-2">
					{index > 0 ? (
						<span className="text-border-strong" aria-hidden>
							/
						</span>
					) : null}
					<button
						type="button"
						onClick={() => setLang(language)}
						aria-pressed={lang === language}
						className={`font-mono text-xs font-medium uppercase transition-colors ${
							lang === language
								? "text-ink underline decoration-pen decoration-2 underline-offset-4"
								: "text-muted hover:text-ink"
						}`}
					>
						{language}
					</button>
				</span>
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
		<header className="sticky top-0 z-40 border-b border-ink/80 bg-background/95 backdrop-blur-sm">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
				<RedlineLogo />
				<nav className="flex items-center gap-3 sm:gap-8">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="hidden text-sm text-muted transition-colors hover:text-ink md:inline"
						>
							{link.label}
						</a>
					))}
					<LanguageToggle />
					<a
						href="#review"
						className="btn-primary px-4 py-2 text-sm font-medium"
					>
						{copy.header.cta}
					</a>
				</nav>
			</div>
		</header>
	);
}
