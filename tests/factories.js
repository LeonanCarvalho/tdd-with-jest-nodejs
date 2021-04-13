const faker = require('faker-br')
const {factory} = require('factory-girl')
const {Favorecido} = require('./../src/app/models')


factory.define('FavorecidoPF', Favorecido, {
    name: faker.name.findName(),
    doc: faker.br.cpf(),
    email: faker.internet.email(),
})

factory.define('FavorecidoPJ', Favorecido, {
    name: faker.company.companyName(),
    doc: faker.br.cnpj(),
    email: faker.internet.email(),
})


module.exports = factory
