const { Extra } = require('telegraf') 
const { Mahasiswa } = require('../db').Models
const loadDialog = require('../helper/loadDialog')
const sendLoginEmail = require('../helper/sendLoginEmail')

// Message dialog for valid and invalid registration attempt
const dialog = {
  valid: loadDialog('../dialog/register-valid-email.txt'),
  invalid: loadDialog('../dialog/register-invalid-email.txt'),
  registered_email: loadDialog('../dialog/register-registered-email.txt'),
  registered_telegram_id:
    loadDialog('../dialog/register-registered-telegram_id.txt')
}

// UGM email address regex filter
const email_filter = /[a-z.0-9]+@mail\.ugm\.ac\.id/

module.exports = async (ctx, next) => {
  // Get few Telegram message parameters
  const telegram_id = ctx.message.from.id
  const message_id = ctx.message.message_id
  const message = ctx.message.text

  // - Fetch the user from database, if already exists/registered then reject
  // the registration
  const mahasiswa = await Mahasiswa.query().findById(telegram_id)
  if (mahasiswa) {
    ctx.reply(dialog.registered_telegram_id + mahasiswa.email, 
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  // - The user haven't been registered
  // -- This block will be triggered if the user entering wrong email format
  if (!email_filter.test(message)) {
    ctx.replyWithMarkdown(dialog.invalid, Extra.inReplyTo(message_id))
    next()
    return
  }

  // -- This block will be triggered if the user entering correct email format
  const email_address = email_filter.exec(message)[0]
  const check_email = await Mahasiswa.query()
    .select('email')
    .where('email', email_address)
  // Check whether the email already registered (prevent the attempt of cheating
  // using friend's email)
  if (check_email.length > 0) {
    console.log(check_email)
    ctx.reply(dialog.registered_email, Extra.inReplyTo(message_id))
    next()
    return
  }

  // Print correct email address
  console.log(email_address, 'attempt to register')

  // Send login email
  sendLoginEmail(telegram_id, email_address)
  ctx.reply(dialog.valid, Extra.inReplyTo(message_id))
  next()
}