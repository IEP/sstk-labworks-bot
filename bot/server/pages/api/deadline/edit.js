import { zonedTimeToUtc } from 'date-fns-tz'
import { formatISO, isBefore, format } from 'date-fns'

export default async (req, res) => {
  if (!req.authorized) {
    req.json({ status: 'permission denied' })
    return
  }

  const { Deadline } = req.db

  if (!req.body.kode_praktikum ||
    !req.body.start ||
    !req.body.end
  ) {
    res.send('not ok')
    return
  }

  const kode_praktikum_filter = /[A-Z]+\d{2}/
  if (!kode_praktikum_filter.test(req.body.kode_praktikum)) {
    res.send('wrong file format')
    return
  }

  const startDate = zonedTimeToUtc(req.body.start, 'Asia/Jakarta')
  const endDate = zonedTimeToUtc(req.body.end, 'Asia/Jakarta')

  if (startDate !== 'Invalid Date' &&
    endDate !== 'Invalid Date' &&
    isBefore(startDate, endDate)
  ) {
    await Deadline.transaction(async (trx) => {
      await Deadline.query(trx)
        .update({
          kode_praktikum: req.body.kode_praktikum,
          start: formatISO(startDate),
          end: formatISO(endDate)
        })
        .where('kode_praktikum', req.body.kode_praktikum)
      return
    })
  }
  res.send('ok')
}