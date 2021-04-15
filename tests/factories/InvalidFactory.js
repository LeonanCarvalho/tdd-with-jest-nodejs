const faker = require('faker-br');

module.exports = {
  payee: {
    id: () => {
      return faker.helpers.randomize(['invalidId', '@']);
    },
    name: () => {
      return '';
    },
    doc: () => {
      return '155.855.073-62';
    },
    email: () => {
      return 'meu email#ynail.com';
    },
    cod_bank: () => {
      return '9999999999999';
    },
    agency: () => {
      return faker.finance.bitcoinAddress();
    },
    agency_digit: () => {
      return faker.finance.bitcoinAddress();
    },
    account: () => {
      return faker.finance.bitcoinAddress();
    },
    account_digit: () => {
      return faker.finance.bitcoinAddress();
    },
    account_type: () => {
      return faker.finance.bitcoinAddress();
    },
    status: () => {
      return faker.finance.bitcoinAddress();
    }
  }
};
