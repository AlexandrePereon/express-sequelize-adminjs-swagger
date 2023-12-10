'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.DataTypes.INTEGER,
            },
            first_name: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING,
            },
            last_name: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING,
            },
            phone: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING,
            },
            birth: {
                allowNull: false,
                type: Sequelize.DataTypes.DATE,
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING,
            },
            role: {
                allowNull: false,
                type: Sequelize.DataTypes.STRING,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users')
    },
}
