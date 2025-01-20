import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { parse } from "yaml";

// pack page route generation is done at build time using the pages:extend hook here
export interface Pack {
	title: string;
	permalink: string;
	banner: string;
	wordmark: string;
	description: string;
	buttons?: { to: string; text: string }[];
	downloads?: Record<string, Record<string, string>>;
}

export default async function generatePackData(): Promise<Pack[]> {
	const basePath = join(process.cwd(), "packs");

	const paths = await readdir(basePath).then((res) => res.filter((path) => path.endsWith(".yaml")));
	const files = await Promise.all(
		paths.map((path) => readFile(join(basePath, path), { encoding: "utf8" })),
	);
	return files.map((content) => parse(content));
}
