const { Router } = require('express');
const routes = Router();
const responseSender = require('./app/middleware/responseSender');

const FavorecidosController = require('./app/controllers/FavorecidosController');
const BancosController = require('./app/controllers/BancosController');

routes.get('/', ((req, res) => {
  res.status(200)
    .json({ message: 'ok' });
}));

//Listagem de Favorecidos
routes.post('/favorecidos/:page?', FavorecidosController.list);

//Manutenção de favorecidos
routes.get('/favorecido/:id', FavorecidosController.get);
routes.post('/favorecido', FavorecidosController.create);
routes.put('/favorecido', FavorecidosController.update);
routes.delete('/favorecido', FavorecidosController.delete);

//Bancos
routes.get('/banco/:verb', BancosController.search);

routes.use(responseSender());

module.exports = routes;
