export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }
  
  const perPage = 40 // jumlah baris per halaman
  const page = req.query.page || 0
  const kode_praktikum = req.query.kode_praktikum || ''
  const { Submission } = req.db
  const baseQuery = Submission.query()
    .select('submission.*', 'mahasiswa.email')
    .joinRelated('mahasiswa')
    .orderBy(
      [
        { column: 'kode_praktikum' },
        { column: 'created_at' }
      ]
    )
    .page(page, perPage)

  let submission
  if (kode_praktikum) {
    submission = await baseQuery.where({ kode_praktikum })
  } else {
    submission = await baseQuery
  }

  const totalPages = Math.floor(submission.total / perPage)
  res.json({
    ...submission,
    totalPages
  })
}