const Telegraf = require('telegraf')
const Telegram = require('telegraf/telegram')
const bot = new Telegraf(process.env.TOKEN)
const telegram = new Telegram(process.env.TOKEN, {
  webhookReply: false
})
const middleware = require('../middleware')
const authListener = require('../helper/authListener')

bot.catch((err, ctx) => {
  console.log(`Error: ${ctx.updateType}`, err)
})

// User registration middleware
bot.hears(/^\/register [a-z@.]+$/g, middleware.register)
bot.start(middleware.start)

bot.hears('/debug memory', middleware.debug.memory)

bot.launch()

authListener(telegram)
