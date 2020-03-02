export default async (req, res) => {
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