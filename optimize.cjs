const { PurgeCSS } = require('purgecss');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

async function main() {
    console.log("-> Purging CSS");
    await new PurgeCSS().purge({
        content: ['_site/**/*.html'],
        css: ['_site/assets/**/*.css'],
        whitelistPatterns: [/^fa-/],
        whitelistPatternsChildren: [/^fa-/],
        output: '_site/assets',
    });
    console.log(`CSS Done`);

    console.log("-> Minifying HTML");
    const command = path.join(__dirname, 'node_modules/.bin', 'html-minifier') + ' --file-ext html ' +
                    '--input-dir ./_site --output-dir ./_site ' +
                    '--minify-css --minify-js --remove-comments ' +
                    '--collapse-whitespace --conservative-collapse --case-sensitive --no-include-auto-generated-tags';

    const { stdout, stderr } = await execAsync(command);
    console.log(stdout);
    console.error(stderr);
    console.log("HTML minified");
}

main().catch(console.error);
