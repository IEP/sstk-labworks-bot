const { Model } = require('objection')
const { formatISO } = require('date-fns')

class Submission extends Model {
  static get tableName() {
    return 'submission'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['telegram_id', 'filename'],
      properties: {
        telegram_id: { type: 'integer' },
        filename: { type: 'string' }
      }
    }
  }

  static get relationMappings() {
    const Mahasiswa = require('./Mahasiswa')
    return {
      mahasiswa: {
        relation: Model.BelongsToOneRelation,
        modelClass: Mahasiswa,
        join: {
          from: 'submission.telegram_id',
          to: 'mahasiswa.telegram_id'
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