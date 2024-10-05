import "dotenv/config.js";

import express from "express";

import addonBackend from "./addon.js";
import postBackend from "./post.js";
import coffeeBackend from "./coffee.js";
import { BASE_JEKYLL_PATH, NOT_FOUND_PAGE } from "./util.js";

const app = express().disable("x-powered-by");
app.use(
	express.static(BASE_JEKYLL_PATH, {
		extensions: ["html", "htm"],
	}),
);

// server rendered dynamic routes (preserves SEO and embed support)
app.use("/", addonBackend);
app.use("/", postBackend);
app.use("/", coffeeBackend);

app.get("/gallery*", (req, res) => {
	// redirect everything after the slash (so ?show urls still work)
	res.redirect(`https://webapp.faithfulpack.net${req.originalUrl}`);
});

app.use((_req, res) => res.status(404).sendFile(NOT_FOUND_PAGE));

app.listen(process.env.PORT, () => {
	console.log(`Website listening at http://localhost:${process.env.PORT}`);
});
