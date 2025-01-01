import { Router } from "express";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

import {
	BASE_JEKYLL_PATH,
	embedDescription,
	NOT_FOUND_PAGE,
	replaceTemplateToken,
	listify,
} from "./util.js";

const ADDON_PAGE = join(BASE_JEKYLL_PATH, "addon.html");
const ADDON_REPLACE_FIELDS = ["url", "name", "authors", "header_img"];

const router = Router({ mergeParams: true });

async function loadAddonPage(addon) {
	const replacedData = ADDON_REPLACE_FIELDS.reduce((acc, token) => {
		acc[token] = addon[token];
		return acc;
	}, {});

	const users = await fetch(
		`https://api.faithfulpack.net/v2/users/${addon.authors.join(",")}`,
	).then((r) => r.json());

	// single author returns object, multiple returns array of objects
	const authors = Array.isArray(users) ? users : [users];

	// only include authors with usernames
	replacedData.authors =
		listify(authors.map((user) => user.username).filter((username) => username)) || "Anonymous";

	const headerURL =
		addon.files.find((el) => el.use === "header")?.source ||
		"https://database.faithfulpack.net/images/website/posts/placeholder.jpg";

	// replace header if existing
	if (headerURL) replacedData.header_img = headerURL;

	// load addon post page
	let data = await readFile(ADDON_PAGE, { encoding: "utf8" });

	// replace all header values
	ADDON_REPLACE_FIELDS.forEach((token) => {
		data = data.replaceAll(replaceTemplateToken(token), replacedData[token]);
	});

	data = data.replaceAll("%description%", embedDescription(addon.description));

	// replace script value
	//! please use Node v15+ for support of replaceAll
	data = data
		.replaceAll("'" + replaceTemplateToken("data.addon") + "'", JSON.stringify(addon))
		.replaceAll("'" + replaceTemplateToken("data.authors") + "'", JSON.stringify(authors))
		.replaceAll("'" + replaceTemplateToken("data.slug") + "'", JSON.stringify(addon.slug))
		.replaceAll("'" + replaceTemplateToken("data.files") + "'", JSON.stringify(addon.files));

	return data;
}

router.get("/addons/:name/?", async (req, res) => {
	const addon = await fetch(`https://api.faithfulpack.net/v2/addons/${req.params.name}/all`)
		.then((r) => r.json())
		// invalid slug, not our problem, move on
		.catch(() => res.sendFile(NOT_FOUND_PAGE));

	if (!addon || !addon.approval || addon.approval.status !== "approved")
		return res.sendFile(NOT_FOUND_PAGE);

	addon.url = req.originalUrl;
	const data = await loadAddonPage(addon);
	res.send(data).end();
});

export default router;
