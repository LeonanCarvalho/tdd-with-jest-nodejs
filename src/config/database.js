module.exports = {
  /*host: '127.0.0.1',
  username: 'docker',
  password: 'docker',
  database: 'test',
  dialect: 'postgres',*/
  dialect: 'sqlite',
  storage: './dev.db',
  operatorsAliases: false,
  logging: false,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true
  }
}
