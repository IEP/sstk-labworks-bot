
exports.up = function(knex) {
  return knex.schema
    .createTable('mahasiswa', table => {
      table.integer('telegram_id').primary()
      table.text('email')
      table.timestamp('verified_at').defaultTo(knex.fn.now())
    })
    .createTable('log', table => {
      table.increments('id').primary()
      table.string('category')
      table.text('log_message')
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
    .createTable('submission', table => {
      table.increments('id').primary()
      table.integer('telegram_id').references('mahasiswa.telegram_id')
      table.string('filename')
      table.timestamp('submitted_at').defaultTo(knex.fn.now())
    })
    .createTable('deadline', table => {
      table.increments('id').primary()
      table.string('kode_praktikum') // PKD01, PSD04
      table.datetime('start').defaultTo(knex.fn.now())
      table.datetime('end') // deadline
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('mahasiswa')
    .dropTable('log')
    .dropTable('submission')
    .dropTable('deadline')
};
