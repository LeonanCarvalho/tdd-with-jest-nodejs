const BancoService = require('../services/BancoService');

class BancoController {

  async all(req, res, next) {
    res.locals.status = 200;
    res.locals.result = await BancoService.all();
    return next();
  }

  async get(req, res, next) {
    const cod = req.params.cod || null;
    const result = await BancoService.get(cod);

    if (!result) {
      res.locals.status = 404;
    } else {
      res.locals.status = 200;
    }

    res.locals.result = result;
    return next();
  }

  async search(req, res, next) {
    const verb = req.params.verb || null;
    const result = await BancoService.search(verb);
    res.locals.status = 200;
    res.locals.result = result;
    return next();
  }

}

module.exports = new BancoController();
