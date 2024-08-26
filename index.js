const express = require("express");
const cors = require("cors");
const { readFile, writeFile } = require("fs").promises;
const matter = require("gray-matter");
const { readdirSync, statSync } = require("fs");
const { sep } = require("path");

require("dotenv").config();

const corsOptions = {
	origin: "*",
	methods: [],
	allowedHeaders: [],
	exposedHeaders: [],
	credentials: true,
};

const app = express();
app.disable("x-powered-by");

const NOT_FOUND_PAGE = __dirname + "/_site/404.html";

const ADDON_PAGE = __dirname + "/_site/addon.html";
const COFFEE_PAGE = __dirname + "/_site/coffee.html";
const ADDON_REPLACE_TOKEN = (token) => `%${token}%`;
const ADDON_FIELD_REPLACE = ["url", "name", "description", "authors", "header_img"];

app.get(["/coffee", "/teapot"], async (req, res) => {
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

const EXTRACTED_POSTS_PATH = `${__dirname}/posts.json`;
let postsMap = undefined;
let postsMapLoading = false;

function walkSync(dir, filelist = []) {
	// add trailing slash if not present
	if (!dir.endsWith(sep)) dir += sep;
	for (const file of readdirSync(dir)) {
		if (statSync(dir + file).isDirectory())
			// read directories inside directories recursively
			filelist = walkSync(dir + file + sep, filelist);
		else filelist.push(dir + file);
	}
	return filelist;
}

function generatePostJSON() {
	// use raw promise for better error handling in reduce callback
	return new Promise((resolve, reject) => {
		if (postsMapLoading) reject(new Error("Loading"));
		if (!!postsMap) resolve(postsMap);

		postsMapLoading = true;

		const dirPosts = `${__dirname}/_posts`;
		const paths = walkSync(dirPosts).filter(
			(d) => d.endsWith(".md") && !d.endsWith("README.md"),
		);
		const result = paths
			.sort((a, b) => {
				const aName = a.split("/").at(-1);
				const bName = b.split("/").at(-1);
				return aName.localeCompare(bName);
			})
			.reduce((acc, cur) => {
				const filename = cur.split("/").at(-1);
				let obj;
				try {
					obj = matter.read(cur).data;
				} catch (err) {
					reject(err);
				}
				// unneeded implementation detail
				delete obj.layout;
				const [y, m, d, ...name] = filename.split("-");
				obj.date = [y, m, d].join("-");
				const key = name.join("-").replace(".md", "");
				if (acc[key]) reject(new Error(`Duplicate post key ${key}`));
				acc[key] = obj;
				return acc;
			}, {});

		postsMap = result;
		postsMapLoading = false;

		writeFile(EXTRACTED_POSTS_PATH, JSON.stringify(result)).then(() => resolve(result));
	});
}

app.get("/posts.json", cors(corsOptions), (_, res) => {
	generatePostJSON()
		.then(() => res.sendFile(EXTRACTED_POSTS_PATH))
		.catch((err) => res.status(403).send(err.message).end());
});

app.use(
	express.static(__dirname + "/_site/", {
		extensions: ["html", "htm"],
	}),
);

// redirect addon page because it is a "template" page
app.get("/addon", (req, res, next) => {
	if (req.url === "/addon") {
		req.url = "/addons";
		res.redirect("/addons");
	}
	next();
});
app.get("/addon.html", (req, res, next) => {
	req.url = "/addons";
	res.redirect("/addons");
	next();
});

app.get("/addon/", (req, res, next) => {
	if (req.url === "/addon/") {
		req.url = "/addons";
		res.redirect("/addons");
	}
	next();
});

app.get("/gallery*", (req, res) => {
	// redirect everything after the slash (so ?show urls still work)
	res.redirect(`https://webapp.faithfulpack.net${req.originalUrl}`);
});

app.get("/addons/", (req, res, next) => {
	if (req.url == "/addons/") {
		req.url = "/addons";
		res.redirect("/addons");
	}
	next();
});

app.get("/addons/:name/?", async (req, res) => {
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

	const dataReplaced = ADDON_FIELD_REPLACE.reduce((acc, token) => {
		acc[token] = addon[token];
		return acc;
	}, {});

	dataReplaced.authors = authorArray.join(", ");
	dataReplaced.url = `${req.originalUrl}`;

	// load addon post page
	let data = await readFile(ADDON_PAGE, "utf8");

	// replace header if existing
	if (headerURL) dataReplaced.header_img = headerURL;

	// replace all header values
	ADDON_FIELD_REPLACE.forEach((token) => {
		data = data.replaceAll(ADDON_REPLACE_TOKEN(token), dataReplaced[token]);
	});

	// replace script value
	//! please use Node v15+ for support of replaceAll
	data = data
		.replaceAll("'" + ADDON_REPLACE_TOKEN("data.addon") + "'", JSON.stringify(addon))
		.replaceAll("'" + ADDON_REPLACE_TOKEN("data.authors") + "'", JSON.stringify(authors))
		.replaceAll("'" + ADDON_REPLACE_TOKEN("data.slug") + "'", JSON.stringify(req.params.name))
		.replaceAll("'" + ADDON_REPLACE_TOKEN("data.files") + "'", JSON.stringify(addon.files));

	res.send(data);
	res.end();
});

app.use((_req, res) => res.status(404).sendFile(NOT_FOUND_PAGE));

app.listen(process.env.PORT, () =>
	console.log(`Website listening at http://localhost:${process.env.PORT} in ${__dirname}`),
);
