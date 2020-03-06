export default async (req, res) => {
  if (!req.authorized) {
    res.json({ status: 'permission denied' })
    return
  }
  const { Mahasiswa } = req.db
  const { telegram_id } = req.body

  await Mahasiswa.query()
    .deleteById(telegram_id)

  res.send('ok')
}