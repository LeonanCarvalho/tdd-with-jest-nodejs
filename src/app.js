require('dotenv')
  .config({
    path: process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
  });
const express = require('express');
const helmet = require('helmet');

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json({ limit: '50mb' }));
    this.express.use(express.urlencoded({
      extended: true,
      limit: '50mb'
    }));
    this.express.use(helmet());
  }

  routes() {
    this.express.use('/', require('./routes'));
  }
}

module.exports = new AppController().express;
