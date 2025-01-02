// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
	css: [
		"~/assets/css/main.scss",
		"~/assets/css/lib/buttons.scss",
		// REMOVE THIS ONCE THEMES WORK
		"~/assets/css/light.scss",
	],
	components: [
		{
			path: "~/components",
			pathPrefix: false,
		},
	],
	router: {
		// fix nuxt complaining about the gallery redirect
		options: {
			strict: false,
		},
	},
});
