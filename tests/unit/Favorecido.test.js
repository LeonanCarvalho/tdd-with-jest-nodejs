const request = require('supertest')

const app = require('./../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe("Favorecido Unit", () => {
    beforeEach(async () => {
        //  await truncate();
    })
    it("should create a Favorecido with valid Person data", async () => {
        const favorecido = await factory.create('FavorecidoPF',{})

        expect(favorecido).toHaveProperty("id")
    })



    it("should create a Favorecido with valid Company data", async () => {
        const favorecido = await factory.create('FavorecidoPJ',{})

        expect(favorecido).toHaveProperty("id")
    })

})