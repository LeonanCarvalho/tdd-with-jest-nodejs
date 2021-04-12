const {Router} = require('express')
const routes = Router()

const FavorecidoController = require('./app/controllers/FavorecidoController')

routes.get('/', ((req, res) => {
    res.status(200).send('ok')
}))
routes.post ('/favorecido', FavorecidoController.create)
routes.put ('/favorecido', FavorecidoController.update)
routes.get ('/favorecido/list/:page?', FavorecidoController.list)
routes.delete ('/favorecido', FavorecidoController.delete)
routes.get ('/favorecido/:id', FavorecidoController.get)


module.exports = routes;
