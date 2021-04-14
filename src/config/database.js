require('dotenv')
  .config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
  });

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'sqlite',
  storage: process.env.NODE_ENV === 'test' ? './tests/data.sqlite' : './dev.sqlite',
  logging: false,
  define: {
    timestamp: false,
    createdAt: false,
    updatedAt: false,
    underscored: true,
    underscoredAll: true
  }
};
