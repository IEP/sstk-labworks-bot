const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')

// We need two different instances because the bot instance can only reply the
// message, not initiate it. On the other hand the telegram instance can
// initiate sending message to certain user as long as the have been sending
// `/start` command
const bot = new Telegraf(process.env.TOKEN)
const telegram = new Telegram(process.env.TOKEN, {
  webhookReply: false
})

// Load middleware needed
const middleware = require('../middleware')

// Load authListener; This one will listen Firestore update. If there's new
// user registration entry in the Firestore, the bot will send registration
// success notification
const authListener = require('../helper/authListener')

bot.catch((err, ctx) => {
  console.log(`Error: ${ctx.updateType}`, err)
})

bot.start(middleware.start)
bot.help(middleware.help)

bot.on('document', middleware.submission)
bot.hears(/^\/register [a-z@.0-9]+$/g, middleware.register)
bot.hears(/^\/terkumpul [A-Z]+\d{2}$/g, middleware.checkSubmission)
bot.hears(/^\/tenggat [A-Z]+\d{2}$/g, middleware.checkDeadline)
bot.hears('/debug memory', middleware.debug.memory)

// Launch the bot in polling mode since this is not running on dedicated
// server
bot.launch()

// Start to listen Firestore Update
authListener(telegram)

console.log('> Bot is ready')
