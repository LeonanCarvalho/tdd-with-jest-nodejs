const faker = require('faker-br');
const truncate = require('../utils/truncate');
const PayeeFactory = require('../factories/PayeeFactory');
const PayeeController = require('../../src/app/controllers/PayeeController');

describe('Payee Unit', () => {
    afterAll(async () => {
        await truncate();
    });

    it('should create a Payee with valid Person data', async () => {
        const payee = await PayeeFactory.create('PayeePF');
        expect(payee)
          .toHaveProperty('id');
    });

    it('should create a Payee with valid Company data', async () => {
        const payee = await PayeeFactory.create('PayeePJ');
        expect(payee)
          .toHaveProperty('id');
    });

    it('should throw erros ', () => {
        expect(() => {
            PayeeController.emitError('Test');
        })
          .toThrow();
    });

    it('should 1.1 should be 1 ', () => {
        expect(PayeeController.normalizeId(1.1))
          .toBe(1);
    });

    it('should -1 should be falsy ', () => {
        expect(PayeeController.normalizeId(-1))
          .toBeFalsy();
    });

    it('should string should be falsy ', () => {
        const veryWeirdString = faker.finance.currencyCode() + faker.hacker.phrase();
        expect(PayeeController.normalizeId(veryWeirdString))
          .toBeFalsy();
    });

});
