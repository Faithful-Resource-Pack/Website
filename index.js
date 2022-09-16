const { default: axios } = require('axios')
const express = require('express')
const fs = require('fs')

require('dotenv').config()

const { ID_FIELD } = require('./js/firestorm')
const firestorm = require('./js/firestorm')

const app = express()
app.disable('x-powered-by');

const NOT_FOUND_PAGE = __dirname + "/_site/404.html"

const ADDON_PAGE = __dirname + "/_site/addon.html"
const ADDON_REPLACE_TOKEN = (token) => `%${token}%`
const ADDON_FIELD_REPLACE = ['url', 'name', 'description', 'authors', "header_img"]

firestorm.address(process.env.FIRESTORM_URL)

const users = firestorm.collection("users")

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
    let data = fs.readFileSync(ADDON_PAGE, 'utf8')

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
    console.trace(err)
    next()
  })
})


app.use(function (req, res, next) {
  res.status(404).sendFile(NOT_FOUND_PAGE)
})

app.listen(process.env.PORT, () => {
  console.log(`Website listening at http://localhost:${process.env.PORT} in ${__dirname}`)
})
