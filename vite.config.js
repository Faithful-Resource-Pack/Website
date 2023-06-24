import { sveltekit } from "@sveltejs/kit/vite";
import lightningcss from 'vite-plugin-lightningcss';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		lightningcss({
			// Everything that has a marketshare of over 0.25%, updated dynamically
			browserslist: '>= 0.25%'
		})
	],

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
