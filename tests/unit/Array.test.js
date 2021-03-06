const faker = require('faker-br');
const { Banks } = require('../../src/app/data/banks');
const ArrayUtils = require('../../src/app/utils/ArrayUtils');

describe('Array Utils Filter', () => {
  it('should filter by Cod', async () => {
    const verb = '001';
    const result = ArrayUtils.insensitiveFilter(Banks, 'cod', verb);
    expect(result.length)
      .toBeGreaterThan(0);
  });
  it('should filter by Name', async () => {
    const verb = 'Br';
    const result = ArrayUtils.insensitiveFilter(Banks, 'name', verb);
    expect(result.length)
      .toBeGreaterThan(0);
  });

  it('should search have no results', async () => {
    const verb = faker.br.cnpj();
    const result = ArrayUtils.insensitiveFilter(Banks, 'name', verb);
    expect(result.length)
      .toBe(0);
  });

  it('should Strict Filter', async () => {
    const verb = '001';
    const result = ArrayUtils.strictFilter(Banks, 'cod', verb);
    expect(result.length)
      .toBeGreaterThan(0);
    expect(result[0].cod)
      .toBe(verb);
  });

  it('should Strict Filter Fails', async () => {
    const verb = 1;
    const result = ArrayUtils.strictFilter(Banks, 'cod', verb);
    expect(result.length)
      .toBe(0);
    expect(result[0])
      .toBeUndefined();
  });

});
