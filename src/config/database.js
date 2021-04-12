require('dotenv').config({
  path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.NODE_ENV == 'test' ? './tests/data.db' : './dev.db',
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
}
