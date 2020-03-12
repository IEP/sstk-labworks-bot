const { format, utcToZonedTime } = require('date-fns-tz')
const { Submission } = require('../db').Models
const Extra = require('telegraf/extra')

const checkSubmission = async (ctx, next) => {
  // Get required message information
  const message_id = ctx.message.message_id
  const telegram_id = ctx.message.from.id
  const message = ctx.message.text
  const message_filter = /^\/terkumpul (?<kode_praktikum>[A-Z]+\d{2})$/
  const { kode_praktikum } = message.match(message_filter).groups

  // Fetch submission from db, since we restrict the submission limit per
  // mahasiswa per kode_praktikum, limit 1 will return the only result
  const submission = await Submission.query()
    .select('submission.created_at')
    .where('telegram_id', telegram_id)
    .where('kode_praktikum', kode_praktikum)
    .limit(1)

  // If mahasiswa haven't send any submission to the bot
  if (!submission.length) {
    ctx.replyWithMarkdown(
      `Maaf, Anda belum pernah mengumpulkan laporan praktikum untuk kode ` +
        `praktikum \`${kode_praktikum}\`.`,
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  const timeZone = 'Asia/Jakarta'
  const submission_timestamp = submission[0].created_at // Fetch the only result
  const submission_str = format(
    utcToZonedTime(submission_timestamp, timeZone),
    "dd/MM/yyyy 'pukul' HH:mm:ss 'WIB'",
    { timeZone }
  )

  ctx.replyWithMarkdown(
    `Laporan praktikum Anda untuk kode praktikum \`${kode_praktikum}\` ` +
      `telah terkumpul pada ${submission_str}.`,
    Extra.inReplyTo(message_id)
  )
}

module.exports = checkSubmission
