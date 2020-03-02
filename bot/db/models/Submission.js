const { Model } = require('objection')
const { formatISO } = require('date-fns')

class Submission extends Model {
  static get tableName() {
    return 'submission'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['telegram_id', 'kode_praktikum', 'filename'],
      properties: {
        telegram_id: { type: 'integer' },
        kode_praktikum: { type: 'string' },
        filename: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Mahasiswa = require('./Mahasiswa')
    const Deadline = require('./Deadline')
    return {
      mahasiswa: {
        relation: Model.BelongsToOneRelation,
        modelClass: Mahasiswa,
        join: {
          from: 'submission.telegram_id',
          to: 'mahasiswa.telegram_id'
        }
      },
      deadline: {
        relation: Model.BelongsToOneRelation,
        modelClass: Deadline,
        join: {
          from: 'submission.kode_praktikum',
          to: 'deadline.kode_praktikum'
        }
      }
    }
  }

  $beforeInsert() {
    this.created_at = formatISO(new Date())
  }

  $beforeUpdate() {
    this.updated_at = formatISO(new Date())
  }
}

module.exports = Submission