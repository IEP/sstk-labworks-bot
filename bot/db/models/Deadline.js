const { Model } = require('objection')

class Deadline extends Model {
  static get tableName() {
    return 'deadline'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['kode_praktikum'],
      properties: {
        id: { type: 'integer' },
        kode_praktikum: { type: 'string' },
        start: {
          type: 'integer',
          default: Date.now()
        },
        end: {
          type: 'integer',
          default: Date.now() + 3600 * 1000
        }
      }
    }
  }
}

module.exports = Deadline