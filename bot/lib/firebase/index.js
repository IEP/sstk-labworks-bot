const admin = require('firebase-admin')
const firebase = require('firebase/app')
require('firebase/auth')

const serviceAccount = require('../../credentials/lab-sstk-admin.json')
const firebaseConfig = require('../../credentials/lab-sstk-web')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
firebase.initializeApp(firebaseConfig)

module.exports = {
  admin,
  firebase
}