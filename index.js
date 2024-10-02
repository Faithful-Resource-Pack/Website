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

const POST_PAGE = __dirname + "/_site/post.html";
const ADDON_PAGE = __dirname + "/_site/addon.html";
const COFFEE_PAGE = __dirname + "/_site/coffee.html";
const replaceTemplateToken = (token) => `%${token}%`;
const cleanPostData = (post) => JSON.stringify(post).replaceAll("\\", "\\\\");

const ADDON_REPLACE_FIELDS = ["url", "name", "description", "authors", "header_img"];
const POST_REPLACE_FIELDS = ["permalink", "title", "description", "header_img"];

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

const POST_IMPORT_PATH = `${__dirname}/posts`;
const EXTRACTED_POSTS_PATH = `${__dirname}/posts.json`;
let postsMap = undefined;

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
		if (!!postsMap) resolve(postsMap);

		const paths = walkSync(POST_IMPORT_PATH).filter(
			(d) => d.endsWith(".md") && !d.endsWith("README.md"),
		);
		const result = paths.reduce((acc, cur) => {
			const filename = cur.split("/").at(-1);
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
			if (acc[key]) reject(new Error(`Duplicate post key ${key}`));
			acc[key] = obj;
			return acc;
		}, {});

		postsMap = result;

		writeFile(EXTRACTED_POSTS_PATH, JSON.stringify(result)).then(() => resolve(result));
	});
}

app.get("/posts.json", cors(corsOptions), async (_, res) => {
	const file = await readFile(EXTRACTED_POSTS_PATH, { encoding: "utf8" }).catch(() => null);
	if (file) return res.send(file).end();
	const json = await generatePostJSON();
	res.send(JSON.stringify(json)).end();
});

app.use(
	express.static(__dirname + "/_site/", {
		extensions: ["html", "htm"],
	}),
);

// posts (match all routes and continue if no matching post is found)
app.get("*", async (req, res, next) => {
	const file = await readFile(EXTRACTED_POSTS_PATH, { encoding: "utf8" }).catch(() => null);
	// posts not loaded yet
	if (!file) return next();

	const json = JSON.parse(file);
	// remove last character (permalinks don't end with a slash)
	if (req.url.endsWith("/")) req.url = req.url.slice(0, -1);
	const post = json[req.url];
	// post doesn't exist under path, probably another page
	if (!post) return next();

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

app.use((_req, res) => res.status(404).sendFile(NOT_FOUND_PAGE));

app.listen(process.env.PORT, () => {
	console.log(`Website listening at http://localhost:${process.env.PORT} in ${__dirname}`);
	generatePostJSON()
		.then(() => console.log("Post JSON initialized!"))
		.catch((err) => console.error("Failed to load post JSON:\n", err));
});
