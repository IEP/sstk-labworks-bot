
exports.up = function(knex) {
  return knex.schema
    .createTable('mahasiswa', table => {
      table.integer('telegram_id').primary()
      table.text('email')
      table.timestamps()
    })
    .createTable('deadline', table => {
      table.string('kode_praktikum').primary() // PKD01, PSD04
      table.datetime('start').defaultTo(knex.fn.now())
      table.datetime('end') // deadline
      table.timestamps()
    })
    .createTable('submission', table => {
      table.increments('id').primary()
      table.integer('telegram_id').references('mahasiswa.telegram_id')
      table.string('kode_praktikum').references('deadline.kode_praktikum')
      table.string('filename')
      table.timestamps()
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('submission')
    .dropTable('mahasiswa')
    .dropTable('deadline')
};
