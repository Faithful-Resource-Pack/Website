import { loadTranslations, locale } from "$lib/translations";
import type { LayoutLoad } from "./$types";

interface Internationalization {
	lang: string;
	subject: string;
}

export const load: LayoutLoad = async ({ url }) => {
	const { pathname } = url;

	/*const lang = `${pathname.match(/[^/]+?(?=\/|$)/) || ""}`;
	const route = pathname.replace(new RegExp(`^/${lang}`), "") ?? "";

	await loadTranslations(lang, route); // keep this just before the `return`

	const internationalization: Internationalization = {
		lang,
		subject: route
	};

	return {
		internationalization
	};*/
};
