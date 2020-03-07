export default async (req, res) => {
  if (!req.authorized) {
    res.json({ status: 'permission denied' })
    return
  }

  const { otp, kode_praktikum } = req.body

  const authenticator = req.authenticator
  const OTP_SECRET = req.OTP_SECRET

  // Check whether the user submitting correct OTP
  try {
    if (!authenticator.check(otp, OTP_SECRET)) {
      res.json({
        status: 'wrong OTP'
      })
      return
    }
  } catch(err) {
    res.json({
      status: 'wrong OTP'
    })
    return
  }

  const { Deadline } = req.db
  await Deadline.query()
    .deleteById(kode_praktikum)
  res.send('ok')
}