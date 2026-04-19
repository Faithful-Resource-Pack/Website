export const load = async function ({ fetch, params }): Promise<Post> {
	// Why do I need to encode things twice? No clue
	let permalink = encodeURIComponent(`/${params.pack}/${encodeURIComponent(params.slug)}`);

	if (params.slug === "latest") {
		const postRes = await fetch("https://api.faithfulpack.net/v2/posts/approved").catch((err) => {
			console.error("postData", err);
			throw err;
		});
		const postData: Post = await postRes.json();

		const latest = Object.values(postData)
			.sort((a, b) => +new Date(b.date) - +new Date(a.date))
			.find((pack) => pack.permalink.startsWith(`/${params.pack}/`));
		if (latest) return latest;
	}

	const postRes = await fetch(
		`https://api.faithfulpack.net/v2/posts/${encodeURIComponent(permalink)}`,
	).catch((err) => {
		console.error("postData", err);
		throw err;
	});

	return postRes.json();
};
