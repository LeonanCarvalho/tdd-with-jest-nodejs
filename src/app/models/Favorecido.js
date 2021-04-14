const { cpf, cnpj } = require('cpf-cnpj-validator');

const { symmetricDiff } = require('../utils/ArrayUtils');

/**
 * Favorecido Model
 * @param sequilize
 * @param DataTypes
 */
module.exports = (sequilize, DataTypes) => {

  function isValidBank(cod_banco) {

  }

  function isValidAgencia(agencia) {

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

  function allowedToEdit(value) {
    console.log(value, this);
  }

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
        isValidBank
      }

    },
    agencia: {
      type: DataTypes.STRING
    },
    agencia_digito: {
      type: DataTypes.STRING
    },
    conta: {
      type: DataTypes.STRING
    },
    conta_digito: {
      type: DataTypes.STRING
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
