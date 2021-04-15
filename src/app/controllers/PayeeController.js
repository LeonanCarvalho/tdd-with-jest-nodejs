const { Op } = require('sequelize');
const { Payee } = require('../models');
const { paginate } = require('../utils/SequelizeUtils');

class PayeeController {

  validateId(paramId) {
    return paramId && !isNaN(paramId);
  }

  normalizeId(paramId) {
    const id = parseInt(paramId);
    if (this.validateId(id)) {
      return id;
    }
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

    const { payee } = req.body;
    try {
      if (!payee) {
        this.emitError('The Payee data is invalid');
      }
      const storedPayee = await Payee.create(payee);

      if (!storedPayee) {
        this.emitError('Error to save Payee data');
      }

      result = { payee: storedPayee };
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
        this.emitError('O ID do Payee está incorreto');
      }

      if (!this.validateId(id)) {
        this.emitError('O ID do Payee está inválido');
      }

      const { payee } = req.body;

      if (!payee) {
        this.emitError('The Payee data is invalid');
      }

      const condition = { where: { id: id } };
      const storedPayee = await Payee.findOne(condition);

      if (!storedPayee) {
        this.emitError('Payee não encontrado');
      }

      const updatedPayee = await storedPayee.update(payee);

      if (!updatedPayee) {
        this.emitError('Falha ao atualizar payee');
      }

      result = { payee: updatedPayee };

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
        this.emitError('O ID do Payee está incorreto');
      }

      if (!this.validateId(id)) {
        this.emitError('O ID do Payee está inválido');
      }
      const condition = { where: { id: id } };
      const deletedRecord = await Payee.destroy(condition);
      if (deletedRecord === 1) {
        res.locals.status = 200;
        res.locals.message = 'Payee Excluido com Sucesso';
      } else {
        this.emitError('Payee não encontrado');
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
      const { payees } = req.body;

      if (!payees) {
        this.emitError('The Payee data is invalid');
      }

      console.log(payees);

      let self = this;
      console.log(self);
      const sanitized = payees
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
        result.deletedRecord = await Payee.destroy(condition);
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
        this.emitError('O ID do Payee está incorreto');
      }

      if (!this.validateId(id)) {
        this.emitError('O ID do Payee está inválido');
      }

      const payee = await Payee.findOne({ where: { id: id } });
      res.locals.status = (payee) ? 200 : 404;
      result = { payee: payee };
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
    const searchableFields = ['name', 'doc', 'agency', 'account'];

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
      const payees = await Payee.findAndCountAll(
        paginate(query,
          {
            page,
            pageSize
          }
        )
      );
      res.locals.status = (payees) ? 200 : 404;
      const total = payees.count || 0;
      const totalPages = Math.ceil(total / pageSize);
      result = {
        ...{
          totalPages: totalPages,
          page: page + 1
        }, ...payees
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

module.exports = new PayeeController();