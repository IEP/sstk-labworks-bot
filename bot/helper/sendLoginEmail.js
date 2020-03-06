const fs = require('fs-extra')
const path = require('path')
const jwt = require('jsonwebtoken')
const { firebase } = require('../lib/firebase')

// Load private key
const privateKey = fs.readFileSync(
  path.join(__dirname, '../external/credentials/private.key')
)

/**
 * 
 * @param {string} email destination email address for login
 */
const sendLoginEmail = (telegram_id, email, url = undefined) => {
  try {
  // Generate JWT Token
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    telegram_id,
    email
  }, privateKey, { algorithm: 'RS256' })

  // Generate login URL and load then token into query
  const login_url = url
    ? url
    : `https://lab-sstk.firebaseapp.com/auth?token=${token}`

  // Embed the JWT Token into login URL
  const settings = {
    url: login_url,
    handleCodeInApp: true
  }

  // Send the login email
  firebase.auth().sendSignInLinkToEmail(email, settings)
    .then(() => {
      console.log('email sent to', email)
    })
  } catch(err) {
    console.error(err)
  }
}

module.exports = sendLoginEmail