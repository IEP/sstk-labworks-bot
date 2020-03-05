const { createServer } = require('http')
const { parse } = require('url')
const fs = require('fs-extra')
const { join } = require('path')
const next = require('next')
const db = require('../db').Models
const jwt = require('jsonwebtoken')
const { authenticator } = require('otplib')
const OTP_SECRET = process.env.OTP_SECRET

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()

const privateKey = fs.readFileSync(
  join(__dirname, '../external/credentials/private.key')
)

const publicKey = fs.readFileSync(
  join(__dirname, '../external/credentials/public.pem')
)

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    req.db = db
    req.jwt = jwt
    req.privateKey = privateKey
    req.authenticator = authenticator
    req.OTP_SECRET = OTP_SECRET

    // Check JSON Web Token
    try {
      const bearer = req.headers.authorization || 'Bearer'
      const token = bearer.split(' ')[1]
      // If verification failed, the routine will jump to catch
      jwt.verify(token, publicKey)
      req.authorized = true
    } catch (err) {
      req.authorized = false
    }
    handle(req, res, parsedUrl)
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Yoman, Frontend Ready on http://localhost:3000')
  })
})