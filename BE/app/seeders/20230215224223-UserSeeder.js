"use strict";
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize").Sequelize;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("Users", [
            {
                username: "deppys",
                firstName: "Deppy",
                lastName: "Supardi",
                email: "cicakgilaa95@gmail@gmail.com",
                password: bcrypt.hashSync("movement71"),
                isAdmin: true,
                isVerified: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                username: "janedoe",
                firstName: "Jane",
                lastName: "Doe",
                email: "janedoe@example.com",
                password: bcrypt.hashSync("movement71"),
                isAdmin: false,
                isVerified: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
