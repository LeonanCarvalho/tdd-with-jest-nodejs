/**
 * Payee Model
 * @param sequilize
 * @param DataTypes
 */

const { insensitiveFilter, strictFilter } = require('../utils/ArrayUtils');
const { Banks } = require('../data/banks');

class BankService {

  async all() {
    return Banks;
  }

  async get(cod) {
    let bank = strictFilter(Banks, 'cod', `${cod}`);
    if (!bank || bank.length == 0) {
      throw new Error('The bank cod provided is invalid');
    }
    return bank[0];
  }

  async search(verb) {
    let result = [];

    if (verb) {
      result = [...new Set([
        ...insensitiveFilter(Banks, 'cod', verb),
        ...insensitiveFilter(Banks, 'name', verb)
      ])
      ];
    } else {
      result = Banks;
    }

    return result;
  }

  async validateAgency(cod, agency) {
    const bank = await this.get(cod);
    if (!bank) {
      throw new TypeError('The bank cod provided is invalid');
    }
  }

  async validateAgencyDigit(cod, agency_digit) {
    const bank = await this.get(cod);
    if (!bank) {
      throw new TypeError('The bank cod provided is invalid');
    }
  }

  async validateAccount(cod, account) {
    const bank = await this.get(cod);
    if (!bank) {
      throw new TypeError('The bank cod provided is invalid');
    }
  }

  async validateAccountDigit(cod, account_digit) {
    const bank = await this.get(cod);
    if (!bank) {
      throw new TypeError('The bank cod provided is invalid');
    }
  }
}

module.exports = new BankService();
