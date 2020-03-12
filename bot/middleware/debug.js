const memory = (ctx) => {
  const memUsage = process.memoryUsage()
  const memMsg =
    'Memory usage:\n' +
    Object.keys(memUsage)
      .map((key) => {
        return `> ${key} ${Math.round((memUsage[key] / 1024 / 1024) * 100) /
          100} MB`
      })
      .join('\n')
  ctx.reply(memMsg)
}

module.exports = {
  memory
}
