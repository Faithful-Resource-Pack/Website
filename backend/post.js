import { Router } from "express";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { BASE_JEKYLL_PATH, embedDescription, replaceTemplateToken } from "./util.js";

const router = Router({ mergeParams: true });

const POST_PAGE = join(BASE_JEKYLL_PATH, "post.html");
const POST_REPLACE_FIELDS = ["permalink", "title"];

// JSON.parse really hates backslashes for some reason so we have to double escape it
const cleanPostData = (post) => JSON.stringify(post).replaceAll("\\", "\\\\");

async function loadPostPage(post) {
	let data = await readFile(POST_PAGE, { encoding: "utf8" });
	POST_REPLACE_FIELDS.forEach((token) => {
		data = data.replaceAll(replaceTemplateToken(token), post[token]);
	});
	if (post.description)
		data = data.replaceAll("%description%", embedDescription(post.description));
	data = data
		.replaceAll(
			"%header_img%",
			post.header_img ||
				"https://database.faithfulpack.net/images/branding/backgrounds/main_background.png",
		)
		.replaceAll("%postData%", cleanPostData(post));
	return data;
}

// match all routes
router.use("*", async (req, res, next) => {
	// permalinks don't match a trailing slash
	const slug = req.originalUrl.endsWith("/") ? req.originalUrl.slice(0, -1) : req.originalUrl;
	const posts = await fetch(`https://api.faithfulpack.net/v2/posts/approved`)
		.then((res) => res.json())
		.catch(() => next());
	const post = posts.find(({ permalink }) => slug === permalink);
	// invalid slug, move on
	if (!post) return next();
	const data = await loadPostPage(post);
	res.send(data).end();
});

router.get("/:project/latest", async (req, res, next) => {
	const project = req.params.project;
	const posts = await fetch("https://api.faithfulpack.net/v2/posts/approved").then((res) =>
		res.json(),
	);
	const candidates = posts.filter(({ permalink }) => permalink.startsWith(`/${project}`));
	if (!candidates.length) return next();
	// get most recent post
	const post = candidates.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
	const data = await loadPostPage(post);
	res.send(data).end();
});

export default router;
