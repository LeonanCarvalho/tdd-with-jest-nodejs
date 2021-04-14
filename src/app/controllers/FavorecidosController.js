const { Op } = require('sequelize');
const { Favorecido } = require('../models');
const { paginate } = require('../utils/SequelizeUtils');

class FavorecidosController {
  validateId(paramId) {
    const id = parseInt(paramId);
    if (!id || isNaN(id)) {
      return false;
    }
    return id;
  }

  async create(req, res, next) {

    res.locals.message = 'TODO';
    return next();
  }

  async update(req, res, next) {
    res.locals.message = 'TODO';
    return next();
  }

  async delete(req, res, next) {
    const id = this.validateId(req.params.id);
    if (!id) {
      res.locals.status = 400;
      res.locals.message = 'O ID do Favorecido está incorreto';
    } else {
      const condition = { where: { id: id } };
      const deletedRecord = await Favorecido.destroy(condition);
      if (deletedRecord === 1) {
        res.locals.status = 200;
        res.locals.message = 'Favorecido Excluido com Sucesso';
      } else {
        res.locals.status = 404;
      }
    }
    return next();
  }

  async deleteMany(req, res, next) {
    let result = { 'deletedRecord': 0 };
    if (req.body.favorecidos && req.body.favorecidos.length > 0) {

      const sanitized = req.body.favorecidos.filter(id => {
        return !!this.validateId(id);
      })
        .map(this.validateId);

      if (sanitized.length > 0) {
        let condition = { where: { id: {} } };
        condition.where.id[Op.in] = sanitized;
        result.deletedRecord = await Favorecido.destroy(condition);
        res.locals.status = 200;
      } else {
        res.locals.status = 400;
        result.deletedRecord = 0;
      }
    }
    res.locals.result = result;
    return next();
  }

  async get(req, res, next) {
    let result;
    const id = this.validateId(req.params.id);
    if (id) {
      result = await Favorecido.findOne({ where: { id: id } });
      res.locals.status = (result) ? 200 : 404;
    } else {
      res.locals.status = 400;
      res.locals.message = 'O ID do Favorecido está incorreto';
    }
    res.locals.result = result;
    return next();
  }

  async list(req, res, next) {
    const pageSize = 10;
    const searchableFields = ['name', 'doc', 'agencia', 'conta'];

    let page = 0;

    if (req.params.page) {
      page = parseInt(req.params.page) - 1;
      if (page < 0 || isNaN(page)) {
        page = 0;
      }
    }

    const query = { where: {} };
    if (req.body.search) {
      let i = 0;
      let filter = [];
      while (i < searchableFields.length) {
        const field = searchableFields[i];
        let f = {};
        f[field] = {};
        f[field][Op.substring] = req.body.search;
        filter.push(f);
        i++;
      }
      query.where[Op.or] = filter;
    }

    try {
      const result = await Favorecido.findAndCountAll(
        paginate(query,
          {
            page,
            pageSize
          }
        )
      );
      res.locals.status = (result) ? 200 : 404;
      const total = result.count || 0;
      const totalPages = Math.ceil(total / pageSize);
      res.locals.result = {
        ...{
          totalPages: totalPages,
          page: page + 1
        }, ...result
      };
    } catch (err) {
      res.locals.status = 500;
      res.locals.message = 'Internal Server Error';
    }

    return next();
  }
}

module.exports = new FavorecidosController();
