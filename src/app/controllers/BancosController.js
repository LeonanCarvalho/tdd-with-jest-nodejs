/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */

const { insensitiveFilter, strictFilter } = require('../utils/ArrayUtils');
const { Bancos } = require('../data/bancos');

class BancoController {

  all(req, res, next) {
    res.locals.status = 200;
    res.locals.result = Bancos;
    return next();
  }

  async get(req, res, next) {

    const cod = req.params.cod || null;
    let result = strictFilter(Bancos, 'cod', `${cod}`);

    if (result.length == 0) {
      res.locals.status = 404;
    } else {
      res.locals.status = 200;
    }

    res.locals.result = result[0];
    return next();
  }

   search(req, res, next) {
     const verb = req.params.verb || null;
     let result = [];

     if (verb) {
       result = [...new Set([
         ...insensitiveFilter(Bancos, 'cod', verb),
         ...insensitiveFilter(Bancos, 'name', verb)
       ])
       ];
     } else {
      result = Bancos;
    }

    res.locals.status = 200;
    res.locals.result = result;
    return next();
  }

}

module.exports = new BancoController();
