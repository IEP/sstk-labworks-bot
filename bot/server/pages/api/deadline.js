export default async (req, res) => {
  const { Deadline } = req.db
  const deadline = await Deadline.query()
  res.json(deadline)
}