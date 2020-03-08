export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }

  const perPage = 25
  const page = req.query.page || 0
  const orderedBy = req.query.orderBy || 'email'

  const { Mahasiswa } = req.db
  const mahasiswa = await Mahasiswa.query()
    .orderBy(orderedBy)
    .page(page, perPage)

  const totalPages = Math.ceil(mahasiswa.total / perPage) - 1
    
  res.json({
    ...mahasiswa,
    totalPages
  })
}