const { Router } = require('express');
const routes = Router();
const responseSender = require('./app/middleware/responseSender');

const PayeeController = require('./app/controllers/PayeeController');
const BankController = require('./app/controllers/BankController');

routes.get('/', ((req, res, next) => {
  res.locals.status = 200;
  res.locals.message = 'ok';
  return next();
}));

//Listagem de Payees
routes.post('/payees/:page?', (...args) =>
  PayeeController.list(...args));
routes.get('/payees/:page?', (...args) =>
  PayeeController.list(...args));

//Manutenção de payees
routes.get('/payee/:id', (...args) =>
  PayeeController.get(...args));
routes.post('/payee', (...args) =>
  PayeeController.create(...args));
routes.put('/payee/:id', (...args) =>
  PayeeController.update(...args));
routes.delete('/payee/:id', (...args) =>
  PayeeController.delete(...args));
routes.delete('/payee', (...args) =>
  PayeeController.deleteMany(...args));

//Banks
routes.get('/banks/:verb?', (...args) =>
  BankController.search(...args));
routes.get('/banks', (...args) =>
  BankController.all(...args));
routes.get('/bank/:cod', (...args) =>
  BankController.get(...args));

routes.all('*', ((req, res, next) => {
  if (!res.locals.status) {
    res.locals.status = 404;
  }

  return next();
}));

routes.use(responseSender());

module.exports = routes;
