import { RhaiLogo } from "#/components/RhaiLogo";
import { type Language, useLanguage } from "#/lib/i18n";

const LANGUAGES: Language[] = ["pt", "en"];

function LanguageToggle() {
	const { lang, setLang, copy } = useLanguage();

	return (
		<fieldset className="flex items-center rounded-full bg-surface-2 p-0.5">
			<legend className="sr-only">{copy.header.languageLabel}</legend>
			{LANGUAGES.map((language) => (
				<button
					key={language}
					type="button"
					onClick={() => setLang(language)}
					aria-pressed={lang === language}
					className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${
						lang === language
							? "bg-surface text-ink shadow-card"
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
		{ href: "#faq", label: copy.header.faq },
	];

	return (
		<header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-lg">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
				<RhaiLogo />
				<nav className="hidden items-center gap-7 md:flex">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="text-sm font-medium text-muted transition-colors hover:text-ink"
						>
							{link.label}
						</a>
					))}
				</nav>
				<div className="flex items-center gap-2 sm:gap-3">
					<LanguageToggle />
					<a
						href="#review"
						className="btn-primary hidden px-4 py-2 text-sm font-semibold sm:inline-flex"
					>
						{copy.header.cta}
					</a>
				</div>
			</div>
		</header>
	);
}
