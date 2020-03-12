export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }

  const perPage = 25 // jumlah baris per halaman
  const page = req.query.page || 0
  const kode_praktikum = req.query.kode_praktikum || ''
  const orderedBy = req.query.orderBy || 'email'

  const { Submission } = req.db
  const baseQuery = Submission.query()
    .select('submission.*', 'mahasiswa.email')
    .joinRelated('mahasiswa')
    .orderBy([{ column: 'kode_praktikum' }, { column: orderedBy }])
    .page(page, perPage)

  let submission
  if (kode_praktikum) {
    submission = await baseQuery.where({ kode_praktikum })
  } else {
    submission = await baseQuery
  }

  const totalPages = Math.ceil(submission.total / perPage) - 1
  res.json({
    ...submission,
    totalPages
  })
}
