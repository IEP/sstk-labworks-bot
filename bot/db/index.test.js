const Knex = require('knex')
const knexConfig = require('./knexfile')
const { Model } = require('objection')
const knex = Knex(knexConfig.development)
Model.knex(knex)

const Models = require('./models')
const { Deadline, Log, Mahasiswa, Submission } = Models

// Migration file
const migration = require('./migrations/20200224185139_initial_database')

beforeAll(async () => {
  await migration.down(knex)
  await migration.up(knex)
})

afterAll(async () => {
  knex.destroy()
})

describe('testing database', () => {
  describe('deadline', () => {
    test('insert and check deadline', async () => {
      await Deadline.query().insert({
        kode_praktikum: 'PPK01',
        start: Date.now(),
        end: Date.now() + 7 * 24 * 3600 * 1000 // timestamp stored in ms
      })
      const psd = await Deadline.query().insert({
        kode_praktikum: 'PSD01',
        start: Date.now(),
        end: Date.now() + 14 * 24 * 3600 * 1000
      })
      await Deadline.query().insert({
        kode_praktikum: 'PKD04',
        start: Date.now(),
        end: Date.now() + 21 * 24 * 3600 * 1000
      })
      const all = await Deadline.query()
      expect(all).toHaveLength(3)
      expect(psd).toEqual(all[1])
    })
  
    test('delete deadline', async () => {
      await Deadline.query()
        .delete()
        .where('kode_praktikum', 'PSD01')
      const all = await Deadline.query()
        .select('kode_praktikum')
      expect(all).toHaveLength(2)
      const kode_praktikum = all.map(item => item.kode_praktikum)
      expect(kode_praktikum).not.toContain('PSD01')
    })
  })
})