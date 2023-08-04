import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";
import path from 'path';
import { preprocessMeltUI } from '@melt-ui/pp'
import sequence from 'svelte-sequential-preprocessor'

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

	preprocess: sequence([
		preprocess({
			scss: {
				prependData: '@use "src/css/variables.scss" as *;'
			}
		}),
		preprocessMeltUI()
	])
};

export default config;
