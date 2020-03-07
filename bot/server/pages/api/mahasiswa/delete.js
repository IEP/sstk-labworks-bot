export default async (req, res) => {
  if (!req.authorized) {
    res.json({ status: 'permission denied' })
    return
  }
  const { Mahasiswa } = req.db
  const { telegram_id, otp } = req.body

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
  }

  await Mahasiswa.query()
    .deleteById(telegram_id)

  res.send('ok')
}