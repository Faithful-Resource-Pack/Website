import type { UseSeoMetaInput } from "@unhead/vue";

// must be middleware to run on every route change properly
export default defineNuxtRouteMiddleware((route) => {
	const title = computed(
		() =>
			// overridden name, use that
			route.meta?.name ||
			// take route name and convert it to title case
			toTitleCase(route.name),
	);

	const description =
		"Providing a higher-resolution Minecraft experience since 2010. Available in 32x and 64x for Java and Bedrock.";
	const image =
		"https://database.faithfulpack.net/images/branding/social_media/banners/universal_banner.png";

	// useRequestURL breaks on production for some reason
	const headers = useRequestHeaders();
	const protocol = headers["x-forwarded-proto"] || "http";
	const url = useRequestURL();

	const metaTags: UseSeoMetaInput = {
		ogUrl: () => (headers.host ? `${protocol}://${headers.host}${route.fullPath}` : url.toString()),
	};

	// add generic meta tags if the page hasn't been specified its own
	if (route.meta.disableDefaultMeta !== true)
		Object.assign(metaTags, generateMetaTags({ title, description, image }));

	useSeoMeta(metaTags);
});
