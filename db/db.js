const knexConfig = require('../knexfile')
const knex = require('knex')

let nodeEnv = process.env.NODE_ENV || 'development'

if (process.env.CI || process.env.GITHUB_ACTIONS) {
  nodeEnv = 'ci'
}

if (nodeEnv === 'test' || process.env.NODE_ENV === 'test') {
  nodeEnv = 'test'
}

const config = knexConfig[nodeEnv]

if (!config) {
  throw new Error(`No database configuration found for environment: ${nodeEnv}`)
}

const db = knex(config)

module.exports = db
