import { useEffect, useState } from "react";

import { type Language, useLanguage } from "#/lib/i18n";
import { REGIONS, type Region } from "#/lib/pricing";

const STORAGE_KEY = "redline:region";

/** Region picked on the landing pricing section, if the visitor picked one. */
export function readStoredRegion(): Region | null {
	try {
		const stored = window.sessionStorage.getItem(STORAGE_KEY);
		return REGIONS.find((region) => region === stored) ?? null;
	} catch {
		return null;
	}
}

export function defaultRegion(lang: Language): Region {
	return lang === "pt" ? "AO" : "INTL";
}

/**
 * Carries the visitor's region from the landing pricing section to the
 * results page, so the unlock banner and checkout show the same prices.
 * Reads storage after mount to keep server and client markup identical.
 */
export function useRegion(): [Region, (region: Region) => void] {
	const { lang } = useLanguage();
	const [stored, setStored] = useState<Region | null>(null);

	useEffect(() => setStored(readStoredRegion()), []);

	const setRegion = (region: Region) => {
		setStored(region);
		try {
			window.sessionStorage.setItem(STORAGE_KEY, region);
		} catch {
			// Private mode can block storage. The choice then only lasts for this page.
		}
	};

	return [stored ?? defaultRegion(lang), setRegion];
}
