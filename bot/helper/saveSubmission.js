const axios = require('axios')
const fs = require('fs-extra')
const Extra = require('telegraf/extra')
const { formatISO } = require('date-fns')
const { join } = require('path')
const { Submission } = require('../db').Models

const saveSubmission = async (
  ctx,
  telegram_id,
  kode_praktikum,
  file_id,
  filename,
  submission_time
) => {
  // Prepare the download folder
  const folder = join(__dirname, `../server/public/submitted/${kode_praktikum}`)
  await fs.ensureDir(folder)

  // Fetch download link using Telegram Bot API
  const download_link = await ctx.telegram.getFileLink(file_id)

  // Fetch the file blob then save into "/server/public/submitted" folder
  const res = await axios.get(download_link, { responseType: 'stream' })
  await res.data.pipe(fs.createWriteStream(`${folder}/${filename}`))

  // Add the submission information into database
  await Submission.query().insert({
    telegram_id,
    kode_praktikum,
    filename,
    created_at: formatISO(submission_time) // use telegram server timestamp
  })

  // Notify the user
  ctx.replyWithMarkdown(
    `Laporan praktikum Anda telah berhasil dikumpulkan. Terimakasih.`,
    Extra.inReplyTo(ctx.message.id)
  )
}

module.exports = saveSubmission
