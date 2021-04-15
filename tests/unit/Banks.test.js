const faker = require('faker-br');
require('jest-each');
const BankService = require('../../src/app/services/BankService');

const BankFactory = require('../factories/BankFactory');

describe('Bank Factory', () => {
  it.each`
     cod
     ${'001'}
     ${'104'}
     ${'756'}
     ${'237'}
     // add new test cases here
   `('should Generate Valid Bank code $cod',
    async ({ cod }) => {
      const bank = new BankFactory(cod);

      const agency = bank.agency();
      const agencyDigit = bank.agencyDigit();
      const account = bank.account();
      const accountDigit = bank.accountDigit();
      const accountType = bank.accountType();

      await expect(BankService.validateAgency(cod, agency))
        .resolves
        .toBeTruthy();
      await expect(BankService.validateAgencyDigit(cod, agencyDigit))
        .resolves
        .toBeTruthy();
      await expect(BankService.validateAccount(cod, account))
        .resolves
        .toBeTruthy();
      await expect(BankService.validateAccountDigit(cod, accountDigit))
        .resolves
        .toBeTruthy();
      await expect(BankService.validateAccountType(cod, accountType))
        .resolves
        .toBeTruthy();

    });
});

describe('Bank Service', () => {
  it('should search by Cod', async () => {
    const verb = '001';
    const result = await BankService.search(verb);
    expect(result.length)
      .toBeGreaterThan(0);
    expect(result[0].cod)
      .toBe(verb);
  });

  it('should search by Name', async () => {
    const verb = 'Bradesco';
    const result = await BankService.search(verb);
    expect(result.length)
      .toBeGreaterThan(0);
    expect(result[0].name)
      .toBe(verb);
  });

  it('should blank search  Banks', async () => {
    const verb = null;
    const result = await BankService.search(verb);
    expect(result.length)
      .toBeGreaterThan(0);
  });

  it('should get all Banks', async () => {
    const result = await BankService.all();
    expect(result.length)
      .toBeGreaterThan(0);
  });

  it('should get Banks by Cod', async () => {
    const cod = '001';
    const result = await BankService.get(cod);
    expect(result)
      .toHaveProperty('cod');
    expect(result.cod)
      .toBe(cod);
  });

  it('should throw error for invalid Banks', async () => {
    const cod = faker.lorem.slug;
    await expect(async () => {
      return BankService.get(cod);
    })
      .rejects
      .toThrow(Error);
  });

});
