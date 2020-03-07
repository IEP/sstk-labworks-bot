const Extra = require('telegraf/extra')
const loadDialog = require('../helper/loadDialog')

const dialog = {
  help: loadDialog('../dialog/help.txt')
}

const help = (ctx) => {
  const message_id = ctx.message.message_id
  ctx.replyWithMarkdown(
    dialog.help,
    Extra.inReplyTo(message_id)
  )
}

module.exports = help