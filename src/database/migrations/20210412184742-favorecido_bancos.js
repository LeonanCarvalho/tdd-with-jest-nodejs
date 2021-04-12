'use strict';

const tableName = 'favorecido_bancos'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      agencia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      digito: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_favorecido: { //Relacionamento 1:1 para Favorecido
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'favorecidos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      cod_banco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable(tableName)
  }
};
