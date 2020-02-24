const { Model } = require('objection')

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
        filename: { type: 'string' },
        submitted_at: {
          type: 'integer',
          default: Date.now()
        }
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
}

module.exports = Submission