"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn("OrderDetails", "productId", {
            type: Sequelize.STRING,
            after: "orderId",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn("OrderDetails", "productId");
    },
};
