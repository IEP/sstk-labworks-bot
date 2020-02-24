const Knex = require('knex')
const knexConfig = require('./knexfile')

const { Model } = require('objection')
const Models = require('./models')

const knex = Knex(knexConfig.production)
Model.knex(knex)

module.exports = {
  knex,
  Models
}