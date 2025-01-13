import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";

// pack page stuff
interface Pack {
	title: string;
	permalink: string;
	banner: string;
	wordmark: string;
	description: string;
	buttons?: { to: string; text: string }[];
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
			/**
			 * okay so this is probably the stupidest workaround on the planet
			 * nuxt has a weird bug where manually added pages don't generate metadata
			 * and completely breaks the layout (I have no idea why)
			 * so instead we copy the metadata/hidden fields of the generated pack page
			 * then duplicate it for each pack url
			 * then finally remove the template pack page once done
			 * also for some reason you have to edit `pages` as a reference in-place
			 * which is why I'm splicing and pushing stuff instead of just filtering it
			 */
			const packPageI = pages.findIndex((el) => el.name === "pack-page");
			const packPage = pages[packPageI];
			pages.splice(packPageI, 1);
			pages.push(
				...parsed.map((pack) => ({
					...packPage,
					name: pack.title,
					props: pack,
					path: pack.permalink,
				})),
			);
		},
	},
});
