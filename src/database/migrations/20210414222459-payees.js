'use strict';

const tableName = 'payees';
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
      cod_bank: {
        type: Sequelize.STRING,
        allowNull: true
      },
      agency: {
        type: Sequelize.STRING,
        allowNull: true
      },
      agency_digit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      account: {
        type: Sequelize.STRING,
        allowNull: true
      },
      account_digit: {
        type: Sequelize.STRING,
        allowNull: true
      },
      account_type: {
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
