module.exports = {
    content: [
      "_site/index.html",
      "_site/*/index.html",
      "_site/*/*/*/*/*/index.html",
      "_site/*/*/*/*/**/index.html",
      "_site/posts/*/index.html",
    ],
    css: ["_site/assets/main.css"],
    extractors: [
      {
        extractor: class {
          static extract(content) {
            return content.match(/[A-z0-9-:\/]+/g) || [];
          }
        },
        extensions: ["html", "js"],
      },
    ],
  };