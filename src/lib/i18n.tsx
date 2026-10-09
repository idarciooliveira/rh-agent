import { createContext, useContext, useEffect, useState } from "react";
import { type HomeCopy, homeCopy } from "#/lib/home-copy";

export type Language = "pt" | "en";

const STORAGE_KEY = "redline-lang";
const DEFAULT_LANGUAGE: Language = "pt";

type LanguageContextValue = {
	lang: Language;
	setLang: (next: Language) => void;
	copy: HomeCopy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * Portuguese-first landing copy with an English fallback. SSR and first client
 * render always use the default; a stored preference is applied after mount,
 * so hydration never mismatches.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

	useEffect(() => {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === "en" || stored === "pt") {
			setLangState(stored);
		}
	}, []);

	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	const setLang = (next: Language) => {
		setLangState(next);
		window.localStorage.setItem(STORAGE_KEY, next);
	};

	return (
		<LanguageContext.Provider value={{ lang, setLang, copy: homeCopy[lang] }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage(): LanguageContextValue {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used inside LanguageProvider");
	}
	return context;
}
