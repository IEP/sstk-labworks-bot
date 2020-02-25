const firebase = require('firebase/app')
require('firebase/auth')

const serviceAccount = require('../../credentials/lab-sstk-admin.json')
const firebaseConfig = require('../../credentials/lab-sstk-web')

firebase.initializeApp(firebaseConfig)

module.exports = {
  firebase
}