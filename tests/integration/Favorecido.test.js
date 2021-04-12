const request = require('supertest')

const app = require('./../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe("Favorecido Integration", () => {
    afterAll( async  ()=> {
        await truncate();
    })
    it("should create a CPF Favorecido with valid data", async () => {
        const favorecido = await factory.create('FavorecidoPF',{})

        const response = await request(app)
            .post('/favorecido')
            .send({
                name: favorecido.name,
                doc: favorecido.doc,
                email: favorecido.email,
            })

        expect(response.status).toBe(200);
        expect(favorecido).toHaveProperty("id")
    })

    it("should create a CNPJ Favorecido with valid data", async () => {
        const favorecido = await factory.create('FavorecidoPJ',{})

        const response = await request(app)
            .post('/favorecido')
            .send({
                name: favorecido.name,
                doc: favorecido.doc,
                email: favorecido.email,
            })

        expect(response.status).toBe(200);
        expect(favorecido).toHaveProperty("id")
    })


    it("should get Favorecido data", async () => {
        const response = await request(app)
            .get('/favorecido/1')
            .send()

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("favorecido")
        expect(response.body.favorecido).toHaveProperty("id")
        expect(response.body.favorecido).toHaveProperty("email")
        expect(response.body.favorecido).toHaveProperty("name")
        expect(response.body.favorecido).toHaveProperty("doc")
        expect(response.body.favorecido).toHaveProperty("createdAt")
        expect(response.body.favorecido).toHaveProperty("updatedAt")
    })
    it("should get Favorecido list", async () => {
        expect("todo").toBe("todo");
    })
    it("should get Favorecido pagination", async () => {
        expect("todo").toBe("todo");
    })
    it("should update Favorecido", async () => {
        expect("todo").toBe("todo");
        /*const favorecido = await factory.create('FavorecidoPJ',{})
        const response = await request(app)
            .put('/favorecido')
            .send({
                id: 1,
                email: "updatedmail@mock.com",
            })

        expect(response.status).toBe(200);
        expect(favorecido.email).toBe("updatedmail@mock.com")*/
    })
    it("should delete Favorecido", async () => {
        expect("todo").toBe("todo");
    })

})
