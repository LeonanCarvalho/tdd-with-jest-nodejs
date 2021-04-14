const faker = require('faker-br');
const request = require('supertest');
const app = require('./../../src/app');

const { Banks } = require('./../../src/app/data/banks');

describe('Bank Integration', () => {
  it('should search by Cod', async () => {
    const verb = '001';
    const response = await request(app)
      .get(`/banks/${verb}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
    expect(response.body.data[0].cod)
      .toBe(verb);
  });

  it('should search by Name', async () => {
    const verb = 'Bradesco';
    const response = await request(app)
      .get(`/banks/${verb}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
    expect(response.body.data[0].name)
      .toBe(verb);
  });

  it('should search empty', async () => {
    const response = await request(app)
      .get(`/banks/`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
    expect(response.body.data[0])
      .toHaveProperty('cod');
    expect(response.body.data[0])
      .toHaveProperty('name');
  });

  it('should list all Banks', async () => {
    const response = await request(app)
      .get(`/banks`)
      .send();
    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBe(Banks.length);
  });

  it('should get Banks by Cod', async () => {
    const cod = '001';
    const response = await request(app)
      .get(`/bank/${cod}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.cod)
      .toBe(cod);
  });

  it('should not get Banks by Cod', async () => {
    const cod = faker.lorem.slug;
    const response = await request(app)
      .get(`/bank/${cod}`)
      .send();

    expect(response.status)
      .toBe(404);
  });

  it('should get All Banks', async () => {
    const response = await request(app)
      .get(`/banks`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
  });
});
