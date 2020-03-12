const Knex = require('knex')
const knexConfig = require('./knexfile')
const { Model } = require('objection')
const knex = Knex(knexConfig.development)
Model.knex(knex)

const { add, formatISO } = require('date-fns')

const Models = require('./models')
const { Deadline, Mahasiswa, Submission } = Models

// Migration file
const migration = require('./migrations/20200224185139_initial_database')

beforeAll(async () => {
  // Drop tables
  await migration.down(knex)
  // Create tables
  await migration.up(knex)
})

afterAll(async () => {
  // Close database connection
  knex.destroy()
})

describe('testing database', () => {
  // describe('deadline', () => {
  //   test('insert and check deadline', async () => {
  //     await Deadline.query().insert({
  //       kode_praktikum: 'PPK01',
  //       start: formatISO(new Date()),
  //       end: formatISO(add(new Date(), {
  //         days: 7
  //       }))
  //     })
  //     const psd = await Deadline.query().insertAndFetch({
  //       kode_praktikum: 'PSD01',
  //       start: formatISO(new Date()),
  //       end: formatISO(add(new Date(), {
  //         days: 14
  //       }))
  //     })
  //     await Deadline.query().insert({
  //       kode_praktikum: 'PKD04',
  //       start: formatISO(new Date()),
  //       end: formatISO(add(new Date(), {
  //         days: 21
  //       }))
  //     })
  //     const all = await Deadline.query()
  //     expect(all).toHaveLength(3)
  //     expect(psd).toEqual(all[1])
  //     // console.log(psd, all[1])
  //   })

  //   test('delete deadline', async () => {
  //     await Deadline.query()
  //       .delete()
  //       .where('kode_praktikum', 'PSD01')
  //     const all = await Deadline.query()
  //       .select('kode_praktikum')
  //     expect(all).toHaveLength(2)
  //     const kode_praktikum = all.map(item => item.kode_praktikum)
  //     expect(kode_praktikum).not.toContain('PSD01')
  //   })
  // })

  describe('mahasiswa', () => {
    test('double insert', async () => {
      await Mahasiswa.query().insert({
        telegram_id: 1234,
        email: 'a@a.com'
      })
      // Trying to insert same mahasiswa again
      try {
        await Mahasiswa.query().insert({
          telegram_id: 1234,
          email: 'b@a.com'
        })
      } catch (err) {
        expect(err.name).toBe('UniqueViolationError')
      }
    })
  })

  describe('submission', () => {
    test('test submission', async () => {
      await Submission.query().insert({
        telegram_id: 1234,
        filename: '12345_PKD01_Hehe.pdf'
      })
    })
  })
})
