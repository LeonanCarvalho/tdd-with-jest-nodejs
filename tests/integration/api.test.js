const request = require('supertest')

const app = require('./../../src/app')

describe('API Calls', () => {
    it('should receive http Status code 200 when call to  API', async () => {

        const response = await request(app)
            .post('/favorecido')
            .send({
                name: "Jhon Doe",
                doc: "565.646.640-01",
                email: "jhondoe@mockemail.test",
            })

        expect(response.status).toBe(200);
    })
})
