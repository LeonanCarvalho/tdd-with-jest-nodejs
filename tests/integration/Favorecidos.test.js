const request = require('supertest');
const faker = require('faker-br');

const app = require('./../../src/app');
const truncate = require('../utils/truncate');
const FavorecidoFactory = require('../factories/FavorecidoFactory');

describe('Favorecido Integration', () => {
  afterEach(async () => {
    await truncate();
  });

  it('should create a CPF Favorecido with valid data', async () => {
    const favorecido = {
      name: faker.name.findName(),
      doc: faker.br.cpf(),
      email: faker.internet.email(),
      cod_banco: faker.helpers.randomize(['001', '104', '756', '237']),
      agencia: faker.finance.account(),
      agencia_digito: 1,
      conta: faker.finance.account(),
      conta_digito: 1,
      status: faker.helpers.randomize(['Rascunho', 'Validado'])
    };

    const payload = { 'favorecido': favorecido };
    const response = await request(app)
      .post('/favorecido')
      .send(payload);

    expect(response.status)
      .toBe(200);
    expect(response.body.data.favorecido)
      .toHaveProperty('id');
    expect(response.body.data.favorecido.name)
      .toBe(favorecido.name);
    expect(response.body.data.favorecido.doc)
      .toBe(favorecido.doc);
    expect(response.body.data.favorecido.email)
      .toBe(favorecido.email);
    expect(response.body.data.favorecido.cod_banco)
      .toBe(favorecido.cod_banco);
    expect(response.body.data.favorecido.agencia)
      .toBe(favorecido.agencia);
    expect(response.body.data.favorecido.agencia_digito)
      .toBe(favorecido.agencia_digito);
    expect(response.body.data.favorecido.conta)
      .toBe(favorecido.conta);
    expect(response.body.data.favorecido.conta_digito)
      .toBe(favorecido.conta_digito);
    expect(response.body.data.favorecido.status)
      .toBe(favorecido.status);
  });

  it('should create a CNPJ Favorecido with valid data', async () => {
    const favorecido = {
      name: faker.company.companyName(),
      doc: faker.br.cnpj(),
      email: faker.internet.email(),
      cod_banco: faker.helpers.randomize(['001', '104', '756', '237']),
      agencia: faker.finance.account(),
      agencia_digito: 1,
      conta: faker.finance.account(),
      conta_digito: 1,
      status: faker.helpers.randomize(['Rascunho', 'Validado'])
    };

    const payload = { 'favorecido': favorecido };
    const response = await request(app)
      .post('/favorecido')
      .send(payload);

    expect(response.status)
      .toBe(200);
    expect(response.body.data.favorecido)
      .toHaveProperty('id');
    expect(response.body.data.favorecido.name)
      .toBe(favorecido.name);
    expect(response.body.data.favorecido.doc)
      .toBe(favorecido.doc);
    expect(response.body.data.favorecido.email)
      .toBe(favorecido.email);
    expect(response.body.data.favorecido.cod_banco)
      .toBe(favorecido.cod_banco);
    expect(response.body.data.favorecido.agencia)
      .toBe(favorecido.agencia);
    expect(response.body.data.favorecido.agencia_digito)
      .toBe(favorecido.agencia_digito);
    expect(response.body.data.favorecido.conta)
      .toBe(favorecido.conta);
    expect(response.body.data.favorecido.conta_digito)
      .toBe(favorecido.conta_digito);
    expect(response.body.data.favorecido.status)
      .toBe(favorecido.status);
  });

  it('should get Favorecido data', async () => {
    const favorecido = await FavorecidoFactory.create('FavorecidoPJ', {});

    expect(favorecido)
      .toHaveProperty('id');

    const response = await request(app)
      .get(`/favorecido/${favorecido.id}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body.data)
      .toHaveProperty('favorecido');
    expect(response.body.data.favorecido.id)
      .toBe(favorecido.id);
  });

  it('should get Favorecido list paginated', async () => {
    const pageSize = 10;
    const seedNumber = 31;
    expect(seedNumber)
      .toBeGreaterThan(pageSize);
    const expectedPages = Math.ceil(seedNumber / pageSize);
    let i = 0;
    while (i < seedNumber) {
      await FavorecidoFactory.create('FavorecidoPJ', {});
      i++;
    }

    const response = await request(app)
      .get('/favorecidos')
      .send();

    expect(response.body.data)
      .toHaveProperty('totalPages');
    expect(response.body.data.totalPages)
      .toBe(expectedPages);
    expect(response.body.data)
      .toHaveProperty('page');
    expect(response.body.data.page)
      .toBe(1);
    expect(response.body.data)
      .toHaveProperty('count');
    expect(response.body.data.count)
      .toBe(seedNumber);
    expect(response.body.data)
      .toHaveProperty('rows');

    expect(response.body.data.rows.length)
      .toBe(pageSize);

    const response2 = await request(app)
      .get('/favorecidos/2')
      .send();

    expect(response2.body.data)
      .toHaveProperty('totalPages');
    expect(response2.body.data.totalPages)
      .toBe(expectedPages);
    expect(response2.body.data)
      .toHaveProperty('page');
    expect(response2.body.data.page)
      .toBe(2);
    expect(response2.body.data)
      .toHaveProperty('count');
    expect(response2.body.data)
      .toHaveProperty('rows');
    expect(response2.body.data.count)
      .toBe(seedNumber);
    expect(response2.body.data.rows.length)
      .toBe(pageSize);

    const response4 = await request(app)
      .get('/favorecidos/4')
      .send();

    expect(response4.body.data)
      .toHaveProperty('totalPages');
    expect(response4.body.data.totalPages)
      .toBe(expectedPages);
    expect(response4.body.data)
      .toHaveProperty('page');
    expect(response4.body.data.page)
      .toBe(4);
    expect(response4.body.data)
      .toHaveProperty('count');
    expect(response4.body.data)
      .toHaveProperty('rows');
    expect(response4.body.data.count)
      .toBe(seedNumber);
    expect(response4.body.data.rows.length)
      .toBe(1);

  });

  it('should get Favorecido data by Nome', async () => {
    const favorecido = await FavorecidoFactory.create('FavorecidoPJ', {});

    expect(favorecido)
      .toHaveProperty('id');

    const response = await request(app)
      .get(`/favorecido/${favorecido.id}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body.data)
      .toHaveProperty('favorecido');
    expect(response.body.data.favorecido)
      .toHaveProperty('id');
    expect(response.body.data.favorecido)
      .toHaveProperty('email');
    expect(response.body.data.favorecido)
      .toHaveProperty('name');
    expect(response.body.data.favorecido)
      .toHaveProperty('doc');
    expect(response.body.data.favorecido.id)
      .toBe(favorecido.id);
  });

  it('should update Favorecido', async () => {
    const favorecido = await FavorecidoFactory.create('FavorecidoPJ', {
      'status': 'Rascunho'
    });

    expect(favorecido)
      .toHaveProperty('id');

    expect(favorecido.status)
      .toBe('Rascunho');

    const payload = {
      'favorecido': {
        doc: favorecido.doc,
        email: faker.internet.email(),
        name: faker.name.findName()
      }
    };
    const response = await request(app)
      .put(`/favorecido/${favorecido.id}`)
      .send(payload);

    expect(response.status)
      .toBe(200);

    expect(response.body.data.favorecido.email)
      .toBe(payload.favorecido.email);
    expect(response.body.data.favorecido.name)
      .toBe(payload.favorecido.name);
  });

  it('should update only email if status VALIDADO', async () => {
    const favorecido = await FavorecidoFactory.create('FavorecidoPJ', {
      'status': 'Validado'
    });

    expect(favorecido)
      .toHaveProperty('id');

    const payload = {
      'favorecido': {
        status: favorecido.status,
        email: faker.internet.email(),
        name: faker.name.findName()
      }
    };

    const response = await request(app)
      .put(`/favorecido/${favorecido.id}`)
      .send(payload);

    expect(response.status)
      .toBe(400);

    expect(response.body.message)
      .toBe('O Favorecido já foi validado, apenas o e-mail pode ser alterado.');
  });

  it('should delete Favorecido', async () => {
    const favorecido = await FavorecidoFactory.create('FavorecidoPF', {});

    expect(favorecido)
      .toHaveProperty('id');

    const response = await request(app)
      .delete(`/favorecido/${favorecido.id}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body.status)
      .toBe(200);
    expect(response.body.message)
      .toBe('Favorecido Excluido com Sucesso');
  });

  it('should delete Many Favorecido', async () => {

    let i = 0;
    let favorecidos = ['invalidID'];
    while (i < 30) {
      let favorecido = await FavorecidoFactory.create('FavorecidoPJ', {});
      favorecidos.push(favorecido.id);
      i++;
    }
    const extraFavorecido = await FavorecidoFactory.create('FavorecidoPF', {});
    favorecidos.push(extraFavorecido.id.toString());

    const totalToDelete = favorecidos.length - 1;
    const payload = { 'favorecidos': favorecidos };
    const response = await request(app)
      .delete(`/favorecido`)
      .send(payload);

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.deletedRecord)
      .toBe(totalToDelete);
  });

});
