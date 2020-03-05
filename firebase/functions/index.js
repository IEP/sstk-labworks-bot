const admin = require('firebase-admin')
const firebase = require('firebase/app')
const functions = require('firebase-functions');
require('firebase/auth')

const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const firebaseConfig = require('./credentials/lab-sstk-web')
const publicKey = fs.readFileSync(path.join(__dirname, './credentials/public.pem'))

firebase.initializeApp(firebaseConfig)
admin.initializeApp(functions.config().firebase)

const db = admin.firestore()

exports.auth = functions.https.onRequest(async (req, res) => {
  try {
    const url = 'https://lab-sstk.firebaseapp.com' + req.url
    if (firebase.auth().isSignInWithEmailLink(url)) {
      const { token } = req.query
      const decoded = await jwt.verify(token, publicKey)
      const { email, telegram_id } = decoded
      const snapshot = await db
        .collection('authorized')
        .where('email', '==', email).get()
      if (!snapshot.empty) throw new Error(email + ' already registered')
      await firebase.auth().signInWithEmailLink(email, url) 
      await db.collection('authorized').doc(String(telegram_id)).set({
        email,
        telegram_id,
        date: new Date()
        // notified: false
      })
      res.send('pendaftaran sukses, bot akan mengirimkan notifikasi')
    } else {
      res.send('what do you do?')
    }
  } catch(err) {
    console.error(err)
    res.send('galat, silakan lakukan proses registrasi kembali')
  }
})

exports.test = functions.https.onRequest((req, res) => {
  res.send("This is test")
})