export default (req, res) => {
  // Fetch OTP
  const submittedOtp = req.body.otp

  // Load OTP Handler
  const authenticator = req.authenticator
  const OTP_SECRET = req.OTP_SECRET

  try {
    // Verify the OTP received
    if (!authenticator.check(submittedOtp, OTP_SECRET)) {
      res.json({
        correct: false
      })
      return
    }
  } catch(err) {
    // Exit on error
    res.json({
      correct: false
    })
    return
  }

  // Sign the JWT
  const jwt = req.jwt
  const privateKey = req.privateKey

  const token = jwt.sign({
    data: 'nothing here'
  }, privateKey, {
    expiresIn: '12h',
    algorithm: 'RS256'
  })

  // Send the JWT to Client
  res.json({
    correct: true,
    token
  })
}