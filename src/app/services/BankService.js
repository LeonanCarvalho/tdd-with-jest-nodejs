/**
 * Payee Model
 * @param sequilize
 * @param DataTypes
 */

const jp = require('jsonpath');
const { insensitiveFilter, strictFilter } = require('../utils/ArrayUtils');
const { Banks } = require('../data/banks');
const { Validator } = require('jsonschema');

class BankService {

  async all() {
    return Banks;
  }

  async get(cod) {
    const bank = strictFilter(Banks, 'cod', `${cod}`);
    if (!bank || bank.length === 0) {
      this.errorEmitter('The Bank code provided is invalid');
    }
    return bank[0];
  }

  async search(verb) {
    let result;

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

  async getScheme(cod, path) {
    const bank = await this.get(cod);
    const { scheme } = bank;
    return jp.query(scheme, path)[0] || {};
  }

  validateScheme(value, scheme) {
    const v = new Validator();
    const validation = v.validate(value, scheme);

    if (validation.errors && validation.errors.length > 0) {
      let msg = '';

      let i = 0;
      const len = validation.errors.length;
      while (i < len) {
        const error = validation.errors[i];
        msg += error.message + '\n';
        i++;
      }

      throw new Error(`Validation error for ${value}: \n ${msg}`);

    }

    return true;

  }

  errorEmitter(msg) {
    throw new TypeError(msg);
  }

  async validateAgency(cod, agencyValue) {
    const scheme = await this.getScheme(cod, '$.agency');
    return this.validateScheme(agencyValue, scheme);
  }

  async validateAgencyDigit(cod, agencyDigitValue) {
    const scheme = await this.getScheme(cod, '$.agency.digit');
    return this.validateScheme(agencyDigitValue, scheme);
  }

  async validateAccount(cod, accountValue) {
    const scheme = await this.getScheme(cod, '$.account');
    return this.validateScheme(accountValue, scheme);
  }

  async validateAccountDigit(cod, accountDigit) {
    const scheme = await this.getScheme(cod, '$.account.digit');
    return this.validateScheme(accountDigit, scheme);
  }

  async validateAccountType(cod, accountType) {
    const bank = await this.get(cod);

    const { scheme } = bank;

    const isValid = scheme.accountType.allowedTypes.indexOf(accountType) !== -1;

    if (!isValid) {
      let msg = 'Invalid Account Type, allowed values: \n';
      msg += scheme.accountType.allowedTypes.join('\n');
      throw new Error(msg);
    }

    return isValid;
  }

}

module.exports = new BankService();
