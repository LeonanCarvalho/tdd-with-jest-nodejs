const Schemes = {
  '001': {
    agency: {
      maxLength: 4,
      required: true,
      pattern: '^(?:^0*)[1-9][0-9]{0,3}$',
      digit: {
        required: false,
        pattern: '^[xX0-9]{0,1}$'
      }
    },
    account: {
      maxLength: 8,
      required: true,
      pattern: '^(?:^0*)[1-9][0-9]{0,7}$',
      digit: {
        required: true,
        pattern: '^[xX0-9]{0,1}$'
      }
    },
    accountType: {
      required: true,
      allowedTypes: ['CONTA_CORRENTE', 'CONTA_POUPANCA', 'CONTA_FACIL']
    }
  }
};

const defaultScheme = {
  agency: {
    maxLength: 4,
    required: true,
    pattern: '^(?:^0*)[1-9][0-9]{0,3}$',
    digit: {
      required: false,
      pattern: '^[xX0-9]{0,1}$'
    }
  },
  account: {
    maxLength: 11,
    required: true,
    pattern: '^(?:^0*)[1-9][0-9]{0,10}$',
    digit: {
      required: true,
      pattern: '^[0-9]{0,1}$'
    }
  },
  accountType: {
    required: true,
    allowedTypes: ['CONTA_CORRENTE', 'CONTA_POUPANCA']
  }
};

const Banks = [
  {
    'cod': '001',
    'name': 'Banco do Brasil'
  },
  {
    'cod': '104',
    'name': 'Caixa Econômica Federal'
  },
  {
    'cod': '756',
    'name': 'Sicoob'
  },
  {
    'cod': '237',
    'name': 'Bradesco'
  }
];

const len = Banks.length;
let i = 0;
while (i < len) {
  const cod = Banks[i].cod;
  Banks[i].scheme = Schemes[cod] || defaultScheme;
  i++;
}

module.exports = {
  Banks: Banks,
  Schemes: Schemes,
  defaultScheme: defaultScheme,
};
