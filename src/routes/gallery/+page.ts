import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = (pageLoad) => {
	// https://kit.svelte.dev/docs/load#using-url-data
	const params = pageLoad.url.searchParams;

	const PARAMS_DEFAULT = [
		{ id: "pack", default: "faithful_32x" },
		{ id: "edition", default: "java" },
		{ id: "version", default: "latest" },
		{ id: "tag", default: "all" },
	];

	const changed = PARAMS_DEFAULT.some((def) => {
		const val = params.get(def.id);
		params.set(def.id, val || def.default);
		// if already present doesn't need refresh
		return !val;
	});

	console.log(changed);

	// hash not accessible
	const absoluteURL = pageLoad.url.pathname + pageLoad.url.search;

	if (changed)
		// Temporary Redirect
		throw redirect(307, absoluteURL);

	return {
		title: "Gallery",
		pack: params.get("pack"),
		edition: params.get("edition"),
		version: params.get("version"),
		tag: params.get("tag"),
		show: params.get("show"),
	};
};
