const jsf = require('json-schema-faker');
const { strictFilter } = require('../utils/ArrayUtils');
const { Banks } = require('../../src/app/data/banks');

class bankFactory {

  constructor(cod) {
    this.bank = strictFilter(Banks, 'cod', `${cod}`);
    if (this.bank) {
      throw new TypeError('The bank cod provided is invalid');
    }
  }

  agency() {
    this.bank.agency;
  }

  agencyDigit() {
  }

  account() {
  }

  accountDigit() {
  }

}

module.exports = new bankFactory();
