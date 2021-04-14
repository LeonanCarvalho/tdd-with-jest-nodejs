'use strict';

const tableName = 'favorecidos';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      doc: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        //unicode: true,
        allowNull: false
      },
      cod_banco: {
        type: Sequelize.STRING,
        allowNull: true
      },
      agencia: {
        type: Sequelize.STRING,
        allowNull: true
      },
      agencia_digito: {
        type: Sequelize.STRING,
        allowNull: true
      },
      conta: {
        type: Sequelize.STRING,
        allowNull: true
      },
      conta_digito: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('Rascunho', 'Validado'),
        defaultValue: 'Rascunho',
        //unicode: true,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName);
  }
};
