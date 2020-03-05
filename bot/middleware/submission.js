const loadDialog = require('../helper/loadDialog')
const Extra = require('telegraf/extra')
const { parseISO, isWithinInterval } = require('date-fns')
const { Deadline, Mahasiswa, Submission } = require('../db').Models
const saveSubmission = require('../helper/saveSubmission')

const dialog = {
  wrong_format: loadDialog('../dialog/submission-wrong-format.txt'),
  not_registered: loadDialog('../dialog/submission-not-registered.txt')
}

const submission = async (ctx, next) => {
  const telegram_id = ctx.message.from.id
  const message_id = ctx.message.message_id
  const submission_timestamp = ctx.message.date
  const file_id = ctx.message.document.file_id
  const file_size = ctx.message.document.file_size
  const filename = ctx.message.document.file_name

  const filter_list = [
    /(?<NIF>\d{5})/,
    /_/,
    /(?<kode_praktikum>[A-Z]+\d{2})/,
    /_/,
    /(?<nama_praktikan>[A-Za-z .]+)/,
    /\.pdf/
  ]
  // Zeroth exit: haven't been registered
  const mahasiswa = await Mahasiswa.query().findById(telegram_id)
  if (!mahasiswa) {
    ctx.replyWithMarkdown(
      dialog.not_registered,
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  const filename_filter = new RegExp(filter_list.reduce((acc, item) => {
    return acc + item.source
  }, ""))

  // First exit: wrong file format
  if (!filename_filter.test(filename)) {
    ctx.replyWithMarkdown(dialog.wrong_format, Extra.inReplyTo(message_id))
    next()
    return
  }
  const {
    NIF,
    kode_praktikum,
    nama_praktikan
  } = filename.match(filename_filter).groups

  
  const deadline = await Deadline.query().findById(kode_praktikum)
  const submission = await Submission.query()
    .where('telegram_id', telegram_id)
    .where('kode_praktikum', kode_praktikum)
  if (!deadline) {
    ctx.replyWithMarkdown(
      `Maaf. Kode praktikum \`${kode_praktikum}\` tidak ditemukan`,
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  if (submission.length > 0) {
    ctx.reply(
      'Maaf. Pengumpulan laporan praktikum hanya bisa dilakukan satu ' + 
      'kali saja.',
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  // Second exit: invalid submission time (outside the deadline)
  const submission_time = new Date(submission_timestamp * 1000)
  const start_deadline = parseISO(deadline.start)
  const end_deadline = parseISO(deadline.end)
  const is_valid_submission_date = isWithinInterval(
    submission_time,
    { start: start_deadline, end: end_deadline }
  )
  if (!is_valid_submission_date) {
    ctx.reply(
      'Maaf. Anda mengumpulkan laporan praktikum tidak pada tenggat waktu ' + 
      'yang ditentukan'
    )
    next()
    return
  }
  
  // Third exit: file size
  const file_size_ceil_MB = Math.ceil(file_size / 1000000)
  if (file_size_ceil_MB > 10) {
    ctx.reply(
      'Ukuran maksimal berkas laporan praktikum yang diijinkan adalah 10 MB',
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }
  const final_filename =
    `${telegram_id}_${submission_timestamp}_${NIF}_${kode_praktikum}` +
    `_${nama_praktikan}.pdf`
  console.log('Receiving:', final_filename)
  saveSubmission(
    ctx, telegram_id, kode_praktikum, file_id, final_filename, submission_time
  )
}

module.exports = submission