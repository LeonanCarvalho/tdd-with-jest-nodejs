const request = require('supertest');
const faker = require('faker-br');
const app = require('./../../src/app');

describe('API Calls', () => {
    it('should receive http Status code 200 when call to  API', async () => {

        const response = await request(app)
          .get('/')
          .send();

        expect(response.status)
          .toBe(200);
        expect(response.body)
          .toHaveProperty('message');
        expect(response.body.message)
          .toBe('ok');
    })

    it('should receive http Status code 404 when call to  API', async () => {
        const blah = faker.lorem.slug();
        const response = await request(app)
          .get(`/${blah}`)
          .send();

        expect(response.status)
          .toBe(404);
        expect(response.body)
          .toHaveProperty('message');
        expect(response.body.message)
          .toBe('Not Found');
    });
})
