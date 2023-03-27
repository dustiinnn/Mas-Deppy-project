"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
            },
            totalPrice: {
                type: Sequelize.DECIMAL,
                default: false,
            },
            isPaid: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            shipping: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            grandTotal: {
                type: Sequelize.DECIMAL,
                allowNull: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Orders");
    },
};
