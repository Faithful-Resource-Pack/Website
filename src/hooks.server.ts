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

	/*if (routeRegex.test(pathname)) {
		const supportedLocales = locales.get();

		let locale = '';
		//* URL FIRST
		let urlLanguage = `${pathname.match(/[^/]+?(?=\/|$)/)}`.toLowerCase()
		let urlLocale = supportedLocales.find(
			(l) => `${l}`.toLowerCase() === urlLanguage
		);
		if(urlLocale) locale = urlLocale;

		//* STORE THEN
		if(!locale) {
			let storedLocale = localeStore.get();
			let correctStoreLocale = supportedLocales.includes(storedLocale);
			if(correctStoreLocale) locale = storedLocale;
		}

		//* REDIRECT IF NOT IN URL
		// or no correct locale to enforce URL
		if (!urlLocale || !locale) {

			//* ACCEPT LANGUAGE
			if(!locale) {
				const acceptLanguage = request.headers.get("accept-language")
				const correctLanguage = acceptLanguage && supportedLocales.includes(acceptLanguage)
	
				if(correctLanguage) locale = acceptLanguage;
				else locale = defaultLocale;
			}
	
			// add locale to URL
			return new Response(undefined, {
				headers: { location: `/${locale}${pathname}` },
				status: 307
			});
		}

		// I sure do have a locale
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace(/<html.*>/, `<html lang="${locale}">`)
		});
	}*/

	return resolve(event);
};
