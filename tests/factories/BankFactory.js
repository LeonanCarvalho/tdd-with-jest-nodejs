const jsf = require('json-schema-faker');
const { Validator } = require('jsonschema');
const { strictFilter } = require('../../src/app/utils/ArrayUtils');
const { Banks } = require('../../src/app/data/banks');

class BankFactory {

  constructor(cod) {
    this.validator = new Validator();
    this.bank = strictFilter(Banks, 'cod', `${cod}`)[0];
    if (!this.bank) {
      throw new TypeError('The bank cod provided is invalid');
    }
  }

  validateScheme(value, scheme) {
    const validation = this.validator.validate(value, scheme);

    return !(validation.errors && validation.errors.length > 0);
  }

  generate(schema, tries = 0) {
    const value = jsf.generate(schema);

    if (!this.validateScheme(value, schema)) {
      return `${value}`.replace('0', '1');
    }

    return value;
  }

  agency() {
    const { agency } = this.bank.scheme;
    let schema = {
      type: 'string',
      maxLength: agency.maxLength,
      pattern: agency.pattern,
    };
    return this.generate(schema);
  }

  agencyDigit() {
    const { agency } = this.bank.scheme;
    let schema = {
      type: 'string',
      ...agency.digit
    };
    return this.generate(schema);
  }

  account() {
    const { account } = this.bank.scheme;
    let schema = {
      type: 'string',
      maxLength: account.maxLength,
      pattern: account.pattern,
    };
    return this.generate(schema);
  }

  accountDigit() {
    const { account } = this.bank.scheme;
    let schema = {
      type: 'string',
      ...account.digit,
    };
    return this.generate(schema);
  }

  accountType() {
    const { scheme } = this.bank;
    const random = Math.floor(Math.random() * scheme.accountType.allowedTypes.length);
    return scheme.accountType.allowedTypes[random];
  }

}

module.exports = BankFactory;
