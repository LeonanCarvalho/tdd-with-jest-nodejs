const { cpf, cnpj } = require('cpf-cnpj-validator');
const { symmetricDiff } = require('../utils/ArrayUtils');
const BankService = require('../services/BankService');

/**
 * Payee Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {

  async function isValidBank(codBank) {
    const { _changed } = this;
    const hasChanged = _changed.has('cod_bank');
    if (hasChanged) {
      await BankService.get(codBank);
    }
  }

  async function isValidAgency(agency) {
    const { _changed, cod_bank } = this;
    const hasChanged = _changed.has('agency');
    if (hasChanged) {
      await BankService.validateAgency(cod_bank, agency);
    }
  }

  async function isValidAgencyDigit(agencyDigit) {
    const { _changed, cod_bank } = this;
    const hasChanged = _changed.has('agency_digit');
    if (hasChanged) {
      await BankService.validateAgencyDigit(cod_bank, agencyDigit);
    }
  }

  async function isValidAccount(account) {
    const { _changed, cod_bank } = this;
    const hasChanged = _changed.has('account');
    if (hasChanged) {
      await BankService.validateAccount(cod_bank, account);
    }
  }

  async function isValidAccountDigit(accountDigit) {
    const { _changed, cod_bank } = this;
    const hasChanged = _changed.has('account_digit');
    if (hasChanged) {
      await BankService.validateAccountDigit(cod_bank, accountDigit);
    }
  }

  async function isValidAccountType(accountType) {
    const { _changed, cod_bank } = this;
    const hasChanged = _changed.has('account_type');
    if (hasChanged) {
      await BankService.validateAccountType(cod_bank, accountType);
    }
  }

  const isValidDoc = (doc) => {
    const isInvalid = !(cpf.isValid(doc) || cnpj.isValid(doc));
    if (isInvalid) {
      throw new Error('Please provide a valid CPF or CNPJ');
    }
  };

  const Payee = sequilize.define('Payee', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please provide a valid Name'
        }
      }
    },
    doc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidDoc
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //unicode: true,
      validate: {
        isEmail: true
      }
    },
    cod_bank: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidBank
      }

    },
    agency: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidAgency
      }
    },
    agency_digit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidAgencyDigit
      }
    },
    account: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidAccount
      }
    },
    account_digit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidAccountDigit
      }
    },
    account_type: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isValidAccountType
      }
    },
    status: {
      type: DataTypes.ENUM('Rascunho', 'Validado'),
      defaultValue: 'Rascunho',
      allowNull: false,
      validate: {
        isIn: {
          args: [['Rascunho', 'Validado']],
          msg: 'O Status deve ser \'Rascunho\' ou \'Validado\''
        }
      }
    }
  });

  const sanitizeData = (payee) => {
    const patterns = {
      doc: doc => {
        return doc.replace(/([^\d])+/gim, '');
      }
    };

    Object.keys(patterns)
      .forEach(key => {
        if (payee[key]) {
          payee[key] = patterns[key](payee[key]);
        }
      });
  };

  const validateUpdate = (payee) => {
    return new Promise((resolve, reject) => {
      const isValidado = payee._previousDataValues.status === 'Validado';
      if (isValidado) {
        const allowedChanges = ['email'];
        const changed = [...payee._changed];

        const difference = symmetricDiff(allowedChanges, changed);

        const hasOtherChanges = difference.length > 0;
        if (hasOtherChanges) {
          reject(new Error('O Payee j?? foi validado, apenas o e-mail pode ser alterado.'));
        }
      }
      resolve(true);
    });
  };

  Payee.addHook('beforeCreate', 'sanitizeData', sanitizeData);
  Payee.addHook('beforeUpdate', 'sanitizeData', sanitizeData);
  Payee.addHook('beforeUpdate', 'ValidateUpdate', validateUpdate);

  return Payee;
};
