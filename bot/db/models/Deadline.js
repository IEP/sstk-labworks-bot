const { Model } = require('objection')
const { add, formatISO } = require('date-fns')

class Deadline extends Model {
  static get tableName() {
    return 'deadline'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['kode_praktikum', 'start', 'end'],
      properties: {
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

  static get relationMappings() {
    const Submission = require('./Submission')
    return {
      submission: {
        relation: Model.HasManyRelation,
        modelClass: Submission,
        join: {
          from: 'deadline.kode_praktikum',
          to: 'submission.kode_praktikum'
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