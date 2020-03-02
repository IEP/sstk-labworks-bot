export default async (req, res) => {
  if (!req.authorized) {
    res.json({ status: 'permission denied' })
    return
  }
  const { Deadline } = req.db
  const { kode_praktikum } = req.body
  // await Deadline.query()
  //   .delete()
  //   .where('kode_praktikum', kode_praktikum)
  await Deadline.query()
    .deleteById(kode_praktikum)
  res.send('ok')
}