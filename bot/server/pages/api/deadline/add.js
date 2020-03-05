import { zonedTimeToUtc } from 'date-fns-tz'
import { formatISO, isBefore } from 'date-fns'

export default async (req, res) => {
  // Exit if not authorized
  if (!req.authorized) {
    res.json({ status: 'permission denied' })
    return
  }

  // Load db model
  const { Deadline } = req.db

  // Check format
  if (!req.body.kode_praktikum ||
    !req.body.start ||
    !req.body.end
  ) {
    res.send('not ok')
    return
  }

  // Check kode_praktikum, exit if file format is not valid
  const kode_praktikum_filter = /[A-Z]+\d{2}/
  if (!kode_praktikum_filter.test(req.body.kode_praktikum)) {
    res.send('wrong file format')
    return
  }

  // Check date format, if incorrect, do nothing to the database
  const startDate = zonedTimeToUtc(req.body.start, 'Asia/Jakarta')
  const endDate = zonedTimeToUtc(req.body.end, 'Asia/Jakarta')
  
  if (startDate !== 'Invalid Date' &&
    endDate !== 'Invalid Date' &&
    isBefore(startDate, endDate)
  ) {
    await Deadline.transaction(async (trx) => {
      await Deadline.query(trx).insert({
        kode_praktikum: req.body.kode_praktikum,
        start: formatISO(startDate),
        end: formatISO(endDate)
      })
      return
    })
  }
  res.send('ok')
}