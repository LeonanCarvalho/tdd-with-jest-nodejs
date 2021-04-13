const { Favorecido } = require('../models');
const { paginate } = require('../utils/SequelizeUtils');

class FavorecidosController {
  async create(req, res, next) {

    return res.status(200)
      .send();
  }

  async update(req, res, next) {

    return res.status(200)
      .send();
  }

  async delete(req, res, next) {
    return res.status(200)
      .send();
  }

  async get(req, res, next) {
    const id = parseInt(req.params.id);
    if (!id) {
      return res.status(400)
        .json({ message: 'O ID do Favorecido está incorreto' });
    }

    const favorecido = await Favorecido.findOne({ where: { id: id } });

    if (!favorecido) {
      return res.status(404)
        .json({ message: 'Favorecido não encontrado' });
    }
    return res.status(200)
      .json({
        favorecido
      });
  }

  async list(req, res, next) {
    const pageSize = 10;
    let offset = 0;

    if (req.params.page) {
      offset = parseInt(req.params.page) - 1;
      if (offset < 0) {
        offset = 0;
      }
    }

    try {
      const result = await Favorecido.findAndCountAll(
        paginate({},
          {
            offset,
            pageSize
          }
        )
      );
      res.locals.status = 200;
      res.locals.result = result;
    } catch (err) {
      res.locals.status = 500;
      res.locals.message = err.message();
    } finally {
      return next();
    }

  }
}

module.exports = new FavorecidosController();
