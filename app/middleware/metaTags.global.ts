import type { UseSeoMetaInput } from "@unhead/vue";

// must be middleware to run on every route change properly
export default defineNuxtRouteMiddleware((route) => {
	const title = computed(
		() =>
			// overridden name, use that
			route.meta.name ||
			// take route name and convert it to title case
			toTitleCase(route.name),
	);

	const description = "Providing a higher-resolution Minecraft experience since 2010.";
	const image =
		"https://database.faithfulpack.net/images/branding/social_media/banners/universal_banner.png";

	// get full site url from env
	const url = `${useRuntimeConfig().public.siteURL}${route.fullPath}`;

	const metaTags: UseSeoMetaInput = {
		ogUrl: () => url,
	};

	// add generic meta tags if the page hasn't been specified its own
	if (route.meta.disableDefaultMeta !== true)
		Object.assign(metaTags, generateMetaTags({ title, description, image }));

	useSeoMeta(metaTags);
});
