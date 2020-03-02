export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }
  const { Submission } = req.db
  const submission = await Submission.query()
    .select('submission.*', 'mahasiswa.email')
    .joinRelated('mahasiswa')
    .orderBy(
      [
        { column: 'kode_praktikum' },
        { column: 'telegram_id' },
        { column: 'created_at' }
      ]
    )
  res.json(submission)
}