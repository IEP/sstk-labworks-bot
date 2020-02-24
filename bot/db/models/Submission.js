const { Model } = require('objection')

class Submission extends Model {
  static get tableName() {
    return 'submission'
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