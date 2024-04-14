import type { Load } from "@sveltejs/kit";
import type { DownloadJSON } from "$interfaces/downloads";
import path from "path";

async function getCurseFiles(fetch: any) {
	// https://github.com/Faithful-Resource-Pack/Website/blob/master/js/download/index.js
	const CURSE_API = "https://api.cfwidget.com/";
	const CURSE_PACK_TO_ID = {
		c32: 436482,
		c32b: 507188,
		c64: 419139,
	};
	const CURSE_URLS = Object.values(CURSE_PACK_TO_ID).map((id) => `${CURSE_API}${id}`);
	const allResults = await Promise.allSettled(CURSE_URLS.map((u) => fetch(u)));
	const failedResults = allResults
		.filter((r) => r.status === "rejected")
		.map((_, i) => CURSE_URLS[i]);
	if (failedResults.length) console.error("Failed to fetch provided URLs: ", failedResults);
	const curseResults = allResults
		.map((r) => (r.status === "fulfilled" ? r.value : undefined))
		.filter((r) => r !== undefined) as Response[];
	const curseJSONs = await Promise.all(curseResults.map((r) => r.json()));
	return curseJSONs.map((r) => r.files).flat();
}

export const load: Load = async ({ fetch }) => {
	const curseFiles = await getCurseFiles(fetch);

	const FILE_ORDER = [
		"f32.json",
		"f32b.json",
		"f64.json",
		"f64b.json",
		"f32d.json",
		"cf32j.json",
		"cf32jb.json",
	];

	// * Load JSON dynamically
	// https://stackoverflow.com/a/70057440/6594899
	const data = import.meta.glob("/static/json/(cf|f)*.json");
	const jsonMap: Record<string, DownloadJSON> = {};
	for (const [filepath, mod] of Object.entries(data)) {
		// async on array.reduce sucks
		const module: any = await mod();
		jsonMap[path.basename(filepath)] = module.default;
	}

	// retransform into files ordered list with the power of keys
	// ! to respect indexes used below in the final output
	const jsons = FILE_ORDER.map((filename) => jsonMap[filename]).map((json) => {
		Object.keys(json).forEach((version) => {
			const releases = json[version];
			releases.forEach((release) => {
				const curse_link = release.links.curse;
				if (!curse_link) return;

				const curse_id = curse_link.split("/").pop();
				const found_curse_file = curseFiles.filter((f) => String(f.id) === String(curse_id))[0];
				if (!found_curse_file) return;

				release.date = found_curse_file.uploaded_at
					.split("T")
					.shift()
					.split("-")
					.reverse()
					.join("/");
				release.size = String(found_curse_file.filesize);
			});
		});
		return json;
	});

	return {
		title: "Downloads",
		packs: [
			{
				name: "Faithful 32x",
				editions: [
					{
						name: "Java Edition",
						downloads: jsons[0],
					},
					{
						name: "Bedrock Edition",
						downloads: jsons[1],
					},
					{
						name: "Minecraft: Dungeons",
						downloads: jsons[4],
					},
				],
			},
			{
				name: "Faithful 64x",
				editions: [
					{
						name: "Java Edition",
						downloads: jsons[2],
					},
					{
						name: "Bedrock Edition",
						downloads: jsons[3],
					},
				],
			},
			{
				name: "Classic Faithful 32x Jappa",
				editions: [
					{
						name: "Java Edition",
						downloads: jsons[5],
					},
					{
						name: "Bedrock Edition",
						downloads: jsons[6],
					},
				],
			},
			{
				name: "Classic Faithful 32x Programmer Art",
				editions: [
					{
						name: "Java Edition",
						downloads: {},
					},
					{
						name: "Bedrock Edition",
						downloads: {},
					},
				],
			},
			{
				name: "Classic Faithful 64x",
				editions: [
					{
						name: "Java Edition",
						downloads: {},
					},
					{
						name: "Bedrock Edition",
						downloads: {},
					},
				],
			},
		],
	};
};
