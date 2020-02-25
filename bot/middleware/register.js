const { Extra } = require('telegraf') 
const { Mahasiswa } = require('../db/models')
const loadDialog = require('../helper/loadDialog')
const sendLoginEmail = require('../helper/sendLoginEmail')

// Message dialog for valid and invalid registration attempt
const dialog = {
  valid: loadDialog('../dialog/register-valid-email.txt'),
  invalid: loadDialog('../dialog/register-invalid-email.txt')
}

// UGM email address regex
const email_filter = /[a-z.]+@mail\.ugm\.ac\.id/

module.exports = async (ctx, next) => {
  // Get few Telegram Message parameters
  const telegram_id = ctx.message.from.id
  const message_id = ctx.message.message_id
  const message = ctx.message.text
  // Fetch the user from database, if already exists then reject
  // the registration
  const mahasiswa = await Mahasiswa.query().findById(telegram_id)
  if (mahasiswa) {
    ctx.reply('Maaf. Anda sudah terdaftar.', Extra.inReplyTo(message_id))
    next()
    return
  }
  // The user haven't been registered
  // This block will be triggered if the user entering wrong email format
  if (!email_filter.test(message)) {
    ctx.replyWithMarkdown(dialog.invalid, Extra.inReplyTo(message_id))
    next()
    return
  }
  // This block will be triggered if the user entering correct email format
  const email_address = email_filter.exec(message)[0]
  // Print correct email address
  console.log(email_address)
  // Send login email
  sendLoginEmail(email_address)
  ctx.reply(dialog.valid, Extra.inReplyTo(message_id))
  next()
}