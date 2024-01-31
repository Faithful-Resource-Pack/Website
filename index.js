const express = require("express");
const cors = require("cors");
const { readdir, readFile, writeFile } = require("fs").promises;
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const { parse, join } = require("path");
const yaml = require("js-yaml");

require("dotenv").config();

const corsOptions = {
    origin: "*",
    methods: [],
    allowedHeaders: [],
    exposedHeaders: [],
    credentials: true,
};

const DOMPurify = createDOMPurify(new JSDOM("").window);

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

/**
 * @typedef {[string, boolean, number?]} Extra
 */

/**
 * @type {Extra[]}
 */
const EXTRACT = [
    ["title", true],
    ["permalink", true],
    ["comments", true],
    ["comments-id", true],
    ["header-img", true],
    ["discontinued", true],
    ["long_text", false],
    ["changelog", false, 1, true],
    ["single-changelog", true],
    ["expanded-changelog", true],
    ["downloads", false, 2],
    ["download", false],
    ["main_changelog", true],
];

/**
 * definitions
 * @param {string[]} input lines
 * @param {Extra} extra extra def
 *
 * @return {{[tag]: string} | undefined}
 */
function extract(input, [tag, oneline, accepted_empty_lines, is_list]) {
    let start = input.findIndex((l) => l.startsWith(`${tag}:`));
    if (start === -1) return undefined;
    let i = start;

    if (oneline) {
        let line = input[i];
        let line_cleaned = line.replace(`${tag}:`, "").trim();
        if (line_cleaned.startsWith('"')) line_cleaned = line_cleaned.substring(1);
        if (line_cleaned.endsWith('"')) line_cleaned = line_cleaned.slice(0, -1);
        return line_cleaned;
    }

    is_list = !!is_list;
    accepted_empty_lines = accepted_empty_lines !== undefined ? accepted_empty_lines : 1;

    let res = input[i].replace(`${tag}:`, "");
    i++;

    let running = true;
    let empty_lines = 0;
    while (running && i < input.length) {
        line = input[i];

        let is_empty = line.trim() === "";
        if (!is_empty) empty_lines = 0;
        else empty_lines++;

        if ((is_list && i > 0 && !/^\s/.test(line)) || empty_lines >= accepted_empty_lines) {
            running = false;
        } else {
            res += "\n" + line;
        }

        i++;
    }

    let line_cleaned = res.trim();
    if (line_cleaned.startsWith('"')) line_cleaned = line_cleaned.substring(1);
    if (line_cleaned.endsWith('"')) line_cleaned = line_cleaned.slice(0, -1);

    return line_cleaned;
}

const EXTRACTED_POSTS_PATH = `${__dirname}/posts.json`;
let postsMap = undefined;
let postsMapLoading = false;
async function generatePostJSON() {
    if (postsMapLoading) return Promise.reject(new Error("Loading"));
    if (!!postsMap) return Promise.resolve(postsMap);

    postsMapLoading = true;

    const dirPosts = `${__dirname}/_posts`;
    const dirs = await readdir(dirPosts, { withFileTypes: true });
    const mdFiles = dirs.filter(
        (e) => e.isFile() && e.name.endsWith(".md") && !e.name.startsWith("_")
    );
    const mdContents = await Promise.all(
        mdFiles.map((e) => Promise.all([e, readFile(`${dirPosts}/${e.name}`, "utf8")]))
    );

    const result = mdContents
        .map(([e, md]) => {
            let tmp = {
                name: parse(e.name).name,
            };

            let lines = md.split("\n").filter((l) => l.trim() !== "---");
            EXTRACT.forEach((e) => {
                const extracted = extract(lines, e);
                if (
                    ["long_text", "downloads", "main_changelog"].indexOf(e[0]) !== -1 &&
                    !!extracted
                )
                    tmp[e[0]] = DOMPurify.sanitize(extracted);
                else tmp[e[0]] = extracted;
            });

            return tmp;
        })
        .reduce((acc, cur) => {
            acc[cur.name] = cur;
            return acc;
        }, {});

    postsMap = result;
    postsMapLoading = false;

    await writeFile(EXTRACTED_POSTS_PATH, JSON.stringify(result));

    return result;
}

app.get("/posts.json", cors(corsOptions), (_, res) => {
    generatePostJSON()
        .then(() => {
            res.sendFile(EXTRACTED_POSTS_PATH);
        })
        .catch((err) => {
            res.status(403).send(err.message).end();
        });
});

