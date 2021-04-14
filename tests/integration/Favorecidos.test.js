const request = require('supertest');
const faker = require('faker-br');

const app = require('./../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Favorecido Integration', () => {
  afterEach(async () => {
    await truncate();
  });
  it('should create a CPF Favorecido with valid data', async () => {
    const favorecido = await factory.create('FavorecidoPF', {});

    const response = await request(app)
      .post('/favorecido')
      .send({
        name: favorecido.name,
        doc: favorecido.doc,
        email: favorecido.email,
      });

    expect(response.status)
      .toBe(200);
    expect(favorecido)
      .toHaveProperty('id');
  });

  it('should create a CNPJ Favorecido with valid data', async () => {
    const favorecido = await factory.create('FavorecidoPJ', {});

    const response = await request(app)
      .post('/favorecido')
      .send({
        name: favorecido.name,
        doc: favorecido.doc,
        email: favorecido.email,
      });

    expect(response.status)
      .toBe(200);
    expect(favorecido)
      .toHaveProperty('id');
  });

  it('should get Favorecido data', async () => {
    const favorecido = await factory.create('FavorecidoPJ', {});

    expect(favorecido)
      .toHaveProperty('id');

    const response = await request(app)
      .get(`/favorecido/${favorecido.id}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data)
      .toHaveProperty('id');
    expect(response.body.data)
      .toHaveProperty('email');
    expect(response.body.data)
      .toHaveProperty('name');
    expect(response.body.data)
      .toHaveProperty('doc');
    expect(response.body.data.id)
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
      await factory.create('FavorecidoPJ', {});
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
  it('should get Favorecido pagination', async () => {
    let i = 0;
    let last;
    while (i < 30) {
      last = await factory.create('FavorecidoPJ', {});
      i++;
    }

    console.log(last);

    const response = await request(app)
      .post('/favorecidos')
      .send({
        'search': '1'
      });

    expect(response.body.data)
      .toHaveProperty('totalPages');
    expect(response.body.data)
      .toHaveProperty('count');
    expect(response.body.data)
      .toHaveProperty('rows');
  });
  it('should update Favorecido', async () => {
    const favorecido = await factory.create('FavorecidoPJ', {});

    const email = faker.internet.email();
    expect(favorecido)
      .toHaveProperty('id');

    const response = await request(app)
      .put('/favorecido')
      .send({
        id: favorecido.id,
        email: email
      });

    expect(response.status)
      .toBe(200);
    expect(favorecido.email)
      .toBe(email);
  });
  it('should delete Favorecido', async () => {
    const favorecido = await factory.create('FavorecidoPF', {});

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

});
