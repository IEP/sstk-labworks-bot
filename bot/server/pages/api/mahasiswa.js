// Only show when the user have valid authorization

export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }
  const { Mahasiswa } = req.db
  const mahasiswa = await Mahasiswa.query()
  res.json(mahasiswa)
}