import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";

// pack page stuff
interface Pack {
	title: string;
	permalink: string;
	banner: string;
	wordmark: string;
	text: string;
	buttons?: { href: string; text: string }[];
	downloads?: Record<string, Record<string, string>>;
}

const basePath = join(process.cwd(), "packs");

const paths = await readdir(basePath).then((res) => res.filter((path) => path.endsWith(".yaml")));
const files = await Promise.all(
	paths.map((path) => readFile(join(basePath, path), { encoding: "utf8" })),
);
const parsed: Pack[] = files.map((content) => parse(content));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
	css: [
		"~/assets/css/lib/buttons.scss",
		"~/assets/css/main.scss",
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
	// extend pages with generated pack page routes at build time
	hooks: {
		"pages:extend"(pages) {
			pages.push(
				...parsed.map((pack) => ({
					path: pack.permalink,
					file: "~/layouts/pack-page.vue",
					props: pack,
				})),
			);
		},
	},
});
