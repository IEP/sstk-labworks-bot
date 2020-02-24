const { Model } = require('objection')

class Mahasiswa extends Model {
  static get tableName() {
    return 'mahasiswa'
  }

  static get idColumn() {
    return 'telegram_id'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['telegram_id', 'email'],
      properties: {
        telegram_id: { type: 'number' },
        email: { type: 'string' },
        verified_at: {
          type: 'number',
          default: Date.now()
        }
      }
    }
  }

  static get relationMappings() {
    const Submission = require('./Submission')
    return {
      submission: {
        relation: Model.HasManyRelation,
        modelClass: Submission,
        join: {
          from: 'mahasiswa.telegram_id',
          to: 'submission.telegram_id'
        }
      }
    }
  }
}

module.exports = Mahasiswa