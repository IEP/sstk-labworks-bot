const admin = require('firebase-admin')
const firebase = require('firebase/app')
require('firebase/auth')

const serviceAccount = require('../../external/credentials/lab-sstk-admin.json')
const firebaseConfig = require('../../external/credentials/lab-sstk-web.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
firebase.initializeApp(firebaseConfig)

module.exports = {
  admin,
  firebase
}
