const loadDialog = require('../helper/loadDialog')

const dialog = {
  start: loadDialog('../dialog/start.txt')
}

module.exports = (ctx) => {
  ctx.replyWithMarkdown(dialog.start)
}
