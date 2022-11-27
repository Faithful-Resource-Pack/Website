import { sveltekit } from "@sveltejs/kit/vite";
import { imagetools } from 'vite-imagetools';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), imagetools()],

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
