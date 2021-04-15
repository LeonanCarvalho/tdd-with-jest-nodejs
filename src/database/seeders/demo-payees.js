const faker = require('faker-br');

const PayeeFactory = require('../../../tests/factories/PayeeFactory');

module.exports = {
  up: async (queryInterface) => {

    const payees = [];
    let i = 0;
    while (i < 100) {
      const type = faker.helpers.randomize(['PF', 'PJ']);
      const payee = PayeeFactory[`get${type}`]();
      payees.push(payee);
      i++;
    }

    return queryInterface.bulkInsert('payees', payees, { validate: true })
      .catch(err => {
        console.log(err);
      });

  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('payees', null, {});
  }
};
