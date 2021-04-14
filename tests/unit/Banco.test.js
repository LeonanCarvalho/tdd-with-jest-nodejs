const faker = require('faker-br');
const BancoService = require('../../src/app/services/BancoService');

describe('Banco Service', () => {
  it('should search by Cod', async () => {
    const verb = '001';
    const result = await BancoService.search(verb);
    expect(result.length)
      .toBeGreaterThan(0);
    expect(result[0].cod)
      .toBe(verb);
  });

  it('should search by Name', async () => {
    const verb = 'Bradesco';
    const result = await BancoService.search(verb);
    expect(result.length)
      .toBeGreaterThan(0);
    expect(result[0].name)
      .toBe(verb);
  });

  it('should blank search  Bancos', async () => {
    const verb = null;
    const result = await BancoService.search(verb);
    expect(result.length)
      .toBeGreaterThan(0);
  });

  it('should get all Bancos', async () => {
    const result = await BancoService.all();
    expect(result.length)
      .toBeGreaterThan(0);
  });

  it('should get Bancos by Cod', async () => {
    const cod = '001';
    const result = await BancoService.get(cod);
    expect(result)
      .toHaveProperty('cod');
    expect(result.cod)
      .toBe(cod);
  });

  it('should not get Bancos by Cod', async () => {
    const cod = faker.lorem.slug;
    const result = await BancoService.get(cod);
    expect(result)
      .toBe(null);
  });

});
