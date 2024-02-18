import { error } from "@sveltejs/kit";

export const load = async function ({ fetch, params }): Promise<Post> {
	// Why do I need to encode things twice? No clue
	let permalink = encodeURIComponent(`/${params.pack}/${encodeURIComponent(params.slug)}`);

	if (!params.pack.includes("faithful") && !params.pack.includes("compliance"))
		throw error(404, "Not found");

	if (params.slug === "latest") {
		const postRes = await fetch("https://api.faithfulpack.net/v2/posts").catch((err) => {
			console.error("postData", err);
			throw err;
		});
		const postData: Post = await postRes.json();

		const latest = Object.values(postData)
			.reverse()
			.find((pack) => pack.permalink.startsWith(`/${params.pack}/`));
		if (latest) return latest;
	}

	const postRes = await fetch(
		`https://api.faithfulpack.net/v2/posts/bypermalink?permalink=${permalink}`,
	).catch((err) => {
		console.error("postData", err);
		throw err;
	});

	return postRes.json();
};
