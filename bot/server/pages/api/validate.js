export default (req, res) => {
  console.log(req.body)
  res.json({
    valid_token: true
  })
}