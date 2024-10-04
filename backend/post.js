import { Router } from "express";
import cors from "cors";
import matter from "gray-matter";

import { readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";

import walkSync from "./walkSync.js";
import { BASE_JEKYLL_PATH, replaceTemplateToken } from "./util.js";

const router = Router({ mergeParams: true });

const POST_IMPORT_PATH = join(process.cwd(), "posts");
const POST_EXPORT_FILE = join(process.cwd(), "posts.json");

const POST_PAGE = join(BASE_JEKYLL_PATH, "post.html");
const POST_REPLACE_FIELDS = ["permalink", "title", "description", "header_img"];

const corsOptions = {
	origin: "*",
	methods: [],
	allowedHeaders: [],
	exposedHeaders: [],
	credentials: true,
};

let postCache;

export function generatePostJSON() {
	// use raw promise for better error handling in reduce callback
	return new Promise((resolve, reject) => {
		const paths = walkSync(POST_IMPORT_PATH).filter(
			(d) => d.endsWith(".md") && !d.endsWith("README.md"),
		);
		const result = paths.reduce((acc, cur) => {
			const filename = basename(cur);
			let obj;
			try {
				obj = matter.read(cur).data;
			} catch (err) {
				reject(err);
			}

			// clean up jekyll holdovers
			delete obj.layout;
			const headerImg = obj["header-img"];
			obj.header_img = headerImg;
			delete obj["header-img"];

			// take date from filename
			const [y, m, d] = filename.split("-");
			obj.date = [y, m, d].join("-");
			const key = obj.permalink;
			if (key in acc) reject(new Error(`Duplicate post key ${key}`));
			acc[key] = obj;
			return acc;
		}, {});

		postCache = result;

		writeFile(POST_EXPORT_FILE, JSON.stringify(result)).then(() => resolve(result));
	});
}

// JSON.parse really hates backslashes for some reason so we have to double escape it
const cleanPostData = (post) => JSON.stringify(post).replaceAll("\\", "\\\\");

async function getPostJSON() {
	// use cached version if exists
	if (postCache) return postCache;

	// then try reading file
	const file = await readFile(POST_EXPORT_FILE, { encoding: "utf8" }).catch(() => null);
	if (file) return JSON.parse(file);

	// then generate a new copy if it doesn't exist
	const json = await generatePostJSON();
	return json;
}

router.get("/posts.json", cors(corsOptions), async (_, res) => {
	const posts = await getPostJSON();
	if (!posts) return res.status(400).send({ message: "Could not load posts!" }).end();
	return res.send(JSON.stringify(posts)).end();
});

// force new generation on startup (prevents new routes not being added)
const posts = await generatePostJSON();

// match all post routes
router.get(Object.keys(posts), async (req, res) => {
	// we know the url points to a valid post now
	const post = posts[req.url];

	let data = await readFile(POST_PAGE, { encoding: "utf8" });
	POST_REPLACE_FIELDS.forEach((token) => {
		// need to replace br elements with newlines to prevent embeds looking weird
		data = data.replaceAll(replaceTemplateToken(token), post[token].replaceAll("<br>", "\n"));
	});
	// send stringified contents
	data = data.replaceAll("%postData%", cleanPostData(post));
	res.send(data);
	res.end();
});

export default router;
