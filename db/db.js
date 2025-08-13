const knexConfig = require('../knexfile')
const knex = require('knex')

// Detect environment - prioritize CI environments
let nodeEnv = process.env.NODE_ENV || 'development'

// If we're in GitHub Actions or other CI, use appropriate config
if (process.env.CI || process.env.GITHUB_ACTIONS) {
  nodeEnv = 'ci'
}

// If NODE_ENV is 'test' or we detect test environment, use test config
if (nodeEnv === 'test' || process.env.NODE_ENV === 'test') {
  nodeEnv = 'test'
}

const config = knexConfig[nodeEnv]

if (!config) {
  throw new Error(`No database configuration found for environment: ${nodeEnv}`)
}

const db = knex(config)

module.exports = db
