export default async (req, res) => {
  const { Submission } = req.db
  const submission = await Submission.query()
  res.json(submission)
}