const { Model } = require('objection')

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
        log_message: { type: 'string' },
        created_at: {
          type: 'integer',
          default: Date.now()
        }
      }
    }
  }
}

module.exports = Log