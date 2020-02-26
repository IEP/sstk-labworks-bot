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

bot.hears('/debug memory', (ctx) => {
  const memUsage = process.memoryUsage()
  const memMsg = 'Memory usage:\n' + Object.keys(memUsage).map((key) => {
    return `${key} ${Math.round(memUsage[key] / 1024 / 1024 * 100) / 100} MB`
  }).join('\n')
  ctx.reply(memMsg)
})

bot.launch()

authListener(telegram)
