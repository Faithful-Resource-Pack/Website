import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from "@sveltejs/adapter-node";
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: [".svelte", ...mdsvexConfig.extensions],

	kit: {
		adapter: adapter(),
        alias: {
            $components: path.resolve('./src/components')
        }
	},

	preprocess: [
		mdsvex(mdsvexConfig),
		preprocess({
			scss: {
				prependData: '@use "src/css/variables.scss" as *;'
			},

			postcss: true
		})
	]
};

export default config;
