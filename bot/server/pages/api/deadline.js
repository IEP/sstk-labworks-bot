export default async (req, res) => {
  if (!req.authorized) {
    res.json([])
    return
  }
  const { Deadline } = req.db
  const deadline = await Deadline.query()
  res.json(deadline)
}