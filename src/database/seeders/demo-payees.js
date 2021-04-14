const faker = require('faker-br');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let payees = [];

    for (let i = 0; i < 30; i++) {
      let type = faker.helpers.randomize(['PF', 'PJ']);

      payees.push({
        name: type === 'PF' ? faker.name.findName() : faker.company.companyName(),
        doc: type === 'PF' ? faker.br.cpf() : faker.br.cnpj(),
        email: faker.internet.email(),
        cod_bank: faker.helpers.randomize(['001', '104', '756', '237']),
        agency: faker.finance.account(),
        agency_digit: 1,
        account: faker.finance.account(),
        account_digit: 1,
        account_type: faker.helpers.randomize(['CONTA_CORRENTE', 'CONTA_POUPANCA']),
        status: faker.helpers.randomize(['Rascunho', 'Validado'])
      });

    }

    return queryInterface.bulkInsert('payees', payees, { validate: true })
      .catch(err => {
        console.log(err);
      });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('payees', null, {});
  }
};
