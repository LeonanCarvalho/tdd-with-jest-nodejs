const faker = require('faker-br')
const {factory} = require('factory-girl')
const {Favorecido} = require('./../src/app/models')


factory.define('FavorecidoPF', Favorecido, {
    name: faker.name.findName(),
    doc: faker.br.cpf(),
    email: faker.internet.email(),
    cod_banco: faker.helpers.randomize(['001', '104', '756', '237']),
    agencia: faker.finance.account(),
    agencia_digito: 1,
    conta: faker.finance.account(),
    conta_digito: 1,
    status: faker.helpers.randomize(['Rascunho', 'Validado'])
})

factory.define('FavorecidoPJ', Favorecido, {
    name: faker.company.companyName(),
    doc: faker.br.cnpj(),
    email: faker.internet.email(),
    cod_banco: faker.helpers.randomize(['001', '104', '756', '237']),
    agencia: faker.finance.account(),
    agencia_digito: 1,
    conta: faker.finance.account(),
    conta_digito: 1,
    status: faker.helpers.randomize(['Rascunho', 'Validado'])
})


module.exports = factory