function transformData(obj) {
    if (obj === null) return {};
    if (!Array.isArray(obj) || typeof obj[0] === "string") return obj;

    return obj.reduce(
        (acc, cur) => ({
            ...acc,
            [Object.keys(cur)[0]]: transformData(Object.values(cur)[0]),
        }),
        {}
    );
}

/**
 * @param {String} filePath path to the changelog
 * @returns {Promise<any>} JS Object returned
 */
async function extractChangelog(filePath) {
    const data = await readFile(filePath, "utf8")
    // Split the file contents into an array of lines
    const lines = data.trim().split("\n");

    // Remove the first two and last three lines
    lines.splice(0, 2);
    lines.splice(-3);

    // Join the remaining lines into a single string
    const yamlString = lines.join("\n");

    // Parse the YAML string into a JavaScript object
    const obj = await yaml.load(yamlString);
    const root = Object.values(obj)[0];
    return transformData(root);
}

const CHANGELOGS_DIR = "./changelogs";
const CHANGELOGS = ["compliance32.html", "dungeons.html"];
const CHANGELOGS_OBJ = [];
const CHANGELOGS_LOADING = [];

CHANGELOGS.forEach((changelog, i) => {
    CHANGELOGS_LOADING[i] = true;

    const changelogPath = join(__dirname, CHANGELOGS_DIR, changelog);
    const stem = parse(changelogPath).name;

    extractChangelog(changelogPath).then((obj) => {
        CHANGELOGS_OBJ[i] = obj;
        CHANGELOGS_LOADING[i] = false;
    });

    app.get(`/changelogs/${stem}.json`, cors(corsOptions), (_, res) => {
        if (CHANGELOGS_LOADING[i]) {
            res.status(403).send("loading").end();
            return;
        }

        return res.json(CHANGELOGS_OBJ[i]).end();
    });
});

app.use(
    express.static(__dirname + "/_site/", {
        extensions: ["html", "htm"],
    })
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

app.get("/addons/", (req, res, next) => {
    if (req.url == "/addons/") {
        req.url = "/addons";
        res.redirect("/addons");
    }
    next();
});

app.get("/addons/:name/?", (req, res, next) => {
    let addon,
        files,
        header_url = "/image/home/og_logo.png";

    // using promise chain for better error handler
    fetch(`https://api.faithfulpack.net/v2/addons/${req.params.name}/all`)
        .then((res) => res.json())
        .then(async (result) => {
            addon = result;
            const res = await fetch(`https://api.faithfulpack.net/v2/users/raw`);
            const users = await res.json();
            return Object.values(users).filter((user) => addon.authors.includes(user.id));
        })
        .then(async (result) => {
            const authors = result;
            files = addon.files;

            try {
                header_url = files.find((el) => el.use === "header").source;
            } catch (_error) {}

            if (!addon || !addon.approval || addon.approval.status !== "approved") {
                res.sendFile(NOT_FOUND_PAGE);
                return;
            }

            const authorArray = addon.authors
                .map((author) => authors[author])
                .filter((e) => !!e)
                .map((user) => user.username)
                .filter((e) => !!e);

            const dataReplaced = ADDON_FIELD_REPLACE.reduce((acc, token) => {
                acc[token] = addon[token];
                return acc;
            }, {});

            dataReplaced.authors = authorArray.join(", ");
            dataReplaced.url = `${req.originalUrl}`;

            // load addon post page
            let data = await readFile(ADDON_PAGE, "utf8");

            // replace header if existing
            if (header_url) {
                dataReplaced.header_img = header_url;
            }

            // replace all header values
            ADDON_FIELD_REPLACE.forEach((token) => {
                data = data.replaceAll(ADDON_REPLACE_TOKEN(token), dataReplaced[token]);
            });

            // replace script value
            //! please use Node v15+ for support of replaceAll
            data = data
                .replaceAll("'" + ADDON_REPLACE_TOKEN("data.addon") + "'", JSON.stringify(addon))
                .replaceAll(
                    "'" + ADDON_REPLACE_TOKEN("data.authors") + "'",
                    JSON.stringify(authors)
                )
                .replaceAll(
                    "'" + ADDON_REPLACE_TOKEN("data.slug") + "'",
                    JSON.stringify(req.params.name)
                )
                .replaceAll("'" + ADDON_REPLACE_TOKEN("data.files") + "'", JSON.stringify(files));

            res.send(data);
            res.end();
        })
        .catch((err) => {
            console.error(err);
            next();
        });
});

app.use(function (req, res, next) {
    res.status(404).sendFile(NOT_FOUND_PAGE);
});

app.listen(process.env.PORT, () => {
    console.log(`Website listening at http://localhost:${process.env.PORT} in ${__dirname}`);
});
