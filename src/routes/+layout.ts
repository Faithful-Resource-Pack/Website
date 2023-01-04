import { loadTranslations, locale } from "$lib/translations";
import type { LayoutServerLoad } from "./$types";

interface Internationalization {
	lang: string;
	subject: string;
}

export const load: LayoutServerLoad = async ({ url }) => {
	const { pathname } = url;

	const lang = `${pathname.match(/[^/]+?(?=\/|$)/) || ""}`;
	const route = pathname.replace(new RegExp(`^/${lang}`), "") ?? "";

	await loadTranslations(lang, route); // keep this just before the `return`

	const internationalization: Internationalization = {
		lang,
		subject: route
	};

	return {
		internationalization
	};
};
