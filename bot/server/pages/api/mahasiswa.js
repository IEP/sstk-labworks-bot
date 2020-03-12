export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }

  const perPage = 25
  const page = req.query.page || 0
  const orderedBy = req.query.orderBy || 'email'
  const search = req.query.search || ''

  const { Mahasiswa } = req.db
  let baseQuery = Mahasiswa.query()
    .orderBy(orderedBy)
    .page(page, perPage)

  if (search) baseQuery = baseQuery.where('email', 'like', `%${search}%`)

  const mahasiswa = await baseQuery

  const totalPages = Math.ceil(mahasiswa.total / perPage) - 1

  res.json({
    ...mahasiswa,
    totalPages
  })
}
