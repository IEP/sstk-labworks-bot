const { Model } = require('objection')
const { add, formatISO } = require('date-fns')

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
          type: 'string',
          default: formatISO(new Date())
        },
        end: {
          type: 'string',
          default: formatISO(add(new Date(), {
            hours: 1
          }))
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

module.exports = Deadline