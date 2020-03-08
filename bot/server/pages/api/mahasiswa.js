export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }

  const { Mahasiswa } = req.db
  const mahasiswa = await Mahasiswa.query()
    .orderBy('email')
    
  res.json(mahasiswa)
}