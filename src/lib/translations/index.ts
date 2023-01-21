import i18n from "sveltekit-i18n";
import type { Config } from "sveltekit-i18n";

import en from "./en";
import fr from "./fr";
import lang from "$locales/lang.json";
import { mergeDeep } from "$lib/utils";

const config: Config = {
	fallbackLocale: 'en',
	translations: {
		// start with empty object not to compy inside en "reference"
		en: mergeDeep({}, en, lang),
		fr: mergeDeep({}, en, fr, lang),
	}
};

export const defaultLocale = "en";
export const supportedLocales = Object.keys(lang);

export const { t, locale, locales, loading, loadTranslations, translations } = new i18n(config);

// Translations logs
loading.subscribe(async ($loading) => {
	if ($loading) {
		console.log("Loading translations...");

		await loading.toPromise();
		console.log("Updated translations", translations.get());
	}
});
