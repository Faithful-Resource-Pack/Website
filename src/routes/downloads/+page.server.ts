import type { Load } from "@sveltejs/kit";
import path from "path";

export const load: Load = async ({ fetch }) => {
	const FILES = [
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
	let json_map: Record<string, any> = {};
	for (const filepath in data) {
		const module = (await data[filepath]()) as any;
		json_map[path.basename(filepath)] = module.default;
	}

	// retransform into files ordered list with the power of keys
	// ! to respect indexes used below in the final output
	let jsons: any[] = FILES.map((filename) => json_map[filename]);

	// https://github.com/Faithful-Resource-Pack/Website/blob/master/js/download/index.js
	const CURSE_API = "https://api.cfwidget.com/";
	const CURSE_PACK_TO_ID = {
		c32: 436482,
		c32b: 507188,
		c64: 419139,
	};
	const CURSE_URLS = Object.values(CURSE_PACK_TO_ID).map((id) => `${CURSE_API}${id}`);
	const all_results = await Promise.allSettled(CURSE_URLS.map((u) => fetch(u)));
	const failed_results = all_results
		.filter((r) => r.status === "rejected")
		.map((_, i) => CURSE_URLS[i]);
	if (failed_results.length > 0) console.error("Failed to fetch privided URLs: ", failed_results);
	const curse_results = all_results
		.map((r) => (r.status === "fulfilled" ? r.value : undefined))
		.filter((r) => r !== undefined) as Response[];
	const curse_jsons = await Promise.all(curse_results.map((r) => r.json()));
	const curse_files = curse_jsons.map((r) => r.files).flat();

	jsons = jsons.map((json, i) => {
		Object.keys(json).forEach((version) => {
			const releases = json[version];
			releases.forEach((release: any) => {
				const curse_link = release.links.curse;
				if (curse_link) {
					const curse_id = curse_link.split("/").pop();
					const found_curse_file = curse_files.filter((f) => String(f.id) === String(curse_id))[0];
					if (found_curse_file) {
						release.date = found_curse_file.uploaded_at
							.split("T")
							.shift()
							.split("-")
							.reverse()
							.join("/");
						release.size = String(found_curse_file.filesize);
					}
				}
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
