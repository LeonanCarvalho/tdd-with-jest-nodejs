const request = require('supertest');
const app = require('./../../src/app');

describe('Banco Integration', () => {
  it('should search by Cod', async () => {
    const verb = '001';
    const response = await request(app)
      .get(`/bancos/${verb}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
  });

  it('should search by Name', async () => {
    const verb = 'Br';
    const response = await request(app)
      .get(`/bancos/${verb}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
  });

  it('should search empty', async () => {
    const response = await request(app)
      .get(`/bancos/`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
  });

  it('should get all Bancos', async () => {
    const response = await request(app)
      .get(`/bancos`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.length)
      .toBeGreaterThan(0);
  });

  it('should get Bancos by Cod', async () => {
    const cod = '001';
    const response = await request(app)
      .get(`/banco/${cod}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.cod)
      .toBe(cod);
  });
});
