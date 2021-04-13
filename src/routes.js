const { Router } = require('express');
const routes = Router();

const FavorecidosController = require('./app/controllers/FavorecidosController');

routes.get('/', ((req, res) => {
  res.status(200)
    .send('ok');
}));
routes.post('/favorecido', FavorecidosController.create);
routes.put('/favorecido', FavorecidosController.update);
routes.delete('/favorecido', FavorecidosController.delete);
routes.get('/favorecido/:id', FavorecidosController.get);
routes.get('/favorecidos/:page?', FavorecidosController.list);

module.exports = routes;
