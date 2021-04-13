/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */

const { promisify } = require('util');

const { Bancos } = require('../data/bancos');

class BancoController {

  isValidAgency(agency) {
    console.log(this.scheme.agency);
    return true;
  }

  isValidAccount(account) {
    console.log(this.scheme.agency);
    return true;
  }

  async search(req, res, next) {
    const verb = req.params.verb || null;
    let result = [];

    const filter = (field, toSearch) => {
      return Bancos.filter(o => {
        return o[field].includes(toSearch);
      });
    };

    if (verb) {
      result = [...new Set([
        ...filter('cod', verb),
        ...filter('name', verb)])
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
