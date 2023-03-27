"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("OrderDetails", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            orderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Orders",
                    key: "id",
                },
            },
            productName: {
                type: Sequelize.STRING,
            },
            productDesc: {
                type: Sequelize.STRING,
            },
            qty: {
                type: Sequelize.INTEGER,
            },
            price: {
                type: Sequelize.DECIMAL,
            },
            totalPrice: {
                type: Sequelize.DECIMAL,
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
        await queryInterface.dropTable("OrderDetails");
    },
};
