import { defaultLocale, locales, locale as localeStore } from "$lib/translations";
import type { Handle } from "@sveltejs/kit";

const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/);

export const handle: Handle = async ({ event, resolve }) => {
	const { url, request } = event;
	const { pathname } = url;

	if (routeRegex.test(pathname)) {
		const supportedLocales = locales.get();

		let locale = supportedLocales.find(
			(l) => `${l}`.toLowerCase() === `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase()
		);

		if (!locale) {
			locale = `${`${request.headers.get("accept-language")}`.match(
				/[a-zA-Z]+?(?=-|_|,|;)/
			)}`.toLowerCase();

			if (!supportedLocales.includes(locale)) locale = defaultLocale;

			localeStore.set(locale);

			return new Response(undefined, {
				headers: { location: `/${locale}${pathname}` },
				status: 301
			});
		}

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale}">`)
		});
	}

	return resolve(event);
};
