import { defaultLocale, locales, locale as localeStore } from "$lib/translations";
import type { Handle } from "@sveltejs/kit";

const routeRegex = new RegExp(/^\/[^.]*([?#].*)?$/);

export const handle: Handle = async ({ event, resolve }) => {
	const { url, request } = event;
	const { pathname } = url;

	// no error on favicon.ico not found
	if (pathname === '/favicon.ico') {
		return new Response(undefined, {
			headers: { location: 'https://raw.githubusercontent.com/Faithful-Resource-Pack/Branding/main/site/favicon.ico' },
			status: 307
		});
	}

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
