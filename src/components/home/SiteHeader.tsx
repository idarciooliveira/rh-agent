import { RedlineLogo } from "#/components/RedlineLogo";
import { type Language, useLanguage } from "#/lib/i18n";

const LANGUAGES: Language[] = ["pt", "en"];

function LanguageToggle() {
	const { lang, setLang, copy } = useLanguage();

	return (
		<fieldset className="flex items-center rounded-full border border-border bg-surface p-0.5">
			<legend className="sr-only">{copy.header.languageLabel}</legend>
			{LANGUAGES.map((language) => (
				<button
					key={language}
					type="button"
					onClick={() => setLang(language)}
					aria-pressed={lang === language}
					className={`rounded-full px-2.5 py-1 font-mono text-xs font-semibold uppercase transition-colors ${
						lang === language
							? "bg-primary text-primary-foreground"
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

	return (
		<header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
				<RedlineLogo />
				<nav className="flex items-center gap-2 sm:gap-6">
					<a
						href="#how-it-works"
						className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline"
					>
						{copy.header.howItWorks}
					</a>
					<a
						href="#example"
						className="hidden text-sm font-medium text-muted transition-colors hover:text-ink sm:inline"
					>
						{copy.header.example}
					</a>
					<LanguageToggle />
					<a
						href="#review"
						className="btn-primary rounded-md px-3.5 py-2 text-sm font-semibold sm:px-4"
					>
						{copy.header.cta}
					</a>
				</nav>
			</div>
		</header>
	);
}
