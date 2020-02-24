const { Model } = require('objection')

class Deadline extends Model {
  static get tableName() {
    return 'deadline'
  }
}

module.exports = Deadline