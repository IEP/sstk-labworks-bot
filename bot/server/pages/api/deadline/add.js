import { zonedTimeToUtc } from 'date-fns-tz'
import { formatISO, isBefore } from 'date-fns'

export default async (req, res) => {
  const { Deadline } = req.db
  if (!req.body.kode_praktikum ||
    !req.body.start ||
    !req.body.end
  ) {
    res.send('not ok')
    return
  }
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
      console.log('new deadline')
      return
    })
  }
  res.send('ok')
}