"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ChatDetails", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            roomId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Chats", // name of Target model
                    key: "id", // key in Target model that we're referencing
                },
            },
            message: {
                type: Sequelize.TEXT,
            },
            senderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users", // name of Target model
                    key: "id", // key in Target model that we're referencing
                },
            },
            receiverId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Users", // name of Target model
                    key: "id", // key in Target model that we're referencing
                },
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
        await queryInterface.dropTable("ChatDetails");
    },
};
