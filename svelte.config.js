import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-node";
import { preprocessMeltUI } from "@melt-ui/pp";
import sequence from "svelte-sequential-preprocessor";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte"],

	kit: {
		adapter: adapter(),
		alias: {
			$components: "src/components",
			$interfaces: "src/interfaces",
			$stores: "src/stores",
			$locales: "src/locales",
			$src: "src",
		},
	},

	preprocess: sequence([
		preprocess({
			scss: {
				prependData: '@use "src/css/variables.scss" as *;',
			},
		}),
		preprocessMeltUI(),
	]),
};

export default config;
