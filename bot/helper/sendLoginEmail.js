const fs = require('fs-extra')
const path = require('path')
const jwt = require('jsonwebtoken')
const { firebase } = require('../lib/firebase')

const privateKey = fs.readFileSync(
  path.join(__dirname, '../credentials/private.key')
)

/**
 * 
 * @param {string} email destination email address for login
 */
const send_login_email = (email) => {
  // Generate JWT Token
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    email: email
  }, privateKey, { algorithm: 'RS256' })

  // Embed the JWT Token into login URL
  const settings = {
    url: `https://lab-sstk.web.app/?token=${token}`,
    handleCodeInApp: true
  }

  // Send the login email
  firebase.auth().sendSignInLinkToEmail(email, settings)
    .then(() => {
      console.log('email sent to', email)
    })
}

module.exports = send_login_email