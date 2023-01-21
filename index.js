const { default: axios } = require('axios')
const express = require('express')
var cors = require('cors')
const fs = require('fs').promises
const { readFileSync } = require('fs')
const createDOMPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const { parse } = require('path')

require('dotenv').config()

const corsOptions = {
  origin: '*',
  methods: [],
  allowedHeaders: [],
  exposedHeaders: [],
  credentials: true
};

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

const { ID_FIELD } = require('./js/firestorm')
const firestorm = require('./js/firestorm')

const app = express()
app.disable('x-powered-by');

const NOT_FOUND_PAGE = __dirname + "/_site/404.html"

const ADDON_PAGE = __dirname + "/_site/addon.html"
const COFFEE_PAGE = __dirname + "/_site/coffee.html"
const ADDON_REPLACE_TOKEN = (token) => `%${token}%`
const ADDON_FIELD_REPLACE = ['url', 'name', 'description', 'authors', "header_img"]

firestorm.address(process.env.FIRESTORM_URL)

const users = firestorm.collection("users")

app.get(['/coffee', '/teapot'], (req, res) => {
    let data = readFileSync(COFFEE_PAGE, 'utf8')

    let title_el = data.match(/<title>(.+)<\/title>/)
    if(title_el) {
        let title_str = title_el[1]
        let title_split = title_str.split(' - ')
        title_split[0] = req.path.includes('teapot') ? 'Teapot' : 'Coffee'
        data = data.replace(/<title>.+<\/title>/, `<title>${title_split.join(' - ')}</title>`)
    }

    res.status(418).send(data)
    res.end()
})

/**
 * @typedef {[string, boolean, number?]} Extra
 */

/**
 * @type {Extra[]}
 */
const EXTRACT = [
  ['title', true],
  ['permalink', true],
  ['comments', true],
  ['comments-id', true],
  ['header-img', true],
  ['long_text', false],
  ['single-changelog', true],
  ['expanded-changelog', true],
  ['downloads', false],
  ['download', false],
  ['main_changelog', true],
]

/**
 * definitions
 * @param {string[]} input lines
 * @param {Extra} extra extra def
 * 
 * @return {{[tag]: string} | undefined} 
 */
function extract(input, [tag, oneline, accepted_empty_lines]) {
  let i = input.findIndex(l => l.startsWith(`${tag}:`))
  if(i === -1) return undefined

  if(oneline) {
    let line = input[i]
    let line_cleaned = line.replace(`${tag}:`, '').trim()
    if(line_cleaned.startsWith('"')) line_cleaned = line_cleaned.substring(1)
    if(line_cleaned.endsWith('"')) line_cleaned = line_cleaned.slice(0, -1)
    return line_cleaned
  }

  accepted_empty_lines = accepted_empty_lines || 1;

  let res = input[i].replace(`${tag}:`, '');
  i++;

  let running = true;
  let empty_lines = 0;
  while(running && i < input.length) {
    line = input[i];

    let is_empty = line.trim() === '';
    if(!is_empty) empty_lines = 0;
    else empty_lines++;

    if(empty_lines >= accepted_empty_lines) {
      running = false;
    } else {
      res += '\n' + line;
    }

    i++;
  }

  let line_cleaned = res.trim()
  if(line_cleaned.startsWith('"')) line_cleaned = line_cleaned.substring(1)
  if(line_cleaned.endsWith('"')) line_cleaned = line_cleaned.slice(0, -1)

  return line_cleaned;
}

const EXTRACTED_POSTS_PATH = `${__dirname}/posts.json`
let posts_map = undefined
let posts_map_loading = false
function generate_posts_json() {
  if(posts_map_loading) return Promise.reject(new Error('Loading'))
  if(!!posts_map) return Promise.resolve(posts_map)

  posts_map_loading = true

  const dir_posts = `${__dirname}/_posts`
  return fs.readdir(dir_posts,  {withFileTypes: true})
  .then(dirs => dirs.filter(e => e.isFile() && e.name.endsWith('.md') && !e.name.startsWith("_")))
  .then(md_files => Promise.all(
    md_files.map(
      e => Promise.all([e, fs.readFile(`${dir_posts}/${e.name}`, 'utf8')])
    )
  ))
  .then(md_contents => {
    return md_contents.map(([e, md]) => {
      let tmp = {
        name: parse(e.name).name
      }

      let lines = md.split('\n').filter(l => l !== '---')
      EXTRACT.forEach((e) => {
        extracted = extract(lines, e)
        if(['long_text', 'downloads', 'main_changelog'].indexOf(e[0]) !== -1 && !!extracted)
          tmp[e[0]] = DOMPurify.sanitize(extracted)
        else
          tmp[e[0]] = extracted
      })

      return tmp
    }).reduce((acc, cur) => {
      acc[cur.name] = cur;
      return acc;
    }, {});
  })
  .then(async result => {
    posts_map = result
    posts_map_loading = false

    await fs.writeFile(EXTRACTED_POSTS_PATH, JSON.stringify(result))
    
    return result
  })
}

