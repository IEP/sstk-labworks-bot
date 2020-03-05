const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const db = require('../db').Models
// const firebase = require('../lib/firebase')
const jwt = require('jsonwebtoken')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

// Check req.headers.authorization
// Then save the result into file

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    req.db = db
    // req.firebase = firebase
    req.authorized = req.headers.authorization === 'Bearer loginCui'
    handle(req, res, parsedUrl)
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Yoman, Frontend Ready on http://localhost:3000')
  })
})