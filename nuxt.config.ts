import generatePackPages from "./packs/generatePackPages.ts";

const parsed = await generatePackPages();

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	app: {
		head: {
			// all pages use these basic tags
			meta: [
				{ property: "og:type", content: "website" },
				{ property: "og:site_name", content: "Faithful Resource Pack" },
				{ name: "twitter:card", content: "summary_large_image" },
				{
					name: "keywords",
					content:
						"Minecraft, Java, Bedrock, Resource, Pack, Resource-Pack, Resourcepack, Compliance, Mods, Faithful, 32x, x32, 32x32, 64x, x64, 64x64, Classic Faithful, Classicfaithful, Emulated Vattic, Emulatedvattic",
				},
				{ name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#00552B" },
				{ name: "theme-color", media: "(prefers-color-scheme: light)", content: "#76C945" },
				{ name: "apple-mobile-web-app-capable", content: "no" },
				{ name: "apple-mobile-web-app-title", content: "Faithful" },
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
			noscript: [
				{
					innerHTML:
						'<p class="red banner ma-3">Please enable JavaScript for the site to work properly.</p>',
				},
			],
		},
	},
	modules: ["vuetify-nuxt-module"],
	css: [
		"~/assets/css/main.scss",
		// load all at once and switch based on root-level class
		"~/assets/css/light.scss",
		"~/assets/css/dark.scss",
		"~/assets/css/error.scss",
	],
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
	runtimeConfig: {
		public: {
			apiURL: process.env.API_URL,
			siteURL: process.env.SITE_URL,
		},
	},
	hooks: {
		"pages:extend"(pages) {
			/**
			 * okay so this is probably the stupidest workaround on the planet
			 * nuxt has a weird bug where manually added pages don't generate metadata
			 * and completely breaks the layout (I have no idea why)
			 * so instead we copy the metadata/hidden fields of the generated pack page
			 * then duplicate it for each pack url
			 * then finally remove the template pack page once done
			 * also for some reason you have to edit `pages` as a reference in-place
			 * which is why I'm splicing and pushing stuff instead of just filtering it
			 */
			const packPageI = pages.findIndex((el) => el.name === "pack-page");
			const packPage = pages[packPageI];
			pages.splice(packPageI, 1);
			pages.push(
				...parsed.map((pack) => ({
					...packPage,
					name: pack.title,
					props: pack,
					path: pack.permalink,
				})),
			);
		},
	},
});
