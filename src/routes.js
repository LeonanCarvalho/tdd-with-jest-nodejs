const { Router } = require('express');
const routes = Router();
const responseSender = require('./app/middleware/responseSender');

const FavorecidosController = require('./app/controllers/FavorecidosController');
const BancosController = require('./app/controllers/BancosController');

routes.get('/', ((req, res, next) => {
  res.locals.status = 200;
  res.locals.message = 'ok';
  return next();
}));

//Listagem de Favorecidos
routes.post('/favorecidos/:page?', (...args) =>
  FavorecidosController.list(...args));
routes.get('/favorecidos/:page?', (...args) =>
  FavorecidosController.list(...args));

//Manutenção de favorecidos
routes.get('/favorecido/:id', (...args) =>
  FavorecidosController.get(...args));
routes.post('/favorecido', (...args) =>
  FavorecidosController.create(...args));
routes.put('/favorecido', (...args) =>
  FavorecidosController.update(...args));
routes.delete('/favorecido/:id', (...args) =>
  FavorecidosController.delete(...args));
routes.delete('/favorecido', (...args) =>
  FavorecidosController.deleteMany(...args));

//Bancos
routes.get('/bancos/:verb?', (...args) =>
  BancosController.search(...args));
routes.get('/bancos', (...args) =>
  BancosController.all(...args));
routes.get('/banco/:cod', (...args) =>
  BancosController.get(...args));

routes.all('*', ((req, res, next) => {
  if (!res.locals.status) {
    res.locals.status = 404;
  }

  return next();
}));

routes.use(responseSender());

module.exports = routes;
