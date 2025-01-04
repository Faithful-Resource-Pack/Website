// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
	css: [
		"~/assets/css/main.scss",
		"~/assets/css/lib/buttons.scss",
		// load both at once and switch based on root-level class
		"~/assets/css/light.scss",
		"~/assets/css/dark.scss",
	],
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
});
