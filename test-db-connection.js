const db = require('./db/db')

async function testConnection() {
  try {
    console.log('Testing database connection...')
    console.log('Environment:', process.env.NODE_ENV || 'development')
    console.log('CI detected:', !!process.env.CI)
    console.log('GitHub Actions detected:', !!process.env.GITHUB_ACTIONS)

    await db.raw('SELECT 1 as test')
    console.log('✅ Database connection successful!')

    // Test if tables exist
    const tables = await db.raw(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
    )
    console.log(
      '📋 Available tables:',
      tables.rows.map((r) => r.tablename)
    )

    // Test migration status
    try {
      const migrations = await db('knex_migrations').select('*')
      console.log('🔄 Migrations applied:', migrations.length)
    } catch (e) {
      console.log(
        '⚠️ Migration table not found - migrations may need to be run'
      )
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('Connection details:')
    console.error('- Host:', db.client.config.connection.host)
    console.error('- Port:', db.client.config.connection.port)
    console.error('- User:', db.client.config.connection.user)
    console.error('- Database:', db.client.config.connection.database)
    process.exit(1)
  }
}

testConnection()
