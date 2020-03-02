export default async (req, res) => {
  const { Mahasiswa } = req.db
  const { admin } = req.firebase
  const db = admin.firestore()
  const { telegram_id } = req.body

  const p_firebase = db.collection('authorized').doc(String(telegram_id)).delete()
  const p_db = Mahasiswa.query()
    .delete()
    .where('telegram_id', telegram_id)
  await Promise.all([p_firebase, p_db])
  res.send('ok')
}