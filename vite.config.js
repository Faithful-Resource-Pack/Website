import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: sveltekit(),

	assetsInclude: ["**/*.png"],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/css/variables.scss" as *;'
			}
		}
	}
};

export default config;
