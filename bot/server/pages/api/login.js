// Parse the "password" then return the token made by that password
// or a custom token
export default (req, res) => {
  if (req.body.password !== 'benar') {
    res.json({
      correct: false
    })
    return
  }

  const jwt = req.jwt
  const privateKey = req.privateKey

  const token = jwt.sign({
    data: 'nothing here'
  }, privateKey, {
    expiresIn: '12h',
    algorithm: 'RS256'
  })

  res.json({
    correct: true,
    token
  })
}