const request = require('supertest')

const app = require('./../../src/app')

describe('API Calls', () => {
    it('should receive http Status code 200 when call to  API', async () => {

        const response = await request(app)
          .get('/')
          .send();

        expect(response.status)
          .toBe(200);
        expect(response.body)
          .toHaveProperty('message');
        expect(response.body.message())
          .toBe('ok');
    })
})
