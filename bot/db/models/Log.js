const { Model } = require('objection')

class Log extends Model {
  static get tableName() {
    return 'log'
  }
}

module.exports = Log