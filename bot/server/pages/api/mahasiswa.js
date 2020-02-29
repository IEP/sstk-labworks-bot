export default async (req, res) => {
  const { Mahasiswa } = req.db
  const mahasiswa = await Mahasiswa.query()
  res.json(mahasiswa)
}