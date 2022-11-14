import preprocess from "svelte-preprocess";
import { mdsvex } from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    "extensions": [".svelte", ...mdsvexConfig.extensions],

    kit: {
		adapter: adapter()
	},

    preprocess: [mdsvex(mdsvexConfig), preprocess({
        scss: {
            "prependData": "@use \"src/variables.scss\" as *;"
        },

        postcss: true
    })]
};

export default config;
