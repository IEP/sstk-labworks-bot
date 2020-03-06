const admin = require('firebase-admin')
const firebase = require('firebase/app')
const functions = require('firebase-functions');
require('firebase/auth')

const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

// Load required credentials
const firebaseConfig = require('./credentials/lab-sstk-web.json')
const publicKey = fs.readFileSync(path.join(__dirname, './credentials/public.pem'))

firebase.initializeApp(firebaseConfig)
admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

// Export firebase functions named `auth`
exports.auth = functions.https.onRequest(async (req, res) => {
  try {
    // Set URL of the site. Since I've set redirect rules on the firebase.json
    // All request from https://<SITE>/auth will be redirected to call this
    // cloud functions
    const url = 'https://lab-sstk.firebaseapp.com' + req.url
    // Check the sign in email link, whether is it legitimate
    // This sign in email link could be accessed only once, another access will
    // raise error
    if (firebase.auth().isSignInWithEmailLink(url)) {
      // Parse token from http request query
      const { token } = req.query
      const decoded = await jwt.verify(token, publicKey)
      const { email, telegram_id } = decoded
      // Check whether the user is still on the Firestore
      // If the bot already notify the user, the document on the Firestore
      // will be deleted
      const snapshot = await db
        .collection('authorized')
        .where('email', '==', email).get()
      // Raise error
      if (!snapshot.empty) throw new Error(email + ' already registered')
      // Do the login; actually this part is not needed, but I want to log
      // everybody that have been registered in the Auth page
      await firebase.auth().signInWithEmailLink(email, url) 
      // Set new document with document.id = telegram_id
      await db.collection('authorized').doc(String(telegram_id)).set({
        email,
        telegram_id,
        date: new Date()
      })
      // Final response from Cloud Functions
      res.send('pendaftaran sukses, bot akan mengirimkan notifikasi')
    } else {
      // This will be fired when the user try to access the auth page without
      // providing legitimate email sign in link
      res.send('what do you do?')
    }
  } catch(err) {
    // Error notification can be accessed from the Firebase Cloud Functions
    // Log
    console.error(err)
    res.send('galat, silakan lakukan proses registrasi kembali')
  }
})

// Do Nothing Important
exports.test = functions.https.onRequest((req, res) => {
  res.send("This is test")
})