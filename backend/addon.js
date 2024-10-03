import { Router } from "express";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { BASE_JEKYLL_PATH, NOT_FOUND_PAGE, replaceTemplateToken } from "./util.js";

const ADDON_PAGE = join(BASE_JEKYLL_PATH, "addon.html");
const ADDON_REPLACE_FIELDS = ["url", "name", "description", "authors", "header_img"];

const router = Router({ mergeParams: true });

router.get("/addons/:name/?", async (req, res) => {
	const addon = await fetch(`https://api.faithfulpack.net/v2/addons/${req.params.name}/all`)
		.then((r) => r.json())
		// invalid slug, not our problem, move on
		.catch(() => res.sendFile(NOT_FOUND_PAGE));

	if (!addon || !addon.approval || addon.approval.status !== "approved")
		return res.sendFile(NOT_FOUND_PAGE);

	const users = await fetch(
		`https://api.faithfulpack.net/v2/users/${addon.authors.join(",")}`,
	).then((r) => r.json());

	const authors = Array.isArray(users) ? users : [users];
	const headerURL =
		addon.files.find((el) => el.use === "header")?.source || "/image/home/og_logo.png";

	const authorArray = authors.map((user) => user.username).filter((e) => e);

	const dataReplaced = ADDON_REPLACE_FIELDS.reduce((acc, token) => {
		acc[token] = addon[token];
		return acc;
	}, {});

	dataReplaced.authors = authorArray.join(", ");
	dataReplaced.url = `${req.originalUrl}`;

	// load addon post page
	let data = await readFile(ADDON_PAGE, { encoding: "utf8" });

	// replace header if existing
	if (headerURL) dataReplaced.header_img = headerURL;

	// replace all header values
	ADDON_REPLACE_FIELDS.forEach((token) => {
		data = data.replaceAll(replaceTemplateToken(token), dataReplaced[token]);
	});

	// replace script value
	//! please use Node v15+ for support of replaceAll
	data = data
		.replaceAll("'" + replaceTemplateToken("data.addon") + "'", JSON.stringify(addon))
		.replaceAll("'" + replaceTemplateToken("data.authors") + "'", JSON.stringify(authors))
		.replaceAll("'" + replaceTemplateToken("data.slug") + "'", JSON.stringify(req.params.name))
		.replaceAll("'" + replaceTemplateToken("data.files") + "'", JSON.stringify(addon.files));

	res.send(data);
	res.end();
});

export default router;