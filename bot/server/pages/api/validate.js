export default (req, res) => {
  res.json({
    valid_token: req.authorized
  })
}