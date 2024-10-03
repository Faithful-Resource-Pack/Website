import { Router } from "express";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { BASE_JEKYLL_PATH } from "./util.js";

const COFFEE_PAGE = join(BASE_JEKYLL_PATH, "coffee.html");

const router = Router({ mergeParams: true });

router.get(["/coffee", "/teapot"], async (req, res) => {
	let data = await readFile(COFFEE_PAGE, "utf8");

	const titleEl = data.match(/<title>(.+)<\/title>/);
	if (titleEl) {
		const titleStr = titleEl[1];
		const titleSplit = titleStr.split(" - ");
		titleSplit[0] = req.path.includes("teapot") ? "Teapot" : "Coffee";
		data = data.replace(/<title>.+<\/title>/, `<title>${titleSplit.join(" - ")}</title>`);
	}

	res.status(418).send(data);
	res.end();
});

export default router;
