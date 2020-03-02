const loadDialog = require('../helper/loadDialog')
const Extra = require('telegraf/extra')

const dialog = {
  wrong_format: loadDialog('../dialog/submission-wrong-format.txt')
}

const submission = (ctx, next) => {
  const sender_id = ctx.message.from.id
  const message_id = ctx.message.message_id
  const submission_timestamp = ctx.message.date
  const file_id = ctx.message.document.file_id
  const file_size = ctx.message.document.file_size
  const filename = ctx.message.document.file_name

  const filename_filter = /^\d{5}_[A-Z]+\d{2}_[A-Za-z .]+$/
  // First exit: wrong file format
  if (!filename_filter.test(filename)) {
    ctx.replyWithMarkdown(dialog.wrong_format, Extra.inReplyTo(message_id))
    next()
    return
  }
  // Second exit: invalid submission time (outside the deadline)
  // Third exit: file size

  // Filename after altering
  // telegramID_timestamp_NIF_KodePraktikum_Nama Lengkap.pdf
}

module.exports = submission