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
  const token = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    email: email
  }, privateKey, { algorithm: 'RS256' })
  const settings = {
    url: `https://lab-sstk.web.app/?token=${token}`,
    handleCodeInApp: true
  }
  firebase.auth().sendSignInLinkToEmail(email, settings)
    .then(() => {
      console.log('email sent to', email)
    })
}

module.exports = send_login_email