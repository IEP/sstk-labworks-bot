export default (req, res) => {
  console.log(req.headers.authorization)
  // After this we need to check the authorization token by first parse it
  // from headers.authorization, if correct then return valid_token: true
  res.json({
    valid_token: true
  })
}