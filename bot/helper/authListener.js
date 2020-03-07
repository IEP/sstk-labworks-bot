const { admin } = require('../lib/firebase')
const { Mahasiswa } = require('../db').Models

const db = admin.firestore()

/**
 * authListener Firestore listener
 * @param {object} telegram "telegraf/telegram" object
 */
const authListener = (telegram) => {
  db.collection('authorized')
    .onSnapshot((querySnapshot) => {
      try {
        querySnapshot.forEach(async (doc) => {
          // Extract each user data
          const { email, telegram_id } = doc.data()
          // Check if already exists
          const mahasiswa = await Mahasiswa.query().findById(telegram_id)
          // If already exist then continue to the next mahasiswa
          if (mahasiswa) return // Exit
          // Add to database
          await Mahasiswa.transaction(async (trx) => {
            await Mahasiswa.query(trx).insert({
              email,
              telegram_id
            })
            return
          })

          // Delete firestore document after registered and added into local
          // database
          await db.collection('authorized').doc(doc.id).delete()

          console.log(email, 'has been notified')

          // Send notification message to the user
          telegram.sendMessage(
            telegram_id,
            "Akun Anda telah terdaftar. Terimakasih."
          )
        })
      } catch(err) {
        console.error(err)
      }
    })
}

module.exports = authListener