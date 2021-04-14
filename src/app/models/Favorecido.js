const { cpf, cnpj } = require('cpf-cnpj-validator');
const { symmetricDiff } = require('../utils/ArrayUtils');
const BancoService = require('../services/BancoService');

/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {

  async function isValidBank(cod_banco) {
    const cod = await BancoService.get(cod_banco);
    if (!cod) {
      throw new Error('Forneça um Código de Banco válido');
    }
  }

  function isValidAgencia(agencia) {
    const { _changed, cod_banco } = this;
    const hasChanged = _changed.has('agencia');
    if (hasChanged) {
      BancoService.validateAgencia(cod_banco, agencia);
    }

  }

  function isValidAgenciaDigito(agencia_digito) {

  }

  function isValidConta(conta) {

  }

  function isValidContaDigito(conta_digito) {

  }

  const isValidDoc = (doc) => {
    const isInvalid = !(cpf.isValid(doc) || cnpj.isValid(doc));
    if (isInvalid) {
      throw new Error('Forneça um CPF ou CNPJ válido');
    }
  };


  const Favorecido = sequilize.define('Favorecido', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Forneça um nome válido para o Favorecido'
        }
      }
    },
    doc: {
      type: DataTypes.STRING,
      validate: {
        isValidDoc
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Por Favor forneça um e-mail válido'
        }
      }
    },
    cod_banco: {
      type: DataTypes.STRING,
      validate: {
        isValidBank: isValidBank
      }

    },
    agencia: {
      type: DataTypes.STRING,
      validate: {
        isValidAgencia: isValidAgencia
      }
    },
    agencia_digito: {
      type: DataTypes.STRING,
      validate: {
        isValidAgenciaDigito: isValidAgenciaDigito
      }
    },
    conta: {
      type: DataTypes.STRING,
      validate: {
        isValidConta: isValidConta
      }
    },
    conta_digito: {
      type: DataTypes.STRING,
      validate: {
        isValidContaDigito: isValidContaDigito
      }
    },
    status: {
      type: DataTypes.ENUM('Rascunho', 'Validado'),
      defaultValue: 'Rascunho',
      validate: {
        isIn: {
          args: [['Rascunho', 'Validado']],
          msg: 'O Status deve ser \'Rascunho\' ou \'Validado\''
        }
      }
    }
  });

  Favorecido.addHook('beforeUpdate', 'someCustomName', (favorecido, options) => {
    return new Promise((resolve, reject) => {
      const isValidado = favorecido._previousDataValues.status === 'Validado';
      if (isValidado) {
        const allowedChanges = ['email'];
        const changed = [...favorecido._changed];

        const difference = symmetricDiff(allowedChanges, changed);

        let hasOtherChanges = difference.length > 0;
        if (hasOtherChanges) {
          reject(new Error('O Favorecido já foi validado, apenas o e-mail pode ser alterado.'));
        }
      }
      resolve(true);
    });
  });

  return Favorecido;
};
