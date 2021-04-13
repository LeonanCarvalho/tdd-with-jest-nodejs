const faker = require('faker-br');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let favorecidos = [];

    for (let i = 0; i < 30; i++) {
      let type = faker.helpers.randomize(['PF', 'PJ']);

      favorecidos.push({
        name: type === 'PF' ? faker.name.findName() : faker.company.companyName(),
        doc: type === 'PF' ? faker.br.cpf() : faker.br.cnpj(),
        email: faker.internet.email(),
        cod_banco: faker.helpers.randomize(['001', '104', '756', '237']),
        agencia: faker.finance.account(),
        agencia_digito: 1,
        conta: faker.finance.account(),
        conta_digito: 1,
        status: faker.helpers.randomize(['Rascunho', 'Validado'])
      });

    }

    return queryInterface.bulkInsert('favorecidos', favorecidos, { validate: true })
      .catch(err => {
        console.log(err);
      });

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('favorecidos', null, {});
  }
};
