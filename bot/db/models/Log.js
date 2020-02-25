const { Model } = require('objection')
const { formatISO } = require('date-fns')

class Log extends Model {
  static get tableName() {
    return 'log'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['category', 'log_message'],
      properties: {
        id: { type: 'integer' },
        category: { type: 'string' },
        log_message: { type: 'string' }
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

module.exports = Log