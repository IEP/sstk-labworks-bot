export default async (req, res) => {
  const { Deadline } = req.db
  const { kode_praktikum } = req.body
  await Deadline.query()
    .delete()
    .where('kode_praktikum', kode_praktikum)
  res.send('ok')
}