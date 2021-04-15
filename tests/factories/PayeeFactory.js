const faker = require('faker-br');
const { factory } = require('factory-girl');
const { Payee } = require('../../src/app/models');

const BankFactory = require('../factories/BankFactory');

factory.define('PayeePF', Payee, () => {
    return factory.getPF();
});

factory.define('PayeePJ', Payee, () => {
    return factory.getPJ();
});

factory.getPF = () => {
    const cod = faker.helpers.randomize(['001', '104', '756', '237']);
    const bank = new BankFactory(cod);

    return {
        name: faker.name.findName(),
        doc: faker.br.cpf(),
        email: faker.internet.email(),
        cod_bank: cod,
        agency: bank.agency(),
        agency_digit: bank.agencyDigit(),
        account: bank.account(),
        account_digit: bank.accountDigit(),
        account_type: bank.accountType(),
        status: faker.helpers.randomize(['Rascunho', 'Validado'])
    };
};
factory.getPJ = () => {
    const cod = faker.helpers.randomize(['001', '104', '756', '237']);
    const bank = new BankFactory(cod);

    return {
        name: faker.company.companyName(),
        doc: faker.br.cnpj(),
        email: faker.internet.email(),
        cod_bank: cod,
        agency: bank.agency(),
        agency_digit: bank.agencyDigit(),
        account: bank.account(),
        account_digit: bank.accountDigit(),
        account_type: bank.accountType(),
        status: faker.helpers.randomize(['Rascunho', 'Validado'])
    };
};

module.exports = factory;