app.get('/posts.json', cors(corsOptions), (_, res) => {
  generate_posts_json()
  .then(() => {
    res.sendFile(EXTRACTED_POSTS_PATH)
  })
  .catch(err => {
    res.status(403).send(err.message).end()
  })
})

app.use(express.static(__dirname + '/_site/', {
  extensions:["html", "htm"]
}))

// redirect addon pagee because it is a "template" page
app.get('/addon', (req, res, next) => {
  if(req.url === '/addon') {
    req.url = '/addons'
    res.redirect('/addons')
  }
  next()
})
app.get('/addon.html', (req, res, next) => {
  req.url = '/addons'
  res.redirect('/addons')
  next()
})

app.get('/addon/', (req, res, next) => {
  if(req.url === '/addon/') {
    req.url = '/addons'
    res.redirect('/addons')
  }
  next()
})

app.get('/addons/', (req, res, next) => {
  if(req.url == '/addons/') {
    req.url = '/addons'
    res.redirect('/addons')
  }
  next()
})

app.get('/addons/:name/?', (req, res, next) => {
  let addon, files, header_url = '/image/home/og_logo.png'

  axios.get(`https://api.faithfulpack.net/v2/addons/${req.params.name}/all`)
  .then(result => {
    addon = result.data
    return users.searchKeys(addon.authors)
  }).then(async (result) => {
    const authors = result
    files = addon.files

    try {
      header_url = files.filter(el => el.use === 'header')[0].source
    } catch (_error) {}

    const contributors = authors.reduce((acc, cur) => { acc[cur[ID_FIELD]] = cur; return acc }, {})
  
    if(!addon || !addon.approval || addon.approval.status !== 'approved') {
      res.sendFile(NOT_FOUND_PAGE)
      return
    }

    const authorArray = addon.authors.map(author => contributors[author]).filter(e => !!e).map(user => user.username).filter(e => !!e)
    const dataReplaced = ADDON_FIELD_REPLACE.reduce((acc, token) => { acc[token] = addon[token]; return acc }, {})
    dataReplaced.authors = authorArray.join(', ')

    dataReplaced.url = `${req.originalUrl}`

    // load addon post page
    let data = await fs.readFile(ADDON_PAGE, 'utf8')

    // replace header if existing
    if(header_url) {
      dataReplaced.header_img = header_url
    }

    // replace all header values
    ADDON_FIELD_REPLACE.forEach(token => {
      data = data.replaceAll(ADDON_REPLACE_TOKEN(token), dataReplaced[token])
    })

    // replace script value
    //! please use Node v15+ for support of replaceAll
    data = data.replaceAll("'" + ADDON_REPLACE_TOKEN('data.addon') + "'", JSON.stringify(addon))
    data = data.replaceAll("'" + ADDON_REPLACE_TOKEN('data.authors') + "'", JSON.stringify(authors))
    data = data.replaceAll("'" + ADDON_REPLACE_TOKEN('data.slug') + "'", JSON.stringify(req.params.name))
    data = data.replaceAll("'" + ADDON_REPLACE_TOKEN('data.files') + "'", JSON.stringify(files))

    res.send(data)
    res.end()
  }).catch(err => {
    console.error(err)
    next()
  })
})

app.use(function (req, res, next) {
  res.status(404).sendFile(NOT_FOUND_PAGE)
})

app.listen(process.env.PORT, () => {
  console.log(`Website listening at http://localhost:${process.env.PORT} in ${__dirname}`)
})
