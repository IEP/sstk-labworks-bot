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
  // Parse variables needed
  const telegram_id = ctx.message.from.id
  const message_id = ctx.message.message_id
  const submission_timestamp = ctx.message.date
  const file_id = ctx.message.document.file_id
  const file_size = ctx.message.document.file_size
  const filename = ctx.message.document.file_name

  // Case: haven't been registered
  const mahasiswa = await Mahasiswa.query().findById(telegram_id)
  if (!mahasiswa) {
    ctx.replyWithMarkdown(dialog.not_registered, Extra.inReplyTo(message_id))
    next()
    return
  }

  // Case: wrong file format
  const filter_list = [
    // 5 digits NIF
    /(?<NIF>\d{5})/,
    // underscore
    /_/,
    // arbitrarily sized "A-Z" chars followed by 2 digits of number
    /(?<kode_praktikum>[A-Z]+\d{2})/,
    // underscore
    /_/,
    // Full name of the student arbitrarily sized "A-Z", "a-z", ".", " " chars
    /(?<nama_praktikan>[A-Za-z .]+)/,
    // pdf file extension
    /\.pdf/
  ]

  // Concantenate (reduce) the filter_list into a single filter
  // Example: 12345_TEST01_Full Name Human.pdf
  const filename_filter = new RegExp(
    filter_list.reduce((acc, item) => {
      return acc + item.source
    }, '')
  )

  if (!filename_filter.test(filename)) {
    ctx.replyWithMarkdown(dialog.wrong_format, Extra.inReplyTo(message_id))
    next()
    return
  }

  // Extract few information from filename
  const { NIF, kode_praktikum, nama_praktikan } = filename.match(
    filename_filter
  ).groups

  // Case: wrong kode_praktikum
  const deadline = await Deadline.query().findById(kode_praktikum)
  if (!deadline) {
    ctx.replyWithMarkdown(
      `Maaf, kode praktikum \`${kode_praktikum}\` tidak ditemukan.`,
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  // Case: already submitting
  const submission = await Submission.query()
    .where('telegram_id', telegram_id)
    .where('kode_praktikum', kode_praktikum)
  if (submission.length > 0) {
    ctx.reply(
      'Maaf, pengumpulan laporan praktikum hanya dapat dilakukan satu ' +
        'kali saja.',
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  // Case: invalid submission time (outside the deadline)
  const submission_time = new Date(submission_timestamp * 1000)
  const start_deadline = parseISO(deadline.start)
  const end_deadline = parseISO(deadline.end)
  // Only valid if the submission time is within start and end time (inclusive)
  const is_valid_submission_date = isWithinInterval(submission_time, {
    start: start_deadline,
    end: end_deadline
  })
  if (!is_valid_submission_date) {
    ctx.reply(
      'Maaf, pengumpulan laporan praktikum Anda tidak sesuai dengan tenggat ' +
        'waktu yang telah ditentukan.'
    )
    next()
    return
  }

  // Case: exceeding file size limit
  // I'm not sure what telegram server use, base 2 or base 10
  const file_size_ceil_MB = Math.ceil(file_size / 1000000)
  if (file_size_ceil_MB > 10) {
    ctx.reply(
      'Maaf, ukuran maksimal berkas laporan praktikum yang diijinkan adalah ' +
        'sebesar 10 MB.',
      Extra.inReplyTo(message_id)
    )
    next()
    return
  }

  // Finally: save submission
  const final_filename =
    `${telegram_id}_${submission_timestamp}_${NIF}_${kode_praktikum}` +
    `_${nama_praktikan}.pdf`
  console.log('Receiving:', final_filename)
  saveSubmission(
    ctx,
    telegram_id,
    kode_praktikum,
    file_id,
    final_filename,
    submission_time
  )
}

module.exports = submission
