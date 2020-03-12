// This actually will generate login email
// use `firebase emulators:start` on firebase folder

const { admin, firebase } = require('../lib/firebase')
const jwt = require('jsonwebtoken')
const fs = require('fs-extra')
const path = require('path')

describe('generate email login link', () => {
  test('using firebase-admin sdk to generate email login link', async () => {
    const privateKey = fs.readFileSync(
      path.join(__dirname, '../credentials/private.key')
    )

    const email = 'fake@a.com'
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        telegram_id: 1234,
        email: email
      },
      privateKey,
      { algorithm: 'RS256' }
    )

    const actionCodeSettings = {
      url: `http://localhost:5001/auth?token=${token}`,
      handleCodeInApp: true
    }
    const link = await admin
      .auth()
      .generateSignInWithEmailLink(email, actionCodeSettings)
    console.log(link)
    return Promise.resolve()
  })
})
