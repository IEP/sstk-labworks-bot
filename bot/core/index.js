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

// User registration middleware
bot.hears(/^\/register [a-z@.]+$/g, middleware.register)

// File submission middleware
bot.on('document', middleware.submission)

// Memory debug middleware
bot.hears('/debug memory', middleware.debug.memory)

// `/start` command handling
bot.start(middleware.start)

// `/terkumpul <kode_praktikum>`
bot.hears(/^\/terkumpul [A-Z]+\d{2}$/g, middleware.checkSubmission)

// Launch the bot in polling mode since this is not running on dedicated
// server
bot.launch()

// Start to listen Firestore Update
authListener(telegram)

console.log('> Bot is ready')
