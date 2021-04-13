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

routes.all('*', ((req, res, next) => {
  res.locals.status = 404;
  return next();
}));

//Listagem de Favorecidos
routes.post('/favorecidos/:page?', FavorecidosController.list);
routes.get('/favorecidos/:page?', FavorecidosController.list);

//Manutenção de favorecidos
routes.get('/favorecido/:id', FavorecidosController.get);
routes.post('/favorecido', FavorecidosController.create);
routes.put('/favorecido', FavorecidosController.update);
routes.delete('/favorecido', FavorecidosController.delete);

//Bancos
routes.get('/bancos/:verb?', BancosController.search);
routes.get('/bancos', BancosController.all);
routes.get('/banco/:cod', BancosController.get);

routes.use(responseSender());

module.exports = routes;
