const Telegraf = require('telegraf')
const bot = new Telegraf(process.env.TOKEN)
const middleware = require('../middleware')

bot.catch((err, ctx) => {
  console.log(`Error: ${ctx.updateType}`, err)
})

// User registration middleware
bot.hears(/^\/register [a-z@.]+$/g, middleware.register)
bot.start(middleware.start)

bot.launch()