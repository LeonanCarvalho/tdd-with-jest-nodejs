const request = require('supertest');
const faker = require('faker-br');
require('jest-each');

const app = require('./../../src/app');
const truncate = require('../utils/truncate');
const PayeeFactory = require('../factories/PayeeFactory');
const { getRandomValue, strictFilter } = require('../../src/app/utils/ArrayUtils');

describe('Payee Integration', () => {
  afterEach(async () => {
    await truncate();
  });

  it('should create a CPF Payee with valid data', async () => {
    const payee = PayeeFactory.getPF();

    const payload = { 'payee': payee };
    const response = await request(app)
      .post('/payee')
      .send(payload);

    expect(response.status)
      .toBe(200);
    expect(response.body.data.payee)
      .toHaveProperty('id');
    expect(response.body.data.payee.name)
      .toBe(payee.name);
    expect(response.body.data.payee.doc)
      .toBe(payee.doc);
    expect(response.body.data.payee.email)
      .toBe(payee.email);
    expect(response.body.data.payee.cod_bank)
      .toBe(payee.cod_bank);
    expect(response.body.data.payee.agency)
      .toBe(payee.agency);
    expect(response.body.data.payee.agency_digit)
      .toBe(payee.agency_digit);
    expect(response.body.data.payee.account)
      .toBe(payee.account);
    expect(response.body.data.payee.account_digit)
      .toBe(payee.account_digit);
    expect(response.body.data.payee.status)
      .toBe(payee.status);
  });

  it('should create a CNPJ Payee with valid data', async () => {
    const payee = PayeeFactory.getPJ();

    const payload = { 'payee': payee };
    const response = await request(app)
      .post('/payee')
      .send(payload);

    expect(response.status)
      .toBe(200);
    expect(response.body.data.payee)
      .toHaveProperty('id');
    expect(response.body.data.payee.name)
      .toBe(payee.name);
    expect(response.body.data.payee.doc)
      .toBe(payee.doc);
    expect(response.body.data.payee.email)
      .toBe(payee.email);
    expect(response.body.data.payee.cod_bank)
      .toBe(payee.cod_bank);
    expect(response.body.data.payee.agency)
      .toBe(payee.agency);
    expect(response.body.data.payee.agency_digit)
      .toBe(payee.agency_digit);
    expect(response.body.data.payee.account)
      .toBe(payee.account);
    expect(response.body.data.payee.account_digit)
      .toBe(payee.account_digit);
    expect(response.body.data.payee.status)
      .toBe(payee.status);
  });

  it('should get Payee data', async () => {
    const payee = await PayeeFactory.create('PayeePJ', {});

    expect(payee)
      .toHaveProperty('id');

    const response = await request(app)
      .get(`/payee/${payee.id}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body.data)
      .toHaveProperty('payee');
    expect(response.body.data.payee.id)
      .toBe(payee.id);
  });

  it.each`
     page  | expectedResult
     ${-1}  | ${10}
     ${1}  | ${10}
     ${2}  | ${10}
     ${3}  | ${1}
     ${4}  | ${0}
     // add new test cases here
   `('Paginate Payees to $page',
    async ({ page, expectedResult }) => {
      const pageSize = 10;
      const seedNumber = 21;
      expect(seedNumber)
        .toBeGreaterThan(pageSize);
      const expectedPages = Math.ceil(seedNumber / pageSize);
      let i = 0;
      while (i < seedNumber) {
        await PayeeFactory.create('PayeePJ', {});
        i++;
      }
      const expectedPage = (page <= 0) ? 1 : page;
      const url = (page === 1) ? '/payees' : `/payees/${page}`;
      const response = await request(app)
        .get(url)
        .send();

      console.log(response.body);
      expect(response.body.data)
        .toHaveProperty('totalPages');
      expect(response.body.data.totalPages)
        .toBe(expectedPages);
      expect(response.body.data)
        .toHaveProperty('page');
      expect(response.body.data.page)
        .toBe(expectedPage);
      expect(response.body.data)
        .toHaveProperty('count');
      expect(response.body.data.count)
        .toBe(seedNumber);
      expect(response.body.data)
        .toHaveProperty('rows');
      expect(response.body.data.rows.length)
        .toBe(expectedResult);
    }
  );

  it.each`
     field
     ${'name'}
     ${'doc'}
     ${'agency'}
     ${'account'}
     // add new test cases here
   `('should get Payee auto complete by $field',
    async ({ field }) => {
      let i = 0;
      let payees = [];
      while (i < 3) {
        payees.push(await PayeeFactory.create('PayeePJ', {}));
        i++;
      }

      const fieldValue = getRandomValue(payees, field);

      const response = await request(app)
        .post('/payees')
        .send({
          'search': fieldValue
        });

      //console.log(response.body.data.rows, field, fieldValue);
      const result = strictFilter(response.body.data.rows, field, fieldValue);

      expect(response.body.data.rows.length)
        .toBeGreaterThan(0);
      expect(result[0][field])
        .toBe(fieldValue);
    }
  );

  it('should get Payee data by Nome', async () => {
    const payee = await PayeeFactory.create('PayeePJ', {});

    expect(payee)
      .toHaveProperty('id');

    const response = await request(app)
      .get(`/payee/${payee.id}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body.data)
      .toHaveProperty('payee');
    expect(response.body.data.payee)
      .toHaveProperty('id');
    expect(response.body.data.payee)
      .toHaveProperty('email');
    expect(response.body.data.payee)
      .toHaveProperty('name');
    expect(response.body.data.payee)
      .toHaveProperty('doc');
    expect(response.body.data.payee.id)
      .toBe(payee.id);
  });

  it('should update Payee', async () => {
    const payee = await PayeeFactory.create('PayeePJ', {
      'status': 'Rascunho'
    });

    expect(payee)
      .toHaveProperty('id');

    expect(payee.status)
      .toBe('Rascunho');

    const payload = {
      'payee': {
        doc: payee.doc,
        email: faker.internet.email(),
        name: faker.name.findName()
      }
    };
    const response = await request(app)
      .put(`/payee/${payee.id}`)
      .send(payload);

    expect(response.status)
      .toBe(200);

    expect(response.body.data.payee.email)
      .toBe(payload.payee.email);
    expect(response.body.data.payee.name)
      .toBe(payload.payee.name);
  });

  it('should update only email if status VALIDADO', async () => {
    const payee = await PayeeFactory.create('PayeePJ', {
      'status': 'Validado'
    });

    expect(payee)
      .toHaveProperty('id');

    const payload = {
      'payee': {
        status: payee.status,
        email: faker.internet.email(),
        name: faker.name.findName()
      }
    };

    const response = await request(app)
      .put(`/payee/${payee.id}`)
      .send(payload);

    expect(response.status)
      .toBe(400);

    expect(response.body.message)
      .toBe('O Payee já foi validado, apenas o e-mail pode ser alterado.');
  });

  it('should delete Payee', async () => {
    const payee = await PayeeFactory.create('PayeePF', {});

    expect(payee)
      .toHaveProperty('id');

    const response = await request(app)
      .delete(`/payee/${payee.id}`)
      .send();

    expect(response.status)
      .toBe(200);
    expect(response.body.status)
      .toBe(200);
    expect(response.body.message)
      .toBe('Payee Excluido com Sucesso');
  });

  it('should delete Many Payee', async () => {

    let i = 0;
    let payees = ['invalidID'];
    while (i < 30) {
      let payee = await PayeeFactory.create('PayeePJ', {});
      payees.push(payee.id);
      i++;
    }
    const extraPayee = await PayeeFactory.create('PayeePF', {});
    payees.push(extraPayee.id.toString());

    const totalToDelete = payees.length - 1;
    const payload = { 'payees': payees };
    const response = await request(app)
      .delete(`/payee`)
      .send(payload);

    expect(response.status)
      .toBe(200);
    expect(response.body)
      .toHaveProperty('data');
    expect(response.body.data.deletedRecord)
      .toBe(totalToDelete);
  });

});
