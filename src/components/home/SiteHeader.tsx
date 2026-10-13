import { RedlineLogo } from "#/components/RedlineLogo";
import { type Language, useLanguage } from "#/lib/i18n";

const LANGUAGES: Language[] = ["pt", "en"];

function LanguageToggle() {
	const { lang, setLang, copy } = useLanguage();

	return (
		<fieldset className="flex items-center rounded-full bg-surface-2 p-1">
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
	];

	return (
		<header className="sticky top-0 z-40 border-b border-border/60 bg-surface/90 backdrop-blur-md">
			<div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
				<RedlineLogo />
				<nav className="hidden items-center gap-1 md:flex">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="rounded-full px-4 py-2 text-[15px] font-medium text-ink/80 transition-colors hover:bg-surface-2 hover:text-ink"
						>
							{link.label}
						</a>
					))}
				</nav>
				<div className="flex items-center gap-3">
					<LanguageToggle />
					<a
						href="#review"
						className="btn-primary px-4 py-2 text-sm font-semibold whitespace-nowrap sm:px-5 sm:py-2.5"
					>
						{copy.header.cta}
					</a>
				</div>
			</div>
		</header>
	);
}
