const { format, utcToZonedTime } = require('date-fns-tz')
const { Deadline } = require('../db').Models
const Extra = require('telegraf/extra')

const checkDeadline = async (ctx, next) => {
  const message_id = ctx.message.message_id
  const message = ctx.message.text
  const message_filter = /^\/tenggat (?<kode_praktikum>[A-Z]+\d{2})$/
  const { kode_praktikum } = message.match(message_filter).groups

  const deadline = await Deadline.query()
    .findById(kode_praktikum)

  if (!deadline) {
    ctx.replyWithMarkdown(
      `Maaf, kode praktikum \`${kode_praktikum}\` tidak ditemukan.`,
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  const timeZone = 'Asia/Jakarta'
  const { start, end } = deadline

  const start_str = format(
    utcToZonedTime(start, timeZone),
    "dd/MM/yyyy 'pukul' HH:mm:ss 'WIB'",
    { timeZone }
  )

  const end_str = format(
    utcToZonedTime(end, timeZone),
    "dd/MM/yyyy 'pukul' HH:mm:ss 'WIB'",
    { timeZone }
  )

  ctx.replyWithMarkdown(
    `Tenggat waktu untuk kode praktikum \`${kode_praktikum}\` adalah ` +
    `pada ${start_str} hingga ${end_str}.`,
    Extra.inReplyTo(message_id)
  )
}

module.exports = checkDeadline