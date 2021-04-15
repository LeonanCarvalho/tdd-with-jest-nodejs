const faker = require('faker-br');

const PayeeFactory = require('../../../tests/factories/PayeeFactory');

module.exports = {
  up: async (queryInterface) => {

    let payees = [];

    for (let i = 0; i < 30; i++) {
      let type = faker.helpers.randomize(['PF', 'PJ']);
      const payee = PayeeFactory[`get${type}`]();
      payees.push(payee);

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
