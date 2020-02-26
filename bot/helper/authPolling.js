const { admin } = require('../lib/firebase')
const { Mahasiswa } = require('../db').Models

const db = admin.firestore()

const authPolling = async (telegram) => {
  try {
    const snapshot = await db
      .collection('authorized')
      .where('notified', '==', false)
      .get()
    if (snapshot.empty) return 'no new user'
    snapshot.forEach(async (doc) => {
      const { email, telegram_id } = doc.data()

      // Check if already exists
      const mahasiswa = await Mahasiswa.query().findById(telegram_id)
      if (mahasiswa) throw new Error(`${email} already registered`)
      await Mahasiswa.transaction(async (trx) => {
        await Mahasiswa.query(trx).insert({
          email,
          telegram_id
        })
        return
      })

      await db.collection('authorized').doc(doc.id).update({
        notified: true
      })
      console.log(email, 'has been notified')
      // Send notification message
      telegram.sendMessage(telegram_id, "Akun Anda telah teregistrasi. Terimakasih.")
    })
  } catch(err) {
    console.error(err)
  }
}

module.exports = authPolling