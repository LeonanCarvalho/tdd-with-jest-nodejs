const faker = require('faker-br');
const BankService = require('../../src/app/services/BankService');

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
      let bank = await BankService.get(cod);
    })
      .rejects
      .toThrow(Error);
  });

});
