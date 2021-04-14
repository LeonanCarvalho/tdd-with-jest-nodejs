const truncate = require('../utils/truncate');
const PayeeFactory = require('../factories/PayeeFactory');

describe('Payee Unit', () => {
    afterAll(async () => {
        await truncate();
    });

    it('should create a Payee with valid Person data', async () => {
        const payee = await PayeeFactory.create('PayeePF', {});

        expect(payee)
          .toHaveProperty('id');
    });

    it('should create a Payee with valid Company data', async () => {
        const payee = await PayeeFactory.create('PayeePJ', {});

        expect(payee)
          .toHaveProperty('id');
    });

});
