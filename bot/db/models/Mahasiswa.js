const { Model } = require('objection')

class Mahasiswa extends Model {
  static get tableName() {
    return 'mahasiswa'
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