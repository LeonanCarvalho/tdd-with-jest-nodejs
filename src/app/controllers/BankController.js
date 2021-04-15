const BankService = require('../services/BankService');

class BankController {

  async all(req, res, next) {
    res.locals.status = 200;
    res.locals.result = await BankService.all();
    return next();
  }

  async get(req, res, next) {
    let result;
    try {
      const { cod } = req.params;
      result = await BankService.get(cod);
      res.locals.status = 200;
    } catch (err) {
      const { status, message } = this.handleErrors(err, 404);
      res.locals.status = status;
      res.locals.message = message;
    }
    res.locals.result = result;
    return next();
  }

  async search(req, res, next) {
    const verb = req.params.verb || null;
    const result = await BankService.search(verb);
    res.locals.status = 200;
    res.locals.result = result;
    return next();
  }

  handleErrors(err, statusCode = 400) {
    return {
      status: statusCode,
      message: err.message
    };
  }

}

module.exports = new BankController();
