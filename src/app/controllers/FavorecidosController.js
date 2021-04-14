const { Op } = require('sequelize');
const { Favorecido } = require('../models');
const { paginate } = require('../utils/SequelizeUtils');

class FavorecidosController {

  validateId(paramId) {
    return paramId && !isNaN(paramId);
  }

  normalizeId(paramId) {
    const id = parseInt(paramId);
    if (this.validateId(id)) {
      return id;
    }
    return null;
  }

  emitError(msg) {
    throw new TypeError(msg);
  }

  handleErrors(err) {
    let response = {
      status: 400,
      messsage: '',
      errors: []
    };
    if (err.errors && err.errors.length > 0) {
      response.errors = err.errors.map(e => {
        return { [e.path]: e.message };
      });
    }
    response.status = 400;
    response.message = err.message;

    return response;
  }

  async create(req, res, next) {
    let result;

    const { favorecido } = req.body;
    try {
      if (!favorecido) {
        this.emitError('Dados do favorecido inválidos');
      }
      const storedFavorecido = await Favorecido.create(favorecido);

      if (!storedFavorecido) {
        this.emitError('Falha ao armazenar Favorecido');
      }

      result = { favorecido: storedFavorecido };
      res.locals.status = 200;
    } catch (err) {
      const { status, message, errors } = this.handleErrors(err);
      res.locals.status = status;
      res.locals.message = message;
      result = errors;
    }
    res.locals.result = result;
    return next();
  }

  async update(req, res, next) {
    let result;
    try {
      const { id } = req.params;

      if (!id) {
        this.emitError('O ID do Favorecido está incorreto');
      }

      if (!this.validateId(id)) {
        this.emitError('O ID do Favorecido está inválido');
      }

      const { favorecido } = req.body;

      if (!favorecido) {
        this.emitError('Dados do favorecido inválidos');
      }

      const condition = { where: { id: id } };
      const storedFavorecido = await Favorecido.findOne(condition);

      if (!storedFavorecido) {
        this.emitError('Favorecido não encontrado');
      }

      const updatedFavorecido = await storedFavorecido.update(favorecido);

      if (!updatedFavorecido) {
        this.emitError('Falha ao atualizar favorecido');
      }

      result = { favorecido: updatedFavorecido };

      res.locals.status = 200;
    } catch (err) {
      const { status, message, errors } = this.handleErrors(err);
      res.locals.status = status;
      res.locals.message = message;
      result = errors;
    }
    res.locals.result = result;
    return next();
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      if (!id) {
        this.emitError('O ID do Favorecido está incorreto');
      }

      if (!this.validateId(id)) {
        this.emitError('O ID do Favorecido está inválido');
      }
      const condition = { where: { id: id } };
      const deletedRecord = await Favorecido.destroy(condition);
      if (deletedRecord === 1) {
        res.locals.status = 200;
        res.locals.message = 'Favorecido Excluido com Sucesso';
      } else {
        this.emitError('Favorecido não encontrado');
      }
    } catch (err) {
      const { status, message, errors } = this.handleErrors(err);
      res.locals.status = status;
      res.locals.message = message;
      res.locals.result = errors;
    }
    return next();
  }

  async deleteMany(req, res, next) {
    let result = { 'deletedRecord': 0 };
    try {
      const { favorecidos } = req.body;

      if (!favorecidos) {
        this.emitError('Dados do favorecido inválidos');
      }

      console.log(favorecidos);

      let self = this;
      console.log(self);
      const sanitized = favorecidos
        .filter((id) => {
          return self.validateId(id);
        })
        .map((id) => {
          return self.normalizeId(id);
        });

      console.log(sanitized);

      if (sanitized.length > 0) {
        let condition = { where: { id: {} } };
        condition.where.id[Op.in] = sanitized;
        result.deletedRecord = await Favorecido.destroy(condition);
        res.locals.status = 200;
      } else {
        res.locals.status = 400;
        result.deletedRecord = 0;
      }

    } catch (err) {
      const { status, message, errors } = this.handleErrors(err);
      res.locals.status = status;
      res.locals.message = message;
      result = errors;
    }
    res.locals.result = result;

    return next();
  }

  async get(req, res, next) {
    let result;
    try {
      const { id } = req.params;
      if (!id) {
        this.emitError('O ID do Favorecido está incorreto');
      }

      if (!this.validateId(id)) {
        this.emitError('O ID do Favorecido está inválido');
      }

      const favorecido = await Favorecido.findOne({ where: { id: id } });
      res.locals.status = (favorecido) ? 200 : 404;
      result = { favorecido: favorecido };
    } catch (err) {
      const { status, message, errors } = this.handleErrors(err);
      res.locals.status = status;
      res.locals.message = message;
      result = errors;
    }
    res.locals.result = result;
    return next();
  }

  async list(req, res, next) {
    let result;
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
      const favorecidos = await Favorecido.findAndCountAll(
        paginate(query,
          {
            page,
            pageSize
          }
        )
      );
      res.locals.status = (favorecidos) ? 200 : 404;
      const total = favorecidos.count || 0;
      const totalPages = Math.ceil(total / pageSize);
      result = {
        ...{
          totalPages: totalPages,
          page: page + 1
        }, ...favorecidos
      };
    } catch (err) {
      const { status, message, errors } = this.handleErrors(err);
      res.locals.status = status;
      res.locals.message = message;
      result = errors;
    }
    res.locals.result = result;
    return next();
  }
}

module.exports = new FavorecidosController();
