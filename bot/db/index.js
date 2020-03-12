const Knex = require('knex')
const knexConfig = require('./knexfile')
const { Model } = require('objection')

// Load Model files from model folder
const Models = require('./models')

// Initiate knex
const knex = Knex(knexConfig.production)
// Bind Objection.js to knex
Model.knex(knex)

module.exports = {
  knex,
  Models
}
