export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }
  
  const { Deadline } = req.db
  const deadline = await Deadline.query()
    .orderBy('kode_praktikum')
  res.json(deadline)
}