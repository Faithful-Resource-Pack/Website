import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte"],

	kit: {
		adapter: adapter(),
		alias: {
			$components: path.resolve("./src/components"),
			$stores: path.resolve("./src/stores"),
			$locales: path.resolve("./src/locales")
		}
	},

	preprocess: [
		preprocess({
			scss: {
				prependData: '@use "src/css/variables.scss" as *;'
			},

			postcss: true
		})
	]
};

export default config;
