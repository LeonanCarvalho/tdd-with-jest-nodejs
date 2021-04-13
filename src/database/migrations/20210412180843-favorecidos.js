'use strict';

const tableName = 'favorecidos'
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
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
                //unicode: true,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        })
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable(tableName)
    }
};
