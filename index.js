const express = require('express')
const fs = require('fs')

require('dotenv').config()

const { ID_FIELD } = require('./js/firestorm')
const firestorm = require('./js/firestorm')

const app = express()

const NOT_FOUND_PAGE = __dirname + "/404.html"

const ADDON_PAGE = __dirname + "/addon.html"
const ADDON_REPLACE_TOKEN = (token) => `%${token}%`
const ADDON_FIELD_REPLACE = ['title', 'description', 'authors']

firestorm.address(process.env.FIRESTORM_URL)

const addons = firestorm.collection("addons")
const users = firestorm.collection("users")

// redirect addon pagee because it is a "template" page
app.get('/addon', (req, res, next) => {
  if(req.url === '/addon') {
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

app.get('/addons/:name/?', (req, res) => {
  const addonPromise = addons.get(req.params.name) // avoid error 404

  let addon
  addonPromise.then(_addon => {
    addon = _addon
    addon[ID_FIELD] = req.params.name
    return users.searchKeys(addon.authors)
  }).then(_contributors => {
    const contributors = _contributors.reduce((acc, cur) => { acc[cur[ID_FIELD]] = cur; return acc }, {})
  
    if(!addon || addon.status !== 'approved') {
      res.sendFile(NOT_FOUND_PAGE)
      return
    }

    const authorArray = addon.authors.map(author => contributors[author]).filter(e => !!e).map(user => user.username).filter(e => !!e)
    const dataReplaced = ADDON_FIELD_REPLACE.reduce((acc, token) => { acc[token] = addon[token]; return acc }, {})
    dataReplaced.authors = authorArray.join(', ')
    
    let data = fs.readFileSync(ADDON_PAGE, 'utf8')
    ADDON_FIELD_REPLACE.forEach(token => {
      data = data.replaceAll(ADDON_REPLACE_TOKEN(token), dataReplaced[token])
    })

    data = data.replaceAll(ADDON_REPLACE_TOKEN('data.addon'), JSON.stringify(addon))
    data = data.replaceAll(ADDON_REPLACE_TOKEN('data.authors'), JSON.stringify(_contributors))

    res.send(data)
    res.end()
  }).catch(err => {
    console.error(err, err?.response?.data)
    res.end()
  })
})

app.use(express.static(__dirname, {
  extensions: ['html', 'htm'],
}))

app.use(function (req, res, next) {
  console.log(req)
  res.status(404).sendFile(NOT_FOUND_PAGE)
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT} in ${__dirname}`)
})