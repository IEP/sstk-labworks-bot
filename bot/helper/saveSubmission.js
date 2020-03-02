const axios = require('axios')
const fs = require('fs-extra')
const Extra = require('telegraf/extra')
const { join } = require('path')
const { Submission } = require('../db').Models

const saveSubmission = async (ctx, telegram_id, kode_praktikum, file_id, filename) => {
  const folder = join(__dirname, `../download/${kode_praktikum}`)
  await fs.ensureDir(folder)
  const download_link = await ctx.telegram.getFileLink(file_id)
  const res = await axios.get(download_link, { responseType: 'stream' })
  await res.data.pipe(fs.createWriteStream(`${folder}/${filename}`))
  await Submission.query()
    .insert({
      telegram_id,
      kode_praktikum,
      filename
    })
  ctx.replyWithMarkdown(
    `Laporan praktikum Anda telah berhasil dikumpulkan. Terimakasih.`,
    Extra.inReplyTo(ctx.message.id)
  )
  console.log('saved')

  // await fs.writeFile(`${folder}/${filename}`, res.data)
  // console.log('saved')
}

module.exports = saveSubmission