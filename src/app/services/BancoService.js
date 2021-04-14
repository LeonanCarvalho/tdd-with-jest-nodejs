/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */

const { insensitiveFilter, strictFilter } = require('../utils/ArrayUtils');
const { Bancos } = require('../data/bancos');

class BancoService {

  async all() {
    return Bancos;
  }

  async get(cod) {
    let result = strictFilter(Bancos, 'cod', `${cod}`);
    return result[0] || null;
  }

  async search(verb) {
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

    return result;
  }

}

module.exports = new BancoService();
