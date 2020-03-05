const { admin } = require('../lib/firebase')
const { Mahasiswa } = require('../db').Models

const db = admin.firestore()

/**
 * 
 * @param {object} telegram "telegraf/telegram" object
 */
const authListener = (telegram) => {
  db.collection('authorized')
    // .where('notified', '==', false)
    .onSnapshot((querySnapshot) => {
      try {
        querySnapshot.forEach(async (doc) => {
          // Extract user data
          const { email, telegram_id } = doc.data()
  
          // Check if already exists
          const mahasiswa = await Mahasiswa.query().findById(telegram_id)
          if (mahasiswa) return // Exit; continue to next mahasiswa
          // Add to database
          await Mahasiswa.transaction(async (trx) => {
            await Mahasiswa.query(trx).insert({
              email,
              telegram_id
            })
            return
          })

          // after the user already added into db then update the firestore
          // collection
          // await db.collection('authorized').doc(doc.id).update({
          //   notified: true
          // })

          // Delete firestore document after registered
          await db.collection('authorized').doc(doc.id).delete()

          console.log(email, 'has been notified')

          // Send notification message
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