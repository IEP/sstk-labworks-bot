export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }
  const perPage = 10 // jumlah baris per halaman
  const page = req.query.page || 0
  const kode_praktikum = req.query.kode_praktikum || ''
  const { Submission } = req.db
  const baseQuery = Submission.query()
    .select('submission.*', 'mahasiswa.email')
    .joinRelated('mahasiswa')
    .orderBy(
      [
        { column: 'kode_praktikum' },
        { column: 'telegram_id' },
        { column: 'created_at' }
      ]
    )
    .limit(perPage)
    .offset(page*perPage)
  if(kode_praktikum){
    res.json(await baseQuery.where({kode_praktikum}))
  }else{
    res.json(await baseQuery)
  }
}